import React from 'react';

const formatValue = (max = 100) => (value) => {
  return value > max ? max : value < 0 ? 0 : value;
};

export default function Slider({ value, type, onChange }) {
  const max = type === 'hue' ? 360 : 100;
  const val = formatValue(max)(value);

  return (
    <>
      <input
        type="range"
        min="0"
        max={max}
        onChange={onChange}
        defaultValue={val}
      />
      <span>{val}</span>
    </>
  );
}
