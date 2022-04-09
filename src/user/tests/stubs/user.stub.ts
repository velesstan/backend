import { User } from "../../model";

export const userStub = (): User => {
  return {
    username: "stub-username",
    password: "stub-password",
  };
};
