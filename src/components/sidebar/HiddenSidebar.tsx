import React, { useContext } from "react";
import styled from "styled-components";
import { theme, ThemeContext } from "../../utils/helpers";

export default function HiddenSidebar({
  setIsSidebar,
}: {
  setIsSidebar: () => void;
}) {
  return (
    <Visual onclick={setIsSidebar}>
      <Embed />
    </Visual>
  );
}

const Visual = styled.button.attrs(({ onclick }: { onclick: () => void }) => ({
  onClick: onclick,
}))<{ onclick: () => void }>`
  position: fixed;
  bottom: 1.3ch;
  left: 3ch;
  cursor: pointer;
  border-style: none;
  background-color: ${() => useContext(ThemeContext)?.foreground};
  isolation: isolate;
`;

const Embed = styled.img.attrs(() => ({
  alt: "Reveal sidebar",
  src: "/show.svg",
}))`
  width: 3.5rem;
  filter: ${theme.grayImg};
`;
