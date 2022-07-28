import styled from "styled-components";

const Logo = styled(() => (
  <>
    <Flex>
      <Visual className="foo" />
      <Text className="foo" />
    </Flex>
  </>
))``;

export default Logo;

const Flex = styled.div`
  display: flex;
  //justify-content: space-around;
  margin: 8px auto;
  align-items: baseline;
`;

const Visual = styled(({ className }: { className: string }) => (
  <img alt="Logo visual" src="/logo.svg" className={className} />
))`
  margin-right: 8px;
  height: 2.75rem;
  width: 2.75rem;
`;

const Text = styled(({ className }: { className: string }) => (
  <p className={className}>Kanban</p>
))`
  font-size: 2.75rem;
`;
