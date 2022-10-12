import { iconTheme } from "../../../styles/theme.styles";
import React from "react";
import styled from "styled-components";
import { getStatuses } from "../../../utils/helpers";
import { iData } from "./TaskAdd";

function ExitOverlay({ setOverlay, setData }: { setOverlay: (value: boolean) => void, setData: (value: iData) => void }) {
  return (
    <Button
      type="button"
      onClick={() => {
        setOverlay(false);
        setData({
          title: "",
          desc: "",
          subtasks: [],
          status: getStatuses()[0]
        });
      }}
    >
      <Img
        src="/exit.svg"
        alt="Exit overlay"
      />
    </Button>);
}

export const Button = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-color: inherit;
  border: none;
`;

export const Img = styled.img`
  ${iconTheme};
  cursor: pointer;
`;

export default ExitOverlay;