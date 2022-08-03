import React from "react";
import styled from "styled-components";

export default function DayOrNight() {
  return (
    <Flex>
      <Sun className="sun" />
      {/* Since Toggle has children with position absolute, Toggle's width is 0px if this is left out */}
      <div>
        <Toggle>
          <Input type="checkbox" />
          <Outer />
          <Inner />
        </Toggle>
      </div>
      <Moon className="moon" />
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #21212d;
  margin: 0.5rem 3rem;
`;

const Sun = styled(({ className }: { className: string }) => (
  <img alt="Sun" src="/Sun.svg" className={className} />
))`
  width: 3rem;
  height: 3rem;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;

export const Toggle = styled.div`
  position: relative;
  margin-bottom: 1rem;
  /* Since Toggle has children with position absolute, Toggle's width is 0px if this is left out */
  width: 3rem;
  height: 0;
`;

const Outer = styled.div`
  background-color: #6361c7;
  width: 3rem;
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
    transform: translate(1.875rem, 0);
    transition: transform 0.8s;
  }

  &:not(:checked) ~ ${Inner} {
    transform: translate(0, 0);
    transition: transform 0.8s;
  }
`;

const Moon = styled(({ className }: { className: string }) => (
  <img alt="Moon" src="/Moon.svg" className={className} />
))`
  width: 3rem;
  height: 3rem;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
