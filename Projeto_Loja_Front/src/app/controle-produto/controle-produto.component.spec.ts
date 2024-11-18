import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleProdutoComponent } from './controle-produto.component';

describe('ControleProdutoComponent', () => {
  let component: ControleProdutoComponent;
  let fixture: ComponentFixture<ControleProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
