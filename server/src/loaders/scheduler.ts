import { getCurrentTime } from "./../utils/getCurrentTime";
import fetch from "node-fetch";
import schedule from "node-schedule";
import { STREAMS_URL } from "../constants/stream";

const getLiveStreams = async () => {
  const response = await fetch(STREAMS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TWITCH_API_BEARER_TOKEN!}`,
      "Client-Id": process.env.TWITCH_API_CLIENT_ID!,
    },
  });
  const data = await response.json();
  console.info(
    `🔴 ${getCurrentTime()} : ${data.data.length} people are streaming.`
  );

  return data.data;
};

const getStreamsName = (data: any) => {
  return data.map((stream: any) => stream.user_name);
};

const sendPushNotification = async () => {
  // TODO: send push notification logic
};

const job = async () => {
  const liveStreamsData = await getLiveStreams();
  const streamsName = await getStreamsName(liveStreamsData);
  // TODO: 방송켠 사람 목록
  // prev cur 이용해서 prev에 없고 cur에만 있는 사람 알림쏘고 prev = curㅎ ㅏ기
  console.log(streamsName)
};

export default () => {
  schedule.scheduleJob("*/10 * * * * *", async () => await job());
};