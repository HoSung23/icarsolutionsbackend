import { spawn } from 'child_process';
import path from 'path';

let backendProcess;

export async function startBackend() {
  if (backendProcess) return;
  
  const backendPath = path.join(process.cwd(), 'backend');
  
  backendProcess = spawn('npm', ['run', 'dev'], {
    cwd: backendPath,
    stdio: 'inherit',
    shell: true
  });
  
  // Esperar a que el servidor inicie
  await new Promise(resolve => setTimeout(resolve, 2000));
}

export function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
}
