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

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    const hojeString = `${ano}-${mes}-${dia}`

    if (!nome?.trim()) erros.push({ campo: "nome", msg: "Nome é obrigatório" });

    if (!categoria?.trim()) erros.push({ campo: "categoria", msg: "Categoria é obrigatória" });

    if (isNaN(Date.parse(dataPrazo)) || dataPrazo < hojeString) erros.push({ campo: "dataPrazo", msg: "Data inválida" });

    if (!["1", "2", "3", "4", "5"].includes(prioridade)) erros.push({ campo: "prioridade", msg: "Prioridade inválida" });

    if (!["todo", "doing", "done"].includes(status)) erros.push({ campo: "status", msg: "Status inválido" });

    return { valido: erros.length === 0, erros };
  }

  static listarTarefas() {
    return repositorio.listarTarefas();
  }

  static deleteTask(hashId) {
    let indexTask = this.listarTarefas().findIndex(tarefa => tarefa.id === hashId);

    if(indexTask !== -1) {
      this.listarTarefas().splice(indexTask, 1);
    }
  }

  static buscarTask(id) {
    return repositorio.buscarTaskId(id)
  }

}