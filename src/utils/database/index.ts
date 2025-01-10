import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { Project, Agent, Task } from '../../types';

interface AgentChatDB extends DBSchema {
  projects: {
    key: string;
    value: Project;
    indexes: { 'by-created': number };
  };
  agents: {
    key: string;
    value: Agent;
    indexes: { 'by-project': string };
  };
  tasks: {
    key: string;
    value: Task;
    indexes: { 'by-project': string };
  };
}

export class DatabaseService {
  private dbPromise: Promise<IDBPDatabase<AgentChatDB>>;

  constructor() {
    this.dbPromise = this.initDatabase();
  }

  private async initDatabase() {
    return openDB<AgentChatDB>('agent-chat-db', 1, {
      upgrade(db) {
        // Projects store
        const projectStore = db.createObjectStore('projects', { keyPath: 'id' });
        projectStore.createIndex('by-created', 'created_at');

        // Agents store
        const agentStore = db.createObjectStore('agents', { keyPath: 'id' });
        agentStore.createIndex('by-project', 'projectId');

        // Tasks store
        const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
        taskStore.createIndex('by-project', 'projectId');
      },
    });
  }

  // Project methods
  async saveProject(project: Project): Promise<void> {
    const db = await this.dbPromise;
    await db.put('projects', project);
  }

  async getProjects(): Promise<Project[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('projects', 'by-created');
  }

  async getProject(id: string): Promise<Project | undefined> {
    const db = await this.dbPromise;
    return db.get('projects', id);
  }

  async deleteProject(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('projects', id);
  }

  // Agent methods
  async saveAgent(agent: Agent): Promise<void> {
    const db = await this.dbPromise;
    await db.put('agents', agent);
  }

  async getAgents(projectId: string): Promise<Agent[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('agents', 'by-project', projectId);
  }

  // Task methods
  async saveTask(task: Task): Promise<void> {
    const db = await this.dbPromise;
    await db.put('tasks', task);
  }

  async getTasks(projectId: string): Promise<Task[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('tasks', 'by-project', projectId);
  }
}
