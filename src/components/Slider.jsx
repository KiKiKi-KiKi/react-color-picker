import React, { useEffect, useRef } from 'react';

const formatValue = (max = 100) => (value) => {
  return value > max ? max : value < 0 ? 0 : value;
};

function Slider({ value, max, onChange }) {
  const val = formatValue(max)(value);
  const ref = useRef();

  useEffect(() => {
    ref.current.value = val;
  }, [val]);

  return (
    <>
      <input
        ref={ref}
        type="range"
        min="0"
        max={max}
        defaultValue={val}
        onChange={onChange}
      />
      <span>{val}</span>
    </>
  );
}

export function RGBSlider({ value, onChange }) {
  return <Slider value={value} max="255" onChange={onChange} />;
}

export function HSLSlider({ value, type, onChange }) {
  const max = type === 'hue' ? 360 : 100;
  return <Slider value={value} max={max} onChange={onChange} />;
}
