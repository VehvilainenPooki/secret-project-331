"use client"

import { css } from "@emotion/css"
import { useAtom, useSetAtom } from "jotai"
import React, { useEffect, useRef } from "react"
import { useButton } from "react-aria"
import { useTranslation } from "react-i18next"

import type { ParagraphAttributes } from "@/../types/GutenbergBlockAttributes"
import { omitUndefined } from "@/shared-module/common/utils/nullability"
import {
  blockEditsAtom,
  currentlyOpenFeedbackDialogAtom,
  selectedBlockIdAtom,
} from "@/stores/course-material/materialFeedbackStore"

import { getEditableHoverStyles, getParagraphStyles } from "../styles"
import EditableParagraph from "./EditableParagraph"
import { useParagraphEditing } from "./hooks/useParagraphEditing"
import PreviewableParagraph from "./PreviewableParagraph"
import { tones } from "@/shared-module/components/styles/themes"

const editButtonStyles = css`
  display: inline-block;
  margin-left: 0.5rem;
  vertical-align: baseline;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background-color: ${tones.toneAccent23};
  color: ${tones.toneNeutral1};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${tones.toneAccent23};
  }

  &:focus {
    outline: 2px solid ${tones.toneAccent21};
    outline-offset: 2px;
  }
`

interface EditingParagraphProps {
  data: {
    attributes: ParagraphAttributes & {
      backgroundColor?: string
      textColor?: string
    }
  }
  id: string
}

const EditingParagraph: React.FC<React.PropsWithChildren<EditingParagraphProps>> = ({
  data,
  id,
}) => {
  const { t } = useTranslation()
  const { textColor, backgroundColor, fontSize, content, dropCap, align } = data.attributes

  const [type] = useAtom(currentlyOpenFeedbackDialogAtom)
  const [selectedBlockId, setSelectedBlockId] = useAtom(selectedBlockIdAtom)
  const setEdits = useSetAtom(blockEditsAtom)
  const editButtonRef = useRef<HTMLButtonElement>(null)
  const wasEditingRef = useRef(false)

  // Get the edited content even when not actively editing this paragraph
  const { editedContent } = useParagraphEditing({
    id,
    editing: true, // editing is always true in this component
    selectedBlockId,
    content: content ?? null,
    setEdits,
    isEditingEnabled: type === "proposed-edits",
  })

  const hasChanges = (content ?? null) !== editedContent

  const handleEditClick = () => {
    setSelectedBlockId(id)
  }

  const { buttonProps: editButtonProps } = useButton(
    {
      onPress: handleEditClick,
    },
    editButtonRef,
  )

  useEffect(() => {
    const isCurrentlyEditing = selectedBlockId === id
    // Only when editing closed: on a switch, focusing here would steal it from the newly opened paragraph.
    if (wasEditingRef.current && selectedBlockId === null && editButtonRef.current) {
      requestAnimationFrame(() => {
        editButtonRef.current?.focus()
      })
    }
    wasEditingRef.current = isCurrentlyEditing
  }, [selectedBlockId, id])

  if (selectedBlockId === id) {
    return (
      <EditableParagraph
        id={id}
        content={content ?? null}
        textColor={textColor ?? undefined}
        backgroundColor={backgroundColor ?? undefined}
        fontSize={fontSize ?? undefined}
        setEdits={setEdits}
      />
    )
  } else if (hasChanges) {
    // Only show the PreviewableParagraph with diff if there are actual changes
    return (
      <div
        className={css`
          margin: 1.25rem 0;
          padding: 0.25rem;
          border-radius: 3px;
          transition:
            background-color 0.2s ease,
            box-shadow 0.2s ease;

          &:has(p:hover),
          &:has(.edit-button:hover) {
            background-color: var(--tone-bg-accent-1);
            box-shadow: 0 0 0 2px var(--tone-shadow-accent-1);
          }

          p {
            display: inline;
            margin: 0;

            &:hover {
              background-color: transparent;
              box-shadow: none;
            }
          }
        `}
      >
        <PreviewableParagraph
          id={id}
          content={content ?? null}
          {...omitUndefined({
            textColor: textColor ?? undefined,
            backgroundColor: backgroundColor ?? undefined,
            fontSize: fontSize ?? undefined,
            align: align ?? undefined,
          })}
          setEdits={setEdits}
          editedContent={editedContent}
        />
        <button
          ref={editButtonRef}
          {...editButtonProps}
          className={`edit-button ${editButtonStyles}`}
        >
          {t("edit")}
        </button>
      </div>
    )
  }
  // No changes, render the regular paragraph with edit button
  return (
    <div
      className={css`
        margin: 1.25rem 0;
        padding: 0.25rem;
        border-radius: 3px;
        transition:
          background-color 0.2s ease,
          box-shadow 0.2s ease;

        &:has(> div:hover),
        &:has(.edit-button:hover) {
          background-color: var(--tone-bg-accent-1);
          box-shadow: 0 0 0 2px var(--tone-shadow-accent-1);
        }
      `}
    >
      <div
        className={`${getParagraphStyles(
          textColor,
          backgroundColor,
          fontSize,
          true,
          dropCap,
          align,
        )} ${getEditableHoverStyles(false)} ${css`
          display: inline;
          margin: 0;

          &:hover {
            background-color: transparent;
            box-shadow: none;
          }
        `}`}
      >
        {content}
      </div>
      <button
        ref={editButtonRef}
        {...editButtonProps}
        className={`edit-button ${editButtonStyles}`}
      >
        {t("edit")}
      </button>
    </div>
  )
}

export default EditingParagraph
