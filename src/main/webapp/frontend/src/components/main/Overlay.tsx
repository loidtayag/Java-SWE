import React, { ReactNode, useContext } from "react";
import { theme, ThemeContext } from "../../utils/helpers";
import styled from "styled-components";

function Overlay({
  setOverlay,
  children,
}: {
  setOverlay: (value: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Form>
      {children}
      <Exit setOverlay={setOverlay} />
    </Form>
  );
}

const Form = styled.form.attrs((onSubmit) => ({
  onSubmit: onSubmit,
}))<{ onSubmit: () => void }>`
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  justify-content: space-between;
  background-color: ${() => useContext(ThemeContext).background};
  border-radius: 0.7rem;
  // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  color: ${() => useContext(ThemeContext).headers};
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
  margin-bottom: 2ch;
  background-color: ${() => useContext(ThemeContext).background};
`;

function Exit({ setOverlay }: { setOverlay: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        setOverlay(false);
      }}
    >
      <img
        src="/exit.svg"
        alt="Exit overlay"
        style={{
          cursor: "pointer",
          width: theme.iconSize,
          filter: theme.grayImg,
        }}
      />
    </button>
  );
}

export function LabelOverlay({ children }: { children: string }) {
  return (
    <label
      style={{
        marginBottom: "0.3rem",
        color: useContext(ThemeContext).headers,
      }}
    >
      {children}
    </label>
  );
}

export function InputOverlay({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        height: "3.5rem",
        backgroundColor: theme.clickable,
        color: useContext(ThemeContext).headers,
        border: "none",
        borderRadius: ".7rem",
        fontSize: theme.sizeText,
        fontWeight: theme.weightText,
        cursor: "pointer",
      }}
    />
  );
}

export default Overlay;
