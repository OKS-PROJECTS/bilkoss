import clsx from 'clsx'

export default function Skeleton({ className, rounded = 'rounded' }) {
  return (
    <div
      className={clsx('animate-pulse', rounded, className)}
      style={{ background: 'var(--app-surface-2)' }}
    />
  )
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-3" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  )
}
