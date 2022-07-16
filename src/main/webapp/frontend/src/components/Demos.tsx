import { useParams } from "react-router-dom";

function Demos() {
  const { id } = useParams();

  return (
    <div>
      <p>URL contains {id}</p>
    </div>
  );
}

export default Demos;
