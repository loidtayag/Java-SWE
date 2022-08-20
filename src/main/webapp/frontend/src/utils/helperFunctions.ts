import { iBoard } from "./iDatabase";

export const initialiseBoards = (): iBoard[] => {
  const defaulT: iBoard[] = [
    {
      name: "Demo1",
      id: 1,
      status: [
        {
          name: "TODO",
          tasks: [
            {
              title: "A",
              desc: "B",
            },
          ],
        },
        {
          name: "DOING",
          tasks: [
            {
              title: "C",
              desc: "D",
            },
          ],
        },
      ],
    },
    {
      name: "Demo2",
      id: 2,
      status: [
        {
          name: "TODO",
          tasks: [
            {
              title: "E",
              desc: "F",
            },
          ],
        },
        {
          name: "DOING",
          tasks: [
            {
              title: "G",
              desc: "H",
            },
          ],
        },
      ],
    },
  ];
  localStorage.setItem("boards", JSON.stringify(defaulT));
  return defaulT;
};

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
  const boards: iBoard[] = localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards") as string)
    : [];
  const indexForSelectedBoard: number = localStorage.getItem("selectedBoard")
    ? JSON.parse(localStorage.getItem("selectedBoard") as string)
    : initialiseSelectedBoard();

  return boards[indexForSelectedBoard];
};
