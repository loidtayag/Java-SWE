import React from "react";
import styled from "styled-components";

export default function HiddenSidebar({
  setIsSidebar,
}: {
  setIsSidebar: () => void;
}) {
  return (
    <Visual onclick={setIsSidebar}>
      <Embed />
    </Visual>
  );
}

const Visual = styled.button.attrs(({ onclick }: { onclick: () => void }) => ({
  onClick: onclick,
}))<{ onclick: () => void }>`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  background-color: #21212d;
  border-style: none;
`;

const Embed = styled.img.attrs(() => ({
  alt: "Reveal sidebar",
  src: "/show.svg",
}))`
  height: 2.5rem;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
