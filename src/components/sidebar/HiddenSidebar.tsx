import React, { useContext } from "react";
import styled from "styled-components";
import { theme, ThemeContext } from "../../styles/theme.styles";

export default function HiddenSidebar({onClick}: {onClick: () => void}) {

  return (
    <Visual onClick={onClick}>
      <Embed alt= "Reveal sidebar" src="/show.svg"/>
    </Visual>
  );
}

const Visual = styled.button`
  position: fixed;
  bottom: 1.3ch;
  left: 3.5ch;
  cursor: pointer;
  border-style: none;
  isolation: isolate;
  background-color: ${() => useContext(ThemeContext)?.foreground};
  z-index: 1;
`;

const Embed = styled.img`
  width: 3.5rem;
  filter: ${theme.iconColor};
`;
