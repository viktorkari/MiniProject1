
document.addEventListener("DOMContentLoaded", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get("postId");
    let postDetailsElement = document.createElement("div");
    postDetailsElement.id = "postDetails";
    postDetailsElement.style.marginLeft = "300px";
    postDetailsElement.style.marginTop = "-220px";
    postDetailsElement.style.marginBottom = "60px";
    postDetailsElement.style.width = "400px";
    postDetailsElement.style.height = "200px";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(postDetailsElement);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            let postDetails = document.createElement("h2");
            postDetails.textContent = "Post Details:";
            postDetailsElement.appendChild(postDetails);
            for (let key in post) {
                let p = document.createElement("p");
                p.innerHTML = `<strong>${key}:</strong> ${post[key]}`;
                postDetailsElement.appendChild(p);
                }
            loadComments(postId);
            })
        .catch(error => console.error(error));
    });
function loadComments(postId) {
    let commentsHeader = document.createElement("h2");
    commentsHeader.textContent = "comments ➜";
    commentsHeader.style.position = "absolute";
    commentsHeader.style.top = "170px";
    commentsHeader.style.left = "63%";
    commentsHeader.style.transform = "translateX(-30%) rotate(15deg)";
    document.body.appendChild(commentsHeader);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            let commentIndex = 0;
            let commentBlock;
            comments.forEach((comment, index) => {
                let commentItem = document.createElement("div");
                commentItem.classList.add("comment-item");
                commentItem.style.border = "1px solid #ccc";
                commentItem.style.padding = "10px";
                commentItem.style.backgroundImage = "url('https://kartinki.pics/uploads/posts/2021-03/1616037016_27-p-fon-belaya-myataya-bumaga-30.jpg')";
                commentItem.style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, 0.5)";
                commentItem.style.marginRight = "10px";
                commentItem.style.marginBottom = "10px";
                commentItem.style.width = "calc(20% - 1px)";
                let commentText = document.createElement("p");
                commentText.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
                commentItem.appendChild(commentText);
                if ((index) % 4 === 0) {
                    commentBlock = document.createElement("div");
                    commentBlock.classList.add("comment-block");
                    commentBlock.style.display = "flex";
                    commentBlock.style.flexWrap = "wrap";
                    commentBlock.style.justifyContent = "space-between";
                    document.body.appendChild(commentBlock);
                    }
                    commentBlock.appendChild(commentItem);
                    commentIndex++;
                });
            let postUserIds = comments.map(comment => comment.postId).filter(postId => postId !== undefined);
            if (postUserIds.length > 0) {
                let firstPostId = postUserIds[0];
                fetch(`https://jsonplaceholder.typicode.com/posts/${firstPostId}`)
                    .then(response => response.json())
                    .then(post => {
                        let userId = post.userId;
                        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                            .then(response => response.json())
                            .then(user => {
                                let userDiv = document.createElement("div");
                                userDiv.classList.add("user-info");
                                userDiv.innerHTML = `
                                <h2>User Info:</h2>
                                <p>ID: ${user.id}</p>
                                <p>Name: ${user.name}</p>
                                <p>Email: ${user.email}</p>
                                <p>Phone: ${user.phone}</p>
                                <p>Website: ${user.website}</p>
                                `;
                                document.body.insertBefore(userDiv, document.body.firstChild);
                                })
                            .catch(error => console.error(error));
                        })
                        .catch(error => console.error(error));
                } else {
                    console.error("error");
                }
            })
            .catch(error => console.error(error));
    }
