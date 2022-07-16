import styled from "styled-components";
import Button from "./Button";

interface Styling {
  bgColor: any;
}

export const StandaloneButton = styled.button<Styling>`
  width: 400px;
  height: 200px;
  background-color: ${(styling: Styling) => styling.bgColor};

  &:hover {
    background-color: blueviolet;

    & label {
      color: darkorange;
    }
  }
`;

export const NestableButton = styled(Button)<Styling>`
  width: 400px;
  height: 200px;
  background-color: ${(styling: Styling) => styling.bgColor};

  &:hover {
    background-color: blueviolet;

    & label {
      color: darkorange;
    }
  }
`;

export const Text = styled.label``;
