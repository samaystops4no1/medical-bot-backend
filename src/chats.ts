export type Message = { role: string; content: string };

export type Chat = {
  id: number;
  messages: Message[];
  createdTime: number;
  lastModifiedTime: number;
  title: string;
};

let chats: Chat[] = [];

export function createNewChat(newChatObject: Chat) {
  chats.push(newChatObject);
  return newChatObject;
}

export function getChats() {
  return chats;
}

export function updateChat(chatId: number, messages: Message[]) {
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    chat.messages = messages;
  }
}

export function getChatMessages(chatId: number) {
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    return chat.messages;
  }
  return [];
}
