import { ThemeProvider } from "theme-ui";
import type { AppProps } from "next/app";

import { AuthProviderWrapper } from "~/context";
import { theme } from "~/styles";
import "../styles/globals.css";
import { GoogleOneTap } from "~/components";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProviderWrapper session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        {/* <ToastContainer
            position="bottom-left"
            pauseOnHover
            hideProgressBar
            closeButton={false}
            autoClose={2000}
            theme="dark"
            icon={false}
          /> */}
      </ThemeProvider>
      <GoogleOneTap />
    </AuthProviderWrapper>
  );
}

export default MyApp;
