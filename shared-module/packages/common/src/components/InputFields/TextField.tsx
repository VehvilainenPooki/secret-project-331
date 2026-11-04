"use client"

import { css, cx } from "@emotion/css"
import styled from "@emotion/styled"
import type { InputHTMLAttributes } from "react"
import React, { forwardRef } from "react"
import type { FieldError } from "react-hook-form"

import { tones } from "@/shared-module/components/styles/themes"

import { primaryFont } from "../../styles/typography"
import { errorToDescription } from "../../utils/strings"

const ERRORCOLOR = tones.toneDanger17
// gray[400] keeps border contrast >= 3:1 against the field background (WCAG 1.4.11).
const DEFAULTCOLOR = tones.toneNeutral39

interface InputExtraProps {
  error?: string | undefined
  disabled?: boolean | undefined
  colorField?: boolean | undefined
}

const NO_COLOR_FIELD_PADDING = "padding: 8px 10px 10px 10px;"

const Input = styled.input<InputExtraProps>`
  background: var(--tone-bg-neutral-11);
  border-width: 2px;
  border-style: solid;
  border-radius: 3px;
  border-color: ${({ error }) => (error ? ERRORCOLOR : DEFAULTCOLOR)};
  ${({ colorField }) => !colorField && NO_COLOR_FIELD_PADDING}
  transition:
    ease-in-out,
    width 0.35s ease-in-out;
  outline: none;
  min-width: 20px;
  width: 100%;
  display: block;
  font-size: 16px;

  ${({ disabled }) => disabled && `cursor: not-allowed;`}

  &:focus,
  &:active {
    border-color: var(--tone-border-info-9);
    box-shadow: 0 0 0 2px var(--tone-shadow-info-16);
  }

  @media (max-width: 767.98px) {
    padding: 6px 8px;
  }
`

const errorClass = css`
  color: ${tones.toneDanger17};
  font-size: 14px;
  display: inline-block;
`

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "email" | "password" | "text" | "number" | "color"
  label?: string
  labelStyle?: string
  hint?: string
  error?: string | FieldError
  onChangeByValue?: (value: string, name?: string) => void
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ onChange, onChangeByValue, className, disabled, error, ...rest }: TextFieldProps, ref) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeByValue) {
        const {
          target: { value },
        } = event
        onChangeByValue(value)
      }
      if (onChange) {
        onChange(event)
      }
    }

    return (
      <div
        className={cx(
          css`
            margin-bottom: 1rem;
            ${
              disabled &&
              `cursor: not-allowed;
            filter: opacity(0.5);`
            }
          `,
          className,
        )}
      >
        <label
          className={cx(
            css`
              color: var(--tone-fg-neutral-36);
              font-family: ${primaryFont};
              font-weight: 500;
              font-size: 14px;
              display: block;
              margin-bottom: 2px;
              ${disabled && `color: ${tones.toneNeutral39};`}
              ${disabled && `cursor: not-allowed;`}
            `,
            rest.labelStyle,
          )}
        >
          {rest.label && (
            <>
              {rest.label} {rest.required === true && ` *`}
            </>
          )}
          <Input
            id={rest.id}
            name={rest.name}
            disabled={disabled}
            colorField={rest.type === "color"}
            aria-errormessage={`${rest.id ?? rest.label}_error`}
            aria-invalid={error !== undefined}
            onChange={handleOnChange}
            defaultValue={rest.defaultValue}
            error={errorToDescription(error) ?? undefined}
            ref={ref}
            {...rest}
          />
        </label>

        <span
          className={
            error
              ? cx(errorClass)
              : css`
                  visibility: hidden;
                `
          }
          id={`${rest.id ?? rest.label}_error`}
          role="alert"
        >
          {errorToDescription(error)}
        </span>
      </div>
    )
  },
)

TextField.displayName = "TextField"
export default TextField
