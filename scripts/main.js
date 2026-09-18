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
  const overlayConfirmModal = document.getElementById("overlay-confirm")
  const confirmModal = document.getElementById("confirm-modal")

  columnTodo.addEventListener('click', (e) => {
    const botao = e.target.closest('button');

    if(!botao) return;
    
    let action = botao.dataset.action;
    let idTask = botao.parentElement.dataset.id;

    if(action === 'next-step') {
      console.log(tarefa)
    } else if(action === 'delete') {
      overlayConfirmModal.classList.toggle('active');
      confirmModal.addEventListener('click', (e) => {
        const botaoModal = e.target.closest('button');
        if(!botao) return;
        
        let modalAction = botaoModal.dataset.modalaction;
    
        if(modalAction === 'confirm') {

          TaskService.deleteTask(idTask);
          overlayConfirmModal.classList.toggle('active');
          renderizarTarefas(TaskService.listarTarefas());

        } else if(modalAction === 'cancel')

        overlayConfirmModal.classList.toggle('active');

      })
    }
  })
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
      el.dataset.action = "checkbox"
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