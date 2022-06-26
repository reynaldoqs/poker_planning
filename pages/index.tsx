import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useUserAuth } from "~/context";

const Home: NextPage = () => {
  const { user, signIn, signOut } = useUserAuth();
  return (
    <div>
      <small>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </small>
      Audimancer
      <section>
        <button onClick={() => signIn("github")}>Login with github</button>
        <button onClick={() => signIn("google")}>Login with google</button>
        <button onClick={() => signIn("browser", "Audimancer")}>
          Login with browser
        </button>
        <button onClick={() => signOut()}>Log out</button>
      </section>
    </div>
  );
};

export default Home;
