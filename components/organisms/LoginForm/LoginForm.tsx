import { Flex } from "theme-ui";

import { useUserAuth } from "~/context";
import { Typography } from "~/components/atoms";
import { BrowserAuthForm, SocialButton } from "~/components/molecules";

export const LoginForm: React.FC = () => {
  const { signIn } = useUserAuth();

  return (
    <Flex
      sx={{
        px: 4,
        py: 5,
        borderRadius: 4,
        bg: "background",
      }}
    >
      <Flex sx={{ flexDirection: "column", textAlign: "center", p: 3 }}>
        <Typography variant="subtitle" color="textLight">
          Login
        </Typography>
        <Typography variant="body1" mt="3">
          Lorem ipsum dolor sit amet consectetur.
        </Typography>
        <BrowserAuthForm
          onLogin={(userName) => {
            signIn("browser", userName);
          }}
          mt="5"
        />
        <Typography variant="body1" mt="5">
          or continue with:
        </Typography>
        <SocialButton
          onLogin={signIn}
          provider="github"
          label="Github "
          mt="4"
        />
        <SocialButton onLogin={signIn} provider="google" label="Google" />
        <SocialButton onLogin={signIn} provider="facebook" label="Facebook" />
      </Flex>
    </Flex>
  );
};
