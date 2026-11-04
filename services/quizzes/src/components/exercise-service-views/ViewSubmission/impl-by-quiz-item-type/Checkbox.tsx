import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"

import withErrorBoundary from "@/shared-module/common/utils/withErrorBoundary"
import { tones } from "@/shared-module/components/styles/themes"

import type { QuizItemSubmissionComponentProps } from "."
import type { UserItemAnswerCheckbox } from "../../../../../types/quizTypes/answer"
import type { PublicSpecQuizItemCheckbox } from "../../../../../types/quizTypes/publicSpec"
import ParsedText from "../../../ParsedText"

interface StyledProps {
  checked: boolean
}

const Option = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 3px solid ${({ checked }) => (checked ? tones.toneAccent16 : tones.toneDanger10)};
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 5px;
`

const CheckBoxFeedback: React.FC<
  QuizItemSubmissionComponentProps<PublicSpecQuizItemCheckbox, UserItemAnswerCheckbox>
> = ({ public_quiz_item, user_quiz_item_answer, quiz_item_answer_feedback }) => {
  const checked = user_quiz_item_answer.checked

  return (
    <div>
      <div>
        {checked ? (
          <Option checked={checked}>
            <div
              className={css`
                flex: 0.3;
                margin: 0.5rem;
                display: flex;
                justify-content: flex-end;
              `}
            >
              <input
                type="checkbox"
                checked={checked}
                readOnly
                aria-label={public_quiz_item.title ?? undefined}
              />
            </div>
            <div
              className={css`
                flex: 10;
                margin: 0.5rem;
              `}
            >
              {public_quiz_item.title}
            </div>
          </Option>
        ) : (
          <Option checked={checked}>
            <div
              className={css`
                flex: 0.3;
                margin: 0.5rem;
                display: flex;
                justify-content: flex-end;
              `}
            >
              <input
                type="checkbox"
                checked={checked}
                readOnly
                aria-label={public_quiz_item.title ?? undefined}
              />
            </div>
            <div
              className={css`
                flex: 10;
                margin: 0.5rem;
              `}
            >
              {public_quiz_item.title}
            </div>
          </Option>
        )}
        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          `}
        >
          {quiz_item_answer_feedback?.quiz_item_option_feedbacks?.map((of) => (
            <ParsedText
              key={of.option_id}
              inline
              blockContainer
              parseLatex
              parseMarkdown
              text={of.option_feedback}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default withErrorBoundary(CheckBoxFeedback)
