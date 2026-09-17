export class Task {
  constructor (nome, descricao, categoria, dataPrazo, prioridade, status) {
    this.id = crypto.randomUUID().slice(0, 8),
    this.nome = nome,
    this.descricao = descricao,
    this.categoria = categoria,
    this.dataPrazo = dataPrazo,
    this.prioridade = prioridade,
    this.status = status
  }
}