export class TaskRepository {
  repositorio = [];

  addTask(tarefa) {
    this.repositorio.push(tarefa);
  }

  listarTarefas() {
    return this.repositorio;
  }

  buscarTaskId(id) {
    return this.repositorio.find(tarefa => tarefa.id === id);
  }
}