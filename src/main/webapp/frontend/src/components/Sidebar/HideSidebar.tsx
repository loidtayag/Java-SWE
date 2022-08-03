import styled from "styled-components";
import React from "react";

export default function HideSidebar({ onClick }: { onClick: () => void }) {
  return (
    <Flex>
      <Visual className="foo" onclick={onClick}>
        <Embed className="foo" />
      </Visual>
      <Textual className="foo" />
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Visual = styled(
  ({
    className,
    onclick,
    children,
  }: {
    className: string;
    onclick: (event: any) => any;
    children: React.ReactNode;
  }) => (
    <button className={className} onClick={onclick}>
      {children}
    </button>
  )
)`
  width: 3rem;
  height: 3rem;
  border-style: none;
  cursor: pointer;
  background-color: #2c2c38;
`;

const Embed = styled(({ className }: { className: string }) => (
  <img className={className} alt="Hide sidebar button" src="/Hide.svg" />
))`
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;

const Textual = styled(({ className }: { className: string }) => (
  <p className={className}>Hide sidebar</p>
))`
  font-size: 1rem;
`;
