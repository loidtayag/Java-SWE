import React from "react";
import { Text } from "./Button.style";

function Button({ className, desc }: { className: string; desc: String }) {
  return (
    <button className={className}>
      <Text>{desc}</Text>
    </button>
  );
}

export default Button;
