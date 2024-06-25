import React from 'react';
import { XAxis as RechartsXAxis } from 'recharts';

const XAxisWrapper = (props) => {
  const {
    label = { value: 'Jour', position: 'insideBottom', offset: -5 },
    ...rest
  } = props;

  return <RechartsXAxis label={label} {...rest} />;
};

export default XAxisWrapper;