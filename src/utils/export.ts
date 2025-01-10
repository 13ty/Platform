import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Agent, Task } from '../types';

export async function exportProject(agents: Agent[], tasks: Task[]) {
  const zip = new JSZip();

  // Export agents
  const agentsJson = JSON.stringify(agents, null, 2);
  zip.file('agents.json', agentsJson);

  // Export tasks
  const tasksJson = JSON.stringify(tasks, null, 2);
  zip.file('tasks.json', tasksJson);

  // Generate zip file
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'project-export.zip');
}

export async function importProject(file: File) {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  
  const agentsFile = contents.file('agents.json');
  const tasksFile = contents.file('tasks.json');

  if (!agentsFile || !tasksFile) {
    throw new Error('Invalid project file');
  }

  const agents = JSON.parse(await agentsFile.async('text'));
  const tasks = JSON.parse(await tasksFile.async('text'));

  return { agents, tasks };
}
