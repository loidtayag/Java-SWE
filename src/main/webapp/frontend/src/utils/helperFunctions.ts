import { iBoard } from "./iDatabase";

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
