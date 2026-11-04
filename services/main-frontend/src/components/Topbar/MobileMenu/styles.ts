"use client"

import { css } from "@emotion/css"

export const menuItemClass = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  margin: 4px 16px 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--tone-fg-neutral-40);
  text-decoration: none;
  border-radius: 12px;
  transition: all 150ms ease;
  cursor: pointer;
  background: var(--tone-bg-neutral-16);
  border: 1px solid var(--tone-border-neutral-13);
  width: calc(100% - 32px);
  text-align: left;
  box-shadow: 0 1px 2px var(--tone-shadow-neutral-5);

  &:hover,
  &:focus {
    background: var(--tone-bg-neutral-35);
    border-color: var(--tone-border-neutral-35);
    box-shadow: 0 2px 4px var(--tone-shadow-neutral-8);
    transform: translateY(-1px);
    outline: none;
  }

  &:active {
    background: var(--tone-bg-neutral-56);
    border-color: var(--tone-border-neutral-51);
    box-shadow: 0 1px 2px var(--tone-shadow-neutral-13);
    transform: translateY(0);
  }

  &[data-focus-visible] {
    outline: 2px solid var(--tone-border-neutral-61);
    outline-offset: 2px;
  }

  &[data-destructive="true"] {
    color: var(--tone-fg-danger-4);
    font-weight: 600;
    background: var(--tone-bg-neutral-30);
    border-color: var(--tone-border-danger-2);

    &:hover,
    &:focus {
      background: var(--tone-bg-danger-5);
      border-color: var(--tone-border-danger-4);
    }

    &:active {
      background: var(--tone-bg-danger-9);
      border-color: var(--tone-border-danger-6);
    }
  }
`

export const separatorClass = css`
  height: 1px;
  background: var(--tone-bg-neutral-56);
  margin: 8px 0;
  border: none;
`

export const iconClass = css`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`
