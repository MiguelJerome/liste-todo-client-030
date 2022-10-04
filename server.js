import 'dotenv/config';
import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { getTodos, addTodo, checkTodo } from './todo.js';

// Création du serveur web
let app = express();

// Ajout de middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static('public'));

// Programmation de routes
app.get('/api/todo', (request, response) => {
    let todos = getTodos();
    response.status(200).json(todos);
});

app.post('/api/todo', (request, response) =>{
    let index = addTodo(request.body.texte);
    response.status(201).json({index: index});
});

app.patch('/api/todo', (request, response) => {
    checkTodo(request.body.index);
    response.status(200).end();
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.log('Serveur démarré: http://localhost:' + process.env.PORT);
