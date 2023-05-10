import React from 'react';
import { Vortex } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Vortex
      height="25"
      width="25"
      ariaLabel="vortex-loading"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  );
};

export default Loader;
