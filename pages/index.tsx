import { Flex, Grid } from "theme-ui";
import type { NextPage } from "next";
import Link from "next/link";

import {
  Brand,
  HomeUserManager,
  MainBackground,
  Navbar,
  PlansBanner,
  RoomCreationForm,
} from "~/components";

const DESKTOP_AREAS = `
"nav"
"main"
"content"
"footer"`;

const Home: NextPage = () => {
  return (
    <MainBackground>
      <Grid
        gap={0}
        sx={{
          width: "100vw",
          height: "100vh",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "110px auto 1fr 110px",
          gridTemplateAreas: DESKTOP_AREAS,
          overflow: "hidden",
        }}
      >
        <Flex sx={{ gridArea: "nav" }}>
          <Navbar userManager={<HomeUserManager />} />
        </Flex>
        <Flex
          sx={{
            gridArea: "main",
            flexDirection: ["column", "column", "row", "row"],
            alignItems: ["center", "center", "flex-start", "flex-start"],
            justifyContent: "center",
            alignContent: "center",
            gap: 6,
            px: 4,
            py: 1,
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <Brand sx={{ mt: 3 }} />
            <PlansBanner
              sx={{
                display: ["none", "none", "flex", "none"],
              }}
            />
          </Flex>
          <RoomCreationForm />
          <PlansBanner
            sx={{
              mt: [0, 0, 0, 9],
              alignSelf: ["flex-start", "center"],
              display: ["flex", "flex", "none", "flex"],
            }}
          />
        </Flex>
        <Flex sx={{ gridArea: "content" }}>middle</Flex>
        <Flex sx={{ gridArea: "footer" }}>
          <Link href="/room">vfooter</Link>
        </Flex>
      </Grid>
    </MainBackground>
  );
};

export default Home;
