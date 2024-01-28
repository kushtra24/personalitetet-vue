export type BlogPostType = {
  "id": number,
  "user_id": number,
  "title": string,
  "content": string,
  "created_at": Date,
  "updated_at": Date,
  "imgCaption": string,
  "user": {
    "first_name": string,
  },
  "thumbnail": string,
  "categories": Array<{
    "created_at": string,
    "id": number,
    "name": string,
    "slug": string,
    "updated_at": string,
  }>,
  "media": {
    "aggregate_type": string,
    "created_at": string,
    "directory": string,
    "disk": string,
    "extension": string,
    "filename": string,
    "id": number,
    "mime_type": string,
    "size": number,
    "updated_at": string,
  }
}