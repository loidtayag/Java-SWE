import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme.styles";

function EnterOverlay({ setOverlay, children }: { setOverlay: (value: boolean) => void, children: ReactNode }) {
  return <Button onClick={() => {
    setOverlay(true);
  }}><P>{children}</P></Button>;
}

const Button =
  styled.button`color: #ffffff;
    background-color: ${theme.clickable};
    border: none;
    width: 18ch;
    height: 5ch;
    border-radius: 2.5ch;
    margin-right: 2ch;
    cursor: pointer;
    font-weight: ${theme.textWeight};
  `;


const P = styled.p`
  color: #ffffff;
`;

export default EnterOverlay;