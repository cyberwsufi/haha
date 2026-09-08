import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ConnectionRequest } from '../types/message';
import { mockConnectionRequests } from '../mock/conversations';
import type { ConnectionStatus } from '../types/student';

interface NetworkContextValue {
  connectedStudentIds: string[];
  pendingRequests: ConnectionRequest[];
  sentRequestIds: string[];
  sendConnectionRequest: (studentId: string, message?: string) => void;
  acceptConnectionRequest: (requestId: string) => void;
  declineConnectionRequest: (requestId: string) => void;
  getConnectionStatus: (studentId: string) => ConnectionStatus;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(undefined);

export function NetworkProvider({ children }: { children: ReactNode }) {
  // Initially connected with Priya Patel (std-2) and Rohan Iyer (std-3)
  const [connectedStudentIds, setConnectedStudentIds] = useState<string[]>(['std-2', 'std-3', 'std-6']);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>(mockConnectionRequests);
  const [sentRequestIds, setSentRequestIds] = useState<string[]>(['std-4']);

  const sendConnectionRequest = (studentId: string, message?: string) => {
    if (sentRequestIds.includes(studentId) || connectedStudentIds.includes(studentId)) return;
    setSentRequestIds((prev) => [...prev, studentId]);
  };

  const acceptConnectionRequest = (requestId: string) => {
    const req = pendingRequests.find((r) => r.id === requestId);
    if (!req) return;
    setConnectedStudentIds((prev) => [...prev, req.fromStudentId]);
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const declineConnectionRequest = (requestId: string) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const getConnectionStatus = (studentId: string): ConnectionStatus => {
    if (connectedStudentIds.includes(studentId)) return 'connected';
    if (sentRequestIds.includes(studentId)) return 'pending_sent';
    if (pendingRequests.some((r) => r.fromStudentId === studentId)) return 'pending_received';
    return 'none';
  };

  return (
    <NetworkContext.Provider
      value={{
        connectedStudentIds,
        pendingRequests,
        sentRequestIds,
        sendConnectionRequest,
        acceptConnectionRequest,
        declineConnectionRequest,
        getConnectionStatus,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}
