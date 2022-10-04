let todos = [
    {
        texte:'Faire le labo',
        estCoche: false
    }
];

export const getTodos = () => {
    return todos;
}

export const addTodo = (texte) => {
    todos.push({
        texte: texte,
        estCoche: false
    });

    return todos.length - 1;
}

export const checkTodo = (index) => {
    todos[index].estCoche = !todos[index].estCoche;
}
