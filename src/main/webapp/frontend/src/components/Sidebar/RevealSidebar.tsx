import React from "react";
import styled from "styled-components";

export default function RevealSidebar({ onClick }: { onClick: () => void }) {
  return (
    <Visual className="foo" onclick={onClick}>
      <Embed className="foo" />
    </Visual>
  );
}

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
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  background-color: #21212d;
  border-style: none;
`;

const Embed = styled(({ className }: { className: string }) => (
  <img className={className} alt="Reveal sidebar button" src="/Show.svg" />
))`
  width: 3rem;
  height: auto;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
