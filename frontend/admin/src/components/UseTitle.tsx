import { useEffect } from "react";

export const UseTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Infinyte`;
  }, [title]);
};
