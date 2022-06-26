import { useState } from "react";

import { useUserAuth } from "~/context";

export const BrowserAuthForm: React.FC = () => {
  const { signInWithBrowser } = useUserAuth();
  const [userName, setUserName] = useState("");
  return (
    <>
      <input
        type="text"
        name="name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={() => signInWithBrowser(userName)}>login</button>
    </>
  );
};
