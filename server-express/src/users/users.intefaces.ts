export interface IRegister {
  username: string;
  email: string;
  password: string;
  v?: "v1.1" | "v1.2";
}
