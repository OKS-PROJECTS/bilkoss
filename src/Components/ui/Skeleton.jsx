import { Skeleton as OksSkeleton } from 'oks-ui'

/**
 * Thin pass-through to oks-ui <Skeleton>. Kept as a local wrapper so call sites
 * (`<Skeleton className="h-3.5" />`) and the `SkeletonText` helper stay stable.
 */
export default function Skeleton({ className, rounded, ...rest }) {
  return <OksSkeleton className={className} radius={rounded === 'rounded-full' ? 'full' : undefined} {...rest} />
}

export function SkeletonText({ lines = 3, className }) {
  return <OksSkeleton variant="text" lines={lines} className={className} />
}
