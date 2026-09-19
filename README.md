# TodoList

Uma aplicação de gerenciamento de tarefas desenvolvida com **HTML, CSS e JavaScript**, com foco em organização, manipulação do DOM e persistência de dados no navegador.

O projeto permite criar, editar, excluir e organizar tarefas de forma simples, utilizando um sistema de prioridades e três diferentes status de execução.

## Funcionalidades

* **Criar tarefas**

  * Nome
  * Descrição
  * Categoria
  * Data
  * Prioridade
  * Status

* **Editar tarefas**

  * Atualização das informações da tarefa diretamente pela interface.

* **Excluir tarefas**

  * Remoção das tarefas através de um botão de exclusão.

* **Organização por prioridade**

  * As tarefas são organizadas automaticamente de acordo com sua prioridade.
  * A prioridade **1 é a mais alta** e sempre aparece primeiro na lista.
  * Quanto maior o número, menor a prioridade.

* **Gerenciamento de status**

  * As tarefas são distribuídas em três colunas:

    * **A fazer**
    * **Em andamento**
    * **Concluídas**
  * O status pode ser atualizado facilmente através de um único botão.

* **Persistência com LocalStorage**

  * As tarefas permanecem salvas mesmo após fechar ou atualizar a página.
  * Os dados são armazenados no `localStorage` do navegador.

## Tecnologias utilizadas

* **HTML5** — Estrutura da aplicação
* **CSS3** — Estilização e responsividade
* **JavaScript (ES6+)** — Lógica da aplicação, manipulação do DOM e gerenciamento das tarefas
* **LocalStorage** — Persistência dos dados no navegador

## Como funciona

Cada tarefa possui informações próprias e um status que determina em qual coluna ela será exibida.

A aplicação utiliza a prioridade para definir a ordem das tarefas dentro das listas:

```text
Prioridade 1
     ↓
Prioridade 2
     ↓
Prioridade 3
     ↓
Prioridade 4
     ↓
Prioridade 5
```

Dessa forma, tarefas com maior prioridade permanecem no topo da respectiva lista.

### Status das tarefas

```text
┌──────────────┬──────────────────┬───────────────┐
│   A FAZER    │  EM ANDAMENTO    │  CONCLUÍDAS   │
├──────────────┼──────────────────┼───────────────┤
│   Tarefa A   │    Tarefa C      │   Tarefa E    │
│   Tarefa B   │    Tarefa D      │   Tarefa F    │
└──────────────┴──────────────────┴───────────────┘
```

A alteração do status pode ser realizada diretamente pela interface, evitando a necessidade de editar manualmente as informações da tarefa.

## Persistência de dados

O projeto utiliza a API `localStorage` para armazenar as tarefas no navegador.

Isso significa que os dados não são perdidos ao:

* Atualizar a página;
* Fechar e abrir novamente o navegador;
* Navegar para outra página e retornar ao projeto.

> Os dados ficam armazenados localmente no navegador e não são sincronizados com um servidor ou outros dispositivos.

Este projeto foi desenvolvido para fins de estudo e portfólio.
Autor: João Victor Cajado de Sousa.
