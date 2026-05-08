// DATA
let users = JSON.parse(localStorage.getItem("users")) || []
let editIndex = null

// LOGIN
function login(){

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    if(username === "admin" && password === "1234"){

        document.getElementById("loginBox").style.display = "none"
        document.getElementById("adminPanel").style.display = "block"

        showUsers()
    }
    else{
        document.getElementById("msg").innerText = "Wrong login"
    }
}

// LOGOUT
function logout(){
    location.reload()
}

// ADD / UPDATE USER
function addUser(){

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value

    if(name === "" || email === "" || phone === ""){
        alert("Fill all fields")
        return
    }

    let user = { name, email, phone }

    if(editIndex === null){
        users.push(user)
    }
    else{
        users[editIndex] = user
        editIndex = null
    }

    localStorage.setItem("users", JSON.stringify(users))

    showUsers()

    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""
}

// SHOW USERS
function showUsers(){

    let table = document.getElementById("tableData")
    table.innerHTML = ""

    users.forEach((user, index)=>{

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button class="edit" onclick="editUser(${index})">Edit</button>
                <button class="delete" onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>
        `
    })
}

// EDIT
function editUser(index){

    document.getElementById("name").value = users[index].name
    document.getElementById("email").value = users[index].email
    document.getElementById("phone").value = users[index].phone

    editIndex = index
}

// DELETE
function deleteUser(index){

    users.splice(index,1)

    localStorage.setItem("users", JSON.stringify(users))

    showUsers()
}