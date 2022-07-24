import myData from "./db.json";

interface Board {
  id: number;
  name: string;
}

function Boards(props: any) {
  return (
    <nav>
      {myData.map((data: Board) => {
        console.log(props.demo);
        return <li key={data.id}>{data.name}</li>;
      })}
    </nav>
  );
}

export default Boards;
