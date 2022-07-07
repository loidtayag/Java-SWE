import React from "react";

export class Blog {
  author: string;
  title: string;
  description: string;
  id: string | number;

  constructor(
    author: string,
    title: string,
    description: string,
    id: string | number
  ) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.id = id;
  }
}

const Blogs = ({
  blogs,
  handleDelete,
}: {
  blogs: Blog[];
  handleDelete: (id: string | number) => void;
}) => {
  return (
    <div>
      {blogs.map((blog: Blog) => (
        <article key={blog.id}>
          {blog.title}
          <br />
          Written by {blog.author}
          <br />
          <button onClick={() => handleDelete(blog.id)}>Delete blog</button>
          <br />
          <br />
        </article>
      ))}
    </div>
  );
};

export default Blogs;
