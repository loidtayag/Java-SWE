import styled from "styled-components";
import { ThemeContext } from "../../styles/theme.styles";
import React, { useContext } from "react";
import { iBoard } from "../../utils/database";
import { getBoards, getSelectedBoardIndex } from "../../utils/helpers";

const BoardName = (props: { boardNames: string[], setBoardNames: (value: string[]) => void, selectedBoard: iBoard, setSelectedBoard: (value: iBoard) => void, children: string }) => {

  return <Header contentEditable="true" onBlur={(e) => {
    handleChangeBoardName(e, props.boardNames, props.setBoardNames, props.children, props.selectedBoard, props.setSelectedBoard);
  }}>
    {props.children}
  </Header>;
};

const handleChangeBoardName = (e: React.FormEvent<HTMLHeadingElement>, boardNames: string[], setBoardNames: (value: string[]) => void, before: string, selectedBoard: iBoard, setSelectedBoard: (value: iBoard) => void) => {
  const trimmedName = e.currentTarget.innerText.trim();

  if (trimmedName.length > 20) {
    alert("Board name mustn't be greater than 20 characters");
    e.currentTarget.innerText = before;
  } else if (trimmedName.length === 0) {
    alert("Board name must be greater than 1 character");
    e.currentTarget.innerText = before;
  } else {
    e.currentTarget.innerText = trimmedName;
    const newBoards = getBoards();
    newBoards[getSelectedBoardIndex()].name = trimmedName;
    localStorage.setItem("boards", JSON.stringify(newBoards));
    setBoardNames(boardNames.map((boardName) => {
      if (before !== boardName) {
        return boardName;
      } else {
        return trimmedName;
      }
    }));
    setSelectedBoard(newBoards[getSelectedBoardIndex()]);
  }
};

const Header = styled.h2`
  font-size: 3rem;
  color: ${() => useContext(ThemeContext)?.headers};
  margin-left: 1ch;
  margin-right: 1ch;
  border: none;
  padding: 0.5ch;
`;

export default BoardName;
