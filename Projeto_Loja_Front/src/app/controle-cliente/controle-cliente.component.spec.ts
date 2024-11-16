import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleClienteComponent } from './controle-cliente.component';

describe('ControleClienteComponent', () => {
  let component: ControleClienteComponent;
  let fixture: ComponentFixture<ControleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
