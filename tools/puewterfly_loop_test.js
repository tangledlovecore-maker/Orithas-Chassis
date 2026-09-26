// Orithas-Chassis first embodiment loop host test
// Host: Püwterfly
// Requires: npm install serialport

import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import fs from 'node:fs';
import path from 'node:path';

const portName = process.argv[2];
if (!portName) {
  console.error('Usage: node tools/puewterfly_loop_test.js COM_PORT');
  console.error('Example: node tools/puewterfly_loop_test.js COM3');
  process.exit(1);
}

const repoRoot = process.cwd();
const logDir = path.join(repoRoot, 'logs');
fs.mkdirSync(logDir, { recursive: true });

const stamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
const logPath = path.join(logDir, `first-loop-${stamp}.log`);

function log(line) {
  const row = `${new Date().toISOString()} ${line}`;
  console.log(row);
  fs.appendFileSync(logPath, `${row}\n`);
}

const port = new SerialPort({ path: portName, baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

const queue = ['STATE', 'MOVE A', 'STATE', 'MOVE B', 'STATE', 'STOP', 'STATE'];
let index = 0;
let ready = false;

parser.on('data', (line) => {
  const text = line.trim();
  if (!text) return;
  log(`RX ${text}`);
  if (text.includes('ORITHAS_FIRST_LOOP_READY')) ready = true;
});

port.on('open', () => {
  log(`OPEN ${portName}`);
  setTimeout(sendNext, 1200);
});

port.on('error', (error) => {
  log(`ERROR ${error.message}`);
  process.exitCode = 1;
});

function sendNext() {
  if (!ready && index === 0) log('WAITING_FOR_READY_OR_CONTINUING_AFTER_TIMEOUT');
  if (index >= queue.length) {
    log(`DONE log=${logPath}`);
    port.close();
    return;
  }
  const command = queue[index++];
  log(`TX ${command}`);
  port.write(`${command}\n`, (error) => {
    if (error) {
      log(`WRITE_ERROR ${error.message}`);
      process.exitCode = 1;
      port.close();
      return;
    }
    setTimeout(sendNext, 900);
  });
}

process.on('SIGINT', () => {
  log('INTERRUPT sending STOP');
  try { port.write('STOP\n'); } catch {}
  try { port.close(); } catch {}
});
