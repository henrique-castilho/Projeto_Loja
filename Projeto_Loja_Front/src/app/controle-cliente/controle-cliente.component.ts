import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-controle-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controle-cliente.component.html',
  styleUrl: './controle-cliente.component.css'
})
export class ControleClienteComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService){}

  public gravar() {
    this.service.gravar(this.obj).subscribe({
      next: (data: any) => {
        if (data.mensagem.includes("Todo os campos devem ser preenchidos") ||
            data.mensagem.includes("A senha e a confirmação da senha devem ser iguais") ||
            data.mensagem.includes("Cliente já cadastrado com as mesmas informações")) {
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
        if (data.mensagem.includes("Todo os campos devem ser preenchidos para realizar a alteração.") ||
            data.mensagem.includes("A senha e a confirmação da senha devem ser iguais.") ||
            data.mensagem.includes("Cliente não encontrado para alteração.") ||
            data.mensagem.includes("Cliente já cadastrado com as mesmas informações")) {
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
      this.mensagem = "Preencha pelo menos um campo para pesquisar o cliente.";
      return;
    }
    this.service.carregar(valor).subscribe({
      next: (data) => {
        if (data === null) {
          this.mensagem = "Cliente não encontrado, verifique!";
          this.limpar();
        } else {
          this.obj = data;
          this.mensagem = `Cliente com nome ${data.nome} encontrado`;
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
      this.mensagem = "Preencha pelo menos um campo para deletar o cliente."
      return;
    }
    this.service.remover(valor).subscribe({
        next: (data) => {
            if (data === null) {
                this.mensagem = "Cliente removido com sucesso!";
            } else {
                this.mensagem = "Cliente não encontrado";
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
    if (this.obj.email) return this.obj.email;
    if (this.obj.cpf) return this.obj.cpf;
    if (this.obj.rg) return this.obj.rg;
    return null;
  }

  
  public limpar(){
    this.obj = new Cliente();
  }
  
  PasswordVisivel: boolean = false;
  public SenhaVisivel(){
    this.PasswordVisivel = !this.PasswordVisivel;
  }
  
  ConfirmaVisivel: boolean = false;
  public ConfirmaSenhaVisivel(){
    this.ConfirmaVisivel = !this.ConfirmaVisivel;
  }

}
