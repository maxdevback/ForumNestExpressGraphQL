import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PostFetch } from "../../../api/post.fetch";
import { UserFetch } from "../../../api/user.fetch";
import { CommentsFetch } from "../../../api/comments.fetch";
import Comment from "./comment";
import { LikesFetch } from "../../../api/likes.fetch";

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [author, setAuthor] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const addCommentBodyRef = useRef<null | HTMLTextAreaElement>(null);
  const [comments, setComments] = useState<
    null | { comment: any; replays: any[] }[]
  >(null);
  const [page, setPage] = useState<number>(1);
  const changePage = (action: "i" | "d") => {
    if (action === "i") {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };
  const getPost = async (postId: number | string) => {
    const post = await PostFetch.getById(postId);
    setPost(post.body);
  };
  const getAuthor = async (postId: number | string) => {
    const author = await UserFetch.getByPostId(postId);
    setAuthor(author.body);
  };
  const getComments = async (page: number) => {
    if (!id) return;
    const comment = await CommentsFetch.getCommentsByPostIdAndPage(id, page);
    setComments(
      comment.body.map((comment: any) => {
        return { comment: comment, replays: [] };
      }),
    );
  };
  const likePost = async () => {
    const response = await LikesFetch.likePost(id!);
    if (response.status - 200 > 99) {
      alert(JSON.stringify(response.body));
    } else {
      setIsLiked(true);
    }
  };
  const addComment = async () => {
    if (!addCommentBodyRef.current || !id) return;
    const body = addCommentBodyRef.current.value;
    const response = await CommentsFetch.addComment(id, body);
    console.log(response);
    if (response.status - 200 > 99) {
      alert(JSON.stringify(response.body));
    } else {
      await getComments(page);
    }
    addCommentBodyRef.current.value = "";
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      await getAuthor(id);
    })();
    (async () => {
      await getPost(id);
    })();
    (async () => {
      const res = await LikesFetch.isLikedPost(id);
      res.body ? setIsLiked(true) : setIsLiked(false);
    })();
  }, [id]);
  useEffect(() => {
    (async () => {
      await getComments(page);
    })();
  }, [page]);
  return (
    post && (
      <section className="PostPage">
        <h2 className="postTitle">{post.title}</h2>
        <p className="postBody">{post.body}</p>
        <div className="postDetails">
          <span style={{ fontSize: "30px" }} className="likes">
            Likes: {post.roughNumberOfLikes}
          </span>
          {isLiked ? (
            "Already liked"
          ) : (
            <button onClick={likePost} style={{ width: "100px" }}>
              Like
            </button>
          )}
        </div>
        <section className="comments">
          <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
            Comments
          </h2>
          {comments &&
            comments.map(({ comment }: any) => {
              if (!id) return <div></div>;
              return (
                <Comment
                  commentId={comment.id ?? comment._id}
                  body={comment.body}
                  username={comment.username}
                  roughNumberOfLikes={comment.roughNumberOfLikes}
                  hasReplays={comment.hasReplays}
                  postId={id}
                />
              );
            })}
        </section>
        <div className="commentSection">
          <textarea placeholder="Comment" ref={addCommentBodyRef}></textarea>
          <button className="addCommentBtn" onClick={addComment}>
            Add comment
          </button>
        </div>
        <div className="pagination">
          {page > 1 && (
            <button className="prevPageBtn" onClick={() => changePage("d")}>
              Prev page
            </button>
          )}
          <span className="currentPage">{page}</span>
          <button className="nextPageBtn" onClick={() => changePage("i")}>
            Next page
          </button>
        </div>
      </section>
    )
  );
};
