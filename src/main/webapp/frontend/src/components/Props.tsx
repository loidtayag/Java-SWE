import React from "react";

export class blog {
  author: String;
  title: String;
  description: String;
  id: Number;


  constructor(author: String, title: String, description: String, id: Number) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.id = id;
  }
}

let Props = ({blogs, title} : {blogs: blog[], title: String}) => {
    return (
        <div className="blog-list">
            <h2>{ title }</h2>
            {blogs.map(blog => (
                <div className="blog-preview">
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                </div>
            ))}
        </div>
    );

}

export default Props;