import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import { getPlaylistTracks, getAudioFeaturesForTracks } from '../spotify';

import styled from 'styled-components/macro';
import { theme, Section } from '../styles';

const ChartContainer = styled(Section)`
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 33%;
  min-width: 400px;
  padding: 10px;
  position: relative;

  &.sticky {
    position: fixed;
    top: 30px;
    right: ${theme.spacing.xl};
  }

  #chart {
    margin: 0 auto;
  }
`;

class FeatureChart extends Component {
  static propTypes = {
    chartPlaylist: PropTypes.object,
  };

  state = {
    chartPlaylist: this.props.chartPlaylist,
  };

  componentDidMount() {
    this.getTracks();

    this.chartEl = this.chart.current;
    // this.chartPos = this.getPosition(this.chartEl);
    // console.log(`Element is ${offset} vertical pixels from <body>`);

    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const { chartPlaylist } = this.props;

    if (this.state.chartPlaylist.id !== chartPlaylist.id) {
      this.setState({ chartPlaylist });
      this.getTracks();
    }
  }

  handleScroll = () => {
    // const distanceToTop = this.chartEl.getBoundingClientRect().top;
    // const yPos = this.getPosition(this.chartEl).y;
    // console.log(window.scrollY, yPos, distanceToTop);
    // adding sticky class screws up yPos and everything calculating distance from top
    // if (window.scrollY > yPos) {
    //   this.chartEl.classList.add('sticky');
    // } else {
    //   this.chartEl.classList.remove('sticky');
    // }
  };

  getPosition(element) {
    let xPosition = 0;
    let yPosition = 0;

    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  }

  getTracks() {
    const { chartPlaylist } = this.state;
    const url = `${chartPlaylist.tracks.href}`;

    getPlaylistTracks(url, response => {
      const ids = response.items.map(track => track.track.id).join(',');
      this.getAudioFeatures(ids);
    });
  }

  getAudioFeatures(ids) {
    const url = `https://api.spotify.com/v1/audio-features?ids=${ids}`;

    getAudioFeaturesForTracks(url, response => {
      const features = response.audio_features;
      this.averageData(features);
    });
  }

  avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  averageData(features) {
    const danceability = this.avg(features.map(feat => feat.danceability));
    const acousticness = this.avg(features.map(feat => feat.acousticness));
    const energy = this.avg(features.map(feat => feat.energy));
    const liveness = this.avg(features.map(feat => feat.liveness));
    const speechiness = this.avg(features.map(feat => feat.speechiness));
    const valence = this.avg(features.map(feat => feat.valence));

    const dataset = {
      danceability,
      acousticness,
      energy,
      liveness,
      speechiness,
      valence,
    };

    this.createChart(dataset);
  }

  createChart(dataset) {
    const { chartPlaylist } = this.props;
    const ctx = document.getElementById('chart');
    const labels = Object.keys(dataset);
    const data = Object.values(dataset);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.3)',
              'rgba(255, 159, 64, 0.3)',
              'rgba(255, 206, 86, 0.3)',
              'rgba(75, 192, 192, 0.3)',
              'rgba(54, 162, 235, 0.3)',
              'rgba(153, 102, 255, 0.3)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `Audio Features for ${chartPlaylist.name}`,
          fontSize: 24,
          fontFamily: 'Circular Std',
          fontColor: '#ffffff',
          padding: 30,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              ticks: {
                fontFamily: 'Circular Std',
                fontSize: 14,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              ticks: {
                beginAtZero: true,
                fontFamily: 'Circular Std',
                fontSize: 14,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <ChartContainer ref={el => (this.chart = el)}>
        <canvas id="chart" width="400" height="400" />
      </ChartContainer>
    );
  }
}

export default FeatureChart;
