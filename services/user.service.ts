import axios from "axios";
import { instance } from "./instance";
import { toast } from "sonner";

export type RegisterUserType = {
  username: string;
  password: string;
};

export const registerUser = async (payload: RegisterUserType) => {
  const { username, password } = payload;
  try {
    return await instance.post("/user/register", {
      username,
      password,
    });
  } catch (error) {
    throw new Error(error.code)
  }
};
