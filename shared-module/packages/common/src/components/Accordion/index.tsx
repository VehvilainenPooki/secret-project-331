"use client"

import { keyframes } from "@emotion/css"
import styled from "@emotion/styled"
import React, { useContext } from "react"

import { secondaryFont } from "../../styles"
import { respondToOrLarger } from "../../styles/respond"
import { AccordionContext } from "./accordionContext"
import { tones } from "@/shared-module/components/styles/themes"

const openAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`
const slideDown = keyframes`
  from { opacity: 0; height: 0; padding: 0; }
  to { opacity: 1; height: 100%; padding: 10px; }
`

const TextWrapper = styled.div`
  padding: 0;
  margin: 0;
  font-family: ${secondaryFont};

  details {
    border: 1px solid var(--tone-border-neutral-42);
    transition: all 0.3s ease-in-out;
  }

  details[open] summary ~ * {
    animation: ${openAnimation} 0.3s ease-in-out;
    color: ${tones.toneNeutral46};
  }

  details[open] > div {
    animation-name: ${slideDown};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    padding: 1rem 1rem 1rem 2rem;
  }

  details summary {
    padding: 1rem;
    position: relative;
    cursor: pointer;
    font-weight: medium;
    list-style: none;
    color: ${tones.toneNeutral46};
    outline: 0;
    background: ${tones.toneNeutral12};
    ${respondToOrLarger.sm} {
      padding: 1rem 1rem 1rem 2rem;
    }
  }

  details summary::-webkit-details-marker {
    display: none;
  }

  details[open] > summary {
    color: ${tones.toneNeutral46};
  }

  details summary:after {
    content: "+";
    position: absolute;
    font-size: 2.4rem;
    color: ${tones.toneNeutral46};
    line-height: 0;
    margin-top: 0.75rem;
    top: 14px;
    right: 4%;
    font-weight: 200;
    transform-origin: center;
    transition: all 200ms linear;
  }
  details[open] summary:after {
    transform: rotate(45deg);
    font-size: 2.4rem;
  }
  details[open] summary {
    font-weight: 600;
    opacity: 0.9;
  }

  ul {
    padding: 14px;
    margin: 0;

    ${respondToOrLarger.sm} {
      background: var(--tone-bg-neutral-17);
      padding: 25px 35px 30px 35px;
    }
  }

  ul li {
    font-size: 1.1rem;
    margin: 0 0 0.2rem;
    line-height: 1.7;
    list-style: none;
  }
`

export type AccordionProps = React.DetailsHTMLAttributes<HTMLDetailsElement>

/**
 * Accordion component that wraps HTML details/summary elements with styling and animations.
 * AccordionContext can be used to expand/collapse all accordions in a subtree.
 *
 * @example
 * <Accordion>
 *   <details>
 *     <summary>Title</summary>
 *     Content goes here
 *   </details>
 * </Accordion>
 */
const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = ({ className, children }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const context = useContext(AccordionContext)

  React.useEffect(() => {
    if (wrapperRef.current && context) {
      const details = wrapperRef.current.querySelector("details")
      if (details) {
        context.registerAccordion(details)
        return () => {
          context.unregisterAccordion(details)
        }
      }
    }
    return undefined
  }, [context])

  return (
    <TextWrapper ref={wrapperRef} className={className}>
      {children}
    </TextWrapper>
  )
}

export default Accordion
