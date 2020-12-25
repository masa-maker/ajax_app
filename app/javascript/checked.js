function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if  (XHR.status != 200) {
          //エラー分が表示される
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //ジャパスクリプトの処理から抜け出せる１５行目以降の書類をさせない様に！
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check","true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);