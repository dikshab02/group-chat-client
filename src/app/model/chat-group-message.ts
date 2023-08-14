import { IChatGroup } from "./chat-group";
import { IChatMessage } from "./chat-message";

export interface IChatGroupMessage {
  chatGroup: IChatGroup;
  newMessage: string;
  chatMessages: IChatMessage[];
}

