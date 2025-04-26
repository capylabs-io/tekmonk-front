"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

type AnimationType = "fade-up" | "slide-right" | "slide-left" | "scale-up" | "stagger-fade"

interface ScrollAnimateInProps {
  children: ReactNode
  animation: AnimationType
  className?: string
  threshold?: number | "some" | "all" // Can be a number between 0-1 or "some"/"all"
  once?: boolean
  delay?: number
}

// Animation variants
const animations = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "stagger-fade": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export function ScrollAnimateIn({
  children,
  animation,
  className = "",
  threshold = 0.1,
  once = false,
  delay = 0,
}: ScrollAnimateInProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const [initialized, setInitialized] = useState(false)

  // Set to hidden on first mount and then animate when in view
  useEffect(() => {
    if (!initialized) {
      controls.set("hidden")
      setInitialized(true)
    }
  }, [controls, initialized])

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Handle staggered children
  const staggerChildren = animation === "stagger-fade" ? 0.1 : 0

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: staggerChildren,
        delay: delay,
      }}
      className={className}
    >
      {animation === "stagger-fade" ? (
        <div className={className}>
          {Array.isArray(children)
            ? children.map((child, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="stagger-child"
              >
                {child}
              </motion.div>
            ))
            : children}
        </div>
      ) : (
        children
      )}
    </motion.div>
  )
}

