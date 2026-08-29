import { daysAgo, fmtDate, rng } from '../lib/format'

const FIRST = ['John', 'Emma', 'Michael', 'Sophia', 'Chris', 'Olivia', 'James', 'Ava', 'Liam', 'Isla', 'Noah', 'Mia', 'Ethan', 'Zoe', 'Lucas', 'Aria']
const LAST = ['Carter', 'Wilson', 'Harris', 'Turner', 'Evans', 'Green', 'Parker', 'Mitchell', 'Brooks', 'Reed', 'Cole', 'Hayes', 'Ward', 'Foster', 'Bennett', 'Shaw']
const PRODUCTS = [
  ['Modern Fabric Sofa Set', 'Homeluxe', 499, 'Furniture'],
  ['L-Shaped Sectional Sofa', 'ComfortHub', 899, 'Furniture'],
  ['Velvet Recliner Chair', 'SoftEase', 379, 'Furniture'],
  ['Classic Wooden Coffee Table', 'OakCraft', 259, 'Furniture'],
  ['Minimalist TV Stand', 'FurniPro', 315, 'Living'],
  ['Leather Lounge Chair', 'UrbanStyle', 425, 'Furniture'],
  ['Wireless Noise-Cancel Headset', 'AudioNova', 199, 'Electronics'],
  ['Smart LED Desk Lamp', 'BrightLite', 39, 'Home & Office'],
  ['Ergonomic Office Chair', 'DeskWorks', 289, 'Office'],
  ['Ceramic Dinnerware Set', 'TableCraft', 129, 'Kitchen'],
  ['Cotton Bed Linen Bundle', 'SleepWell', 89, 'Bedroom'],
  ['Stainless Cookware 10-pc', 'ChefLine', 249, 'Kitchen'],
]
const STATUS = ['Completed', 'Pending', 'Processing', 'Cancelled', 'Refunded']
const PAY = ['Credit Card', 'UPI', 'PayPal', 'Debit Card', 'Bank Transfer']
const STOCK = ['In Stock', 'Low Stock', 'Out of Stock']

export const name = (i) => `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`
export const email = (i) => `${FIRST[i % FIRST.length].toLowerCase()}.${LAST[(i * 3) % LAST.length].toLowerCase()}@example.com`

export const topProducts = PRODUCTS.slice(0, 6).map((p, i) => ({
  id: `PRD-${100 + i}`,
  name: p[0],
  brand: p[1],
  price: p[2],
  category: p[3],
  qty: 34 + ((i * 13) % 40),
  amount: p[2] * (34 + ((i * 13) % 40)),
  stock: STOCK[i % STOCK.length],
}))

export const products = PRODUCTS.map((p, i) => ({
  id: `PRD-${1001 + i}`,
  sku: `${p[3].slice(0, 2).toUpperCase()}-${9000 + i * 7}`,
  name: p[0],
  brand: p[1],
  category: p[3],
  price: p[2],
  stock: 8 + ((i * 17) % 90),
  orders: 20 + ((i * 29) % 160),
  rating: (3.4 + rng(i) * 1.6).toFixed(1),
  status: i % 4 === 1 ? 'Pending' : 'Published',
  published: fmtDate(daysAgo(6 + i * 9)),
}))

export const orders = Array.from({ length: 24 }, (_, i) => ({
  id: `ORD-${1050 - i}`,
  customer: name(i),
  email: email(i),
  date: fmtDate(daysAgo(i * 2)),
  amount: 79 + ((i * 53) % 620),
  payment: PAY[i % PAY.length],
  items: 1 + (i % 5),
  status: STATUS[i % STATUS.length],
}))

export const customers = Array.from({ length: 20 }, (_, i) => ({
  id: `CUS-${420 + i}`,
  name: name(i * 2),
  email: email(i * 2),
  orders: 2 + ((i * 7) % 40),
  spent: 240 + ((i * 137) % 4200),
  location: ['United States', 'United Kingdom', 'Australia', 'Germany', 'Canada', 'France'][i % 6],
  status: i % 6 === 0 ? 'Inactive' : 'Active',
  joined: fmtDate(daysAgo(30 + i * 15)),
}))

export const salesByMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => ({
  month: m,
  revenue: 18 + Math.round(rng(i) * 26 + i * 1.6),
  orders: 12 + Math.round(rng(i + 9) * 18 + i),
}))

export const trafficChannels = [
  { label: 'Direct', value: 42 },
  { label: 'Organic Search', value: 31 },
  { label: 'Referral', value: 15 },
  { label: 'Social', value: 8 },
  { label: 'Email', value: 4 },
]

export const revenueByLocation = [
  { label: 'United States', value: 48600 },
  { label: 'United Kingdom', value: 26400 },
  { label: 'Australia', value: 18900 },
  { label: 'Germany', value: 14200 },
]

export const recentActivity = [
  { id: 1, title: 'New orders synced from storefront', description: '1,250 new customer orders were imported from the online store.', by: 'Olivia Green', time: '2h ago', color: 'primary' },
  { id: 2, title: 'Payment gateway updated', description: 'Settlement API upgraded to support faster payouts and stronger tokens.', by: 'James Parker', time: '5h ago', color: 'success' },
  { id: 3, title: 'Inventory levels auto-synced', description: 'All product quantities were updated from the latest warehouse data.', by: 'Sophia Lee', time: '8h ago', color: 'info' },
  { id: 4, title: 'New vendor accounts approved', description: 'Five new seller accounts were verified and added to the marketplace.', by: 'Liam Johnson', time: '1d ago', color: 'warning' },
  { id: 5, title: 'Refund requests reviewed', description: '27 refund claims were processed with zero pending disputes.', by: 'Ethan Miller', time: '1d ago', color: 'danger' },
]
