
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  public gravar(){
    localStorage.setItem("cadastro", JSON.stringify(this.obj))
    this.mensagem = "Cadastro atualizado com sucesso!";
  }

  public carregar(){
    let json = localStorage.getItem("cadastro");
    if(json == null){
      window.location.href="./login"
    } else {
      this.obj = JSON.parse(json);
    }
  }

  constructor(){
    this.carregar();
  }
}
