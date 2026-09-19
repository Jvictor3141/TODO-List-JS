export class TaskRepository {
  repositorio = [];

  constructor() {
    this.repositorio = this.#carregar();
  }

  addTask(tarefa) {
    this.repositorio.push(tarefa);
    this.#salvar();
  }

  listarTarefas() {
    return this.repositorio;
  }

  buscarTaskId(id) {
    return this.repositorio.find(tarefa => tarefa.id === id);
  }

  #carregar() {
    try {
      const dados = localStorage.getItem('tasks');
      if(!dados) return [];
      return JSON.parse(dados);
    } catch (err) {
      alert('Erro ao ler tarefas do localStorage', err);
      return [];
    }
  }

  #salvar () {
    localStorage.setItem('tasks', JSON.stringify(this.repositorio));
  }

  attTask(id, dados) {
    const tarefa = this.buscarTaskId(id);
    if(!tarefa) return null;
    Object.assign(tarefa, dados);
    this.#salvar();
    return tarefa;
  }

  delTask(id) {
    const index = this.repositorio.findIndex(t => t.id === id);
    if(index === -1) return false;
    this.repositorio.splice(index, 1);
    this.#salvar();
    return true;
  }
}