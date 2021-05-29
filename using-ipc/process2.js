const ipc = require('node-ipc');

ipc.config.id="unique-process-2";
ipc.config.retry=1500;
ipc.config.silent=true;

ipc.connectTo('unique-process-1', () =>{
  ipc.of['jest-observer'].on('connect' , () => {
    ipc.of['jest-observer'].emit('a-unique-message', "The message was send")
  });
});