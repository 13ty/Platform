import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import type { CollaborationSession, ShareConfig } from './types';

export class LocalCollaborationServer {
  private wss: WebSocketServer;
  private sessions: Map<string, CollaborationSession> = new Map();
  private connections: Map<string, WebSocket> = new Map();

  constructor(port: number = 3030) {
    const server = createServer();
    this.wss = new WebSocketServer({ server });
    
    this.setupWebSocketServer();
    server.listen(port);
  }

  private setupWebSocketServer() {
    this.wss.on('connection', (ws) => {
      const participantId = crypto.randomUUID();
      
      ws.on('message', (data) => {
        this.handleMessage(participantId, data);
      });

      ws.on('close', () => {
        this.handleParticipantDisconnect(participantId);
      });
    });
  }

  private handleMessage(participantId: string, data: any) {
    try {
      const message = JSON.parse(data.toString());
      // Broadcast message to all participants in the session
      this.broadcastToSession(message.sessionId, message, participantId);
    } catch (error) {
      console.error('Failed to handle message:', error);
    }
  }

  private broadcastToSession(sessionId: string, message: any, excludeId?: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.participants.forEach(participant => {
      if (participant.id === excludeId) return;
      const connection = this.connections.get(participant.id);
      if (connection) {
        connection.send(JSON.stringify(message));
      }
    });
  }

  private handleParticipantDisconnect(participantId: string) {
    this.connections.delete(participantId);
    // Update sessions and notify other participants
  }
}
