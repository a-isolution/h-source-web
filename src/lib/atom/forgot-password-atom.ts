import { atom } from "jotai";

interface ForgotPasswordState {
  email: string;
  code: string;
  password: string;
}

export const forgotPasswordAtom = atom<ForgotPasswordState>({
  email: "",
  code: "",
  password: "",
});
