import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  termoBusca : string = ""

  constructor(private router: Router) {}
  
  public fazerBusca() {
    if (this.termoBusca.trim()) {
      this.router.navigate(['/busca'], { queryParams: { q: this.termoBusca } });
    }
  }

  menuAberto = false;
  
  public IrCadastro() {
    window.location.href = "./cadastro";
  }

  public IrCesta() {
    window.location.href = "./cesta"
  }

  public IrVitrine() {
    window.location.href = "./vitrine"
  }

  public toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}