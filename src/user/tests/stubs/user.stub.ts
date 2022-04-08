import { User } from "../../schemas";

export const userStub = (): User => {
  return {
    username: "stub-username",
    password: "stub-password",
  };
};
