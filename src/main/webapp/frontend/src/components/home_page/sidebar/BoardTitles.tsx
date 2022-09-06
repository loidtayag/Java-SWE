import React, { ReactNode, useContext, useState } from "react";
import styled from "styled-components";
import { iBoard } from "../../../utils/iDatabase";
import {
  defaulT,
  getBoards,
  getSelectedBoard,
  navSpacing,
  Text,
  theme,
  ThemeContext,
} from "../../../utils/helpers";
import boardName from "../header/BoardName";

const BoardTitles = (props: { setSelectedBoard: (value: iBoard) => void }) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const [boardNames, setBoardNames] = useState<string[]>(
    getBoards().map((board: iBoard) => board.name)
  );

  return (
    <Flex>
      {createList(props.setSelectedBoard, boardNames, setIsOverlay)}
      {isOverlay && (
        <Overlay
          className={"foo"}
          boardNames={boardNames}
          setBoardNames={setBoardNames}
          setIsOverlay={setIsOverlay}
        />
      )}
    </Flex>
  );
};

const Flex = styled.nav`
  display: flex;
  flex-direction: column;
  list-style: none;
  color: white;
`;

const createList = (
  setSelectedBoard: (value: iBoard) => void,
  boardNames: string[],
  setIsOverlay: (value: boolean) => void
) => {
  const temp: ReactNode[] = [];

  //Creating total board count list item
  temp.push(BoardTotal(boardNames.length));
  let key = 1;
  //Creating each individual boards list item
  boardNames.forEach((board) => {
    temp.push(BoardIndividual(setSelectedBoard, board, key++));
  });
  //Creating list item to create a board
  temp.push(BoardCreate(key, setIsOverlay));

  return temp;
};

const BoardTotal = (boardTotal: number) => (
  <li key={0} style={{ marginTop: "4ch", marginBottom: "1.5ch" }}>
    <Text
      style={{
        color: theme.grayText,
        marginLeft: "3px",
      }}
    >
      ALL BOARDS ({boardTotal})
    </Text>
  </li>
);

const BoardIndividual = (
  setSelectedBoard: (value: iBoard) => void,
  boardName: string,
  key: number
) => (
  <li
    key={key}
    style={{
      marginTop: "1ch",
      position: "relative",
      height: "4rem",
    }}
  >
    <Highlight boardName={boardName}>
      <button
        onClick={() => {
          localStorage.setItem(
            "selectedBoard",
            ((key as unknown as number) - 1) as unknown as string
          );
          setSelectedBoard(getSelectedBoard());
        }}
        style={{
          border: "none",
          backgroundColor: "inherit",
          color: "inherit",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          alt="Table chart"
          src="/select.svg"
          style={{
            /* https://codepen.io/sosuke/pen/Pjoqqp */
            filter:
              "invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg) brightness(85%) contrast(85%)",
          }}
        />
        <Text
          style={{
            marginLeft: navSpacing,
            color:
              getSelectedBoard().name === boardName
                ? "inherit"
                : theme.grayText,
          }}
        >
          {boardName}
        </Text>
      </button>
    </Highlight>
  </li>
);

const Highlight = styled.div<{ boardName: string }>`
  background-color: ${(props) => {
    return getSelectedBoard().name === props.boardName
      ? theme.clickable
      : "inherit";
  }};
  position: absolute;
  left: -2vw;
  top: 0;
  width: 92%;
  height: 100%;
  padding-left: 2vw;
  color: white;
  display: flex;
  border-radius: 0 2rem 2rem 0;
`;

const BoardCreate = (key: number, setIsOverlay: (value: boolean) => void) => (
  <li
    onClick={() => {
      setIsOverlay(true);
    }}
    key={key}
    style={{
      marginTop: "1ch",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      height: "4rem",
    }}
  >
    <img
      alt="Table chart"
      src="/select.svg"
      style={{
        //https://codepen.io/sosuke/pen/Pjoqqp
        filter:
          "invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg) brightness(85%) contrast(85%)",
        width: theme.iconSize,
      }}
    />
    <Text style={{ marginLeft: navSpacing, color: theme.clickable }}>
      + Create New Board
    </Text>
  </li>
);

const Overlay = styled(
  (props: {
    className: string;
    boardNames: string[];
    setBoardNames: (value: string[]) => void;
    setIsOverlay: (value: boolean) => void;
  }) => (
    <form
      onSubmit={() =>
        handleOverlay(props.boardNames, props.setBoardNames, props.setIsOverlay)
      }
      className={props.className}
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "2.5rem",
        justifyContent: "space-between",
        backgroundColor: useContext(ThemeContext).background,
        borderRadius: "0.7rem",
        // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Exit
        type="button"
        onClick={() => {
          props.setIsOverlay(false);
        }}
      >
        <img
          src="/exit.svg"
          alt="Exit overlay"
          style={{
            cursor: "pointer",
            width: theme.iconSize,
            filter: theme.grayImg,
          }}
        />
      </Exit>
      <BoardName></BoardName>
      <input
        type={"submit"}
        value={"Create Board"}
        style={{
          height: "3.5rem",
          backgroundColor: theme.clickable,
          color: useContext(ThemeContext).headers,
          border: "none",
          borderRadius: ".7rem",
          fontSize: theme.sizeText,
          fontWeight: theme.weightText,
          cursor: "pointer",
        }}
      />
    </form>
  )
)`
  position: fixed;
  width: 30vw;
  left: 35vw;
  background-color: #2c2c38;
`;

export const Exit = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-color: inherit;
  border: none;
`;

const handleOverlay = (
  boardNames: string[],
  setBoardNames: (value: string[]) => void,
  setIsOverlay: (value: boolean) => void
) => {
  let boards: iBoard[] = getBoards();
  let newBoard: iBoard = defaulT[0];
  newBoard.name = (
    document.getElementById("boardName") as HTMLInputElement
  )?.value;
  boards.push(newBoard);
  //Reassigning local storage
  localStorage.setItem("boards", JSON.stringify(boards));
  //Rerender with appropriate states
  boardNames.push(boards[boards.length - 1].name);
  setBoardNames(boardNames);
  setIsOverlay(false);
};

const BoardName = () => (
  <div
    style={{
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: useContext(ThemeContext).background,
      borderRadius: "0.5rem",
      fontSize: theme.sizeText,
      fontWeight: theme.weightText,
      marginBottom: "2ch",
    }}
  >
    <label
      style={{
        marginBottom: "0.3rem",
        color: useContext(ThemeContext).headers,
      }}
    >
      Name
    </label>
    <input
      placeholder={"Million Dollar Plan"}
      type={"textarea"}
      id={"boardName"}
      required={true}
      style={{
        height: "2.7rem",
        backgroundColor: useContext(ThemeContext).background,
        color: theme.grayText,
        border: "0.1rem solid " + theme.grayText,
        borderRadius: "0.7rem",
        fontSize: theme.sizeText,
        fontWeight: theme.weightText,
        padding: "0 0.5ch 0 0.5ch",
      }}
      onBlur={(event) => {
        let boards = getBoards();
        let valid = true;
        boards.forEach((board: iBoard) => {
          if (event.currentTarget.value === board.name) {
            valid = false;
          }
        });
        if (!valid) {
          event.currentTarget.value = "";
          event.currentTarget.placeholder =
            "Another board already has that name, please use another name.";
        }
      }}
    />
  </div>
);

export default BoardTitles;
