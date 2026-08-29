import { useState } from 'react'
import { Button, TextField, SelectField, RadioGroupField } from 'oks-ui'
import { Minus, Plus, Trash2, Search } from 'lucide-react'
import { PageHeader, Panel, Surface, StatusChip } from '../../Components/ui'
import { money } from '../../lib/format'
import { products } from '../../data/ecommerce'

const bc = (leaf) => [{ label: 'Bilkoss', to: '/' }, { label: 'Ecommerce' }, { label: leaf }]

export function Cart() {
  const [lines, setLines] = useState(products.slice(0, 4).map((p, i) => ({ ...p, qty: i + 1 })))
  const set = (id, d) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + d) } : l)))
  const remove = (id) => setLines((ls) => ls.filter((l) => l.id !== id))
  const sub = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const shipping = sub > 500 ? 0 : 24
  return (
    <>
      <PageHeader title="Cart" breadcrumbs={bc('Cart')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title={`${lines.length} items`}>
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-4 py-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-[15px] font-bold" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-muted)' }}>{l.name[0]}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{l.name}</p>
                  <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>By {l.brand} · {money(l.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Decrease" onPress={() => set(l.id, -1)}><Minus size={13} /></Button>
                  <span className="w-8 text-center text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{l.qty}</span>
                  <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Increase" onPress={() => set(l.id, 1)}><Plus size={13} /></Button>
                </div>
                <span className="w-20 text-right text-[13.5px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{money(l.price * l.qty)}</span>
                <Button isIconOnly size="sm" variant="ghost" color="danger" aria-label="Remove" onPress={() => remove(l.id)}><Trash2 size={14} /></Button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Order summary">
          <dl className="space-y-2.5 text-[13px]">
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Subtotal</dt><dd style={{ color: 'var(--app-fg-strong)' }}>{money(sub)}</dd></div>
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Shipping</dt><dd style={{ color: 'var(--app-fg-strong)' }}>{shipping ? money(shipping) : 'Free'}</dd></div>
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Tax (est.)</dt><dd style={{ color: 'var(--app-fg-strong)' }}>{money(sub * 0.08)}</dd></div>
            <div className="flex justify-between border-t pt-2.5 text-[15px] font-bold" style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-strong)' }}>
              <dt>Total</dt><dd>{money(sub + shipping + sub * 0.08)}</dd>
            </div>
          </dl>
          <Button as="a" href="/apps/ecommerce/checkout" color="primary" fullWidth className="mt-4">Checkout</Button>
        </Panel>
      </div>
    </>
  )
}

export function Checkout() {
  return (
    <>
      <PageHeader title="Checkout" breadcrumbs={bc('Checkout')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Contact">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Full name" placeholder="Jane Cooper" />
              <TextField label="Email" type="email" placeholder="jane@example.com" />
            </div>
          </Panel>
          <Panel title="Shipping address">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Address" placeholder="4517 Washington Ave" className="sm:col-span-2" />
              <TextField label="City" placeholder="Manchester" />
              <TextField label="ZIP" placeholder="39495" />
              <SelectField label="Country" options={['United States', 'United Kingdom', 'Germany'].map((v) => ({ label: v, value: v }))} />
              <SelectField label="State" options={['California', 'New York', 'Texas'].map((v) => ({ label: v, value: v }))} />
            </div>
          </Panel>
          <Panel title="Payment">
            <RadioGroupField label="Method" options={[{ label: 'Credit card', value: 'cc' }, { label: 'PayPal', value: 'pp' }, { label: 'Bank transfer', value: 'bt' }]} />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
              <TextField label="Expiry" placeholder="MM / YY" />
              <TextField label="CVC" placeholder="123" />
            </div>
          </Panel>
        </div>
        <Panel title="Summary">
          <ul className="space-y-2 text-[13px]">
            {products.slice(0, 3).map((p) => (
              <li key={p.id} className="flex justify-between">
                <span style={{ color: 'var(--app-fg-muted)' }}>{p.name}</span>
                <span style={{ color: 'var(--app-fg-strong)' }}>{money(p.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t pt-3 text-[15px] font-bold" style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-strong)' }}>
            <span>Total</span><span>{money(products.slice(0, 3).reduce((s, p) => s + p.price, 0))}</span>
          </div>
          <Button color="primary" fullWidth className="mt-4">Place order</Button>
        </Panel>
      </div>
    </>
  )
}

export function ProductsGrid() {
  const [q, setQ] = useState('')
  const list = q ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : products
  return (
    <>
      <PageHeader title="Products Grid" breadcrumbs={bc('Products Grid')} actions={<Button color="primary" size="sm">Add product</Button>} />
      <div className="mb-5 max-w-xs">
        <TextField type="search" value={q} onChange={setQ} placeholder="Search products…" startIcon={<Search size={15} />} aria-label="Search products" />
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <Surface key={p.id} padded={false} className="overflow-hidden">
            <div className="flex h-36 items-center justify-center text-[28px] font-bold" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-subtle)' }}>{p.name[0]}</div>
            <div className="p-4">
              <p className="truncate text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{p.name}</p>
              <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>By {p.brand}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[14px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{money(p.price)}</span>
                <StatusChip status={p.status} />
              </div>
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}
