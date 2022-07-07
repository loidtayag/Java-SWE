import React from "react";
import styled from "styled-components";

function Button({ desc }: { desc: String }) {
  return (
    <button>
      <Text>{desc}</Text>
    </button>
  );
}

interface Styling {
  bgColor: any;
}

export const StandaloneButton = styled.button<Styling>`
  width: 800px;
  height: 400px;
  background-color: ${(styling: Styling) => styling.bgColor};

  &:hover {
    background-color: blueviolet;

    & label {
      color: darkorange;
    }
  }
`;

export const NestableButton = styled(Button)<Styling>`
  width: 800px;
  height: 400px;
  background-color: ${(styling: Styling) => styling.bgColor};

  &:hover {
    background-color: blueviolet;

    & label {
      color: darkorange;
    }
  }
`;

export const Text = styled.label``;
