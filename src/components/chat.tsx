"use client";

import { ChatContainer } from './chat/ChatContainer';
import { ChatToggle } from './chat/ChatToggle';

export const Chat = () => {
  return (
    <>
      <ChatToggle />
      <ChatContainer />
    </>
  );
};