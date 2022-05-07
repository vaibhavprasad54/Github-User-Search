// Storing API in a variable
const URL = "https://api.github.com/users/";

// Storing the IDs in variables
const userData = document.getElementById("userData");
const form = document.getElementById("form");
const search = document.getElementById("search");


// Function to get user's data
async function getUser(username){
    const res  = await fetch(URL + username);
    const resData = await res.json();

    userDataCard(resData);
    console.log("Searching...");
    getRepos(username);
}

async function getRepos(username){
    const res = await fetch(URL + username + "/repos");
    const resData = await res.json();
    reposDataCard(resData);
}

// Function to get Repositories
function reposDataCard(repos){
    const reposEl = document.getElementById('repos');
    repos.forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    })
}

//Appending user data card on search
function userDataCard(user){
    const userCard = 
    `<div class="container-content">
        <div class="top">
            <div class="userImage">
                <img class="userAvatar" src="${user.avatar_url}">
            </div>
        <div class="userName">
            <h1> ${user.name} </h1>
            <p> ${user.bio} </p>
        </div>
    </div>

    <div class="middle">
        <div class="repos">
            <p> Repos </p>
            <p> ${user.public_repos} </p>
        </div>
        <div class="followers">
            <p> Followers </p>
            <p> ${user.followers} </p>
        </div>
        <div class="following">
            <p> Following </p>
            <p> ${user.following} </p> 
        </div>
    </div>

    <div class="bottom">
        <div class="repositories" id="repos"></div>
    </div>

</div>`;

userData.innerHTML = userCard;
}

//Searching for a user on Enter key press
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});
