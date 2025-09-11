const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'apps', 'api');
const requirementsFile = path.join(apiDir, 'requirements.txt');

// --- OS-specific configuration ---
const isWindows = process.platform === 'win32';
const venvName = isWindows ? 'venv' : 'Uvenv'; // Use 'Uvenv' for Linux/Ubuntu
const venvPath = path.join(apiDir, venvName);
const pythonExe = isWindows
  ? path.join(venvPath, 'Scripts', 'python.exe')
  : path.join(venvPath, 'bin', 'python');
const createVenvCommand = `python3 -m venv ${venvPath}`;
const installReqsCommand = `"${pythonExe}" -m pip install -r "${requirementsFile}"`;

// Helper to run commands
const execute = (command) => {
  try {
    console.log(`> Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
    process.exit(1);
  }
};

console.log('--- Checking Python API Environment ---');

// 1. Check if the virtual environment already exists.
if (fs.existsSync(venvPath)) {
  console.log(`Virtual environment '${venvName}' already exists. Skipping setup.`);
} else {
  // 2. If not, create it.
  console.log(`Creating virtual environment '${venvName}'...`);
  // Note: Ensure you have python3 installed and in your PATH.
  // On some systems, it might just be 'python'.
  try {
    execute(createVenvCommand);
  } catch (e) {
    console.warn("`python3` not found, trying `python`...");
    execute(`python -m venv ${venvPath}`);
  }

  // 3. Install dependencies from requirements.txt.
  console.log('Installing Python dependencies from requirements.txt...');
  execute(installReqsCommand);
  console.log('Python API environment setup complete!');
}

console.log('-------------------------------------\n');
