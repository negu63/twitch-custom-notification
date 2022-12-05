export interface TopicMessage {
  webpush: {
    notification: {
      title: string;
      body: string;
      // icon:
      // badge:
    };
    fcmOptions: {
      link: string;
    };
  };
  topic: string;
}
