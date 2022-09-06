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
  margin-left: 3px;
`;

const Visual = styled.img.attrs(() => ({
  alt: "Logo",
  src: "/cat.jpg",
}))`
  margin-right: ${spacing};
  width: 6rem;
  border-radius: 0.7rem;
`;

const Text = styled.h1`
  font-size: 3.7rem;
`;
