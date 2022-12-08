#  <div align=center> twitch-custom-notification 🔔</div>

<div align=center>
When a client subscribes to a streamer registered on the server,

it is a server that sends a notification through FCM according to the status.

Built to help with Twitch push notifications that sometimes don't come or come late.
</div>

## Getting Started

### Requirements

- Node.js
- Twitch API Account
- Firebase (for firebase cloud messaging)
- MongoDB (for <a href="https://firebase.google.com/docs/cloud-messaging/manage-tokens" target="_blank">token management</a>)

### Add .env

```
/server/.env

MONGODB_URI=<MongoDB_URI>
PORT=<Port number>
TWITCH_API_CLIENT_ID=<Twitch API Client Id>
TWITCH_API_BEARER_TOKEN=<Twitch API Bearer Token>
TWITCH_API_BASE_URL=https://api.twitch.tv/helix
```

<a href="https://dev.twitch.tv/docs/api/get-started" target="_blank">How to get client id and bearer token ?</a>

### Add firebase service account key

```
/server/serviceAccountKey.json
```

<a href="https://firebase.google.com/docs/cloud-messaging/js/client" target="_blank">How to get this ?</a>

### Install

```bash
# /server
$ yarn install
```

### Run

```bash
# /server
$ yarn start
```

## API

### [GET] /health

You can check if the server is running normally.

### [POST] /api/token/registration

Register the fcm token generated by the client.

```json
Request Body
{
    token: String
}
```

### [POST] /api/token/subscribe

Set up to receive streamer notifications of listings sent by client.

```json
Request Body
{
    token: String
    topics: String[]
}
```
