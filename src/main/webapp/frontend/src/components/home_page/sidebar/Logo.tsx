import styled from "styled-components";
import { spacing, ThemeContext } from "../../../utils/helpers";
import { useContext } from "react";

export default function Logo() {
  return (
    <Flex>
      <Visual />
      <Text>Kanban</Text>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  color: ${() => useContext(ThemeContext).headers};
`;

const Visual = styled.img.attrs(() => ({
  alt: "Logo",
  src: "/logo.svg",
}))`
  margin-right: ${spacing};
  width: 3vw;
`;

const Text = styled.h1`
  font-size: 3.7rem;
`;
