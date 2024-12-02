import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cesta } from '../model/cesta';
import { Item } from '../model/item';
import { CestaService } from '../service/cesta.service'

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
  public total: number = 0;

  constructor(private service: CestaService) {
    this.carregarCesta();
  }

  private carregarCesta() {
    const json = localStorage.getItem("cesta");
    if (json) {
      this.cesta = JSON.parse(json);
      this.atualizarTotal();
    } else {
      this.mensagem = "Carrinho vazio, adicione novos itens!";
    }
  }

  public removerItem(item: Item) {
    const index = this.cesta.itens.findIndex(i => i.codigo === item.codigo);
    if (index !== -1) {
      const itemEncontrado = this.cesta.itens[index];
      if (itemEncontrado.quantidade > 1) {
        itemEncontrado.quantidade--;
      } else {
        this.cesta.itens.splice(index, 1);
      }

      this.atualizarTotal();
      this.salvarCesta();
    }

    if (this.cesta.itens.length === 0) {
      this.mensagem = "Carrinho vazio, adicione novos itens!";
      this.limpar();
    }
  }

  private atualizarTotal() {
    this.total = this.cesta.itens.reduce((total, item) => total + (item.quantidade * item.produto.valor), 0);
    this.cesta.total = this.total;
  }

  private limparCompra(novoPedido: Cesta) {
    localStorage.removeItem("cesta");
    this.cesta = new Cesta();
    this.mensagem = `Compra realizada com sucesso! Pedido nº ${novoPedido.codigo}`;
  }

  public limpar() {
    localStorage.removeItem("cesta");
    this.cesta = new Cesta();
    this.total = 0;
    this.mensagem = "Carrinho vazio, adicione novos itens!";
  }

  private salvarCesta() {
    localStorage.setItem("cesta", JSON.stringify(this.cesta));
  }

  public abrirConfirmacao() {
    this.mostrarConfirmacao = true;
  }

  public fecharConfirmacao() {
    this.mostrarConfirmacao = false;
  }

  public gravarPedido() {
    if (this.cesta.itens.length === 0) {
      this.mensagem = "Carrinho vazio! Adicione itens antes de realizar o pedido.";
      return;
    }
    const jsonCliente = localStorage.getItem("cliente");
    if (jsonCliente) {
      this.cesta.cliente = JSON.parse(jsonCliente);
      this.service.gravarPedido(this.cesta).subscribe({
        next: (novoPedido) => {
          console.log("Novo pedido", novoPedido)
          this.gravarItens(novoPedido);
          this.fecharConfirmacao();
        },
        error: () => {
          this.mensagem = "Ocorreu um erro ao gravar o pedido, tente novamente.";
          this.fecharConfirmacao();
        }
      });
    } else {
      this.mensagem = "Faça o login para gravar o pedido!";
      this.fecharConfirmacao();
    }
  }

  gravarItens(novoPedido: Cesta) {
    const novosItens = this.cesta.itens.map((item) => {
        const novoItem = { ...item };
        novoItem.codigo = 0;
        novoItem.codigoCesta = novoPedido.codigo;
        return novoItem;
    });

    this.service.gravarItem(novosItens).subscribe({
        next: (data) => {
            this.limparCompra(novoPedido);
        },
        error: () => {
            this.mensagem = "Erro ao gravar itens do pedido, tente novamente.";
        }
    });
  }
} 