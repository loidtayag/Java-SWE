import { createContext, useContext } from "react";
import { css } from "styled-components";

export const ThemeContext = createContext<null | {
  headers: string;
  foreground: string;
  background: string;
  form: string;
}>(null);

export const theme = {
  iconSize: "2.5rem",
  iconColor:
    "invert(60%) sepia(11%) saturate(294%) hue-rotate(195deg) brightness(92%) contrast(89%)",
  clickable: "#6660ca",
  textSize: "1.3rem",
  textWeight: 600,
  textColor: "#9da9b4",
  curves: "0.7rem",
  light: {
    headers: "#000000",
    foreground: "#CBE4F9",
    background: "#e9eefc",
    form: "#b4ebff"
  },
  dark: {
    headers: "#ffffff",
    foreground: "#21212d",
    background: "#2c2c38",
    form: "#00212d"
  }
};

export const textTheme = css`
  color: ${theme.textColor};
  font-size: ${theme.textSize};
  font-weight: ${theme.textWeight};
`;

export const iconTheme = css`
  width: ${theme.iconSize};
  filter: ${theme.iconColor};
`;

export const scrollTheme = css`
  overflow: auto;

  ::-webkit-scrollbar {
    width: 1rem;
    max-height: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${() => useContext(ThemeContext)?.foreground};
    box-shadow: 0 0 20rem rgba(0, 0, 0, 0.2) inset;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-image: -webkit-gradient(linear,
    left top,
    left bottom,
    color-stop(0.85, rgb(122, 153, 217)),
    color-stop(0.5, rgb(73, 125, 189)),
    color-stop(0.25, rgb(43, 75, 172)));
  }
`;