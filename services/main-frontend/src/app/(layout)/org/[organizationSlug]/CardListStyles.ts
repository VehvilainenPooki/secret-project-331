import styled from "@emotion/styled"

import { tones } from "@/shared-module/components/styles/themes"

export const CardList = styled.ul`
  margin: 1rem 0;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 8px;
`
export const CardListItem = styled.li`
  margin: 0.5rem 0;
  padding: 1.5rem;
  background-color: ${tones.toneNeutral1};
  border: 1px solid ${tones.toneNeutral26};
  border-radius: 6px;
`
