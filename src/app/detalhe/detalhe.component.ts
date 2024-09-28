import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})

export class DetalheComponent {
  public mensagem: string ="";
  public item: Produto = new Produto();
  constructor(){
    let json = localStorage.getItem("produto");
    if (json != null) {
      this.item = JSON.parse(json);
    } else {
      this.mensagem = "Produto não encontrado!"
    }
  }

  public mostrarModal: boolean = false;
  public mostrarModalCarrinho: boolean = false;
  public produtoSelecionado: Produto | null = null;

  public adicionarCesta(item: Produto) {
    this.produtoSelecionado = item;
    this.mostrarModal = true;
  }

  public confirmarAdicao() {
    if (this.produtoSelecionado) {
      let cesta = JSON.parse(localStorage.getItem("cesta") || '[]');
      cesta.push(this.produtoSelecionado);
      localStorage.setItem("cesta", JSON.stringify(cesta));
      this.fecharModal();

      this.mostrarModalCarrinho = true;
    }
  }

  public cancelarAdicao() {
    this.fecharModal();
  }

  public fecharModal() {
    this.mostrarModal = false;
    this.produtoSelecionado = null;
  }

  public fecharModalCarrinho() {
    this.mostrarModalCarrinho = false;
  }
}