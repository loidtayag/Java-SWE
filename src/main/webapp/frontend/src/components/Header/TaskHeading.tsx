import styled from "styled-components";

const TaskHeading = ({ children }: { children: string }) => {
  return <H1>{children}</H1>;
};

const H1 = styled.h1``;

export default TaskHeading;
