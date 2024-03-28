
async function getUsers() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await response.json();
        return data;
        } catch (error) {
            console.error(error);
    }
}
async function displayUsers() {
    let users = await getUsers();
    // Створюємо контейнер для користувачів
    let usersContainer = document.createElement("div");
    usersContainer.style.display = "flex";
    usersContainer.style.flexWrap = "wrap";
    usersContainer.style.color ="#fdfdfd";
    document.body.appendChild(usersContainer);
    users.forEach(user => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("user-block");
        userDiv.style.width = "calc(49% - 20px)";
        userDiv.style.margin = "10px";
        userDiv.style.border = "1px solid";
        userDiv.style.textAlign = "center";
        userDiv.style.borderRadius = "70px";
        userDiv.style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, 0.5)";
        userDiv.style.backgroundImage = "url('https://lenta.ua/storage/17/01/08/07/890_450_5ece5d5d295bb.jpg')";
        userDiv.style.backgroundSize = "cover";
        userDiv.style.backgroundPosition = "center";
        userDiv.style.filter = "brightness(70%) contrast(170%) saturate(150%)";
        let userId = document.createElement("p");
        userId.textContent = `ID: ${user.id}`;
        userId.style.fontSize = "20px"
        userDiv.appendChild(userId);
        let userName = document.createElement("p");
        userName.textContent = `Name: ${user.name}`;
        userName.style.fontSize = "20px"
        userDiv.appendChild(userName);
        let detailsButton = document.createElement("a");
        detailsButton.href = `user-details.html?id=${user.id}`;
        detailsButton.textContent = "USER DETAILS";
        detailsButton.style.display = "inline-block";
        detailsButton.style.border = "1px solid black";
        detailsButton.style.marginBottom = "10px";
        detailsButton.style.padding = "5px 5px";
        detailsButton.style.textDecoration = "none";
        detailsButton.style.backgroundColor = "#c4b23c";
        detailsButton.style.color = "#fff";
        detailsButton.style.borderRadius = "10px";
        detailsButton.style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, 0.5)";
        detailsButton.style.transition = "transform 0.3s ease";
        detailsButton.style.transform = "scale(1.2)";
        userDiv.appendChild(detailsButton);
        detailsButton.addEventListener("mousedown", () => {
            detailsButton.style.transform = "scale(0.90)";
        });
        detailsButton.addEventListener("mouseup", () => {
            detailsButton.style.transform = "scale(1)";
        });
        usersContainer.appendChild(userDiv);
    });
}
displayUsers();




