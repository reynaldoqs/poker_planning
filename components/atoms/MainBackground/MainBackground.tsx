import { Flex } from "theme-ui";

export const MainBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Flex
    sx={{
      height: "100vh",
      width: "100vw",
      backgroundColor: "backgroundDark",
      // backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231a1d2a'/%3E%3Cstop offset='1' stop-color='%231a1d2a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23171a24'/%3E%3Cstop offset='1' stop-color='%23171a24' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%2311141c'/%3E%3Cstop offset='1' stop-color='%2311141c' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23212431'/%3E%3Cstop offset='1' stop-color='%23212431' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23141722'/%3E%3Cstop offset='1' stop-color='%23141722' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230E1016'/%3E%3Cstop offset='1' stop-color='%230E1016' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E")`,
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      flexDirection: "column",
    }}
  >
    {children}
  </Flex>
);

// source: https://www.svgbackgrounds.com/
