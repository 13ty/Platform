import { marked } from 'marked';
import { Agent, Task } from '../types';

export function generatePreview(agent: Agent, task: Task) {
  const preview = `
# Agent Configuration Preview

## Agent: ${agent.name}
- Provider: ${agent.provider}
- Model: ${agent.model}
- Role: ${agent.role}

## Task: ${task.title}
${task.description}

## Configuration
\`\`\`json
${JSON.stringify({ agent, task }, null, 2)}
\`\`\`
`;

  return marked(preview);
}
