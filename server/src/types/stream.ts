interface Stream {
  id: String;
  user_id: String;
  user_login: String;
  user_name: String;
  game_id: String;
  game_name: String;
  type: String;
  title: String;
  viewer_count: Number;
  started_at: String;
  language: String;
  thumbnail_url: String;
  tag_ids: String[];
  is_mature: boolean;
}

export { Stream };
