export type CommentSize = "small" | "medium" | "large";
export type CommentPosition = "top" | "middle" | "bottom";

export interface Comment {
  text: string;
  color?: string;
  size?: CommentSize;
  position?: CommentPosition;
  duration?: number;
}

/** スライド番号 (1 始まり) をキーとするコメント一覧 */
export type CommentsData = Record<string, Comment[]>;

export interface NiconicoConfig {
  enabled?: boolean;
  speed?: number;
  maxLanes?: number;
  comments?: string | CommentsData;
}
