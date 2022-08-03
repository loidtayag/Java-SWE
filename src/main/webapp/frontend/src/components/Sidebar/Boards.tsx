import { iBoard, iDatabase } from "../Other/Interfaces";
import { useState } from "react";

function Boards() {
  const [boards, setBoards] = useState<string[]>([]);
  fetch("/db.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((data: Response) => {
      return data.json();
    })
    .then((json: iDatabase) => {
      let boardNames: string[] = [];
      json.boards.forEach((board: iBoard) => {
        boardNames.push(board.name);
      });
      setBoards(boardNames);
    });

  return <nav>{boards}</nav>;
}

export default Boards;
