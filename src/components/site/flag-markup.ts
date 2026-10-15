// Inline SVG markup for each destination flag (viewBox 0 0 60 40, 3:2).
const star = (cx: number, cy: number, R: number, rot: number) => {
  const r = R * 0.382;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = ((rot + i * 36) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
};

const schengen = () => {
  let s = `<rect width="60" height="40" fill="#1b3f94"/>`;
  for (let k = 0; k < 12; k++) {
    const a = (k * 30 * Math.PI) / 180;
    s += `<polygon points="${star(30 + 13 * Math.cos(a), 20 + 13 * Math.sin(a), 2.4, -90)}" fill="#ffcc00"/>`;
  }
  return s;
};

const usa = () => {
  const h = 40 / 13;
  let s = "";
  for (let i = 0; i < 13; i++) s += `<rect y="${(i * h).toFixed(3)}" width="60" height="${(h + 0.05).toFixed(3)}" fill="${i % 2 ? "#ffffff" : "#b22234"}"/>`;
  s += `<rect width="24" height="${(7 * h).toFixed(3)}" fill="#3c3b6e"/>`;
  for (let r = 0; r < 9; r++) {
    const even = r % 2 === 0;
    const count = even ? 6 : 5;
    for (let i = 0; i < count; i++) s += `<polygon points="${star((even ? 2 : 4) + i * 4, 2.1 + r * 2.2, 1, -90)}" fill="#fff"/>`;
  }
  return s;
};

// Maple leaf: right half listed top to bottom, mirrored for the left half.
const leafRight: [number, number][] = [[1.6, -6.6], [3.0, -7.6], [2.8, -3.4], [6.2, -5.0], [5.6, -2.0], [9.0, -0.4], [6.4, 1.8], [7.4, 4.6], [3.4, 3.4], [0.8, 5.0], [0.7, 10]];
const canada = () => {
  const right = leafRight.map(([x, y]) => [30 + x * 1.05, 20 + y * 1.05]);
  const left = [...leafRight].reverse().map(([x, y]) => [30 - x * 1.05, 20 + y * 1.05]);
  const pts = [[30, 20 - 10.5], ...right, ...left].map(([x, y]) => `${x!.toFixed(2)},${y!.toFixed(2)}`).join(" ");
  return `<rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#d80621"/><rect x="45" width="15" height="40" fill="#d80621"/><polygon points="${pts}" fill="#d80621"/>`;
};

const turkey = () =>
  `<rect width="60" height="40" fill="#e30a17"/><circle cx="22" cy="20" r="10" fill="#fff"/><circle cx="25" cy="20" r="8" fill="#e30a17"/><polygon points="${star(35.5, 20, 5, 180)}" fill="#fff"/>`;

const morocco = () => {
  const v = (k: number) => {
    const a = ((-90 + k * 72) * Math.PI) / 180;
    return `${(30 + 9.5 * Math.cos(a)).toFixed(2)},${(20 + 9.5 * Math.sin(a)).toFixed(2)}`;
  };
  return `<rect width="60" height="40" fill="#c1272d"/><polygon points="${[0, 2, 4, 1, 3].map(v).join(" ")}" fill="none" stroke="#006233" stroke-width="1.4" stroke-linejoin="miter"/>`;
};

export const flagMarkup: Record<string, string> = {
  schengen: schengen(),
  usa: usa(),
  canada: canada(),
  turkey: turkey(),
  morocco: morocco(),
};
