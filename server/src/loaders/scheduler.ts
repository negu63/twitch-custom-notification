import fetch from "node-fetch";
import schedule from "node-schedule";
import admin from "firebase-admin";
import { Stream } from "../types/stream";
import { TopicMessage } from "../types/message";
import { STREAMS_URL } from "../constants/stream";
import { GET_STREAMS_INTERVAL_SECOND } from "../constants/interval";
import { getCurrentTime } from "./../utils/getCurrentTime";
import { app } from "./../utils/firebase";

const isDryRun = false;
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

const generateMessage = (stream: Stream): TopicMessage => {
  return {
    webpush: {
      notification: {
        title: `twitch-custom-notification`,
        body: `${stream.user_name}님이 방송을 시작했습니다.`,
        // icon:
        // badge:
      },
      fcmOptions: {
        link: `twitch://stream/${stream.user_login}`,
      },
    },
    topic: stream.user_login,
  };
};

const sendTopicPushNotification = async (message: TopicMessage) => {
  return admin
    .messaging(app)
    .send(message, isDryRun)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

const job = async () => {
  const liveStreamsData = await getLiveStreams();
  const onStreamsId = getOnStreamsId(liveStreamsData);

  if (!onStreamsId.length) return;

  const onStreams = getOnStreams(liveStreamsData, onStreamsId);
  const messages = onStreams.map((stream) => generateMessage(stream));
  await Promise.allSettled(
    messages.map((message) => sendTopicPushNotification(message))
  );
};

export default () => {
  try {
    schedule.scheduleJob(
      `*/${GET_STREAMS_INTERVAL_SECOND} * * * * *`,
      async () => await job()
    );
  } catch (err) {
    console.error(err);
  }
};
