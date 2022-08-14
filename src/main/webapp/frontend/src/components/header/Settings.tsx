import styled from "styled-components";

const Settings = () => {
  return (
    <Button>
      <Img />
    </Button>
  );
};

const Button = styled.button`
  width: 2rem;
  height: auto;
  background-color: inherit;
  border: none;
`;

const Img = styled.img.attrs(() => ({
  alt: "Settings",
  src: "/gear.svg",
}))`
  width: 1.6rem;
  height: 1.6rem;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;

export default Settings;
