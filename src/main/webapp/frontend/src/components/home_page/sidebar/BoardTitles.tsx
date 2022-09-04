import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { iBoard } from "../../../utils/iDatabase";
import {
  defaulT,
  getBoards,
  getSelectedBoard,
  navSpacing,
  Text,
  theme,
} from "../../../utils/helpers";

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
  <li key={0}>
    <Text
      style={{
        color: theme.grayText,
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
  <li key={key} style={{ marginTop: "1ch" }}>
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
        src="/create.svg"
        style={{
          /* https://codepen.io/sosuke/pen/Pjoqqp */
          filter:
            "invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg) brightness(85%) contrast(85%)",
        }}
      />
      <Text
        style={{
          marginLeft: navSpacing,
          color: theme.grayText,
        }}
      >
        {boardName}
      </Text>
    </button>
  </li>
);

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
    }}
  >
    <img
      alt="Table chart"
      src="/create.svg"
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
        minHeight: "7rem",
      }}
    >
      <BoardName></BoardName>
      <input type={"submit"} value={"Create Board"} />
    </form>
  )
)`
  position: fixed;
  width: 30vw;
  left: 35vw;
  background-color: #2c2c38;
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
      minHeight: "3rem",
      justifyContent: "space-between",
    }}
  >
    <label>Name</label>
    <input
      placeholder={"Operation Phoenix"}
      type={"text"}
      id={"boardName"}
      required={true}
    />
  </div>
);

export default BoardTitles;
