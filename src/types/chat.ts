export interface ChatMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'system' | 'error' | 'file';
  metadata?: {
    color?: string;
    replyTo?: string;
    sourceId?: string;
    fileChanges?: {
      path: string;
      content: string;
      type: 'create' | 'modify' | 'delete'
    }[];
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  activeAgents: string[];
  status: 'active' | 'paused' | 'completed';
  created_at: number;
  updated_at: number;
  turnOrder: string[]; // Array of agent IDs in speaking order
  currentTurn: number;
}
