/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Express {
  interface Request {
    session: {
      user: { _id: string; username: string } | null;
    };
  }
}
