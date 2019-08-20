const express = require("express");

const server = express();

server.use(express.json());

let numberOfRequests = 0;
const projects = [];

//middleware global para contar quantas requisições ja foram feitas

server.use((req, res, next) => {
  numberOfRequests++;
  console.log(`número de requisições: ${numberOfRequests}`);
  return next();
});

//middleware verifica se projeto existe

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project não encontrado" });
  }

  return next();
}

server.get("/projects/", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  return res.json(projects[id]);
});

server.post("/projects/", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };
  //project.title = title;
  //project.id = id;
  projects.push(project);
  return res.json(project);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push(task);
  return res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  projectDel = projects.findIndex(p => p.id == id);
  projects.splice(projectDel, 1);
  return res.send();
});

server.listen(3000);
