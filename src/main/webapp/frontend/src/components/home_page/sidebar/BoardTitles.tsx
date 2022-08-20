import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { iBoard } from "../../../utils/iDatabase";
import { getBoards, getSelectedBoard } from "../../../utils/helperFunctions";

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
  <li key={0}>ALL BOARDS ({boardTotal})</li>
);

const BoardIndividual = (
  setSelectedBoard: (value: iBoard) => void,
  boardName: string,
  key: number
) => (
  <li key={key}>
    <button
      onClick={() => {
        localStorage.setItem("selectedBoard", key as unknown as string);
        setSelectedBoard(getSelectedBoard());
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
      {boardName}
    </button>
  </li>
);

const BoardCreate = (key: number, setIsOverlay: (value: boolean) => void) => (
  <li
    onClick={() => {
      setIsOverlay(true);
    }}
    key={key}
    style={{ cursor: "pointer" }}
  >
    <img
      alt="Table chart"
      src="/create.svg"
      style={{
        //https://codepen.io/sosuke/pen/Pjoqqp
        filter:
          "invert(66%) sepia(9%) saturate(356%) hue-rotate(195deg) brightness(85%) contrast(85%)",
      }}
    />
    +Create New Board
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
  const input: HTMLElement | null = document?.getElementById("boardName");
  let boards: iBoard[] = getBoards();
  let newBoard: iBoard = {
    name: (input as HTMLInputElement).value,
    id: boards.length + 1,
    status: [
      {
        name: "TODO",
        tasks: [
          {
            title: "Task A",
            desc: "A",
          },
        ],
      },
      {
        name: "DOING",
        tasks: [
          {
            title: "Task B",
            desc: "B",
          },
        ],
      },
      {
        name: "DONE",
        tasks: [
          {
            title: "Task C",
            desc: "C",
          },
        ],
      },
    ],
  };

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
    {/*'handleOverlay()' dependent on id*/}
    <input
      placeholder={"Operation Phoenix"}
      type={"text"}
      id={"boardName"}
      required={true}
    />
  </div>
);

export default BoardTitles;
