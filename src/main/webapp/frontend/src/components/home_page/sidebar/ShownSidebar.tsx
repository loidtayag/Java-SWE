import styled from "styled-components";
import React, { ReactNode } from "react";
import { navSpacing, Text, theme } from "../../../utils/helpers";

export default function ShownSidebar({
  setIsSidebar,
}: {
  setIsSidebar: () => void;
}) {
  return (
    <Flex>
      <Visual onclick={setIsSidebar}>
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
    onclick,
    children,
  }: {
    onclick: (event: any) => any;
    children: ReactNode;
  }) => ({ onClick: onclick, children: children })
)<{
  onclick: (event: any) => any;
  children: ReactNode;
}>`
  width: 2.4rem;
  border-style: none;
  cursor: pointer;
  background-color: inherit;
  margin-right: ${navSpacing};
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
