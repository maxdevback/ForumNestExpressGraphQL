import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { hash, compare } from "bcrypt";
import { UsersRepositoryV1_1 } from "./users.repository";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const hashedPassword = await hash(password, 15);
        const newUser = await UsersRepositoryV1_1.signup(
          username,
          hashedPassword
        );
        done(null, { username, id: newUser.id });
      } catch (err: any) {
        done(null, false, err);
      }
    }
  )
);
passport.use(
  "login",
  new localStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await UsersRepositoryV1_1.getUserByUsername(username);
        if (!(await compare(password, user.password))) {
          done(null, false, { message: "Password is wrong" });
        }
        done(null, { username, id: user.id });
      } catch (err: any) {
        done(null, false, err);
      }
    }
  )
);

// class UsersServiceClassV1_1 {
//   async signup(email: string, username: string, password: string) {}
//   async login(username: string, password: string) {}
// }

// class UsersServiceClassV1_2 {
//   hello() {}
// }

// export const UsersServiceV1_1 = new UsersServiceClassV1_1();
// export const UsersServiceV1_2 = new UsersServiceClassV1_2();
