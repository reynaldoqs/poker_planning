import GoogleOneTapLogin from "react-google-one-tap-login";
import print from "consola";

import { useUserAuth } from "~/context";
import { googleAccToUser } from "./googleOneTap.helper";

export const GoogleOneTap: React.FC = () => {
  const { user, oneTapSignIn } = useUserAuth();
  if (typeof window === "undefined" || user) return null;

  const onSuccessHandler = (res: any) => {
    oneTapSignIn(googleAccToUser(res));
  };

  return (
    <GoogleOneTapLogin
      googleAccountConfigs={{
        client_id: process.env.NEXT_PUBLIC_ONE_TAP_CLIENT_ID || "",
      }}
      onError={(error) => {
        print.error(error);
      }}
      onSuccess={onSuccessHandler}
    />
  );
};
