export const STREAMER_LIST = [
  // Streamer ID List, not nicknames
  // ex)
  // twitchkr
  ];
  
  export const STREAMS_URL = `${process.env
    .TWITCH_API_BASE_URL!}/streams?${STREAMER_LIST.map(
    (id) => `user_login=${id}`
  ).join("&")}`;
  