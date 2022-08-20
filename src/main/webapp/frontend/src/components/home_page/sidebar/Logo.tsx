import styled from "styled-components";

export default function Logo() {
  return (
    <Flex>
      <Visual />
      <Text>Kanban</Text>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Visual = styled.img.attrs(() => ({
  alt: "Logo",
  src: "/logo.svg",
}))`
  margin-right: 8px;
  height: 2.75rem;
  width: 2.75rem;
`;

const Text = styled.h1`
  font-size: 2.75rem;
`;
