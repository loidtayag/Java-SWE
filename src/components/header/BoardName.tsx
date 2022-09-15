import styled from "styled-components";
import { ThemeContext } from "../../utils/helpers";
import { useContext } from "react";

const BoardName = styled.h2`
  font-size: 3rem;
  color: ${() => useContext(ThemeContext)?.headers};
  margin-left: 2ch;
`;

export default BoardName;
