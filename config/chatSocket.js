module.exports.chatSocket = function (server) {
  let io = require("socket.io")(server);

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

    socket.on("send_message", (data) => {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
