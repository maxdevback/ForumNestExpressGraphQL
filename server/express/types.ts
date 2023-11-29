declare namespace Express {
  interface Request {
    session: {
      user: { id: string; username: string };
    };
  }
}
