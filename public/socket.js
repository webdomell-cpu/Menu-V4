const socket = io();

socket.on("update", () => location.reload());

socket.on("remote", (data) => {
  console.log("Remote:", data);
});
