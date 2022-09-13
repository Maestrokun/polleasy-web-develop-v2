/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { PieChart as ReactPieChart, Pie, Cell, Tooltip } from 'recharts';

function PieChart({ data, color, height, width, radius, cy, cx, content }) {
  return (
    <ReactPieChart width={width} height={height}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={cx}
        cy={cy}
        outerRadius={radius}
        fill="#8884d8"
      >
        {data?.map((v, i) => (
          <Cell key={`pie-${i}`} fill={color[i % color.length]} />
        ))}
      </Pie>
      <Tooltip content={content} />
    </ReactPieChart>
  );
}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string, null]),
};

PieChart.defaultProps = {
  color: [],
  width: 1000,
  height: 400,
  radius: 30,
  cx: 50,
  cy: 40,
  content: null,
};

export default PieChart;
