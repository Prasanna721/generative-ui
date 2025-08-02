import React, { useEffect, useState } from 'react';


export const GenerativeUI = () => {

  useEffect(() => {

  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: "<html></html>" }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GenerativeUI;