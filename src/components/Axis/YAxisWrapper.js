import React from 'react';
import { YAxis as RechartsYAxis } from 'recharts';

const YAxisWrapper = (props) => {
  const {
    label = { value: 'Valeurs', angle: -90, position: 'insideLeft' },
    ...rest
  } = props;

  return <RechartsYAxis label={label} {...rest} />;
};

export default YAxisWrapper;