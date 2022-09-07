import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { theme, ThemeContext } from "../../../utils/helpers";

interface iProps {
  toggleTheme: () => void;
}

export default function DayOrNight(props: iProps) {
  return (
    <Flex>
      <Moon />
      {/* Since Toggle has children with position absolute, Toggle's width is 0px if this is left out */}
      <div>
        <Toggle
          onClick={() => {
            setTimeout(() => {
              props.toggleTheme();
            }, 750);
          }}
        >
          <Input type="checkbox" toggleTheme={props.toggleTheme} />
          <Outer />
          <Inner />
        </Toggle>
      </div>
      <Sun />
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${() => useContext(ThemeContext).foreground};
  margin-bottom: 1ch;
  width: 13.5rem;
  height: 3.6rem;
  border-radius: 0.4rem;
`;

const Sun = styled.img.attrs(() => ({
  alt: "Light mode",
  src: "/sun.svg",
}))`
  width: 3.7rem;
  filter: ${theme.grayImg};
`;

const Toggle = styled.div`
  position: relative;
  /* Since Toggle has children with position absolute, Toggle's width is 0px if this is left out */
  width: 4rem;
  /* Also don't take this out, otherwise height is 0 and the position looks weird for the children */
  height: 2rem;
`;

const Outer = styled.div`
  background-color: ${theme.clickable};
  width: 4rem;
  height: 2rem;
  border-radius: 1rem;
  position: absolute;
`;

const Inner = styled.div`
  background-color: #ffffff;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  position: absolute;
  top: 0.16rem;
  left: 0.2rem;
`;

const Input = styled.input.attrs(() => ({
  defaultChecked: useContext(ThemeContext).headers === "#000000",
}))<iProps>`
  position: absolute;
  width: 4rem;
  height: 2rem;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  /* Checked means circle is on right side */
  &:checked ~ ${Inner} {
    ${() =>
      useContext(ThemeContext).foreground === "#000000"
        ? css`
            transform: translate(-2.1rem, 0);
            transition: transform 0.8s;
          `
        : css`
            transform: translate(2.1rem, 0);
            transition: transform 0.8s;
          `}
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
  width: 4rem;
  filter: ${theme.grayImg};
`;
