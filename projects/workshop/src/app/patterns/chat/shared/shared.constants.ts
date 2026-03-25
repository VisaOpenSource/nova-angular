/**
 *              © 2025-2026 Visa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/

/** #patterns #isShared **/

export const CHATS_MESSAGES = [
  {
    id: "1",
    title: "Account Inquiry - User 1",
    unreadCount: 2,
    lastMessage: "I have a question about my account.",
    lastMessageTimeStamp: new Date(),
    isPinned: true,
    messages: [
      {
        id: "101",
        role: "User 1",
        message: "This is a sent message.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "102",
        role: "User 1",
        message: "This is a sent message with more text. It fills the container to a maximum width, then wraps to another line.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "103",
        role: "User 2",
        message: "This is a received message.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "104",
        role: "User 2",
        message: "This is a received message with more text. It fills the container to a maximum width, then wraps to another line.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  },
  {
    id: "4",
    title: "Project Discussion - David",
    unreadCount: 3,
    lastMessage: "Let's schedule a meeting.",
    lastMessageTimeStamp: new Date(),
    isPinned: true,
    messages: [
      {
        id: "401",
        role: "David",
        message: "Hi, we need to discuss the project.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "402",
        role: "User 2",
        message: "Sure, when are you available?",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "403",
        role: "David",
        message: "How about tomorrow at 10 AM?",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "404",
        role: "User 2",
        message: "That works for me.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: "405",
        role: "David",
        message: "Let's schedule a meeting.",
        timeStamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  },
];

export const NEW_CHAT = {
  id: "100",
  title: "New Chat",
  unreadCount: 0,
  lastMessage: "",
  lastMessageTimeStamp: new Date(),
  isPinned: false,
  messages: [],
};
