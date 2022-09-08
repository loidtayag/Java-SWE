import {
  getBoards,
  getSelectedBoard,
  getSelectedBoardIndex,
  styledText,
  theme,
  ThemeContext,
} from "../../utils/helpers";
import { iBoard, iStatus, iTask } from "../../utils/iDatabase";
import styled, { css } from "styled-components";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Overlay from "./Overlay";
import CreateStatus from "./CreateStatus";
import ViewTask from "./ViewTask";

const ViewBoard = ({ selectedBoard }: { selectedBoard: iBoard }) => {
  let statusKey = 0;
  let taskKey = 0;
  let totalStatuses = 0;
  const statusesRef: (HTMLDivElement | null)[] = [];
  const colors = getColors(selectedBoard);
  const [createStatus, setCreateStatus] = useState(false);
  const [viewTask, setViewTask] = useState(false);

  useEffect(() => {
    setDragula(totalStatuses, statusesRef, selectedBoard);
  });

  return (
    <Div>
      {selectedBoard.status.map((status: iStatus) => (
        <Div1 key={statusKey++}>
          <StatusName>
            <StatusColor className="foo" color={colors[statusKey]} />
            <p>
              {status.name} ({status.tasks.length})
            </p>
          </StatusName>
          <Status
            className="foo"
            statusesRefs={statusesRef}
            totalStatuses={totalStatuses++}
          >
            {status.tasks.map((task: iTask) => (
              <Task className="foo" key={taskKey++} task={task} />
            ))}
          </Status>
        </Div1>
      ))}
      <NewStatus
        onClick={() => {
          setCreateStatus(true);
        }}
      >
        + New Column
      </NewStatus>
      {createStatus && (
        <Overlay setOverlay={setCreateStatus}>
          <CreateStatus />
        </Overlay>
      )}
      {viewTask && (
        <Overlay setOverlay={setViewTask}>
          <ViewTask />
        </Overlay>
      )}
    </Div>
  );
};

const styleColumn = css`
  margin: 2ch 0 2ch 2ch;
  width: 26%;
`;

function setDragula(
  indexTotalStatuses: number,
  statusesRef: (HTMLDivElement | null)[],
  selectedBoard: iBoard
) {
  let dragula = require("react-dragula")();

  /* Adding refs of <Task>s to dragula container */
  for (let i = indexTotalStatuses - 1; i > -1; i--) {
    dragula.containers.push(statusesRef[i]);
  }

  /* Writing to local storage the new index of the moved <Task> */
  dragula.on(
    "drop",
    function (
      element: HTMLDivElement,
      target: HTMLDivElement,
      source: HTMLDivElement
    ) {
      /* For some reason, the node being dragged gets deleted from 'selectedBoard', even if I re-assign it to
      'getSelectedBoard()' or even calling a function defined outside it that logs it. Seems like when it enters the
      function 'selectedBoard' is modified somehow... I couldn't be bothered to fix it, hopefully this doesn't lead to
      bugs. */
      const BUG = getSelectedBoard();
      let sourceStatus = 0;
      let sourceTask = 0;
      let foundSourceStatus = false;
      let foundSourceTask = false;
      let deletedTask: iTask | undefined = undefined;
      let toStatus = 0;
      let toTask = 0;
      let foundToStatus = false;
      let foundToTask = false;

      /* Find where node is dragged from*/
      BUG.status.forEach((status: iStatus) => {
        /* Found where node is dragged from */
        if (status.name === source.parentNode?.textContent?.split(" ")[0]) {
          foundSourceStatus = true;
          let draggedNode = element.children[0].innerHTML.split("<br>");
          /* Find the selected task */
          status.tasks.forEach((task: iTask) => {
            /* Found the selected task */
            if (task.title === draggedNode[0] && task.desc === draggedNode[1]) {
              foundSourceTask = true;
              deletedTask = BUG.status[sourceStatus].tasks.splice(
                sourceTask,
                1
              )[0];
            } else if (!foundSourceTask) {
              sourceTask++;
            }
          });
        } else if (!foundSourceStatus) {
          sourceStatus++;
        }
      });

      /* Find where node is dragged to*/
      BUG.status.forEach((status: iStatus) => {
        /* Found where node is dragged to */
        if (status.name === target.parentNode?.textContent?.split(" ")[0]) {
          foundToStatus = true;
          /* Only possible since dragula updates the DOM for us and uses that new DOM for thr function parameters */
          let prev = element.previousElementSibling;
          while (prev) {
            prev = prev.previousElementSibling;
            if (!foundToTask) {
              toTask++;
            }
          }
          if (deletedTask) {
            console.log(toTask);
            status.tasks.splice(toTask, 0, deletedTask);
          }
        } else if (!foundToStatus) {
          toStatus++;
        }
      });

      /* Rewriting local storage, no need to set state since dragula already does it */
      const newBoard = getBoards();
      newBoard[getSelectedBoardIndex()] = BUG;
      localStorage.setItem("boards", JSON.stringify(newBoard));
    }
  );
}

function getColors(selectedBoard: iBoard) {
  let colors: string[] | null = JSON.parse(
    localStorage.getItem("colors") as string
  );

  if (!colors) {
    colors = [];
    let i = 0;

    while (i++ !== selectedBoard.status.length) {
      colors.push(theme.clickable);
    }
    localStorage.setItem("colors", JSON.stringify(colors));
  }

  return colors;
}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${() => useContext(ThemeContext).foreground};
  ${styledText}
`;

const Div1 = styled.div`
  ${styleColumn}
`;

const Status = styled(
  ({
    className,
    children,
    statusesRefs,
    totalStatuses,
  }: {
    className: string;
    children: ReactNode;
    statusesRefs: (HTMLDivElement | null)[];
    totalStatuses: number;
  }) => (
    <div
      className={className}
      ref={(ref) => {
        statusesRefs.push(ref);
        return statusesRefs[totalStatuses];
      }}
    >
      {children}
    </div>
  )
)``;

const StatusName = styled.div`
  margin-bottom: 2ch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const StatusColor = styled(
  ({ className, color }: { className: string; color: string }) => {
    const [colorState, setColorState] = useState<string>(color);

    return (
      <canvas
        className={className}
        ref={(ref) => {
          const node = ref?.getContext("2d");
          if (node) {
            node.beginPath();
            node.arc(95, 50, 40, 0, 2 * Math.PI);
            node.stroke();
            node.fillStyle = colorState;
            node.fill();
          }
        }}
        onClick={() => {
          setColorState("#ffffff");
        }}
      />
    );
  }
)`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin-right: 1ch;
  cursor: pointer;
`;

const Task = styled(
  ({ className, task }: { className: string; task: iTask }) => (
    <div className={className}>
      <p style={{ color: useContext(ThemeContext).headers }}>
        {task.title}
        <br />
        {task.desc}
      </p>
    </div>
  )
)`
  background-color: blueviolet;
  margin-bottom: 2ch;
`;

const NewStatus = styled.button`
  ${styleColumn}
`;

export default ViewBoard;
