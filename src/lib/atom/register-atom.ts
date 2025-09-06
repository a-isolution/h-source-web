import { atom } from "jotai";

interface RegisterState {
  email: string;
  password: string;
  phone: string;
}

export const registerAtom = atom<RegisterState>({
  email: "",
  password: "",
  phone: "",
});
