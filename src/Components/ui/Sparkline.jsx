/** Tiny inline SVG sparkline — reliable at small sizes. */
export default function Sparkline({ data, width = 96, height = 34, color = 'primary', area = true, className }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const step = width / (data.length - 1)
  const pts = data.map((v, i) => [i * step, height - 3 - ((v - min) / span) * (height - 6)])
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const fill = `${line} L${width} ${height} L0 ${height} Z`
  const c = `var(--app-${color})`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      {area && <path d={fill} fill={c} opacity="0.12" />}
      <path d={line} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
