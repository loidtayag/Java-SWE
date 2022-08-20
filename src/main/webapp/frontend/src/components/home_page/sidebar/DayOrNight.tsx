import React from "react";
import styled from "styled-components";

export default function DayOrNight() {
  return (
    <Flex>
      <Sun />
      {/* Since Toggle has children with position absolute, Toggle's width is 0px if this is left out */}
      <div>
        <Toggle>
          <Input type="checkbox" />
          <Outer />
          <Inner />
        </Toggle>
      </div>
      <Moon />
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #21212d;
  width: 10rem;
`;

const Sun = styled.img.attrs(() => ({
  alt: "Light mode",
  src: "/sun.svg",
}))`
  width: 2.5rem;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;

const Toggle = styled.div`
  position: relative;
  margin-bottom: 1rem;
  /* Since Toggle has children with position absolute, Toggle's width is 0px if this is left out */
  width: 3rem;
  height: 0;
`;

const Outer = styled.div`
  background-color: #6361c7;
  width: 2.5em;
  height: 1rem;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
`;

const Inner = styled.div`
  background-color: #ffffff;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.75rem;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
`;

const Input = styled.input`
  position: absolute;
  width: 3rem;
  height: 1rem;
  opacity: 0;
  z-index: 1;
  cursor: pointer;

  &:checked ~ ${Inner} {
    transform: translate(1.49rem, 0);
    transition: transform 0.8s;
  }

  &:not(:checked) ~ ${Inner} {
    transform: translate(0, 0);
    transition: transform 0.8s;
  }
`;

const Moon = styled.img.attrs(() => ({
  alt: "Dark mode",
  src: "/moon.svg",
}))`
  height: 2.5rem;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
