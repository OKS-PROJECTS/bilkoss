import { Tabs, Tab } from 'oks-ui'

/**
 * Thin wrapper over <Tabs variant="solid">, re-skinned for dark (see the
 * `.seg-control` patch in theme.css). Used for "Revenue / Orders / Sessions"
 * style segmented switches.
 *
 * options: [{ key, label }]
 */
export default function SegmentedControl({ options, value, onChange, size = 'sm', fullWidth = false }) {
  return (
    <div className="seg-control inline-block">
      <Tabs
        variant="solid"
        color="primary"
        size={size}
        radius="md"
        fullWidth={fullWidth}
        selectedKey={value}
        onSelectionChange={(k) => onChange(String(k))}
      >
        {options.map((o) => (
          <Tab key={o.key} title={o.label} />
        ))}
      </Tabs>
    </div>
  )
}
