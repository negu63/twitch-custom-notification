import moment from "moment-timezone";

export const getCurrentTime = () => {
    return moment().tz("Asia/Seoul").toISOString();
  };