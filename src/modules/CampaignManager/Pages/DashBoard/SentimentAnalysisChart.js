import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  Area,
  // AreaChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { pxToRem } from 'utils/formatFont';

function SentimentAnalysisChart({ data }) {
  return (
    <Paper
      elevation={0}
      sx={{
        marginTop: 5,
        background: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: pxToRem(32),
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" color="#6B6C7E">
            Sentiment Analysis
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart
              width={800}
              height={300}
              data={data}
              margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#80ACFF" stopOpacity={1} />
                  <stop
                    offset="100%"
                    stopColor="rgba(128, 172, 255, 0)"
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <CartesianGrid vertical={false} stroke="#DDD" />

              <Line
                type="monotone"
                unit="M"
                strokeLinecap="round"
                strokeWidth={2}
                style={{ strokeDasharray: `40% 60%` }}
                dataKey="uv"
                stroke="#80ACFF"
                dot={false}
                legendType="none"
              />
              <Area
                type="monotone"
                dataKey="uv"
                stroke={false}
                strokeWidth={1}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

SentimentAnalysisChart.propTypes = {
  data: PropTypes.node.isRequired,
};

export default SentimentAnalysisChart;
