const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


const isWindows = process.platform === 'win32';

const command = isWindows
  ? 'PowerShell -Command "Get-Content $(git ls-files) | Measure-Object -Line | Select-Object -ExpandProperty Lines"'
  : 'git ls-files | xargs wc -l';

// execSync(command, { stdio: 'inherit' });
const lineCount = parseInt(execSync(command, { encoding: 'utf-8' }).trim(), 10);

console.log(chalk.bold.cyanBright.bgYellowBright`
The current line count is: {redBright ${lineCount}} `);

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.linecount = lineCount;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(chalk.green.bold('Updated package.json with line count.\n\n'));