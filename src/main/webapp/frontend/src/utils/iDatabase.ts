export interface iDatabase {
  boards: iBoard[];
}

export interface iBoard {
  name: string;
  id: number;
  status?: iStatus[] | null;
}

export interface iStatus {
  name: string;
  tasks?: iTask[] | null;
}

export interface iTask {
  title: string;
  desc: string;
  subtasks?: iSubtask[] | null;
}

export interface iSubtask {
  desc: string;
  finished: boolean;
}
