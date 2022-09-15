import styled from "styled-components";
import React, { ReactNode } from "react";
import { Text, theme } from "../../utils/helpers";

export default function ToggleSidebar({
  setShowSidebar,
}: {
  setShowSidebar: () => void;
}) {
  return (
    <Flex>
      <Visual onClick={setShowSidebar}>
        <Embed />
      </Visual>
      <Textual>Hide sidebar</Textual>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1ch;
`;

const Visual = styled.button.attrs(
  ({
    onClick: onClick,
    children,
  }: {
    onClick: () => void;
    children: ReactNode;
  }) => ({ onClick: onClick, children: children })
)<{
  onClick: () => void;
  children: ReactNode;
}>`
  width: 2.4rem;
  border-style: none;
  cursor: pointer;
  background-color: inherit;
  margin-right: 2ch;
  padding-left: 0.3rem;
  margin-top: 1ch;
`;

const Embed = styled.img.attrs(() => ({
  alt: "Hide sidebar",
  src: "/hide.svg",
}))`
  filter: ${theme.grayImg};
`;

const Textual = styled(Text)`
  color: ${theme.grayText};
`;
