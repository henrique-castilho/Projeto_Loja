import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projeto_Loja';
  
  public IrCadastro() {
    window.location.href = "./cadastro";
  }

  public IrCesta() {
    window.location.href ="./cesta"
  }
}
