import { iBoard } from "./localStorage";
import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

export const getBoards = (): iBoard[] => {
  const boards: iBoard[] = localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards") as string)
    : [];

  return boards.length ? boards : defaultBoard;
};

export const initBoards = (): void => {
  localStorage.setItem("boards", JSON.stringify(defaultBoard));
};

export const defaultBoard: iBoard[] = [
  {
    name: "Demo",
    id: 1,
    status: [
      {
        name: "TODO",
        tasks: [
          {
            title: "A",
            desc: "B",
            subtasks: [],
          },
        ],
      },
      {
        name: "DOING",
        tasks: [
          {
            title: "C",
            desc: "D",
            subtasks: [],
          },
        ],
      },
    ],
  },
];

export const getSelectedBoard = (): iBoard => {
  const boards: iBoard[] = getBoards();
  const indexSelected: number = getSelectedBoardIndex();

  return boards[indexSelected];
};

export const getSelectedBoardIndex = (): number => {
  return localStorage.getItem("selectedBoard")
    ? (localStorage.getItem("selectedBoard") as unknown as number)
    : initSelectedBoard();
};

export const initSelectedBoard = (): 0 => {
  localStorage.setItem("selectedBoard", "0");
  return 0;
};

export const theme = {
  iconSize: "2.5rem",
  clickable: "#6660ca",
  sizeText: "1.3rem",
  weightText: 600,
  grayText: "#9da9b4",
  borderRadius: "0.7rem",
  light: {
    headers: "#000000",
    foreground: "#CBE4F9",
    background: "#e9eefc",
    form: "#b4ebff",
  },
  dark: {
    headers: "#ffffff",
    foreground: "#21212d",
    background: "#2c2c38",
    form: "#00212d",
  },
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  grayImg:
    "invert(60%) sepia(11%) saturate(294%) hue-rotate(195deg) brightness(92%) contrast(89%)",
};

export const ThemeContext = createContext<{
  headers: string;
  foreground: string;
  background: string;
  form: string;
} | null>(null);

export const Text = styled.span`
  color: ${theme.grayText};
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
`;

export const styledText = css`
  color: ${theme.grayText};
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
`;

export const styledScroll = css`
  overflow: auto;

  ::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${() => useContext(ThemeContext)?.foreground};
    box-shadow: 0 0 20rem rgba(0, 0, 0, 0.2) inset;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.85, rgb(122, 153, 217)),
      color-stop(0.5, rgb(73, 125, 189)),
      color-stop(0.25, rgb(43, 75, 172))
    );
  }
`;
