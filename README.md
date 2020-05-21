# React color picker

ref.

- https://www.peko-step.com/tool/hslrgb.html
- https://github.com/Qix-/color-convert/blob/master/conversions.js
  - https://www.npmjs.com/package/color-convert
- https://support.microsoft.com/ja-jp/help/29240/how-to-converting-colors-between-rgb-and-hls-hbs

## Convert

### RGB to HSL

### HSL to RGB

輝度Lが最大値と最小値の中間値で、彩度Sが中間値から最大値・最小値までの距離を表している  

輝度Lが49以下の場合
```
MAX = 2.55 × (L + L × (S ÷ 100))
MIN = 2.55 × (L - L × (S ÷ 100))
```

輝度Lが50以上の場合
```
MAX = 2.55 × (L + (100 - L) × (S ÷ 100))
MIN = 2.55 × (L - (100 - L) × (S ÷ 100))
```

色相 Hue により最大値・最小値・中間値が決定される

`0 <= Hue < 60`
```
R = MAX
G = (H ÷ 60) × (MAX - MIN) + MIN
B = MIN
```

`60 <= Hue < 120`
```
R = ((120 - H) ÷ 60) × (MAX - MIN) + MIN
G = MAX
B = MIN
```

`120 <= Hue < 180`
```
R = MIN
G = MAX
B = ((H - 120) ÷ 60) × (MAX - MIN) + MIN
```

`180 <= Hue < 240`
```
R = MIN
G = ((240 - H) ÷ 60) × (MAX - MIN) + MIN
B = MAX
```

`240 <= Hue < 300`
```
R = ((H - 240) ÷ 60) × (MAX - MIN) + MIN
G = MIN
B = MAX
```

`240 <= Hue < 360`
```
R = MAX
G = MIN
B = ((360 - H) ÷ 60) × (MAX - MIN) + MIN
```
