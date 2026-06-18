"use client"

import { motion } from "framer-motion"

type Tag = "div" | "p" | "section" | "article" | "span" | "h1" | "h2" | "h3"

type CustomVariants = {
  visible: (i: number) => Record<string, unknown>
  hidden: Record<string, unknown>
}

interface TimelineContentProps {
  as?: Tag
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants?: CustomVariants
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const MOTION_MAP = {
  div: motion.div,
  p: motion.p,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const

const EASE = [0.16, 1, 0.3, 1]

const DEFAULT_HIDDEN = { opacity: 0, y: -16, filter: "blur(8px)" }
const makeDefaultVisible = (i: number) => ({
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  transition: { delay: i * 0.12, duration: 0.5, ease: EASE },
})

export function TimelineContent({
  as = "div",
  animationNum = 0,
  customVariants,
  className,
  style,
  children,
}: TimelineContentProps) {
  const MotionTag = MOTION_MAP[as]
  const variants = {
    hidden: customVariants?.hidden ?? DEFAULT_HIDDEN,
    visible: customVariants?.visible ?? makeDefaultVisible,
  }

  return (
    <MotionTag
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants as never}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  )
}
