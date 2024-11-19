import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cesta } from '../model/cesta';
import { Item } from '../model/item';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})

export class CestaComponent {
  public mensagem: string = "Sua cesta";
  public cesta: Cesta = new Cesta();
  public mostrarConfirmacao: boolean = false; 

  constructor(){
    let json = localStorage.getItem("cesta");
    if(json!=null) {
      this.cesta = JSON.parse(json);
    } else {
      this.mensagem = "Cesta vazia, adicione novos itens!";
    }
  }

  public removerItem(obj: Item) {
    // Verifica se a quantidade do item é maior que 1
    if (obj.quantidade > 1) {
      // Diminui a quantidade do item
      obj.quantidade -= 1;
      // Atualiza o valor total da cesta
      this.cesta.total -= obj.produto.valor;
    } else {
      // Se a quantidade for 1, remove o item completamente
      this.cesta.itens = this.cesta.itens.filter(item => item !== obj);
      // Atualiza o total da cesta
      this.atualizarTotal();
    }
  
    // Salva a cesta no localStorage e atualiza a exibição
    localStorage.setItem("cesta", JSON.stringify(this.cesta));
    this.verificarCestaVazia();
  }
  
  // Atualiza o total da cesta
  private atualizarTotal() {
    this.cesta.total = this.cesta.itens.reduce(
      (acc, item) => acc + item.quantidade * item.produto.valor,
      0
    );
  }
  
  // Verifica se a cesta está vazia e atualiza a mensagem
  private verificarCestaVazia() {
    if (this.cesta.itens.length === 0) {
      this.mensagem = "Cesta vazia, adicione novos itens!";
    }
  }
  

  public limparCesta(){
    localStorage.removeItem("cesta");
    this.cesta = new Cesta();
    this.mensagem = "Cesta vazia, adicione novos itens!";
  }

  public abrirConfirmacao() {
    this.mostrarConfirmacao = true;
  }

  public fecharConfirmacao() {
    this.mostrarConfirmacao = false;
  }

  public finalizarCompra() {
    this.mensagem = "Compra finalizada com sucesso!";
    localStorage.removeItem("cesta");
    this.cesta = new Cesta();
    this.mostrarConfirmacao = false;
  }
}