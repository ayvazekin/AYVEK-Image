"use client"

import { Suspense } from "react"
import PlaygroundInner from "./playground-inner"

export default function PlaygroundPage() {
  return (
    <Suspense fallback={null}>
      <PlaygroundInner />
    </Suspense>
  )
}
