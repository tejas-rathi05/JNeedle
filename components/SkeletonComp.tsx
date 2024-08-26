import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkeletonComp = () => {
  return (
    <>
      <Skeleton className="w-80 h-80" />
      <Skeleton className="w-80 h-80" />
      <Skeleton className="w-80 h-80" />
      <Skeleton className="w-80 h-80" />
    </>
  )
}

export default SkeletonComp