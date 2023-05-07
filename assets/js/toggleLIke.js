class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click((e) => {
      // e.preventDefault();
      let self = this;
      console.log("dkkdjkjdkjdkjk");

      $.ajax({
        type: "Post",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          let likeCnt = parserInt$(self.attr("data-likes"));
          console.log(likeCnt);

          if (data.data.deleted == true) {
            likeCnt -= 1;
          } else {
            likeCnt += 1;
          }

          $(self).attr("data-ikes", likeCnt);
          $(self).html(`${likeCnt} Likes`);
        })
        .fail(function (errDAta) {
          console.log("err or in completing the request");
        });
    });
  }
}
