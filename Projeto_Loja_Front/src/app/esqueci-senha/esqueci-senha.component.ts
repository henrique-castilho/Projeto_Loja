import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css'
})

export class EsqueciSenhaComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService, private router: Router){}

  public reenviar() {
    if (this.obj.email === "") {
      this.mensagem = "Preencha o campo e-mail.";
    } else {
      this.service.esqueciSenha(this.obj).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.router.navigate(['/redefinir-senha'], { 
              queryParams: { email: this.obj.email, token: response.token } 
            });
          } else {
            this.mensagem = response.mensagem || "Erro desconhecido.";
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.mensagem = err.error.mensagem || "E-mail não encontrado, verifique!!";
          } else {
            this.mensagem = "Erro ao processar a solicitação.";
          }
          console.error(err);
        }
      });
    }
  }  
}
