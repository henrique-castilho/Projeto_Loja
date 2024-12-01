import { Component } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './redefinir-senha.component.html',
  styleUrl: './redefinir-senha.component.css'
})
export class RedefinirSenhaComponent {
  public email: string = "";
  public novaSenha: string = "";
  public token: string = "";
  public mensagem: string = "";

  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';
    });
  }

  public redefinir() {
    if (!this.novaSenha) {
      this.mensagem = "Digite a nova senha.";
      return;
    }

    this.service.redefinirSenha(this.email, this.novaSenha, this.token).subscribe({
      next: () => {
        this.mensagem = "Senha redefinida com sucesso!";

        // Atraso de 1 segundo antes de redirecionar
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        if (err.error?.mensagem) {
          this.mensagem = err.error.mensagem;
        } else {
          this.mensagem = "Erro ao redefinir a senha.";
        }
        console.error(err);
      }
    });
  }


  PasswordVisivel: boolean = false;
  public SenhaVisivel() {
    this.PasswordVisivel = !this.PasswordVisivel;
  }
}
