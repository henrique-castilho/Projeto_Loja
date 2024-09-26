import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Produto {
    codigo: string;
    nome: string;
    valor: number;
    quantidade?: number;
}

@Component({
  selector: 'busca',
  templateUrl:'./busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent {
IrCadastro() {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  mensagem: string = '';
  
  // Exemplo de lista de produtos
  lista: Produto[] = [
    { codigo: 'produto1', nome: 'Produto 1', valor: 99.99, quantidade: 10 },
    { codigo: 'produto2', nome: 'Produto 2', valor: 149.99, quantidade: 5 },
    { codigo: 'produto3', nome: 'Produto 3', valor: 199.99 },
    // Adicione mais produtos conforme necessário
  ];

  get produtosFiltrados() {
    return this.lista.filter(item => 
      item.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  realizarBusca() {
    if (this.searchTerm) {
      this.mensagem = `Resultados para "${this.searchTerm}":`;
    } else {
      this.mensagem = '';
    }
  }

  verDetalhe(item: Produto) {
    // Lógica para mostrar detalhes do produto
    alert(`Ver detalhes do produto: ${item.nome}`);
  }

  irCadastro() {
    // Lógica para redirecionar para a página de cadastro
    alert('Redirecionar para a página de cadastro');
  }
}
