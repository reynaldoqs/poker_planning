import { Form } from "@remix-run/react";

import { useUserAuth } from "~/context";

export const LogoutButton: React.FC = () => {
  const { signOutFromBrowser } = useUserAuth();
  return (
    <Form action="logout" method="post">
      <button onClick={signOutFromBrowser}>logout</button>
    </Form>
  );
};
