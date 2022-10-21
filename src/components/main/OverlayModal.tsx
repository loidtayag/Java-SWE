import React, { ReactNode, useContext } from "react";
import { textTheme, theme } from "../../styles/theme.styles";
import styled from "styled-components";
import { ThemeContext } from "../../utils/context";

function OverlayModal({
                        onSubmit,
                        children
                      }: {
  setOverlay: (value: boolean) => void;
  onSubmit: () => void;
  children: ReactNode;
}) {
  return <FormModal onSubmit={onSubmit}>{children}</FormModal>;
}

const FormModal = styled.form.attrs(
  ({ onSubmit }: { onSubmit: () => void }) => ({
    onSubmit: onSubmit,
    id: "dfs"
  })
)`
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  justify-content: space-between;
  background-color: ${() => useContext(ThemeContext)?.background};
  border-radius: 0.7rem;
  width: 30vw;
  color: ${() => useContext(ThemeContext)?.headers};
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
  margin-bottom: 2ch;
  background-color: ${() => useContext(ThemeContext)?.form};
  z-index: 1;
  // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export function ExitModal({
                            setOverlay
                          }: {
  setOverlay: (value: boolean) => void;
}) {
  return (
    <Button
      type="button"
      onClick={() => {
        setOverlay(false);
      }}
    >
      <Img src="/exit.svg" alt="Exit overlay" />
    </Button>
  );
}

export function ExitModalSubmit() {
  return (
    <Button type="submit">
      <Img src="/exit.svg" alt="Exit overlay" />
    </Button>
  );
}

export const Button = styled.button`
  cursor: pointer;
  width: ${theme.iconSize};
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: none;
  background-color: inherit;
`;

export const Img = styled.img`
  filter: ${theme.iconColor};
  width: ${theme.iconSize};
`;

export const LabelModal = styled.label`
  margin-bottom: 0.3rem;
  ${textTheme};
  color: ${() => useContext(ThemeContext)?.headers};
`;

export const InputModal = styled.input<{
  type: string;
}>`
  height: ${({ type }: { type: string }) => (type === "submit" ? "3.5rem" : "2.7rem")};
  background-color: ${({ type }: { type: string }) =>
          type === "submit" ? theme.clickable : "inherit"};
  border: ${({ type }: { type: string }) =>
          type === "submit" ? "none" : "0.1rem solid " + theme.textColor};
  border-radius: 0.7rem;
  cursor: ${({ type }: { type: string }) => (type === "submit" ? "pointer" : "")};
  margin-bottom: ${({ type }: { type: string }) => (type === "submit" ? "" : "2ch")};
  ${textTheme};
  color: ${({ type }: { type: string }) =>
          type === "submit"
                  ? () => useContext(ThemeContext)?.headers
                  : theme.iconColor};
  padding: ${({ type }: { type: string }) => (type === "submit" ? "" : "0 0.5ch 0 0.5ch")};
  min-width: 100%;
`;

export default OverlayModal;
