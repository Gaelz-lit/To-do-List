document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo}</span>
                <div>
                    <button class="edit" onclick="editTodo(${index})">Editar</button>
                    <button class="delete" onclick="deleteTodo(${index})">Deletar</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    const addTodo = (e) => {
        e.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            todos.push(newTodo);
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    };

    const editTodo = (index) => {
        const newTodo = prompt('Edit your task', todos[index]);
        if (newTodo !== null) {
            todos[index] = newTodo.trim();
            saveTodos();
            renderTodos();
        }
    };

    const deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    window.editTodo = editTodo;
    window.deleteTodo = deleteTodo;

    todoForm.addEventListener('submit', addTodo);
    renderTodos();
});