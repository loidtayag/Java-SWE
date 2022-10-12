import React, { useContext } from "react";
import styled from "styled-components";
import { theme, ThemeContext } from "../../../styles/theme.styles";
import { iData } from "./TaskAdd";
import { getStatuses } from "../../../utils/helpers";

function StatusInput({ data }: { data: iData }) {
  return <div style={{ marginBottom: "2ch" }}>
    <h3 style={{ marginBottom: "0.3rem" }}>Status</h3>
    <Input
      id="status"
      onBlur={(event) => {
        data.status = event.target.value;
      }}>
      <Options />
    </Input>
  </div>;
}

const Input = styled.select`
  height: 2.7rem;
  background-color: ${() => useContext(ThemeContext)?.form};
  border: ${"0.1rem solid " + theme.textColor};
  border-radius: 0.7rem;
  cursor: pointer;
  color: ${theme.textColor};
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
`;

const Options = () => {
  let key = 0;
  return (
    <>
      {getStatuses().map((status: string) => (
        <option
          value={status}
          key={key++}
          style={{ fontWeight: theme.textWeight, color: theme.textColor }}
        >
          {status}
        </option>
      ))}
    </>
  );
};

export default StatusInput;