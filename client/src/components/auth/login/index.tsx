import React, { useRef, FormEvent, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import "./style.sass";
import { UserFetch } from "../../../api/user.fetch";
import AuthContext from "../../../contexts/auth.context";

export const LoginPage = () => {
  const formRef = useRef<null | HTMLFormElement>(null);
  const authContext = useContext(AuthContext);
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    const response = await UserFetch.login(data.username, data.password);
    if (response.status.toString()[0] !== "2") {
      alert(JSON.stringify(response.body.message));
    } else {
      authContext?.set(response.body);
    }
  };
  return (
    <section className="LoginPage">
      <Form ref={formRef} onSubmit={(e) => login(e)} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
          Login
        </Button>
      </Form>
    </section>
  );
};
