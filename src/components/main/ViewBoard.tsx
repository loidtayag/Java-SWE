import { getBoards, getSelectedBoard, getSelectedBoardIndex } from "../../utils/helpers";
import { scrollTheme, textTheme, theme, ThemeContext } from "../../styles/theme.styles";
import { iBoard, iStatus, iTask } from "../../utils/database";
import styled, { css } from "styled-components";
import React, { MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from "react";
import OverlayModal, { ExitModal, ExitModalSubmit, InputModal, LabelModal } from "./OverlayModal";
import CreateStatus from "./CreateStatus";
import ViewTask from "./ViewTask";

const ViewBoard = ({
                     selectedBoard,
                     setSelectedBoard
                   }: {
  selectedBoard: iBoard;
  setSelectedBoard: (value: iBoard) => void;
}) => {
  let statusKey = 0;
  let taskKey = 0;
  let totalStatuses = 0;
  const statusesRef: (HTMLDivElement | null)[] = [];
  const colors = getColors(selectedBoard);
  const [createStatus, setCreateStatus] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const data = useRef({ hack: "", selectedStatus: 0, selectedTask: 0 });
  const why = useRef({
    status: 0,
    task: 0,
    setTaskView: setViewTask
  }).current;
  let [color, setColor] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(0);
  let stupidHack: number[] = [];
  let stupidHackIndex = -1;

  useEffect(() => {
    setDragula(totalStatuses, statusesRef);
  });

  return (
    <Div>
      {selectedBoard.status.map((status: iStatus) => {
        stupidHack.push(0);
        stupidHackIndex += 1;
        if (stupidHackIndex !== 0) {
          stupidHack[stupidHackIndex] = stupidHack[stupidHackIndex - 1] + 1;
        }
        const temp = stupidHack[stupidHackIndex];

        return (
          <Status key={statusKey}>
            <StatusHeader onMouseOver={() => {
              // @ts-ignore
              document.getElementById(`status${temp + 1}`).style.display = "block";
            }} onMouseLeave={() => {
              // @ts-ignore
              document.getElementById(`status${temp + 1}`).style.display = "none";
            }}>
              <StatusColor
                className="foo"
                color={colors[statusKey]}
                statusKey={statusKey++}
                setViewTask={setColor}
                colorState={color}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <p>
                {status.name} ({status.tasks.length})
              </p>
            </StatusHeader>
            <StyledBinStatus id={`status${statusKey}`} temp={temp} selectedBoard={selectedBoard}
                             setSelectedBoard={setSelectedBoard} />
            <Tasks
              className="foo"
              statusesRefs={statusesRef}
              totalStatuses={totalStatuses++}
            >
              {status.tasks.map((task: iTask) => (
                <Task
                  className="foo"
                  task={task}
                  key={taskKey++}
                  onClick={why}
                  selectedBoard={selectedBoard}
                  selectedTask={task}
                  setTaskView={setSelectedBoard}
                />
              ))}
            </Tasks>
          </Status>
        );
      })}
      <NewStatus
        onClick={() => {
          setCreateStatus(true);
        }}
      >
        + Add New Column
      </NewStatus>
      {createStatus && (
        <OverlayModal
          setOverlay={setCreateStatus}
          onSubmit={() => {
            handleCreateStatus(selectedBoard, data);
          }}
        >
          <ExitModal setOverlay={setCreateStatus} />
          <CreateStatus selectedBoard={selectedBoard} data={data} />
        </OverlayModal>
      )}
      {viewTask && (
        <OverlayModal
          setOverlay={setViewTask}
          onSubmit={() => {
            handleViewTask(selectedBoard, why, data);
            setViewTask(false);
          }}
        >
          <ExitModalSubmit />
          <ViewTask
            selectedBoard={selectedBoard}
            selectedTask={selectedBoard.status[why.status].tasks[why.task]}
            data={data}
            why={why}
          />
        </OverlayModal>
      )}
      {color && (
        <ColorWheel
          setOverlay={setColor}
          statusKey={statusKey}
          selectedStatus={selectedStatus}
        />
      )}
    </Div>
  );
};

const StyledBinStatus = ({ id, temp, selectedBoard, setSelectedBoard }: {
  id: string, temp: number; selectedBoard: iBoard;
  setSelectedBoard: (value: iBoard) => void;
}) => {
  return <button
    id={id}
    onMouseOver={() => {
      // @ts-ignore
      document.getElementById(`status${temp + 1}`).style.display = "block";
    }} onMouseLeave={() => {
    // @ts-ignore
    document.getElementById(`status${temp + 1}`).style.display = "none";
  }}
    onClick={() => {
      let i = 0;
      const statusName = document.getElementById(`status${temp + 1}`)?.previousSibling?.textContent?.split(" (")[0];
      if (statusName) {
        let found = false;
        selectedBoard.status.forEach((status) => {
          if (status.name === statusName) {
            selectedBoard.status.splice(i, 1)
            found = true;
          }
          else if (!found) {
            i++
          }
        })
      }
      const newBoards = getBoards();
      newBoards[getSelectedBoardIndex()].status.splice(i, 1)
      localStorage.setItem("boards", JSON.stringify(newBoards))
      setSelectedBoard(newBoards[getSelectedBoardIndex()])
    }
    }
    style={{
      backgroundColor: "inherit",
      border: "none",
      position: "absolute",
      left: "92%",
      top: "3%",
      transform: "translate(-50%, -50%)",
      display: "none",
      opacity: "60%"
    }}
  >
    <img
      src="/delete-subtask.svg"
      alt="Delete subtask"
      style={{
        width: theme.iconSize,
        filter: theme.iconColor,
        cursor: "pointer"
      }}
    />
  </button>;
};

function handleCreateStatus(
  selectedBoard: iBoard,
  data: MutableRefObject<{
    hack: string;
    selectedStatus: number;
    selectedTask: number;
  }>
) {
  const boards = getBoards();
  const index = getSelectedBoardIndex();
  const newStatus = {
    name: data.current.hack,
    tasks: [
      {
        title: "F",
        desc: "G",
        subtasks: []
      }
    ]
  };

  selectedBoard.status.push(newStatus);
  boards[index] = selectedBoard;
  localStorage.setItem("boards", JSON.stringify(boards));

  const colors = getColors(selectedBoard);
  colors.push(theme.clickable);
  localStorage.setItem("colors", JSON.stringify(colors));
}

function handleViewTask(
  selectedBoard: iBoard,
  why: {
    status: number;
    task: number;
    setTaskView: (value: boolean) => void;
  },
  data: MutableRefObject<{
    hack: string;
    selectedStatus: number;
    selectedTask: number;
  }>
) {
  const temp = selectedBoard.status[why.status].tasks[why.task];
  let moveTo = 0;
  let status = data.current.hack;
  while (moveTo !== selectedBoard.status.length) {
    if (selectedBoard.status[moveTo].name === status) {
      break;
    }
    moveTo++;
  }

  if (selectedBoard.status[why.status].name !== status) {
    selectedBoard.status[why.status].tasks.splice(why.task, 1);
    selectedBoard.status[moveTo].tasks.push(temp);
    let newBoards = getBoards();
    newBoards[getSelectedBoardIndex()] = selectedBoard;
    localStorage.setItem("boards", JSON.stringify(newBoards));
  }
  data.current.hack = "";
}

const styleColumn = css`
  margin: 3ch 0 3ch 3ch;
  min-width: 24%;
  max-height: 88%;
`;

function setDragula(
  indexTotalStatuses: number,
  statusesRef: (HTMLDivElement | null)[]
) {
  let dragula = require("react-dragula")();

  /* Adding refs of <Task>s to dragula container */
  for (let i = indexTotalStatuses - 1; i > -1; i--) {
    dragula.containers.push(statusesRef[i]);
  }
  /* Writing to local storage the new index of the moved <Task> */
  dragula.on(
    "drop",
    function(
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
      let toTask = 0;
      let foundToTask = false;

      /* Find where node is dragged from*/
      BUG.status.forEach((status: iStatus) => {
        /* Found where node is dragged from */
        if (status.name === source.parentNode?.textContent?.split(" ")[0]) {
          foundSourceStatus = true;
          let draggedNode = element.children[0].innerHTML
            .split("</p>")[0]
            .split("\">")[2];
          /* Find the selected task */
          status.tasks.forEach((task: iTask) => {
            /* Found the selected task */
            if (task.title === draggedNode) {
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
          /* Only possible since dragula updates the DOM for us and uses that new DOM for thr function parameters */
          let prev = element.previousElementSibling;
          while (prev) {
            prev = prev.previousElementSibling;
            if (!foundToTask) {
              toTask++;
            }
          }
          if (deletedTask) {
            status.tasks.splice(toTask, 0, deletedTask);
          }
        }
      });
      /* Rewriting local storage, no need to set state since dragula already does it */
      const newBoards = getBoards();
      newBoards[getSelectedBoardIndex()] = BUG;
      localStorage.setItem("boards", JSON.stringify(newBoards));
      /* Can't find a way using the dragula docs to make a good workaround for this. Problem is dragula changes the
       * real DOM and if I call "setSelectedBoard()", it causes a white screen crash because React is saying it can't
       * find a child node probably because setState does a checks its virtual DOM which hasn't been updated by
       * dragula unlike the real DOM.
       * */
      window.location.reload();
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
  background-color: ${() => useContext(ThemeContext)?.foreground};
  ${textTheme};
  max-width: 100%;
  ${scrollTheme};
  overflow: auto;
  max-height: 90vh;
`;

const Status = styled.div`
  ${styleColumn};
  position: relative;
`;

const Tasks = styled(
  ({
     className,
     children,
     statusesRefs,
     totalStatuses
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
)`
  ${scrollTheme};
  min-height: 100%;
`;

const StatusHeader = styled.div`
  margin-bottom: 2ch;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 4ch;
`;

const StatusColor = styled(
  ({
     className,
     color,
     setViewTask,
     setSelectedStatus
   }: {
    className: string;
    color: string;
    statusKey: number;
    setViewTask: (value: (prevCheck: boolean) => boolean) => void;
    colorState: boolean;
    selectedStatus: number;
    setSelectedStatus: (value: number) => void;
  }) => {
    return (
      <canvas
        className={className}
        ref={(ref) => {
          const node = ref?.getContext("2d");
          if (node && ref) {
            node.beginPath();
            node.arc(
              ref.width * 0.75,
              ref.height / 2,
              ref.height / 2,
              0,
              2 * Math.PI
            );
            node.stroke();
            node.fillStyle = color;
            node.fill();
          }
        }}
        onClick={(event) => {
          const statusName =
            event.currentTarget.parentNode?.textContent?.split(" ")[0];
          let statusIndex = 0;
          for (
            statusIndex;
            getSelectedBoard().status[statusIndex].name !== statusName;
            statusIndex++
          ) {
          }
          setSelectedStatus(statusIndex);
          setViewTask((prevCheck: boolean) => !prevCheck);
        }}
      />
    );
  }
)`
  width: 6ch;
  height: 3ch;
  border: none;
  cursor: pointer;
  position: relative;
  right: 3ch;
`;

function ColorWheel({
                      setOverlay,
                      statusKey,
                      selectedStatus
                    }: {
  setOverlay: (value: boolean) => void;
  statusKey: number;
  selectedStatus: number;
}) {
  const array: ReactNode[] = [];
  for (let i = 0; i < 256; i += 60) {
    for (let j = 0; j < 256; j += 60) {
      for (let k = 0; k < 256; k += 60) {
        array.push(
          <Pixel
            color={"rgb(" + i + "," + j + "," + k + ")"}
            myKey={i * j * k}
            className="foo"
            setOverlay={setOverlay}
            statusKey={statusKey}
            selectedStatus={selectedStatus}
          >
            OO
          </Pixel>
        );
      }
    }
    array.push(<br />);
  }
  array.push(<p></p>);
  return <Container>{array.map((array) => array)}</Container>;
}

const Container = styled.div`
  // https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Pixel = styled(
  ({
     color,
     myKey,
     children,
     className,
     setOverlay,
     selectedStatus
   }) => {
    return (
      <span
        key={myKey}
        className={className}
        onClick={() => {
          const colors = JSON.parse(localStorage.getItem("colors") as string);
          colors[selectedStatus] = color;
          localStorage.setItem("colors", JSON.stringify(colors));
          setOverlay((prevCheck: boolean) => !prevCheck);
        }}
      >
        {children}
      </span>
    );
  }
)<{
  color: string;
  myKey: number;
  children: ReactNode;
  className: string;
  setOverlay: (value: boolean) => void;
  statusKey: number;
  selectedStatus: number;
}>`
  background-color: ${({ color }) => color};
  color: ${({ color }) => color};
  cursor: pointer;

  :hover {
    caret-color: ${({ color }) => color};
  }
`;

const Task = styled(
  ({ className, task, onClick, selectedBoard, selectedTask, setTaskView }) => {
    const deleteButton = useRef<HTMLButtonElement>(null);
    let containerDiv: HTMLDivElement | null = null;
    const [deleteOverlay, setDeleteOverlay] = useState(false);
    return (
      <>
        <div
          style={{ position: "relative" }}
          onMouseOver={() => {
            if (deleteButton.current && containerDiv) {
              deleteButton.current.style.display = "block";
              containerDiv.style.opacity = "60%";
            }
          }}
          onMouseLeave={() => {
            if (deleteButton.current && containerDiv) {
              deleteButton.current.style.display = "none";
              containerDiv.style.opacity = "100%";
            }
          }}
        >
          <div
            className={className}
            ref={(ref) => {
              ref?.addEventListener("click", () => {
                const find = ref?.innerText.split("\n")[0];
                getTaskIndex(find, onClick, selectedBoard);
                onClick.setTaskView(true);
              });
              containerDiv = ref;
            }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "inherit",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                fontWeight: "inherit"
              }}
            >
              <p
                style={{
                  color: useContext(ThemeContext)?.headers,
                  fontWeight: "inherit"
                }}
              >
                {task.title}
              </p>
              <p style={{ color: theme.textColor, fontWeight: "inherit" }}>
                {getTotalDone(task)} of {task.subtasks.length} done
              </p>
            </button>
          </div>
          <button
            style={{
              backgroundColor: "inherit",
              border: "none",
              position: "absolute",
              left: "92%",
              top: "56%",
              transform: "translate(-50%, -50%)",
              display: "none",
              opacity: "60%"
            }}
            onClick={() => {
              setDeleteOverlay(true);
            }}
            ref={deleteButton}
          >
            <img
              src="/delete-subtask.svg"
              alt="Delete subtask"
              style={{
                width: theme.iconSize,
                filter: theme.iconColor,
                cursor: "pointer"
              }}
            />
          </button>
        </div>
        {deleteOverlay && (
          <DeleteOverlay
            setDeleteOverlay={setDeleteOverlay}
            selectedTask={selectedTask}
            selectedBoard={selectedBoard}
            onClick={onClick}
            setSelectedBoard={setTaskView}
          />
        )}
      </>
    );
  }
)<{
  className: string;
  task: iTask;
  onClick: {
    status: number;
    task: number;
    setTaskView: (value: boolean) => void;
  };
  selectedBoard: iBoard;
  selectedTask: iBoard;
  setTaskView: (value: iBoard) => void;
}>`
  background-color: ${() => useContext(ThemeContext)?.background};
  border-radius: ${theme.curves};
  padding: 1.5ch;
  margin-bottom: 2ch;
  border: none;
  position: relative;
  cursor: grab;
  margin-right: 1rem;
  ${textTheme};
`;

function DeleteOverlay({
                         setDeleteOverlay,
                         selectedTask,
                         onClick,
                         selectedBoard,
                         setSelectedBoard
                       }: {
  setDeleteOverlay: (value: boolean) => void;
  selectedTask: iTask;
  onClick: {
    status: number;
    task: number;
    setTaskView: (value: boolean) => void;
  };
  selectedBoard: iBoard;
  setSelectedBoard: (value: iBoard) => void;
}) {
  return (
    <OverlayModal
      setOverlay={setDeleteOverlay}
      onSubmit={() => {
        getTaskIndex(selectedTask.title, onClick, selectedBoard);
        selectedBoard.status[onClick.status].tasks.splice(onClick.task, 1);
        let boards = getBoards();
        let i = 0;
        while (boards[i].name !== selectedBoard.name) {
          i++;
        }
        boards[i] = selectedBoard;
        localStorage.setItem("boards", JSON.stringify(boards));
        setSelectedBoard(boards[i]);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <ExitModal setOverlay={setDeleteOverlay} />
        <LabelModal style={{ marginBottom: "2ch" }}>
          <p> Press below to confirm deletion of task "{selectedTask.title}"</p>
        </LabelModal>
        <InputModal type="submit" value="Confirm" />
      </div>
    </OverlayModal>
  );
}

function getTaskIndex(
  name: string,
  onClick: {
    status: number;
    task: number;
    setTaskView: (value: boolean) => void;
  },
  selectedBoard: iBoard
) {
  let i = 0;
  let j = 0;
  selectedBoard.status.forEach((status) => {
    status.tasks.forEach((task) => {
      if (task.title === name) {
        onClick.status = i;
        onClick.task = j;
      }
      j++;
    });
    i++;
    j = 0;
  });
}

export function getTotalDone(task: iTask) {
  return task.subtasks.reduce((prev: number, curr: any) => {
    return prev + (curr.finished ? 1 : 0);
  }, 0);
}

const NewStatus = styled.button`
  ${styleColumn};
  margin-right: 3ch;
  ${textTheme};
  font-size: 2rem;
  background-color: ${() => useContext(ThemeContext)?.background};
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 60%;
  }
`;

export default ViewBoard;
