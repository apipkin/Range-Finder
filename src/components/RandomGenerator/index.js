import React, { useRef } from 'react';

import axios from 'axios';

import { GeneratorEl } from './Elements';

const RandomGenerator = ({ min, max, next }) => {
  const inputEl = useRef(null);

  const findNumber = () => {
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${Math.max(min + 1, max)}&col=1&base=10&format=plain&rnd=new`;

    axios.get(url).then(({data}) => {
      inputEl.current.value = data;
      next(+data);
    }).catch(err => {
      console.log(err);
    })
  };
  
  const handleGenerateClick = (e) => {
    findNumber();
  };

  return (
    <GeneratorEl>
      <input type="text" defaultValue="--" ref={inputEl} />
      <button onClick={ handleGenerateClick }>Generate Random Number</button>
    </GeneratorEl>
  );
};

export default RandomGenerator;
