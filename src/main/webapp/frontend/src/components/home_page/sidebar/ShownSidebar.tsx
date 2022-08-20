import styled from "styled-components";
import React, { ReactNode } from "react";

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
  width: 1.6rem;
  height: 1.6rem;
  border-style: none;
  cursor: pointer;
  background-color: #2c2c38;
`;

const Embed = styled.img.attrs(() => ({
  alt: "Hide sidebar",
  src: "/hide.svg",
}))`
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;

const Textual = styled(({ children }: { children: ReactNode }) => (
  <p>{children}</p>
))`
  font-size: 1rem;
`;
