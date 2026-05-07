const socket=io();
socket.on("update",()=>location.reload());
socket.on("remote",(d)=>{window.forceMode=d.mode;location.reload();});
