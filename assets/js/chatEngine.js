class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.cahtBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    // console.log(userEmail);

    this.socket = io.connect("http://localhost:5000");

    if (this.userEmail) {
      this.connectionHeandler();
    }
  }

  connectionHeandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection stablised!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "facebook",
      });

      self.socket.on("user_joined", (data) => {
        console.log("a user joined", data);
      });
    });
  }
}
