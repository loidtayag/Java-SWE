export interface iBoard {
  name: string;
  id: number;
  status: iStatus[];
}

export interface iStatus {
  name: string;
  tasks: iTask[];
}

export interface iTask {
  title: string;
  desc: string;
  subtasks: iSubtask[];
}

export interface iSubtask {
  desc: string;
  finished: boolean;
}
