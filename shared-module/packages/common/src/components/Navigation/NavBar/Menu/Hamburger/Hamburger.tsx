"use client"

import { tones } from "@/shared-module/components/styles/themes"

import { HamburgerSpring } from "./HamburgerSpring"

interface HamburgerProps {
  isActive: boolean
  barColor?: string
  buttonWidth?: number
}

const Hamburger: React.FC<HamburgerProps> = ({
  isActive,
  barColor = tones.bgNeutral88,
  buttonWidth = 30,
}) => {
  return <HamburgerSpring barColor={barColor} buttonWidth={buttonWidth} isActive={isActive} />
}

export default Hamburger
