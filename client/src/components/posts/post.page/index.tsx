import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostFetch } from "../../../api/post.fetch";
import { UserFetch } from "../../../api/user.fetch";

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<null | object>(null);
  const [author, setAuthor] = useState<null | object>(null);
  const getPost = async (postId: number) => {
    const post = await PostFetch.getById(postId);
    setPost(post.body);
  };
  const getAuthor = async (postId: number) => {
    const author = await UserFetch.getByPostId(postId);
    setAuthor(author.body);
  };
  useEffect(() => {
    if (!id) return;
    (async () => {
      await getAuthor(+id);
    })();
    (async () => {
      await getPost(+id);
    })();
  }, [id]);
  return (
    <section className="PostPage">
      <h2 className="postTitle">Title</h2>
      <p className="postBody">body</p>
      <div className="postDetails">
        <span className="likes">Likes: 0</span>
      </div>
      <section className="comments"></section>
      <div className="commentSection">
        <textarea placeholder="Добавить комментарий"></textarea>
        <button className="addCommentBtn">Add comment</button>
      </div>
      <div className="pagination">
        <button className="prevPageBtn">Prev page</button>
        <span className="currentPage">1</span>
        <button className="nextPageBtn">Next page</button>
      </div>
    </section>
  );
};
