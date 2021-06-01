 var ipc=require('node-ipc');

    ipc.config.id   = 'world';
    ipc.config.retry= 1500;
    // ipc.config.silent= true;

    let ipcSocket={};

function quitClient(){
  setTimeout(() => {
  console.log("Timeout Started");
  ipc.server.emit(
          ipcSocket,"timetoquit","Quit World"
)},20000);
}



    console.log("\n\nServer Init");

    ipc.serve(
        function(){
            ipc.server.on(
                'message',
                function(data,socket){
                  ipcSocket=socket;
                  console.log("Receive message:", data);
                  console.log("Socket : "+ JSON.stringify(socket));
                    ipc.log('got a message : '.debug, data);
                    console.log("Sending message");
                    ipc.server.emit(
                        socket,
                        'message',  //this can be anything you want so long as
                                    //your client knows.
                        data+' world!'
                    );
                    console.log("Message sent");
                }
            );
      
      ipc.server.on(
                'newclient',
                function(data,socket){
                  ipcSocket=socket;
                  console.log("Receive message:", data);
                  // console.log("Socket : "+ JSON.stringify(socket));
                    ipc.log('got a message : '.debug, data);
                    console.log("Sending message");
                    ipc.server.emit(
                        socket,
                        'newclient',  //this can be anything you want so long as
                                    //your client knows.
                        'Welcome to the server...'
                    );
                    console.log("Message sent");
                    quitClient();
                }
            );
			ipc.server.on(
				'socket.disconnected',
				function(socket, destroyedSocketID) {
					ipc.log('client ' + destroyedSocketID + ' has disconnected!');
				}
			);
        }
    );

    
    console.log("Server Starting");
    ipc.server.start();
    console.log("Server Running");


    console.log("Timeout Starting");
