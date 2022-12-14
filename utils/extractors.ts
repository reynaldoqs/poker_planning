import { KeyboardEvent } from "react";

import {
  faGoogle,
  faGithub,
  faFacebook,
  faChrome,
  faFirefoxBrowser,
  faEdge,
  faEdgeLegacy,
  faSafari,
  faOpera,
} from "@fortawesome/free-brands-svg-icons";

import { AUTH_PROVIDERS } from "~/constants";
import type { Room } from "~/types";

export const extractParticipant = (room: Room, playerId: string) => {
  return room.players.find((p) => p.playerId === playerId);
};

const extractBrowserIcon = () => {
  const userAgent = navigator.userAgent;

  if ((userAgent.indexOf("Opera") || userAgent.indexOf("OPR")) != -1) {
    return faOpera;
  }
  if (userAgent.indexOf("Edg") != -1) {
    return faEdge;
  }
  if (userAgent.indexOf("Chrome") != -1) {
    return faChrome;
  }
  if (userAgent.indexOf("Safari") != -1) {
    return faSafari;
  }
  if (userAgent.indexOf("Firefox") != -1) {
    return faFirefoxBrowser;
  }
  return faEdgeLegacy;
};

export const extractProviderIcon = (provider?: keyof typeof AUTH_PROVIDERS) => {
  if (!provider) return faEdgeLegacy;

  if (provider === "facebook") return faFacebook;
  if (provider === "github") return faGithub;
  if (provider === "google") return faGoogle;

  return extractBrowserIcon();
};

export const keyPressedTrigger = (key: string, cb: () => void) => {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === key) {
      cb();
    }
  };
};
