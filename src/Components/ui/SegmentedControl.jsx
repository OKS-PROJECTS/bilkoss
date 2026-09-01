import { SegmentedControl as OksSegmentedControl } from 'oks-ui'

/**
 * Wrapper over oks-ui <SegmentedControl>. Accepts the template's
 * `options: [{ key, label }]` shape (also tolerates `{ value, label }`).
 */
export default function SegmentedControl({ options, value, onChange, size = 'sm', fullWidth = false, 'aria-label': ariaLabel = 'View' }) {
  return (
    <OksSegmentedControl
      aria-label={ariaLabel}
      size={size}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      options={options.map((o) => ({ value: o.value ?? o.key, label: o.label, icon: o.icon, isDisabled: o.isDisabled }))}
    />
  )
}
