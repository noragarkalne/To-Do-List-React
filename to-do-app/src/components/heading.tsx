import * as React from "react";


type Props = {
  label: string;
}

export const Heading = ({ label }: Props) => {
  return <h1>{label}</h1>;
};