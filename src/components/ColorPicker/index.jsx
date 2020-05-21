import React from 'react';
import HueGradPicker from './HueGradPicker';
import HuePicker from './HuePicker';

const S_MAX = 200;
const L_MAX = 200;

export default function ColorPicker() {
  return (
    <div className="color-picker">
      <HueGradPicker width={S_MAX} height={L_MAX} />
      <HuePicker width={S_MAX} height={20} />
    </div>
  );
}
