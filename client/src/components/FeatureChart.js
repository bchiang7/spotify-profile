import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import styled from 'styled-components/macro';
import { theme } from '../styles';
const { fonts } = theme;

const properties = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
];

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;

  #chart {
    margin: 0 auto;
    margin-top: -30px;
  }
`;

const FeatureChart = props => {
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  useEffect(() => {
    const createDataset = features => {
      const dataset = {};
      properties.forEach(prop => {
        dataset[prop] = features.length
          ? avg(features.map(feat => feat && feat[prop]))
          : features[prop];
      });
      return dataset;
    };

    const createChart = dataset => {
      const { type } = props;
      const ctx = document.getElementById('chart');
      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      new Chart(ctx, {
        type: type || 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '',
              data,
              backgroundColor: [
                '#1db954',
                '#1db954',
                '#1db954',
                '#1db954',
                '#1db954',
                '#1db954',
                '#1db954',
              ],
              borderRadius: 20,
            },
          ],
        },
        options: {
          borderRadius: 20,
          responsive: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          title: {
            display: true,
            text: `Audio Features`,
            fontSize: 30,
            fontFamily: `${fonts.primary}`,
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
                  display: false,
                },
                ticks: {
                  fontFamily: `${fonts.primary}`,
                  fontSize: 20,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  fontFamily: `${fonts.primary}`,
                  fontSize: 20,
                },
              },
            ],
          },
        },
      });
    };

    const parseData = () => {
      const { features } = props;
      const dataset = createDataset(features);
      createChart(dataset);
    };

    parseData();
  }, [props]);

  return (
    <Container>
      <canvas id="chart" width="400" height="400" />
    </Container>
  );
};

FeatureChart.propTypes = {
  features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  type: PropTypes.string,
};

export default FeatureChart;
