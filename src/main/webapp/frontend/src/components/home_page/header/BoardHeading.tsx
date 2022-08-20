import styled from "styled-components";

const BoardHeading = ({ children }: { children: string }) => {
  return <H1>{children}</H1>;
};

const H1 = styled.h1``;

export default BoardHeading;
