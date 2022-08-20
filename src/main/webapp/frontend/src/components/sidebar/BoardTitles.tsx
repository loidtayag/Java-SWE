import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { iBoard } from "../iDatabase";

const BoardTitles = ({ boards }: { boards: iBoard[] }) => {
  let [isOverlay, setIsOverlay] = useState(false);
  let [boardTitles, setBoardTitles] = useState<iBoard[]>(boards);
  return (
    <Flex>
      {createList(boardTitles, setIsOverlay)}
      {isOverlay && (
        <Overlay
          className={"foo"}
          setBoardTitles={setBoardTitles}
          setIsOverlay={setIsOverlay}
        />
      )}
    </Flex>
  );
};

export default BoardTitles;

const Flex = styled.nav`
  display: flex;
  flex-direction: column;
  list-style: none;
  color: white;
`;

const createList = (data: iBoard[], setIsOverlay: (value: boolean) => void) => {
  const temp: ReactNode[] = [];

  //Creating total board count list item
  temp.push(BoardTotal(data.length));
  let i = 2;
  //Creating each individual boards list item
  data.forEach((item) => {
    temp.push(BoardTitle(item.name, i++));
  });
  //Creating list item to create a board
  temp.push(BoardCreate(i, setIsOverlay));

  return temp;
};

const BoardTotal = (boardTotal: number) => (
  <li key={1}>ALL BOARDS ({boardTotal})</li>
);

const BoardTitle = (boardName: string, key: number) => (
  <li key={key}>
    <button
      onClick={() => {
        selectBoard(key);
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

function selectBoard(key: number) {
  localStorage.setItem("selectedBoard", key as unknown as string);
}

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
    setBoardTitles: (value: iBoard[]) => void;
    setIsOverlay: (value: boolean) => void;
  }) => (
    <form
      onSubmit={() => handleOverlay(props.setBoardTitles, props.setIsOverlay)}
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

const handleOverlay = (
  setBoardTitles: (value: iBoard[]) => void,
  setIsOverlay: (value: boolean) => void
) => {
  const input: HTMLElement | null = document?.getElementById("boardName");
  let boards: iBoard[] = localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards") as string)
    : [];
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
  setBoardTitles(boards);
  setIsOverlay(false);
};
