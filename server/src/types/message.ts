export interface TopicMessage {
  webpush: {
    notification: {
      title: String;
      body: String;
      // icon:
      // badge:
    };
  };
  fcmOptions: {
    link: String;
  };
  topic: String;
}
