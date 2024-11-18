import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class CommandService {
  private readonly logger = new Logger(CommandService.name);

  async runCutCommand(filePath: string, from: number, to: number): Promise<string> {
    return new Promise((resolve, reject) => {

      // const command = `sed -n '${from},${to}p'`;

      // this.logger.log(`Running command: ${command} ${filePath}`);

      // Spawn the `sed` process with the specified range and file path
      const cutProcess = spawn('sed', ['-n', `${from + 1},${to}p`, filePath]);

      let output = '';

      // Handle `stdout` data by appending chunks to the `output` variable
      cutProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      // Handle errors that occur during execution
      cutProcess.stderr.on('data', (data) => {
        this.logger.error(`Error: ${data}`);
      });

      // When the process closes, resolve or reject the promise based on the exit code
      cutProcess.on('close', (code) => {
        if (code === 0) {
          this.logger.log('Command executed successfully.');
          resolve(output);
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
    });
  }
}
