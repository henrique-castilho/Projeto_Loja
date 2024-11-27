import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente()

  constructor(private service: ClienteService) { }

  //REFAZER ESSA FUNÇÃO USANDO O BACK-END E BANCO DE DADOS

  //mexi aq henrique, caso de problema no login
  public fazerLogin() {
    this.service.login(this.obj).subscribe({
      next: (data) => {
        if (data.mensagem) {
          this.mensagem = data.mensagem;
        } else {
          this.obj = data;
          if (this.obj.codigo) {
            localStorage.setItem("cliente", JSON.stringify(this.obj));

            localStorage.setItem("loginMessage", `Seja Bem-vindo, ${this.obj.nome}!`);

            window.location.href = "./vitrine";
          } else {
            this.mensagem = "Login ou senha inválidos!";
          }
        }
      },
      error: (msg) => {
        this.mensagem = "Ocorreu um erro, tente novamente!";
      }
    });
  }

  public novoCadastro() {
    localStorage.setItem("cadastro", JSON.stringify(this.obj));
    window.location.href = "./cadastro";
  }

  PasswordVisivel: boolean = false;
  public SenhaVisivel() {
    this.PasswordVisivel = !this.PasswordVisivel;
  }
}