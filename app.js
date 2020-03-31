const express = require('express');
const app = express();

app.use(express.json());

const projects = [];

//Midleware Global
app.use(function(req, res, next) {
  console.count('Request Nº');
  next();
});

//Middleware Local: Verificar se o ID existe
function checkId(req, res, next) {
  let { id } = req.params;
  if (!projects[id]) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  next();
}

//Rota: Cadastrar um novo projeto
app.post('/projects', function(req, res) {
  let { title } = req.body;

  let project = { id: '', title, tasks: [] };

  projects.push(project);

  project.id = projects.indexOf(project);

  res.json(projects);
});

//Rota: Lista todos os projetos
app.get('/projects', function(req, res) {
  res.json(projects);
});

//Rota: Alterar um projeto
app.put('/projects/:id', checkId, function(req, res) {
  let { id } = req.params;
  let { title } = req.body;

  projects[id].title = title;

  res.json(projects);
});

//Rota: Deletar um projeto
app.delete('/projects/:id', checkId, function(req, res) {
  let { id } = req.params;

  projects.splice(id, 1);

  res.json(projects);
});

//Rota: Criar uma nova tarefa noo array tasks
app.post('/projects/:id/tasks', checkId, function(req, res) {
  let { id } = req.params;
  let { title } = req.body;

  projects[id].tasks = title;

  res.json(projects);
});

//Abertura da porta do servidor
app.listen('3600');
