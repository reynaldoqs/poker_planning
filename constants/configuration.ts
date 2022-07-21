export const AUTH_PROVIDERS = {
  facebook: "facebook",
  google: "google",
  browser: "browser",
  github: "github",
} as const;

export const AVATAR_PROVIDER = "https://avatars.dicebear.com/api/open-peeps/";

export const BOARD_STATUS = [
  "INIT",
  "VOTING",
  "SHOW_RESULTS",
  "PREPARE_NEXT_ROUND",
] as const;
// countdown depends on client at 100%
// INIT: state to show everything before to start playing tutorial or something similar (not used yet)
// VOTING: state to show the board and start the game
// SHOW_RESULTS: state to show the results of the game
// PREPARE_NEXT_ROUND: state to show the results of the game and prepare for the next round

export const ISSUE_STATUS = ["TODO", "IN_PROGRESS", "DONE"] as const;

export const MANAGE_OPTIONS = ["OWNER", "ANYONE"] as const;

export const VOTE_TYPES = ["NUMBER", "STRING"] as const;

export const PLAYER_STATUS = ["CONNECTED", "DISCONNECTED", "LEFT"] as const;

export const PLAYER_TYPES = ["PLAYER", "OBSERVER"] as const;

export const AVAILABLE_REACTIONS = ["LIKE", "DISLIKE"] as const;

export const DECK_CARDS = [
  {
    label: "Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55)",
    value: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55"],
  },
  {
    label: "Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64 )",
    value: ["0", "1", "2", "4", "8", "16", "32", "64"],
  },
];
