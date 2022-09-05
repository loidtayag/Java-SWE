import { iBoard } from "./iDatabase";
import React from "react";
import styled from "styled-components";

export const initialiseBoards = (): iBoard[] => {
  localStorage.setItem("boards", JSON.stringify(defaulT));
  return defaulT;
};

export const defaulT: iBoard[] = [
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

export const getBoards = (): iBoard[] => {
  return localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards") as string)
    : initialiseBoards();
};

export const initialiseSelectedBoard = (): 0 => {
  localStorage.setItem("selectedBoard", "0");
  return 0;
};

export const getSelectedBoard = (): iBoard => {
  const boards: iBoard[] = JSON.parse(localStorage.getItem("boards") as string);
  const indexForSelectedBoard: number =
    boards.length !== 1
      ? JSON.parse(localStorage.getItem("selectedBoard") as string)
      : initialiseSelectedBoard();

  return boards[indexForSelectedBoard];
};

export const theme = {
  iconSize: "2.5rem",
  clickable: "#6660ca",
  sizeText: "1.3rem",
  weightText: 600,
  grayText: "#9da9b4",
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  grayImg:
    "invert(60%) sepia(11%) saturate(294%) hue-rotate(195deg) brightness(92%) contrast(89%)",
  light: {
    headers: "#000000",
    foreground: "#d7fcfc",
    background: "#ffffff",
  },
  dark: {
    headers: "#ffffff",
    foreground: "#21212d",
    background: "#2c2c38",
  },
};

export const ThemeContext = React.createContext(
  localStorage.getItem("nightMode") ? theme.dark : theme.light
);

export const spacing = "1.5rem";
export const navSpacing = "0.6rem";

export const Text = styled.span`
  font-size: ${theme.sizeText};
  font-weight: ${theme.weightText};
`;
