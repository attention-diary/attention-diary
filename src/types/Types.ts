export type Comment = {
  commentId: number,
  commentContent: string,
}

export type Post = {
  id: number,
  name: string,
  title: string,
  content: string,
  comments: Comment[],
  comment: Comment,
}
