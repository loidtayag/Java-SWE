import styled from "styled-components";
import { useContext } from "react";
import { scrollTheme, ThemeContext } from "../../styles/theme.styles";

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: ${() => useContext(ThemeContext)?.background};
  display: grid;
  flex-direction: column;
  resize: horizontal;
  overflow: auto;
  padding-left: 2vw;
  max-height: 100vh;
  /* Since it shows a white space if moved too far to the left */
  min-width: 15.5vw;
  /* Don't want resizing to create a horizontal scrollable */
  max-width: 30vw;
  grid-template-rows: 1fr 9fr auto;
  ${scrollTheme};
`;

export default Sidebar;
