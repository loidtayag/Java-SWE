import { createContext } from "react";

export const ThemeContext = createContext<null | {
  headers: string;
  foreground: string;
  background: string;
  form: string;
}>(null);

export const OnlineContext = createContext<boolean>(false);