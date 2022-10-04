let ul = document.getElementById('liste-todo');
let textbox = document.getElementById('textbox-todo');
let form = document.getElementById('form-todo');

const addTodoClient = (index, texte, estCoche) => {
    let li = document.createElement('li');

    let input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = estCoche;
    input.dataset.index = index;
    input.addEventListener('change', checkTodoServeur)
    li.append(input);

    let div = document.createElement('div');
    div.classList.add('texte');
    div.innerText = texte;
    li.append(div);
    
    ul.append(li);
}

const checkTodoServeur = (event) => {
    let data = {
        index: event.currentTarget.dataset.index
    }

    fetch('/api/todo', {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    });
}

const addTodoServeur = async (event) => {
    event.preventDefault();

    let data = {
        texte: textbox.value
    }

    let response = await fetch('/api/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(response.ok) {
        let data = await response.json();
        addTodoClient(data.index, textbox.value, false);
        textbox.value = '';
        textbox.focus();
    }
}

const getTodoServeur = async () => {
    let response = await fetch('/api/todo');
    
    if(response.ok){
        let data = await response.json();
        for(let i = 0 ; i < data.length ; i++) {
            addTodoClient(i, data[i].texte, data[i].estCoche);
        }
    }
}

form.addEventListener('submit', addTodoServeur);
getTodoServeur();
