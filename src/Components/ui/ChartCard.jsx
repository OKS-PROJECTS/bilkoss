import { Chart } from 'oks-ui'
import { Panel } from './Surface'

/**
 * Wrapper around <Chart> inside a titled Panel. Line/area render clean
 * (no Y-axis, no markers); bar/column keep the axis.
 */
export default function ChartCard({
  title,
  subtitle,
  actions,
  className,
  height = 300,
  type = 'area',
  data,
  x,
  series,
  palette,
  legend,
  grid,
  axisX,
  axisY,
  line,
  column,
  bar,
  dataFormat,
  tooltip,
}) {
  const isLine = type === 'line' || type === 'area'
  return (
    <Panel title={title} subtitle={subtitle} actions={actions} className={className}>
      <Chart
        type={type}
        data={data}
        x={x}
        series={series}
        height={height}
        palette={palette}
        dataFormat={dataFormat}
        tooltip={tooltip}
        legend={legend ?? { position: 'bottom' }}
        grid={grid ?? { horizontal: !isLine || true, vertical: false }}
        axisX={axisX}
        axisY={isLine ? { show: false, ...axisY } : axisY}
        line={isLine ? { curve: 'smooth', markers: { size: 0 }, area: { show: type === 'area', fill: { opacity: 0.14 } }, ...line } : line}
        column={column}
        bar={bar}
      />
    </Panel>
  )
}
