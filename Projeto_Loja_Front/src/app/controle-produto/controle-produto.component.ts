import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-controle-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controle-produto.component.html',
  styleUrl: './controle-produto.component.css'
})
export class ControleProdutoComponent {
  public mensagem: string = "";
  public obj: Produto = new Produto();

  public keywordsInput: string = "";

  constructor(private service: ProdutoService){}

  public updateKeywords(input: string): void {
    this.obj.keywords = input
      .split(",")
      .map(keyword => keyword.trim())
      .filter(keyword => keyword !== "");
  }

  public gravar() {
    this.service.gravar(this.obj).subscribe({
      next: (data: any) => {
        if (data.mensagem.includes("Todo os campos devem ser preenchidos e com valores válidos.") ||
            data.mensagem.includes("Produto já cadastrado com as mesmas informações.") ) {
          this.mensagem = data.mensagem;
        } else {
          this.mensagem = data.mensagem;
          this.limpar();  
        }
      },
      error: (err) => {
        console.error(err);
        this.mensagem = "Ocorreu um erro, tente mais tarde!";
      }
    });
  }

  public alterar() {
    this.service.alterar(this.obj).subscribe({
      next: (data: any) => {
        if (data.mensagem.includes("Todo os campos devem ser preenchidos e com valores válidos.") ||
            data.mensagem.includes("Produto não encontrado para alteração.")) {
          this.mensagem = data.mensagem;
        } else {
          this.mensagem = data.mensagem;
          this.limpar();
        }
      },
      error: (err) => {
        if (err.error && err.error.mensagem) {
          this.mensagem = err.error.mensagem;
        } else {
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        }
      }
    });
  }

  public carregar() {
    const valor = this.obterValorPreenchido();
    if (!valor) {
      this.mensagem = "Preencha pelo menos um campo para pesquisar o produto.";
      return;
    }
    this.service.carregar(valor).subscribe({
      next: (data) => {
        if (data === null) {
          this.mensagem = "Produto não encontrado, verifique!";
          this.limpar();
        } else {
          this.obj = data;
          this.keywordsInput = data.keywords ? data.keywords.join(", ") : "";
          this.mensagem = `Produto com nome ${data.nome} \nencontrado`;
        }
      },
      error: (err) => {
        this.mensagem = "Ocorreu um erro, tente mais tarde!";
        this.limpar();
      },
    });
  }
  

  public remover() {
    const valor = this.obterValorPreenchido();
    if(!valor) {
      this.mensagem = "Preencha pelo menos um campo para deletar o produto."
      return;
    }
    this.service.remover(valor).subscribe({
        next: (data) => {
            if (data === null) {
                this.mensagem = "Produto removido com sucesso!";
            } else {
                this.mensagem = "Produto não encontrado.";
            }
            this.limpar();
        },
        error: (err) => {
            this.mensagem = "Ocorreu um erro, tente mais tarde!";
        }
    });
  }

  private obterValorPreenchido(): string | null {
    if (this.obj.codigo) return this.obj.codigo.toString(); 
    if (this.obj.nome) return this.obj.nome;
    return null;
  }

  
  public limpar(){
    this.obj = new Produto();
    this.keywordsInput = "";
  }

}
