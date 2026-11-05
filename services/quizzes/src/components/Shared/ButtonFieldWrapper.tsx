import styled from "@emotion/styled"

export const ButtonFieldWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-around;
  width: 100%;

  .MuiButton-label {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .button-accept {
    background-color: var(--tone-bg-accent-11);
    color: var(--color-text-on-accent);
    :hover {
      background-color: var(--tone-bg-accent-11);
      opacity: 0.6;
      color: var(--tone-fg-neutral-44);
    }
  }

  .button-reject {
    background-color: var(--tone-bg-danger-12);
    color: var(--color-text-on-accent);

    :hover {
      background-color: var(--tone-bg-danger-12);
      opacity: 0.6;
      color: var(--tone-fg-neutral-44);
    }
  }
  .button-plagiarism {
    background-color: var(--tone-bg-warning-9);
    color: var(--color-text-on-accent);

    :hover {
      background-color: var(--tone-bg-warning-9);
      opacity: 0.6;
      color: var(--tone-fg-neutral-44);
    }
  }
`
