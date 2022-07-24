import styled from "styled-components";

function helper({ className }: { className: string }) {
  return <img alt="Website logo" src="/logo.svg" className={className} />;
}

const Logo = styled(helper)`
  width: 200px;
  height: 200px;
`;

export default Logo;
