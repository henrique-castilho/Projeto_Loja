import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {
  public mensagem: string = "Preencha todos os campos para cadastrar";
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

} 
