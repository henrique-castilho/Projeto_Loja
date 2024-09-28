import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  public fazerLogin() {
    if(this.obj.email == "admin@gmail.com" && this.obj.senha == "123456") {
      localStorage.setItem("cadastro", JSON.stringify(this.obj));
      window.location.href="./cadastro";
    } else {
      this.mensagem = "Email ou senha ivalidos !!!"
      localStorage.removeItem("cadastro");
    }
  }

  public novoCadastro(){
    localStorage.setItem("cadastro", JSON.stringify(this.obj));
    window.location.href="./cadastro";
  }
}