import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacao',
  template: `
  <div *ngIf="mensagem" class="notificacao">
    <span>{{ mensagem }}</span>
  </div>
`,
  styleUrls: ['./notificacao.component.css'],
  imports: [CommonModule],
  standalone: true
})

export class NotificacaoComponent  implements OnInit {
  @Input() mensagem: string | null = null;

  ngOnInit() {
    this.mensagem = localStorage.getItem('loginMessage');

    if (this.mensagem) {
      setTimeout(() => {
        this.closeNotification();
      }, 3000); 
    }
  }

  closeNotification() {
    this.mensagem = null; 
    localStorage.removeItem('loginMessage'); 
  }
}

