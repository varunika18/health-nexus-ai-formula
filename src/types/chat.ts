
export type ChatRole = "ai" | "user";

export interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
}
