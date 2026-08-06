// A small, dependency-free line chart. Takes real monthly totals
// (computed from the seller's own orders) and draws a smooth-ish
// polyline — no charting library needed.
const SalesChart = ({ points }) => {
  const width = 640;
  const height = 220;
  const padding = 32;

  const values = points.map((p) => p.value);
  const max = Math.max(1, ...values);

  const coords = points.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(1, points.length - 1);
    const y = height - padding - (point.value / max) * (height - padding * 2);
    return { x, y, ...point };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1]?.x || padding} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full">
      <defs>
        <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* horizontal guide lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={padding}
          x2={width - padding}
          y1={padding + (i * (height - padding * 2)) / 3}
          y2={padding + (i * (height - padding * 2)) / 3}
          stroke="#e2e8f0"
          strokeDasharray="4 4"
        />
      ))}

      <path d={areaPath} fill="url(#salesFill)" />
      <path d={linePath} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {coords.map((c) => (
        <circle key={c.label} cx={c.x} cy={c.y} r="4" fill="#fff" stroke="#0f766e" strokeWidth="2.5" />
      ))}

      {coords.map((c) => (
        <text key={c.label} x={c.x} y={height - 8} textAnchor="middle" fontSize="11" fill="#94a3b8" fontWeight="700">
          {c.label}
        </text>
      ))}
    </svg>
  );
};

export default SalesChart;
