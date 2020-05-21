# React color picker

ref.

- https://www.peko-step.com/tool/hslrgb.html
- https://github.com/Qix-/color-convert/blob/master/conversions.js
  - https://www.npmjs.com/package/color-convert
- https://support.microsoft.com/ja-jp/help/29240/how-to-converting-colors-between-rgb-and-hls-hbs
- https://ja.wikipedia.org/wiki/HLS%E8%89%B2%E7%A9%BA%E9%96%93

## Convert

### RGB to HSL

R・G・Bのうち、最も大きな値を `MAX`、最も小さな値を `MIN` とする

#### 色相 Hue

```
Rが最大値: Hue = 60 × ((G - B) ÷ (MAX - MIN))
Gが最大値: Hue = 60 × ((B - R) ÷ (MAX - MIN)) +120
Bが最大値: Hue = 60 × ((R - G) ÷ (MAX - MIN)) +240
3つとも同じ値 Hue = 0
```

Hue がマイナス値になった場合は `360` を加算する

#### 彩度 Saturation

彩度は赤・緑・青の3値が同じ状態を0%とし、そこから彩度上昇にあわせて均等に広がっていって、赤・緑・青のどれかが0もしくは255に到達した段階で100%となります。  
0%と100%が分かれば、あとは現在の値が変動幅のうちの何%になるのかを調べれば彩度を求めることができます。  

##### 収束値

```
収束値 CNT = (MAX + MIN) ÷ 2
```

収束値: MAX, MIN の中間の灰色  
=> 彩度 S が 0 の時 収束値になる

e.g.
```
RGB(210, 70, 120) が彩度 0 の時
CNT = (210 + 70) / 2 = 140
=> RGB(140, 140, 140);
```

##### 変動幅

収束値から彩度上昇にあわせて最小値・最大値が等速で広がっていき、最小値が0、もしくは最大値が255に到達した段階で彩度100%  
最小値・最大値のどちらが先に到達するかは、収束値が0～255の中間となる127の前か後かで判断できる

```
収束値 < 128
  変動幅 = CNT

収束値 >= 128
  変動幅 = 255 - CNT
```

##### 彩度 を求める

`(現在値 - 収束値) / 変動幅` で彩度のパーセンテージを算出できる  

```
収束値 CNT < 128
  S = (CNT - MIN) / CNT
    = 2(CNT - MIN) / 2CNT
    = (2((MAX + MIN)/2) - 2MIN) / 2((MAX + MIN)/2)
    = (MAX + MIN - 2MIN) / (MAX + MIN)
    = (MAX - MIN) / (MAX + MIN)

収束値 CNT >= 128
 S = (MAX - CNT) / (255 - CNT)
   = 2(MAX - CNT) / 2(255 - CNT)
   = (2MAX - (MAX + MIN)) / (510 - (MAX + MIN))
   = (2MAX - MAX - MIN) / (510 - MAX - MIN)
   = (MAX - MIN) / (510 - MAX - MIN)
```

S を 0 - 100 にするには上記で求めた値に `100` を掛ける

#### 輝度 Lightness (Brightness)

輝度 = 収束値 => `L = (MAX + MIN) ÷ 2`

e.g.
```
RGB(45, 175, 90)
L = (175 + 45) / 2
  = 110

L = 0 - 100: (110 / 255) * 100 = 45;
L = 0 - 255: 110
```

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
