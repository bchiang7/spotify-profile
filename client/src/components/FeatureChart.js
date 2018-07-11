import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Chart from 'chart.js';

import { theme, Section } from '../style';

const Container = Section.extend`
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.md};
`;

class FeatureChart extends Component {
  state = {
    token: null,
    chartPlaylist: this.props.chartPlaylist,
  };

  componentDidMount() {
    this.getTracks();

    // TODO: scroll event listener
    // When scrolled to component, make sticky to top
  }

  componentDidUpdate() {
    const { chartPlaylist } = this.props;

    if (this.state.chartPlaylist.id !== chartPlaylist.id) {
      this.setState({ chartPlaylist });
      this.getTracks();
    }
  }

  getTracks() {
    const { token } = this.props;
    const { chartPlaylist } = this.state;
    const url = `${chartPlaylist.tracks.href}`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const ids = response.data.items.map(track => track.track.id).join(',');

        this.getAudioFeatures(ids);
      })
      .catch(error => console.error(error));
  }

  getAudioFeatures(ids) {
    const { token } = this.props;
    const url = `https://api.spotify.com/v1/audio-features?ids=${ids}`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        // console.log(response.data);
        const features = response.data.audio_features;
        this.averageData(features);
      })
      .catch(error => console.error(error));
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
      <Container>
        <canvas id="chart" width="400" height="400" />
      </Container>
    );
  }
}

FeatureChart.propTypes = {
  chartPlaylist: PropTypes.object,
  token: PropTypes.string,
};

export default FeatureChart;
