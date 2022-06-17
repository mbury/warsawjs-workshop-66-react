import React from 'react';
import PropTypes from 'prop-types';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ZAxis,
} from 'recharts';

import * as utils from '../commons/utils';
const RatingChart = ({ data, onSelect }) => {
  const chartData = () => utils.prepareChartData(data);

  return (
    <ResponsiveContainer height={200}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="price" name="cena" unit="zł" />
        <YAxis
          domain={[0, 100]}
          type="number"
          dataKey="rating"
          name="pozytywnych ocen"
          unit="%"
        />
        <ZAxis
          type="number"
          dataKey="reviews"
          range={[30, 500]}
          name="ilość opinii"
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            strokeDasharray: '3 3',
          }}
        />
        <Scatter
          cursor="pointer"
          onClick={(e, index) => onSelect(index)}
          isAnimationActive={false}
          data={chartData}
          fill="#2185d0"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

RatingChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

RatingChart.defaultProps = {
  data: [],
  onSelect: undefined,
};

export default React.memo(RatingChart);

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #999',
          margin: 0,
          padding: 10,
        }}
      >
        <p>
          <strong>{payload[0].payload.name}</strong>
        </p>
        {payload.map((v) => (
          <span key={v.name}>
            {v.name}:{' '}
            <strong>
              {v.value}
              {v.unit}
              <br />
            </strong>
          </span>
        ))}
      </div>
    );
  }

  return null;
};
