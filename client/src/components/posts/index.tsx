import React, { useEffect, useRef, useState } from "react";
import { PostFetch } from "../../api/post.fetch";
import { PostCard } from "./posts.card";
import "./style.sass";

export const Posts = () => {
  const [posts, setPosts] = useState<null | any[]>(null);
  const [page, setPage] = useState(1);
  const authorIdInput = useRef<null | HTMLInputElement>(null);
  const [isAuthorInputShowed, setIsAuthorInputShowed] =
    useState<boolean>(false);
  const [searchType, setSearchType] = useState<"all" | "my" | "author">("all");
  const showAuthorIdInput = () => {
    if (isAuthorInputShowed) return;
    setIsAuthorInputShowed(true);
    setSearchType("author");
  };
  const closeAuthorIdInput = (type: "all" | "my") => {
    if (isAuthorInputShowed) setIsAuthorInputShowed(false);
    setSearchType(type);
    console.log(type);
  };
  const fetchPosts = async () => {
    switch (searchType) {
      case "all":
        return setPosts((await PostFetch.getByPage(page)).body);
      case "author":
        if (!authorIdInput.current) return;
        return setPosts(
          (await PostFetch.getByAuthorId(+authorIdInput.current!.value, page))
            .body
        );
      case "my":
        return setPosts((await PostFetch.getMy(page)).body);
    }
  };
  const changePage = (action: "i" | "d") => {
    if (action === "i") {
      setPage(page + 1);
    } else {
      if (page <= 1) return;
      setPage(page - 1);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [page]);
  return (
    <>
      <div>
        Type:
        <br />
        <label>All</label>
        <input
          onClick={() => closeAuthorIdInput("all")}
          name="type"
          defaultChecked
          type="radio"
        />
        <br />
        <label>My</label>
        <input
          onClick={() => closeAuthorIdInput("my")}
          name="type"
          type="radio"
        />
        <br />
        <label>Author</label>
        <input onClick={showAuthorIdInput} name="type" type="radio" />
        <br />
        {isAuthorInputShowed && (
          <input ref={authorIdInput} placeholder="author id" />
        )}
        <button onClick={fetchPosts}>Search</button>
      </div>
      <section className="PostsPage">
        {posts
          ? posts.map((post) => {
              return <PostCard body={post} />;
            })
          : "Null"}
      </section>
      <div className="changePage">
        <button onClick={() => changePage("d")}>-</button> {page} page{" "}
        <button onClick={() => changePage("i")}>+</button>
      </div>
    </>
  );
};
