import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})

export class BuscaComponent {
  public mensagem: string = "Nossos Produtos"
  public filtro: string = ""
  public lista: Produto[] = []

  constructor(private service: ProdutoService, private route: ActivatedRoute){}

  ngOnInit(): void {
   this.aplicarFiltroDaRota();
    }

  private aplicarFiltroDaRota(): void {
    this.route.queryParams.subscribe(params => {
      this.filtro = params['q'] || '';
      if (this.filtro) {
        this.pesquisarProduto(this.filtro);
      } 
    });
  }

  public pesquisarProduto(termo: string): void {
    this.service.buscar(termo).subscribe({
      next: (data) => {
        this.lista = data;
        if (this.lista.length <= 0) {
          this.mensagem = `Nenhum produto encontrado para:<br><br>" ${termo} " `;
        } else {
          this.mensagem = `${this.lista.length} produto(s) encontrado(s) com a palavra "${termo}".`;
        }
      },
      error: () => {
        this.mensagem = "Erro ao buscar produtos. Tente novamente mais tarde.";
      }
    });
  }

  get produtosFiltrados(): Produto[] {
    if (!this.filtro.trim()) {
      return this.lista;
    }
    const palavraFiltada = this.filtro.toLowerCase();
    return this.lista.filter(produto =>
      produto.keywords.some(keyword => keyword.toLowerCase().includes(palavraFiltada))
    );
  }

  public verDetalhe(item:Produto) {
    window.location.href = `/detalhe/${item.codigo}`;
  }
  
  public mostrarModal: boolean = false;
  public mostrarModalCarrinho: boolean = false;
  public produtoSelecionado: Produto | null = null;

  public adicionarCesta(item: Produto) {
    this.produtoSelecionado = item;
    this.mostrarModal = true;
  }

  public confirmarAdicao(obj: Produto | null) {
    if (obj) {
      let cesta = JSON.parse(localStorage.getItem("cesta") || '[]');
      let jsonCliente = localStorage.getItem("cadastro");
      let novaCesta: Cesta = new Cesta();
      let item: Item = new Item();
  
      if (cesta.length === 0) {
        item.codigo = obj.codigo;
        item.produto = obj;
        item.quantidade = 1;
        item.valor = obj.valor;
        novaCesta.codigo = 1;
        novaCesta.total = obj.valor;
        novaCesta.itens.push(item);
        if (jsonCliente != null) novaCesta.cliente = JSON.parse(jsonCliente);
      } else {
        let achou = false;
        novaCesta = cesta;
        for (let i = 0; i < novaCesta.itens.length; i++) {
          if (novaCesta.itens[i].codigo === obj.codigo) {
            novaCesta.itens[i].quantidade += 1;
            novaCesta.itens[i].valor = novaCesta.itens[i].quantidade * novaCesta.itens[i].produto.valor;
            achou = true;
            break;
          }
        }
        if (!achou) {
          item.codigo = obj.codigo;
          item.produto = obj;
          item.quantidade = 1;
          item.valor = obj.valor;
          novaCesta.itens.push(item);
        }
      }
  
      novaCesta.total = novaCesta.itens.reduce((total, it) => total + it.valor, 0);
      localStorage.setItem("cesta", JSON.stringify(novaCesta));
      this.mostrarModalCarrinho = true;
      this.fecharModal();
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