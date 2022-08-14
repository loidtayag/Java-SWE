import styled from "styled-components";
import { useEffect, useState } from "react";
import { iBoard, iDatabase, iStatus, iTask } from "../iDatabase";

const TaskView = () => {
  const [boardTitles, setBoardTitles] = useState<string[]>([]);
  const [boardDesc, setBoardDesc] = useState<string[]>([]);
  useEffect(() => {
    fetch("/db.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((data: Response) => data.json())
      .then((json: iDatabase) => {
        json.boards.forEach((board: iBoard) => {
          board.status?.forEach((status: iStatus) => {
            status.tasks?.forEach((task: iTask) => {
              boardTitles.push(task.title);
              boardDesc.push(task.desc);
            });
          });
        });
      });
  }, []);

  const articles: any[] = [];
  for (let i = 0; i < boardTitles.length; i++) {
    articles.push(
      <article key={i}>
        {boardTitles[i]}
        <br />
        <br />
        {boardDesc[i]}
      </article>
    );
  }

  return <Section>{articles}</Section>;
};

const Section = styled.section`
  grid-area: main;
  background-color: #21212d;
  min-width: 100%;
`;

export default TaskView;
