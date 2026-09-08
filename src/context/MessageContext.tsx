import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Conversation, Message } from '../types/message';
import { mockConversations } from '../mock/conversations';

interface MessageContextValue {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  activeConversation: Conversation | undefined;
  sendMessage: (recipientId: string, content: string, inviteProjectId?: string) => void;
  markAsRead: (conversationId: string) => void;
  totalUnreadCount: number;
}

const MessageContext = createContext<MessageContextValue | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const totalUnreadCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const sendMessage = (recipientId: string, content: string, inviteProjectId?: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'std-1',
      receiverId: recipientId,
      content,
      timestamp: 'Just now',
      isRead: true,
      type: inviteProjectId ? 'project_invite' : 'text',
      inviteProjectId,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.participantId === recipientId || c.id === activeConversationId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: newMessage,
          };
        }
        return c;
      })
    );
  };

  const markAsRead = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
    );
  };

  return (
    <MessageContext.Provider
      value={{
        conversations,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        sendMessage,
        markAsRead,
        totalUnreadCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}
