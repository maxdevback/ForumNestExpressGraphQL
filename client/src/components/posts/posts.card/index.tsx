import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PostCard = (props: any) => {
  console.log(props.body);
  return (
    <Card className="post">
      <Card.Body>
        <Card.Title>{props.body.title}</Card.Title>
        <Card.Text className="body">
          {props.body.body.slice(0, 100)}...
        </Card.Text>
        <Card.Text>
          Likes: {props.body.roughNumberOfLikes}. Has comments:{"  "}
          {props.body.hasComments ? "Yes" : "No"}
        </Card.Text>
        <Card.Link>
          <Link to={`/post/${props.body.id}`}>Post page</Link>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
