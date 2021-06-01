const { server } = require('node-ipc');
var ipc=require('node-ipc');

    ipc.config.id   = 'hello';
    ipc.config.retry= 1500;
    ipc.config.delay= false;
    // ipc.config.silent= true;

    
  function connectionHandler (){
  console.log(`Connected to ${serverName}`);
    ipc.log(`Connected to ${serverName}`, ipc.config.delay);
    // ipc.log(`Connected to ${serverName}`.rainbow, ipc.config.delay);
    console.log("Sending Message");
    ipc.of.world.emit(
        'newclient',  //any event or message type your server listens for
        'Hey, I am a new client'
    );

    console.log("Sent Message");
}

    console.log("\n\nConnection starting");
    const serverName= 'world';
    ipc.connectTo(
        serverName,
        function(){
            ipc.of.world.on(
                'connect',connectionHandler);
            ipc.of.world.on(
                'disconnect',
                function(){
                    ipc.log('disconnected from world'.notice);
                }
            );
            ipc.of.world.on(
                'message',  //any event or message type your server listens for
                function(data){
                  console.log("Receive message:", data);
                    ipc.log('got a message from world : '.debug, data);
                }
            );
            ipc.of.world.on(
                'newclient',  //any event or message type your server listens for
                function(data){
                  console.log("Received New Client:", data);
                    ipc.log('got a new client from world : '.debug, data);
                    
                    
                }
            );
            ipc.of.world.on(
                'timetoquit',  //any event or message type your server listens for
                function(data){
                  console.log("Received time to quit:", data);
                    ipc.log('got a time to quit from world : '.debug, data);
                    process.exit();
                }
            );
        }
    );