import { createContext, useContext } from "react";

// Used by 'useContext()' to match to the correct context provider
const DemoContext = createContext<null | string>("This is only " +
  "used when no corresponding provider is found");

function NotFound() {
  return <>
    <DemoContext.Provider
      value="Since there's a provider this will show for it's children">
      <First />
    </DemoContext.Provider>
    <Second />
  </>;
}

const First = () => <p>{useContext(DemoContext)}</p>;

const Second = () => <p>{useContext(DemoContext)}</p>;

export default NotFound;


