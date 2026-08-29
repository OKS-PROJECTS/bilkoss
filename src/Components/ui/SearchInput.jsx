import { TextField } from 'oks-ui'
import { Search } from 'lucide-react'

export default function SearchInput({ value, onChange, placeholder = 'Search…', className, size = 'sm' }) {
  return (
    <TextField
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={size}
      variant="bordered"
      startIcon={<Search size={15} />}
      className={className}
      aria-label={placeholder}
    />
  )
}
