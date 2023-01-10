const LocalData = localStorage.getItem("token")
const elForm = document.querySelector(".js-form")
const elInput = document.querySelector(".js-input")
const elList = document.querySelector('.js-list')

if (!LocalData) {
    location.replace("login.html")
}
function renderTodo(array, node) {
    node.innerHTML = "    "
    array.forEach(el => {
        node.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
                <span>${el.todo_value}</span>
                <div>
                    <button class="btn btn-warning todo-edit" data-todo-id=${el.id}>Edit</button>
                    <button class="btn btn-danger todo-delete" data-todo-id=${el.id}>Delete</button>
                </div>
            </li>
        `
    });
}


async function getTodo() {
    const res = await fetch('http://192.168.100.12:5000/todo', {
        headers: {
            Authorization: LocalData
        },
    })
    const data = await res.json();
    renderTodo(data, elList)
}
getTodo();


elForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    fetch('http://192.168.100.12:5000/todo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: LocalData
        },
        body: JSON.stringify({
            text: elInput.value
        }),
    })
        .then(res => res.json())
        .then(data => {
            if (data) {
                getTodo();
            }
        })
        .catch(err => console.log(err))
    elInput.value = ''
});



function deleteTodo(id) {
    fetch(`http://192.168.100.12:5000/todo/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: LocalData
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                getTodo();
            }
        })
        .catch((err) => console.log(err))
};

function editTodo(id) {
    var NewValue=prompt("yangi value kiriting")
    fetch(`http://192.168.100.12:5000/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/js',
            Authorization: LocalData,
        },
        body:JSON.stringify({
            text:NewValue,
        }),
    })
    .then((res)=>res.json)
    .then((data)=>{
        if(data){
            getTodo();
        }
    })
    .catch((err)=>console.log(err))
}

elList.addEventListener("click", function (evt) {
    if (evt.target.matches('.todo-delete')) {
        deleteTodo(evt.target.dataset.todoId)
    }
    if(evt.target.matches('.todo-edit')){
        editTodo(evt.target.dataser.todoId)
    }
});