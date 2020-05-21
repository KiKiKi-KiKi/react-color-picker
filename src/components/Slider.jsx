import React, { useState, useCallback } from 'react';

const formatValue = (max = 100) => (value) => {
  return value > max ? max : (value < 0 ? 0 : value);
}

const Slider = ({ value, max, onChange }) => {
  return (
    <>
      <input type="range" min="0" max={max} onChange={onChange} value={value} />
      <span>{value}</span>
    </>
  );
}

export default function ColorSlider({ value, type }) {
  const max = type === 'hue' ? 360 : 100;
  const [val, setVal] = useState(formatValue(max)(value));
  const onChange = useCallback((e) => setVal(e.target.value), []);

  return <Slider value={val} max={max} onChange={onChange} />;
}
