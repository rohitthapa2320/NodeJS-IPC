const ipc = require('node-ipc');

ipc.config.id="unique-process-1";
ipc.config.retry=1500;
ipc.config.silent=true;

ipc.serve(() => ipc.server.on('a-unique-message', message => {
  console.log(message);
}));

ipc.server.start();