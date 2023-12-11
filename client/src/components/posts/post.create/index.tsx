import React, { FormEvent, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { PostFetch } from "../../../api/post.fetch";

export const PostCreate = () => {
  const formRef = useRef<null | HTMLFormElement>(null);
  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data: any = Object.fromEntries(formData);
    const newPost = await PostFetch.create(data.title, data.body);
    console.log(newPost);
  };
  return (
    <section className="RegisterPage">
      <Form ref={formRef} onSubmit={(e) => create(e)} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            //TODO: Change length
            minLength={40}
            maxLength={200}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            required
            type="text"
            name="body"
            //TODO: Change length
            minLength={200}
            maxLength={10000}
            placeholder="Enter body"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </section>
  );
};
