import React from "react";
import styled from "styled-components";

export default function DayOrNight() {
  return (
    <>
      <Sun className="sun" />
      <Toggle>
        <Outer />
        <Inner />
        <Input />
      </Toggle>
      <Moon className="moon" />
    </>
  );
}

const Sun = styled(({ className }: { className: string }) => {
  return <img alt="Sun" src="/Sun.svg" className={className} />;
})`
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;

const Toggle = styled.div`
  margin: 0;
  padding: 0;
  width: 200px;
  height: 80px;
  position: relative;
  cursor: pointer;
`;

const Outer = styled.div`
  background-color: #615dc5;
  width: 200px;
  height: 30px;
  border-radius: 40px;
  position: absolute;
  top: 0;
`;

const Inner = styled.div`
  background-color: #ffffff;
  width: 72px;
  height: 72px;
  border-radius: 36px;
  position: absolute;
  top: 4px;
  left: 4px;
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  width: 200px;
  height: 80px;
  z-index: 4;
  &:checked ${Outer} {
    background-color: green;
  }
`;

const Moon = styled(({ className }: { className: string }) => {
  return <img alt="Moon" src="/Moon.svg" className={className} />;
})`
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
