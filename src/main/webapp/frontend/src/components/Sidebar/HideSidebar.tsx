import styled from "styled-components";

export default function HideSidebar() {
  return (
    <>
      <Eye className="eye" />
      <p>Hide sidebar</p>
    </>
  );
}

const Eye = styled(({ className }: { className: string }) => (
  <img alt="Closed eye" src="/Uneye.svg" className={className} />
))`
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
