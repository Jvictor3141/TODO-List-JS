export class TaskRepository {
  repositorio = [];

  addTask(tarefa) {
    this.repositorio.push(tarefa);
  }

  listarTarefas() {
    return this.repositorio;
  }
}