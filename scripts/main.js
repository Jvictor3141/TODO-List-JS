import { TaskService } from "./service/TaskService.js";

document.addEventListener('DOMContentLoaded', function() {
  const buttonOpenForm = document.getElementById('add-task');
  const overlay = document.getElementById('overlay');

  buttonOpenForm.addEventListener('click', () => {
    overlay.classList.toggle('active')
  })

  const form = document.getElementById("task-form");

  renderizarTarefas(TaskService.listarTarefas());

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let taskTitle = document.getElementById("nome").value.trim();
    let taskDescription = document.getElementById("descricao").value.trim();
    let taskCategory = document.getElementById("categoria").value.trim();
    let taskDate = document.getElementById("data").value;
    let taskPriority = document.getElementById("prioridade").value;
    let taskStatus = document.getElementById("status").value;

    try {
      TaskService.createTask(taskTitle, taskDescription, taskCategory, taskDate, taskPriority, taskStatus);
    } catch(err) {
      alert(err);
    }

    renderizarTarefas(TaskService.listarTarefas());

    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("data").value = "";
    document.getElementById("prioridade").value = "1";
    document.getElementById("status").value = "todo";

    overlay.classList.remove("active");
  })

  overlay.addEventListener('click', (e) => {
    if(e.target == e.currentTarget) {
      overlay.classList.remove("active");
    }
  })

  const columnTodo = document.getElementById("todo-section");
  const columnDoing = document.getElementById("doing-section");
  const columnDone = document.getElementById("done-section");
  const taskCheck = document.getElementById("task-check");
  const overlayConfirmModal = document.getElementById("overlay-confirm");
  const confirmModal = document.getElementById("confirm-modal");
  let idTask = null;

  columnTodo.addEventListener('click', (e) => {
    const botao = e.target.closest('button');

    if(!botao) return;
    
    let action = botao.dataset.action;
    idTask = botao.parentElement.dataset.id;

    if(action === 'next-step') {
      TaskService.attTask(idTask, { status: "doing" });
      renderizarTarefas(TaskService.listarTarefas());
      idTask = null;
    } else if(action === 'delete') {
      overlayConfirmModal.classList.toggle('active');
    }
  })

  columnDoing.addEventListener('click', (e) => {
    const botaoDel = e.target.closest('button');
    const checkbox = e.target.closest('#task-check')
    
    if(checkbox && checkbox.checked) {
      idTask = checkbox.parentElement.dataset.id;
      TaskService.attTask(idTask, { status: "done" })
      renderizarTarefas(TaskService.listarTarefas());
      idTask = null;
    }
    
    if(!botaoDel) return;
    
    let action = botaoDel.dataset.action;
    idTask = botaoDel.parentElement.dataset.id;

    if(action === 'delete') {
    overlayConfirmModal.classList.toggle('active');
    }
  })

  columnDone.addEventListener('click', (e) => {
    const botao = e.target.closest('button');

    if(!botao) return;
    
    let action = botao.dataset.action;
    idTask = botao.parentElement.dataset.id;
    
    if(action === 'delete') {
      overlayConfirmModal.classList.toggle('active');
    }
  })

  confirmModal.addEventListener('click', (e) => {
    const botaoModal = e.target.closest('button');
    if(!botaoModal) return;
    
    let modalAction = botaoModal.dataset.modalaction;

    if(modalAction === 'confirm') {

      TaskService.deleteTask(idTask);
      overlayConfirmModal.classList.toggle('active');
      renderizarTarefas(TaskService.listarTarefas());
      idTask = null;

    } else if(modalAction === 'cancel')
    overlayConfirmModal.classList.toggle('active');
    idTask = null;
  })

  const descriptionModal = document.getElementById("task-description");
  const overlayEdit = document.getElementById("overlay-edit");
  const taskList = document.getElementById("task-list");
  const editDiv = document.getElementById("edit-div");
  const iconEdit = document.getElementById("edit-mode");
  const iconClose = document.getElementById("close");

  // campos do modal

  const nomeEdit = document.getElementById("nome-edit");
  const descricaoEdit = document.getElementById("descricao-edit");
  const categoriaEdit = document.getElementById("categoria-edit");
  const dataEdit = document.getElementById("data-edit");
  const prioridadeEdit = document.getElementById("prioridade-edit");
  const statusEdit = document.getElementById("status-edit");

  const savebtn = document.getElementById("save-btn");

  let taskSelected = null;

  taskList.addEventListener('click', (e) => {
    const cardTitle =  e.target.closest('.task-title');
    if(!cardTitle) return;
    const card = cardTitle.parentElement;

    overlayEdit.classList.toggle('active');

    taskSelected = TaskService.buscarTask(idTask = card.dataset.id);

    nomeEdit.value = taskSelected.nome;
    descricaoEdit.value = taskSelected.descricao;
    categoriaEdit.value = taskSelected.categoria;
    dataEdit.value = taskSelected.dataPrazo;
    prioridadeEdit.value = taskSelected.prioridade;
    statusEdit.value = taskSelected.status;
  })

  overlayEdit.addEventListener('click', (e) => {
    if(e.target != e.currentTarget) return;

    overlayEdit.classList.toggle('active');

    alterarEstados();
  })

  editDiv.addEventListener('click', (e) => {
    const elementClicked = e.target.closest('#edit-mode') || e.target.closest('#close');
    if(!elementClicked) return;

    alterarEstados();
  })

  descriptionModal.addEventListener('submit', (e) => {
    e.preventDefault();

    let nomeVal = nomeEdit.value.trim();
    let descricaoVal = descricaoEdit.value.trim();
    let categoriaVal = categoriaEdit.value.trim();
    let dataPrazoVal = dataEdit.value;
    let prioridadeVal = prioridadeEdit.value;
    let statusVal = statusEdit.value;

    let { valido, erros } = TaskService.validaCampos({
      nome: nomeVal,
      categoria: categoriaVal,
      dataPrazo: dataPrazoVal,
      prioridade: prioridadeVal,
      status: statusVal
    });

    if (!valido) {
      alert("Erro ao salvar tarefa, por favor, verifique os campos e preencha corretamente");
      return;
    }

    TaskService.attTask(idTask, { 
      nome: nomeVal,
      descricao: descricaoVal,
      categoria: categoriaVal,
      dataPrazo: dataPrazoVal,
      prioridade: prioridadeVal,
      status: statusVal
    })

    overlayEdit.classList.toggle('active');
    renderizarTarefas(TaskService.listarTarefas());
    idTask = null;
    taskSelected = null;

    nomeEdit.value = "";
    descricaoEdit.value = "";
    categoriaEdit.value = "";
    dataEdit.value = "";
    prioridadeEdit.value = "1";
    statusEdit.value = "todo";

    alterarEstados();

  })

  function alterarEstados() {

    iconEdit.classList.toggle('active');
    iconClose.classList.toggle('active');

    if(iconClose.classList.contains('active')) {
      nomeEdit.readOnly = false;
      descricaoEdit.readOnly = false;
      categoriaEdit.readOnly = false;
      dataEdit.readOnly = false;
      prioridadeEdit.classList.remove('readonly');
      statusEdit.classList.remove('readonly');
      savebtn.classList.toggle('active-save');
    } else {
      nomeEdit.readOnly = true;
      descricaoEdit.readOnly = true;
      categoriaEdit.readOnly = true;
      dataEdit.readOnly = true;
      prioridadeEdit.classList.add('readonly');
      statusEdit.classList.add('readonly');
      savebtn.classList.toggle('active-save');
    }
  }
})

