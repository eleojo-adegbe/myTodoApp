//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');



//Event Listener
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//Functions
function addTodo(event){
    //prevent event from submitting
    event.preventDefault();
    // create TodoDiv
    
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todoInput.value;
        
        todoDiv.appendChild(newTodo);
        //ADD TODO TO LOCAL STORAGE
        saveLocalTodos(todoInput.value);
        //Check or completed button
        const completed_btn = document.createElement('button'); 
        // Button icon with font-Awesome class
        completed_btn.classList.add('complete-btn');
        completed_btn.innerHTML = '<i class = "fas fa-check">&#10003</i>'; 
        todoDiv.appendChild(completed_btn);

        //Trash Button
        const trash_btn = document.createElement('button'); 
        // Button icon with font-Awesome class
        trash_btn.innerHTML = '<i class = "fas fa-trash">&#9747;</i>'; 
        trash_btn.classList.add('trash-btn');
        todoDiv.appendChild(trash_btn);
        //Append todoDiv in todo-list
        todoList.appendChild(todoDiv);
        //Clear input
        todoInput.value = "";
        
    
}
function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalStoredTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
            
        });
        // todo.remove();
    }
    //CheckMark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        //Adding animation
        todo.classList.toggle('completed');
        console.log(todo.classList.length)

        
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    if (window.NodeList && !NodeList.prototype.forEach){
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    todos.forEach(function(todo){
        debugger;
        console.log(todo.childNodes);
        switch (e.target.value) {
            
            case "all":
                todo.style.display = 'flex';
                break;
        
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                
        }
    })



    
}
function saveLocalTodos(todo){
    //check
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    console.log('hello')
    //check
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
    // create TodoDiv
    
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        
        todoDiv.appendChild(newTodo);
        //ADD TODO TO LOCAL STORAGE
        
        //Check or completed button
        const completed_btn = document.createElement('button'); 
        // Button icon with font-Awesome class
        completed_btn.classList.add('complete-btn');
        completed_btn.innerHTML = '<i class = "fas fa-check">&#10003</i>'; 
        todoDiv.appendChild(completed_btn);

        //Trash Button
        const trash_btn = document.createElement('button'); 
        // Button icon with font-Awesome class
        trash_btn.innerHTML = '<i class = "fas fa-trash">&#9747;</i>'; 
        trash_btn.classList.add('trash-btn');
        todoDiv.appendChild(trash_btn);
        //Append todoDiv in todo-list
        todoList.appendChild(todoDiv);
    });


}

function removeLocalStoredTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}