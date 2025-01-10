export const DATABASE_CONFIG = {
  filename: 'agent-chat.db', // SQLite database file
  autoSave: {
    rounds: [5, 10, 15, 20],
    defaultRound: 10
  },
  backup: {
    enabled: true,
    interval: 3600000 // 1 hour
  }
};
