{
  //   method to submit ajax data
  let createPost = function () {
    let newPostForm = $("#new-posts-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/post/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data.data.post);
          let newPost = newPostDOM(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          console.log(data);
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };

  //metho to view ajax data

  let newPostDOM = function (post) {
    return $(`
        <li id="post-${post._id}">
            <p>
                <small>
                    <a class="delete-post-button" href="/post/destroy/${post.id}">x</a>
                </small>

                ${post.content}
                <br />
                <small> ${post.user.name} </small>
            </p>
    
            <div class="post-comments">
               
                <form action="/comment/create" method="post">
                    <input
                    type="text"
                    name="content"
                    placeholder="text your comment"
                    required
                    />
                    <input type="hidden" name="post" value="${post._id}" />
                    <input type="submit" name="add comment" />
                </form>
                
            </div>
    
            <div>
                <ul id="post-comments-${post._id}">
                   
                </ul>
            </div>
        </li>
  
    `);
  };

  //   createPost();
}