function criarElementoStatus(tarefa) {
  let el;
  let img;

  switch (tarefa.status) {
    case "todo":
      el = document.createElement("button");
      el.classList.add("next-step-task")
      el.dataset.action = "next-step"
      img = document.createElement("img");
      img.src = "../icons/arrows.svg";
      img.alt = "Icone da seta";
      el.appendChild(img)
      break;
    case "doing":
      el = document.createElement("input");
      el.type = "checkbox";
      el.id = "task-check";
      break;
    case "done":
      el = document.createElement("div");
      el.classList.add("task-completed");
      el.dataset.action = "done"
      img = document.createElement("img");
      img.src = "../icons/check-circle-icon.svg";
      img.alt = "Icone da concluido";
      el.appendChild(img)
      break;
    default:
      console.warn(`Status desconhecido: "${tarefa.status}"`);
  }

  return el;
}

function criaTaskCard(tarefa) {
  const div = document.createElement("div");
  div.classList.add("task-card");
  div.dataset.id = tarefa.id;

  const title = document.createElement("h2");
  title.classList.add("task-title");
  title.textContent = tarefa.nome;

  const date = document.createElement("span");
  date.classList.add("task-date");
  date.textContent = tarefa.dataPrazo;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn")
  deleteBtn.dataset.action = "delete"

  const img = document.createElement("img");
  img.src = "../icons/trash-icon.svg";
  img.alt = "Ícone da categoria";

  deleteBtn.appendChild(img);

  div.appendChild(criarElementoStatus(tarefa))
  div.appendChild(title)
  div.appendChild(date)
  div.appendChild(deleteBtn)

  return div;
}

// function addTaskColumn(tarefa) {
//   const todoSection = document.getElementById("todo-section")
//   const doingSection = document.getElementById("doing-section")
//   const doneSection = document.getElementById("done-section")


//   switch (tarefa.status) {
//     case "todo":
//       todoSection.appendChild(criaTaskCard(tarefa));
//       break;
//     case "doing":
//       doingSection.appendChild(criaTaskCard(tarefa));
//       break;
//     case "done":
//       doneSection.appendChild(criaTaskCard(tarefa));
//       break;
//     default:
//       console.warn(`Erro ao adicionar tarefa na lista"`);
//   }
// }

function renderizarTarefas(repositorio) {
  const secoes = {
    todo: document.getElementById("todo-section"),
    doing: document.getElementById("doing-section"),
    done: document.getElementById("done-section"),
  };

  Object.values(secoes).forEach(el => el.innerHTML = "");

  repositorio.sort((a, b) => a.prioridade - b.prioridade);
  repositorio.forEach(tarefa => {
    const card = criaTaskCard(tarefa);
    const secao = secoes[tarefa.status];
    if (!secao) {
      console.warn(`Status "${tarefa.status}" não corresponde a nenhuma seção`);
      return;
    }
    secao.appendChild(card);
  });
}