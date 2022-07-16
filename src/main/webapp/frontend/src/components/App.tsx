import { FormEvent, useEffect, useState } from "react";
import GlobalStyles from "./global.styles";
import Blogs, { Blog } from "./Blogs";
import { NestableButton, StandaloneButton, Text } from "./button.style";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Demo from "./Demo";
import Demos from "./Demos";
import NotFound from "./NotFound";

function App() {
  let [name, setName] = useState("undefined");

  function changeName() {
    setName("Hello Jack");
  }

  let [blogs, setBlogs] = useState([
    new Blog("Jim Bob", "Gaming as a career", "...", 1),
    new Blog("Christopher Columbus", "How to get away with murder", "...", 2),
  ]);

  function handleDelete(id: string | number): void {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  }

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  useEffect(() => {
    setTimeout(
      () =>
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setIsLoading(false);
          }),
      2000
    );
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Mario");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const blog = { title, body, author };

    fetch("http://localhost:3080", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => console.log("New blog added"));
  }

  return (
    <div>
      <BrowserRouter>
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
        <br />
        <br />
        <NestableButton
          className="why"
          desc="I also love programming"
          bgColor="blue"
        ></NestableButton>
        {isLoading && <p>Loading...</p>}
        <nav>
          <Link to="/demo">Demo</Link>
          <Link to="/demo1/:id">Demo1</Link>
        </nav>
        <div>
          <Routes>
            <Route path="/demo" element={<Demo />} />
            <Route path="/demo1/:id" element={<Demos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <h2>Edit blog</h2>
        <form onSubmit={handleSubmit}>
          <label>Add a new blog</label>
          <br />
          <p>Blog title</p>
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <p>Blog body</p>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
          <br />
          <p>Blog author</p>
          <select
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          >
            <option value="Mario">Mario</option>
            <option value="Luigi">Luigi</option>
          </select>
          <br />
          <button>Add blog</button>
        </form>
      </BrowserRouter>
    </div>
  );
}

export default App;
