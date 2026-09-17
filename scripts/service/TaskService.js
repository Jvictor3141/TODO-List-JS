import { Task } from "../model/Task.js"
import { TaskRepository } from "../repository/TaskRepository.js"

const repositorio = new TaskRepository();

export class TaskService {

  static createTask (nome, descricao, categoria, dataPrazo, prioridade, status) {

    let tarefa = new Task(nome, descricao, categoria, dataPrazo, prioridade, status);

    const { valido, erros } = this.validaCampos(tarefa);

    if (!valido) {
      throw new Error("Não foi possível criar a tarefa por alguns campos inválidos.")
    }

    repositorio.addTask(tarefa);

    return tarefa;

  }

  static validaCampos ({ nome, categoria, dataPrazo, prioridade, status }) {
    const erros = [];

    if (!nome?.trim()) erros.push({ campo: "nome", msg: "Nome é obrigatório" });

    if (!categoria?.trim()) erros.push({ campo: "categoria", msg: "Categoria é obrigatória" });

    if (isNaN(Date.parse(dataPrazo))) erros.push({ campo: "dataPrazo", msg: "Data inválida" });

    if (!["1", "2", "3", "4", "5"].includes(prioridade)) erros.push({ campo: "prioridade", msg: "Prioridade inválida" });

    if (!["todo", "doing", "done"].includes(status)) erros.push({ campo: "status", msg: "Status inválido" });

    return { valido: erros.length === 0, erros };
  }

  static listarTarefas() {
    return repositorio.listarTarefas();
  }

}