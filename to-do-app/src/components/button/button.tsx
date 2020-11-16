import * as React from "react";
import "./button.css";

type Props = {
  clickHandler: () => void
  text: string
};

export const Button =({text, clickHandler}: Props) => {
  return <button onClick={clickHandler}>{text}</button>;
};
