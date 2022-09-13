/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

function HorizontalBar({ data, height, width, content }) {
  return (
    <ComposedChart
      layout="vertical"
      width={width}
      height={height}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" scale="band" />
      <Tooltip content={content} />
      <Legend />
      <Bar dataKey="pv" barSize={20} fill="#413ea0">
        <LabelList dataKey="pv" position="right" />
      </Bar>
    </ComposedChart>
  );
}

HorizontalBar.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string, null]),
  width: PropTypes.number,
};

HorizontalBar.defaultProps = {
  height: 400,
  width: 768,
  content: null,
};

export default HorizontalBar;
