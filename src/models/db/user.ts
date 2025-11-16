export interface LovUser {
  email: string;
  password: string;
}

export interface LovChatHistory {
  prompt: string;
  LLMResponseStatus: boolean;
  response: string;
}

export interface LovProject {
  userId: string;
  sandboxId: string;
  chatHistory: LovChatHistory[]; // I can have an array of
  deployedUrl: string;
}
