import React, { ReactNode, useEffect, useState } from "react";
import { iBoard, iDatabase } from "../Database";
import styled from "styled-components";

export default function BoardTitles() {
  const [boardTitles, setBoardTitles] = useState<ReactNode[]>([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch("/db.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data) => (data.ok ? data.json() : null))
      .then((json: iDatabase | null) => {
        if (json) {
          let boardTotal: number = 0;
          let boardNames: ReactNode[] = [];
          json.boards.forEach((board: iBoard) => {
            boardNames.push(<li>{board.name}</li>);
            boardTotal++;
          });
          boardNames.splice(0, 0, <li>{boardTotal}</li>);
          setBoardTitles(boardNames);
          setIsPending(false);
        } else {
          setBoardTitles(["Status: error..."]);
          setIsPending(false);
        }
      });
  });

  return <Flex>{isPending ? "Status: loading..." : boardTitles}</Flex>;
}

const Flex = styled.nav.attrs(
  ({ children }: { children: ReactNode | ReactNode[] }) => ({
    children: children,
  })
)`
  display: flex;
  flex-direction: column;

  li {
    list-style: none;
  }
`;
