
document.addEventListener("DOMContentLoaded", function () {
    let userInfoContainer = document.createElement("div");
    let userAddressContainer = document.createElement("div");
    let userGeoContainer = document.createElement("div");
    let userCompanyContainer = document.createElement("div");
    let postsButton = document.createElement("button");
    postsButton.textContent = "Posts of Current User";
    postsButton.classList.add("posts-button");
    let postsContainer = document.createElement("div");
    postsContainer.classList.add("posts-container");
    document.body.style.fontFamily = "Arial, sans-serif";
    userInfoContainer.style.padding = "20px";
    userInfoContainer.style.backgroundColor = "#f0f0f0";
    userInfoContainer.style.width = "220px";
    userInfoContainer.style.height = "225px";
    userInfoContainer.style.backgroundColor ="#ac992c";
    userInfoContainer.style.border = "2px solid";
    userInfoContainer.style.textAlign = "center";
    userAddressContainer.style.marginLeft = "360px";
    userAddressContainer.style.marginTop = "-270px";
    userAddressContainer.style.width = "220px";
    userAddressContainer.style.height = "225px";
    userAddressContainer.style.backgroundColor = "#ac992c";
    userAddressContainer.style.border = "2px solid";
    userAddressContainer.style.textAlign = "center"
    userAddressContainer.style.padding = "20px"
    userGeoContainer.style.width = "220px";
    userGeoContainer.style.height = "225px";
    userGeoContainer.style.marginLeft = "54%";
    userGeoContainer.style.marginTop = "-270px"
    userGeoContainer.style.padding = "20px"
    userGeoContainer.style.border = "2px solid"
    userGeoContainer.style.textAlign = "center"
    userGeoContainer.style.backgroundColor = "#ac992c"
    userCompanyContainer.style.width = "220px";
    userCompanyContainer.style.height = "225px";
    userCompanyContainer.style.marginLeft = "80.3%";
    userCompanyContainer.style.marginTop = "-270px"
    userCompanyContainer.style.padding = "20px"
    userCompanyContainer.style.border = "2px solid"
    userCompanyContainer.style.textAlign = "center"
    userCompanyContainer.style.backgroundColor = "#ac992c"
    postsButton.style.display = "block";
    postsButton.style.width = "90%";
    postsButton.style.margin = "20px auto";
    postsButton.style.padding = "10px";
    postsButton.style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, 0.5)";
    postsButton.style.borderRadius = "20px";
    postsButton.style.backgroundColor = "#ad9a2c";
    postsButton.style.color = "#fff";
    postsButton.style.fontSize = "16px";
    postsButton.style.transition = "transform 0.8s ease";
    postsButton.addEventListener("mousedown", () => {
        postsButton.style.transform = "scale(0.70)";
    });
    postsButton.addEventListener("mouseup", () => {
        postsButton.style.transform = "scale(1)";
    });
    postsContainer.style.display = "flex";
    postsContainer.style.flexWrap = "wrap";
    postsContainer.style.justifyContent = "space-between";
    postsContainer.style.padding = "20px";
    document.body.appendChild(userInfoContainer);
    document.body.appendChild(userAddressContainer);
    document.body.appendChild(userGeoContainer);
    document.body.appendChild(userCompanyContainer);
    document.body.appendChild(postsButton);
    document.body.appendChild(postsContainer);

    function displayUserInfo(user) {
        userInfoContainer.innerHTML = `
            <h2>User Details</h2>
            <p>ID: ${user.id}</p>
            <p>Name: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: ${user.website}</p>`;
    userAddressContainer.innerHTML = `
        <h2>User Address</h2>
        <p>Street: ${user.address.street}</p>
        <p>Suite: ${user.address.suite}</p>
        <p>City: ${user.address.city}</p>
        <p>Zipcode: ${user.address.zipcode}</p>`;
    userGeoContainer.innerHTML = `
        <h2>User Geo</h2>
        <p>lat: ${user.geo}</p>
        <p>lng: ${user.geo}</p>`;
    userCompanyContainer.innerHTML = `
        <h2>User Company</h2>
        <p>company: ${user.company.name}</p>
        <p>catchPhrase: ${user.company.catchPhrase}</p>
        <p>bs: ${user.company.bs}</p>
    
    `;
}
    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get("id");
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            displayUserInfo(user);
        });
    function loadUserPosts(userId) {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = "";
                posts.forEach((post, index) => {
                    let shortTitle = post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title;
                    let postElement = document.createElement("div");
                    postElement.classList.add("post");
                    postElement.style.width = "calc(20% - 20px)";
                    postElement.style.margin = "10px";
                    postElement.innerHTML = `
                        <p>${shortTitle}</p>
                        <button class="view-post" data-post-id="${post.id}">View Post Details</button>`;
                    postsContainer.appendChild(postElement);
                });
                let viewPostButtons = document.querySelectorAll(".view-post");
                viewPostButtons.forEach(button => {
                    button.style.backgroundColor = "#007bff";
                    button.style.color = "#fff";
                    button.style.padding = "10px 20px";
                    button.style.border = "1px solid";
                    button.style.borderRadius = "10px";
                    button.style.cursor = "pointer";
                    button.style.display = "inline-block";
                    button.style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, 0.5)";
                    button.style.transition = "transform 0.8s ease";
                    button.addEventListener("mousedown", () => {
                        button.style.transform = "scale(0.70)";
                    });
                    button.addEventListener("mouseup", () => {
                        button.style.transform = "scale(1)";
                    });
                });
            });
    }
    postsButton.addEventListener("click", function () {
        loadUserPosts(userId);
        postsContainer.style.border = "1px solid";
        postsContainer.style.borderRadius = "20px";
        postsContainer.style.backgroundImage = "url('https://sotni.ru/wp-content/uploads/2023/08/miataia-bumaga-187.webp')";
    });
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("view-post")) {
            let postId = event.target.dataset.postId;
            window.location.href = `post-details.html?postId=${postId}`;
        }
    });
});
