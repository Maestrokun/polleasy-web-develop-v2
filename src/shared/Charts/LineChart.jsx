/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart as ReactLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
// import Tooltip from 'recharts/types/component/Tooltip';

function LineChart({
  data,
  keyArray,
  width,
  height,
  color,
  xDataKey,
  showLegend,
  ...rest
}) {
  return (
    <ReactLineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      {...rest}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xDataKey} />
      <YAxis />
      <Tooltip />
      {showLegend && <Legend verticalAlign="top" height={36} />}
      {keyArray?.map((v, i) => (
        <Line
          // eslint-disable-next-line react/no-array-index-key
          key={`line-${i}`}
          type="monotone"
          dataKey={v}
          stroke={color[i % color.length]}
          activeDot={{ r: 8 }}
        />
      ))}
    </ReactLineChart>
  );
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  keyArray: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.array,
  xDataKey: PropTypes.string,
  showLegend: PropTypes.bool,
};
LineChart.defaultProps = {
  width: 500,
  height: 300,
  color: [],
  xDataKey: 'name',
  showLegend: false,
};

export default LineChart;
