import React, {ReactNode, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {iBoard} from "../../utils/database";
import {defaultBoard, getBoards, getSelectedBoard, getSelectedBoardIndex, initBoards,} from "../../utils/helpers";
import {textTheme, theme, ThemeContext} from "../../styles/theme.styles";

const BoardTitles = (props: { boardNames: string[], setBoardNames: (value: string[]) => void, setSelectedBoard: (value: iBoard) => void }) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const [deleteOverlay, setDeleteOverlay] = useState<any[]>([
    false,
    null,
    null,
  ]);
  const dragulaRefs: (HTMLDivElement | null)[] = [];

  useEffect(() => {
    // let dragula = require("react-dragula")();
    // dragulaRefs.forEach((ref) => {
    //   dragula.containers.push(ref);
    // });
    // dragula.on("drop", (element: HTMLDivElement, target: HTMLDivElement) => {
    //   console.log(element.innerText);
    //   console.log(target.innerText);
    //   window.location.reload();
    // });
  });

  return (
    <Flex>
      {createList(
        props.setSelectedBoard,
        props.boardNames,
        setIsOverlay,
        dragulaRefs,
        props.setBoardNames,
        setDeleteOverlay
      )}
      {deleteOverlay[0] && (
        <DeleteOverlay
          deleteOverlay={deleteOverlay}
          setDeleteOverlay={setDeleteOverlay}
        />
      )}
      {isOverlay && (
        <Overlay
          className={"foo"}
          boardNames={props.boardNames}
          setBoardNames={props.setBoardNames}
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

const DeleteOverlay = styled(
  (props: {
    deleteOverlay: any[];
    setDeleteOverlay: (value: any[]) => void;
  }) => (
    <form
      onSubmit={() => {
        props.deleteOverlay[1]();
        props.setDeleteOverlay([false, null]);
      }}
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "3rem",
        justifyContent: "space-between",
        backgroundColor: useContext(ThemeContext)?.form,
        borderRadius: "0.7rem",
        // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "30vw",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
      }}
    >
      <Exit
        type="button"
        onClick={() => {
          props.setDeleteOverlay([false, null, null]);
        }}
      >
        <img
          src="/exit.svg"
          alt="Exit overlay"
          style={{
            cursor: "pointer",
            width: theme.iconSize,
            filter: theme.iconColor,
          }}
        />
      </Exit>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          style={{
            marginBottom: "2ch",
            color: useContext(ThemeContext)?.headers,
            fontSize: theme.textSize,
            fontWeight: theme.textWeight,
          }}
        >
          Press below to confirm deletion of board "{props.deleteOverlay[2]}"
        </label>
        <input
          type={"submit"}
          value={"Delete Board"}
          style={{
            height: "3.5rem",
            backgroundColor: theme.clickable,
            color: useContext(ThemeContext)?.headers,
            border: "none",
            borderRadius: ".7rem",
            fontSize: theme.textSize,
            fontWeight: theme.textWeight,
            cursor: "pointer",
            width: "100%",
          }}
        />
      </div>
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

const createList = (
  setSelectedBoard: (value: iBoard) => void,
  boardNames: string[],
  setIsOverlay: (value: boolean) => void,
  refs: (HTMLDivElement | null)[],
  setBoardNames: (value: string[]) => void,
  setDeleteOverlay: (value: any[]) => void
) => {
  const temp: ReactNode[] = [];

  //Creating total board count list item
  temp.push(BoardTotal(boardNames.length));
  let key = 1;

  //Creating each individual boards list item
  boardNames.forEach((board) => {
    temp.push(
      BoardIndividual(
        setSelectedBoard,
        board,
        key++,
        refs,
        setBoardNames,
        setDeleteOverlay
      )
    );
  });
  //Creating list item to create a board
  temp.push(BoardCreate(key, setIsOverlay));

  return temp;
};

const BoardTotal = (boardTotal: number) => (
  <li key={0} style={{ marginTop: "4ch", marginBottom: "1.5ch" }}>
    <P
      style={{
        color: theme.textColor,
        marginLeft: "3px",
      }}
    >
      ALL BOARDS ({boardTotal})
    </P>
  </li>
);

const P = styled.p`
  ${textTheme}
`

const BoardIndividual = (
  setSelectedBoard: (value: iBoard) => void,
  boardName: string,
  key: number,
  refs: (HTMLDivElement | null)[],
  setBoardNames: (value: string[]) => void,
  setDeleteOverlay: (value: any[]) => void
) => {
  return (
    <div
      key={key}
      ref={(ref) => {
        refs.push(ref);
      }}
    >
      <li
        style={{
          marginTop: "1ch",
          position: "relative",
          height: "4rem",
        }}
      >
        <Highlight
          boardName={boardName}
          onMouseOver={() => {
            const temp = document.getElementById("deleteBoard" + key);
            if (temp) {
              temp.style.display = "block";
            }
          }}
          onMouseOut={() => {
            const temp = document.getElementById("deleteBoard" + key);
            if (temp) {
              temp.style.display = "none";
            }
          }}
        >
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
            <P
              style={{
                marginLeft: "2ch",
                color:
                  getSelectedBoard().name === boardName
                    ? "inherit"
                    : theme.textColor,
                display: "inline-block",
              }}
            >
              {boardName}
            </P>
          </button>
          <button
            style={{
              backgroundColor: "inherit",
              border: "none",
              position: "absolute",
              left: "92%",
              top: "56%",
              transform: "translate(-50%, -50%)",
              display: "none",
            }}
            type="button"
            id={"deleteBoard" + key}
            onClick={() => {
              let name = getBoards()[key - 1].name;
              localStorage.setItem(
                "selectedBoard",
                (key - 1) as unknown as string
              );
              setDeleteOverlay([
                true,
                () => {
                  let boards: iBoard[] = getBoards();
                  if (boards.length > 1 && boards.length === key) {
                    localStorage.setItem(
                      "selectedBoard",
                      /* '- 2' because 'key' 0 is used for '<BoardTotal/>' and we go back one index because the last board
                       * is selected for deletion, so we've got to go back one index */
                      (key - 2) as unknown as string
                    );
                  }
                  boards.splice(key - 1, 1);
                  if (boards.length === 0) {
                    initBoards();
                  } else {
                    localStorage.setItem("boards", JSON.stringify(boards));
                  }
                  boards = getBoards();
                  setSelectedBoard(boards[getSelectedBoardIndex()]);
                  setBoardNames(boards.map((board) => board.name));
                },
                name,
              ]);
            }}
          >
            <img
              src="/delete-subtask.svg"
              alt="Delete subtask"
              style={{
                width: theme.iconSize,
                filter: theme.iconColor,
                cursor: "pointer",
              }}
            />
          </button>
        </Highlight>
      </li>
    </div>
  );
};

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
  :hover {
    opacity: 60%;
  }
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
    <P style={{ marginLeft: "2ch", color: theme.clickable }}>
      + Create New Board
    </P>
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
        backgroundColor: useContext(ThemeContext)?.form,
        borderRadius: "0.7rem",
        // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
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
            filter: theme.iconColor,
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
          color: useContext(ThemeContext)?.headers,
          border: "none",
          borderRadius: ".7rem",
          fontSize: theme.textSize,
          fontWeight: theme.textWeight,
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

const handleOverlay = (
  boardNames: string[],
  setBoardNames: (value: string[]) => void,
  setIsOverlay: (value: boolean) => void
) => {
  let boards: iBoard[] = getBoards();
  /* For god’s sake, this was messing up the deletion for the boards. I did it again, just like the setState problem I
  had. Man was console logging every part of it, just copied and pasted it into the method, and I even thought maybe
  the name 'defaultT' was messing it up like holy, coding is great :). */
  let newBoard: iBoard = {
    name: (document.getElementById("boardName") as HTMLInputElement)?.value,
    id: defaultBoard[0].id,
    status: defaultBoard[0].status,
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
      justifyContent: "space-between",
      backgroundColor: useContext(ThemeContext)?.form,
      borderRadius: "0.5rem",
      fontSize: theme.textSize,
      fontWeight: theme.textWeight,
      marginBottom: "2ch",
    }}
  >
    <label
      style={{
        marginBottom: "0.3rem",
        color: useContext(ThemeContext)?.headers,
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
        backgroundColor: useContext(ThemeContext)?.form,
        color: theme.textColor,
        border: "0.1rem solid " + theme.textColor,
        borderRadius: "0.7rem",
        fontSize: theme.textSize,
        fontWeight: theme.textWeight,
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
          event.currentTarget.placeholder = "Board name taken";
        }
        if (event.currentTarget.value.length > 20) {
          event.currentTarget.value = "";
          event.currentTarget.placeholder =
            "Board name mustn't be greater than 20 characters";
        }
      }}
    />
  </div>
);

export default BoardTitles;
