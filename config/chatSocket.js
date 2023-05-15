module.exports.chatSocket = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", (socket) => {
    // console.log(socket);

    console.log("new connection recived ", socket.id);

    socket.on("disconnect", () => {
      console.log("connection disconnected!");
    });

    socket.on("join_room", (data) => {
      console.log("joining request recevied", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });
  });
};
