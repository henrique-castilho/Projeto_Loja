import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-usuario-logado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-logado.component.html',
  styleUrl: './usuario-logado.component.css'
})
export class UsuarioLogadoComponent {
  public mensagem: string = "Todos os campos devem estar preenchido para atualização e exclusão";
  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService){}

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

  public logOut(){
    localStorage.clear();
    this.limpar();
    alert("LogOut feito. Até mais!!")
    window.location.href="./login"
  }

  public excluirConta(){
    const valor = this.obterValorPreenchido();
    if(!valor) {
      this.mensagem = "Preencha pelo menos um campo para deletar."
      return;
    }
    this.service.remover(valor).subscribe({
        next: (data) => {
            if (data === null) {
              this.mensagem = "Conta excluida com sucesso!";
              localStorage.clear();
              this.limpar();
              alert("Conta excluida com sucesso!")
              window.location.href="./cadastro"
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

  PasswordVisivel: boolean = false;
  public SenhaVisivel(){
    this.PasswordVisivel = !this.PasswordVisivel;
  }
  
  ConfirmaVisivel: boolean = false;
  public ConfirmaSenhaVisivel(){
    this.ConfirmaVisivel = !this.ConfirmaVisivel;
  }

  public limpar(){
    this.obj = new Cliente();
  }

  ngOnInit(): void {
    const clienteSalvo = localStorage.getItem("cliente");
    if (clienteSalvo) {
     this.obj = JSON.parse(clienteSalvo);
    }
  }
}
