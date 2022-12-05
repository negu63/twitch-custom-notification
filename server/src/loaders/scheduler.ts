import { getCurrentTime } from "./../utils/getCurrentTime";
import fetch from "node-fetch";
import schedule from "node-schedule";
import { STREAMS_URL } from "../constants/stream";

let prevStreamsId: String[] = [];

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

const getCurStreamsId = (data: any[]): String[] => {
  return data.map((stream) => stream.user_login);
};

const getOnStreams = (data: any[]) => {
  const curStreamsId = getCurStreamsId(data);
  const onStreamsId = curStreamsId.filter((id) => !prevStreamsId.includes(id));
  prevStreamsId = curStreamsId;

  return onStreamsId;
};

const sendPushNotification = async (onStreams: String[]) => {
  // TODO: send push notification logic
};

const job = async () => {
  const liveStreamsData = await getLiveStreams();
  const onStreams = getOnStreams(liveStreamsData);
};

export default () => {
  schedule.scheduleJob("*/5 * * * * *", async () => {
    await job();
  });
};
