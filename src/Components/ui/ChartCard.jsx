import { Chart } from 'oks-ui'
import { Panel } from './Surface'

/**
 * Wrapper around <Chart>. Line/area charts render clean (no gridlines, no
 * Y-axis, no point markers); bar/column keep the axis.
 */
export default function ChartCard({ title, subtitle, actions, height = 300, type = 'area', className, ...chart }) {
  const isLine = type === 'line' || type === 'area'
  return (
    <Panel title={title} subtitle={subtitle} actions={actions} className={className}>
      <Chart
        type={type}
        height={height}
        legend={chart.legend ?? { position: 'bottom' }}
        grid={chart.grid ?? { horizontal: !isLine, vertical: false }}
        {...(isLine
          ? {
              axisY: { show: false, ...chart.axisY },
              line: { curve: 'smooth', point: { show: false }, area: { show: type === 'area', fill: { opacity: 0.14 } }, ...chart.line },
            }
          : {})}
        {...chart}
      />
    </Panel>
  )
}
