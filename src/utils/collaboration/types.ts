export interface CollaborationSession {
  id: string;
  projectId: string;
  hostId: string;
  participants: Participant[];
  created_at: number;
}

export interface Participant {
  id: string;
  name: string;
  role: 'host' | 'editor' | 'viewer';
  joinedAt: number;
}

export interface ShareConfig {
  allowEditing: boolean;
  expiresIn?: number; // milliseconds
  maxParticipants?: number;
}
