/* http://jvilk.com/MakeTypes/ */
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

// {
//   "boards":[
//   {
//     "name":"Demo1",
//     "id":1,
//     "status":[
//       {
//         "name":"TODO",
//         "tasks":[
//           {
//             "title":"A",
//             "desc":"B"
//           }
//         ]
//       },
//       {
//         "name":"DOING",
//         "tasks":[
//           {
//             "title":"C",
//             "desc":"D"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "name":"Demo2",
//     "id":2,
//     "status":[
//       {
//         "name":"TODO",
//         "tasks":[
//           {
//             "title":"E",
//             "desc":"F"
//           }
//         ]
//       },
//       {
//         "name":"DOING",
//         "tasks":[
//           {
//             "title":"G",
//             "desc":"H"
//           }
//         ]
//       }
//     ]
//   }
// ]
// }
