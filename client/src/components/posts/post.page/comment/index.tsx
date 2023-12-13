import React, { useEffect, useRef, useState } from "react";
import "./style.sass"; // Import your stylesheet
import { CommentsFetch } from "../../../../api/comments.fetch";
import { LikesFetch } from "../../../../api/likes.fetch";

const Comment = ({
  username,
  postId,
  commentId,
  roughNumberOfLikes,
  body,
  hasReplays,
}: {
  username: string;
  postId: number;
  commentId: number;
  roughNumberOfLikes: number;
  body: string;
  hasReplays: boolean;
}) => {
  const [isReplayFieldActive, setIsReplayFieldActive] = useState(false);
  const replayInputRef = useRef<null | HTMLInputElement>(null);
  const [replays, setReplays] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const replay = async () => {
    const response = await CommentsFetch.replay(
      postId,
      replayInputRef.current?.value!,
      commentId
    );
    console.log(response);
  };
  const getReplays = async () => {
    const response = await CommentsFetch.getReplaysByCommentId(
      postId,
      commentId,
      1
    );
    console.log(response);
    setReplays(response.body);
  };
  const likeComment = async () => {
    const response = await LikesFetch.likeComment(commentId);
    console.log(response);
  };
  useEffect(() => {
    (async () => {
      const response = await LikesFetch.isLikedComment(commentId);
      console.log(response);
      response.body ? setIsLiked(true) : setIsLiked(false);
    })();
  }, []);
  return (
    <div className="commentContainer">
      <div className="commentHeader">
        <span className="username">{username}</span>
        <div className="right">
          <span className="likes">Likes: {roughNumberOfLikes}</span>
          {isLiked ? (
            <span>Already liked</span>
          ) : (
            <button onClick={likeComment}>Like</button>
          )}
          {hasReplays && !replays[0] && (
            <button onClick={getReplays}>Get replays</button>
          )}
          {replays[0] && (
            <button
              style={{ background: "red" }}
              onClick={() => setReplays([])}
            >
              Close replays
            </button>
          )}
          {!isReplayFieldActive && (
            <button onClick={() => setIsReplayFieldActive(true)}>Replay</button>
          )}
        </div>
        {isReplayFieldActive && (
          <>
            <div>
              <input ref={replayInputRef} />
              <button onClick={replay}>send</button>
              <button
                style={{ background: "red" }}
                onClick={() => setIsReplayFieldActive(false)}
              >
                close
              </button>
            </div>
          </>
        )}
        {replays[0] && (
          <div>
            {replays.map((replay) => {
              return (
                <div>
                  {
                    <Comment
                      body={replay.body}
                      postId={postId}
                      commentId={replay.id}
                      roughNumberOfLikes={replay.roughNumberOfLikes}
                      username={replay.username}
                      hasReplays={replay.hasReplays}
                    />
                  }
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="commentBody">{body}</div>
    </div>
  );
};

export default Comment;
