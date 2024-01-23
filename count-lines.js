const { execSync } = require('child_process');
const isWindows = process.platform === 'win32';

const command = isWindows
  ? 'npm run count-lines-windows'
  : 'npm run count-lines-linux';

execSync(command, { stdio: 'inherit' });
