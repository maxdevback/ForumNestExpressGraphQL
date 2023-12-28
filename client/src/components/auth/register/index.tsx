import React, { useEffect, useRef, FormEvent, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.sass";
import { UserFetch } from "../../../api/user.fetch";
import AuthContext from "../../../contexts/auth.context";

export const RegisterPage = () => {
  const formRef = useRef<null | HTMLFormElement>(null);
  const authContext = useContext(AuthContext);
  async function register(e: FormEvent<HTMLFormElement>) {
    if (!formRef.current)
      return alert("Ops, something went wrong, please reload the page");
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const response = await UserFetch.register(
      data.username,
      data.email,
      data.password,
    );
    if (response.status.toString()[0] !== "2") {
      alert(JSON.stringify(response.body.message));
    } else {
      authContext?.set(response.body);
    }
  }
  return (
    <section className="RegisterPage">
      <Form ref={formRef} onSubmit={(e) => register(e)} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            minLength={10}
            maxLength={100}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            minLength={4}
            maxLength={20}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            minLength={6}
            maxLength={100}
            placeholder="Password"
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </section>
  );
};
