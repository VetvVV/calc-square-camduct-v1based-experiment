import type { ReactNode } from 'react'

interface SplitLayoutProps {
  left: ReactNode
  right: ReactNode
}

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.65fr_0.95fr] xl:items-start">
      <div className="min-w-0 space-y-4">{left}</div>
      <div className="min-w-0 space-y-4 xl:sticky xl:top-4">{right}</div>
    </div>
  )
}
