import styled from "styled-components";
import { theme } from "../../utils/helpers";

const Settings = () => {
  return (
    <Button>
      <Img />
    </Button>
  );
};

const Button = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  margin-right: 2ch;
`;

const Img = styled.img.attrs(() => ({
  alt: "Settings",
  src: "/gear.svg",
}))`
  width: ${theme.iconSize};
  filter: ${theme.grayImg};
`;

export default Settings;
