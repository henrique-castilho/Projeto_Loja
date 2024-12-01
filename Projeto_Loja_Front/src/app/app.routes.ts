import { Routes } from '@angular/router';
import { BuscaComponent } from './busca/busca.component';
import { CestaComponent } from './cesta/cesta.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { LoginComponent } from './login/login.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ControleClienteComponent } from './controle-cliente/controle-cliente.component';
import { ControleProdutoComponent } from './controle-produto/controle-produto.component';
import { UsuarioLogadoComponent } from './usuario-logado/usuario-logado.component';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
    {path:"busca", component:BuscaComponent},
    {path:"cesta", component:CestaComponent},
    {path:"detalhe/:codigo", component:DetalheComponent},
    {path:"login", component:LoginComponent},
    {path:"vitrine", component:VitrineComponent},
    {path:"esqueci-senha", component:EsqueciSenhaComponent},
    {path:"cadastro", component:CadastroComponent},
    {path:"", component:VitrineComponent},
    {path:"controle-cliente", component:ControleClienteComponent},
    {path:"controle-produto", component:ControleProdutoComponent},
    {path:"usuario-logado", component:UsuarioLogadoComponent},
    {path:"redefinir-senha", component:RedefinirSenhaComponent }
];
