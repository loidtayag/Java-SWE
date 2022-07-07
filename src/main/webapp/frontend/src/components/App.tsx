import React from "react";
import GlobalStyles from "./Global.styles";
import Blogs, { Blog } from "./Blogs";
import { NestableButton, StandaloneButton, Text } from "./Button.style";

function App() {
  let [name, setName] = React.useState("undefined");

  function changeName(event: React.MouseEvent<HTMLButtonElement>) {
    setName("Hello Jack");
  }

  let [blogs, setBlogs] = React.useState([
    new Blog("Jim Bob", "Gaming as a career", "...", 1),
    new Blog("Christopher Columbus", "How to get away with murder", "...", 2),
  ]);

  function handleDelete(id: string | number): void {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  }

  React.useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  return (
    <div>
      <GlobalStyles />
      <button onClick={changeName}>Change name</button>
      <p id="name">Hello {name}</p>
      <Blogs blogs={blogs} handleDelete={handleDelete} />
      <Blogs
        blogs={blogs.filter((blog): boolean => blog.author === "Jim Bob")}
        handleDelete={handleDelete}
      />
      <StandaloneButton bgColor="red">
        <Text>I love programming</Text>
      </StandaloneButton>
      <NestableButton
        desc="I also love programming"
        bgColor="red"
      ></NestableButton>
    </div>
  );
}

export default App;
