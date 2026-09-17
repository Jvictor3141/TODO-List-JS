import { TaskService } from "./service/TaskService.js";

TaskService.createTask("teste", "teste", "teste", "2020-09-02", "1", "todo")
TaskService.createTask("teste", "teste", "teste", "2020-09-02", "1", "todo")
TaskService.createTask("teste", "teste", "teste", "2020-09-02", "1", "todo")

console.log(TaskService.listarTarefas())