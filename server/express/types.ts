declare namespace Express {
  interface Request {
    session: {
      user: { _id: string; username: string } | null;
    };
  }
}
