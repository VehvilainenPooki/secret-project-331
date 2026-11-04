"use client"

import { css } from "@emotion/css"
import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"

import ArrowSVGIcon from "../img/blackArrow.svg"
import { monospaceFont, primaryFont } from "../styles"
import { tones } from "@/shared-module/components/styles/themes"

const Wrapper = styled.div`
  border-radius: 10px;
  position: relative;
  width: 100%;
`

const PageNumberBox = styled.div`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${tones.toneInfo7};
  margin-right: 8px;

  span {
    color: ${tones.toneNeutral46};
    font-family: ${monospaceFont};
    line-height: 1;
    font-size: 12px !important;
    text-align: center;
    font-weight: 600;
  }
`

const ChapterParts = styled.div`
  margin-left: 0em;
  padding: 0.6em 1em;
  list-style-type: none;
  color: var(--tone-fg-neutral-41);
  text-decoration: none;
  border-radius: 2px;
  margin-bottom: 0.4em;
  background: var(--tone-bg-info-2);
  display: flex;
  align-items: center;

  ${({ selected }: PagesInChapterBoxExtraProps) =>
    selected &&
    `
    background-color: var(--tone-bg-neutral-68);
    font-weight: 500;

    :hover {
      background-color: var(--tone-bg-neutral-49) !important;
    }
  `}: hover {
    background-color: var(--tone-bg-neutral-49);
  }

  svg {
    position: absolute;
    right: 30px;
    top: 40%;
    fill: ${tones.toneNeutral37};
  }

  :hover svg {
    fill: ${tones.toneNeutral44};
  }

  span {
    font-family: ${primaryFont};
    font-weight: 400;
    vertical-align: top;
    font-size: clamp(16px, 1.2vw, 20px);
    display: inline-block;
    width: 80%;
    margin: 0.4em 0 0.4em 0.2em;
  }
`

export interface PagesInChapterBoxExtraProps {
  variant: "text" | "link" | "readOnly"
  selected: boolean
  chapterIndex: number
  chapterTitle: string
  url: string
}

export type PagesInChapterBoxProps = React.HTMLAttributes<HTMLDivElement> &
  PagesInChapterBoxExtraProps

const PagesInChapterBox: React.FC<React.PropsWithChildren<PagesInChapterBoxProps>> = (props) => {
  return (
    <Wrapper>
      <Link
        href={props.url}
        data-testid={`page-in-chapter-link-${props.chapterIndex}`}
        className={css`
          color: var(--tone-fg-accent-12);
          box-shadow: none;
          text-decoration: none;
          &:focus-visible {
            outline: 2px solid ${tones.toneAccent19};
            outline-offset: 2px;
          }

          &:focus-visible .chapter-parts {
            background-color: var(--tone-bg-neutral-49);
            box-shadow: 0 0 0 2px ${tones.toneAccent19};
          }

          :hover {
            .chapter-part-arrow {
              visibility: visible;
            }
          }
        `}
      >
        <ChapterParts {...props} className="chapter-parts">
          <PageNumberBox>
            <span>{props.chapterIndex}</span>
          </PageNumberBox>
          <span>{props.chapterTitle}</span>
          <ArrowSVGIcon className="page-link-arrow" role="presentation" alt="" width="15" />
        </ChapterParts>
      </Link>
    </Wrapper>
  )
}

export default PagesInChapterBox
