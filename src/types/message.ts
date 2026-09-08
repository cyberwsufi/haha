export type MessageType = 'text' | 'project_invite' | 'connection_accepted';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: MessageType;
  inviteProjectId?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    tagline: string;
    online: boolean;
  };
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}

export interface ConnectionRequest {
  id: string;
  fromStudentId: string;
  fromStudent: {
    name: string;
    avatar: string;
    tagline: string;
    major: string;
  };
  message?: string;
  sentAt: string;
  status: 'pending' | 'accepted' | 'declined';
}
