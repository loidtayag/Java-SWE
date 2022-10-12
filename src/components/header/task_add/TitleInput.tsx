import React, { useContext } from "react";
import { iData } from "./TaskAdd";
import styled from "styled-components";
import { theme, ThemeContext } from "../../../styles/theme.styles";
import { getSelectedBoard } from "../../../utils/helpers";

function TitleInput({ data }: { data: iData }) {
  return <div style={{ marginBottom: "2ch" }}>
    <h3
      style={{ marginBottom: "0.3rem" }}>
      Title
    </h3>
    <Input
      id="title"
      type="text"
      required={true}
      placeholder="Plan A to becoming a millionaire"
      onBlur={(event) => {
        handleTitle(event, data);
      }} />
  </div>;
}

const Input = styled.input`
  height: 2.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  color: ${theme.textColor};
  border: ${"0.1rem solid " + theme.textColor};
  border-radius: 0.7rem;
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5ch 0 0.5ch;
`;

const handleTitle = (
  input: React.FocusEvent<HTMLInputElement>,
  info: iData
) => {
  let isDuplicate = false;

  getSelectedBoard().status.forEach((status) => {
    status.tasks.forEach((task) => {
      if (task.title === input.target.value) {
        input.target.value = "";
        input.target.placeholder = "Task name taken";
      }
    });
  });

  if (input.currentTarget.value.length > 25) {
    input.currentTarget.placeholder =
      "Task name mustn't be greater than 25 characters";
    input.currentTarget.value = "";
  } else if (!isDuplicate) {
    info.title = input.target.value;
  }
};

export default TitleInput;