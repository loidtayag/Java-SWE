import React from "react";
import styled from "styled-components";

export default function RevealSidebar() {
  return (
    <Visual className="foo" onclick={handleClick}>
      <Embed className="foo" />
    </Visual>
  );
}

const Visual = styled(
  ({
    className,
    onclick,
    children,
  }: {
    className: string;
    onclick: (event: any) => any;
    children: React.ReactNode;
  }) => (
    <button className={className} onClick={onclick}>
      {children}
    </button>
  )
)``;

const handleClick = () => {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");

  if (sidebar != null && main != null) {
    main.style.gridTemplateAreas = '"header" "main"';
    main.style.gridTemplateColumns = "auto";
    const parent = sidebar.parentNode;
    if (parent != null) {
      parent.removeChild(sidebar);
    }
  }
};

const Embed = styled(({ className }: { className: string }) => (
  <img className={className} alt="Reveal sidebar button" src="/Eye.svg" />
))`
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg)
    brightness(85%) contrast(85%);
`;
