import React, { useContext } from "react";
import { iData } from "./TaskAdd";
import styled from "styled-components";
import { theme } from "../../../styles/theme.styles";
import { ThemeContext } from "../../../utils/context";

function DescriptionInput({ data }: { data: iData }) {
  return <div style={{ marginBottom: "2ch" }}>
    <h3 style={{ marginBottom: "0.3rem" }}>Description</h3>
    <Input
      id="desc"
      type="text"
      required={true}
      placeholder="Sell a million 99s"
      onBlur={(event) => {
        data.desc = event.target.value;
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
  box-sizing: border - box;
  padding: 0 0.5ch 0 0.5ch;
`;

export default DescriptionInput;