import fetch from "node-fetch";
import schedule from "node-schedule";
import { Stream } from "../types/stream";
import { STREAMS_URL } from "../constants/stream";
import { getCurrentTime } from "./../utils/getCurrentTime";

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

const getCurStreamsId = (data: Stream[]): String[] => {
  return data.map((stream) => stream.user_login);
};

const getOnStreamsId = (data: Stream[]) => {
  const curStreamsId = getCurStreamsId(data);
  const onStreamsId = curStreamsId.filter((id) => !prevStreamsId.includes(id));
  prevStreamsId = curStreamsId;
  onStreamsId.length && console.info(`🟢 <${onStreamsId.join(", ")}> Bang On`);

  return onStreamsId;
};

const getOnStreams = (data: Stream[], onStreamsId: String[]) => {
  return data.filter((stream) => onStreamsId.includes(stream.user_login));
};
  // TODO: send push notification logic
};

const job = async () => {
  const liveStreamsData = await getLiveStreams();
  const onStreamsId = getOnStreamsId(liveStreamsData);

  if (!onStreamsId.length) return;

  const onStreams = getOnStreams(liveStreamsData, onStreamsId);
};

export default () => {
  schedule.scheduleJob("*/5 * * * * *", async () => {
    await job();
  });
};
