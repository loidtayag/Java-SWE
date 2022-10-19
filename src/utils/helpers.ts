import { iBoard, iStatus } from "./interfaces";

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
            subtasks: []
          }
        ]
      },
      {
        name: "DOING",
        tasks: [
          {
            title: "C",
            desc: "D",
            subtasks: []
          }
        ]
      }
    ]
  }
];

export const getBoards = (): iBoard[] => {
  const boards: iBoard[] = localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards") as string)
    : [];

  return boards.length ? boards : defaultBoard;
};

export const initBoards = (): void => {
  localStorage.setItem("boards", JSON.stringify(defaultBoard));
};

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

export const getStatuses = (): string[] => getSelectedBoard().status.map((status: iStatus) => status.name);

export const getNightMode = (): boolean => {
  return localStorage.getItem("nightMode")
      ? (localStorage.getItem("nightMode") === "true")
      : initNightMode();
};

export const initNightMode = (): true => {
  localStorage.setItem("nightMode", "true");
  return true;
};

export const getSidebar = (): boolean => {
  return localStorage.getItem("sidebar")
    ? (localStorage.getItem("sidebar") === "true")
    : initSidebar();
};

export const initSidebar = (): true => {
  localStorage.setItem("sidebar", "true");
  return true;
};