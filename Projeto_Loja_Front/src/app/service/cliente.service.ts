import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  gravar(obj: Cliente) : Observable<Object> {
    return this.http.post("http://localhost:8080/api/cliente", obj);
  }

  alterar(obj: Cliente) : Observable<Object> {
    return this.http.put("http://localhost:8080/api/cliente", obj);
  }

  carregar(valor: string): Observable<any> {
    return this.http.get("http://localhost:8080/api/cliente/"+ valor)
  }

  remover(valor: string): Observable<Object> {
    return this.http.delete("http://localhost:8080/api/cliente/" + valor)
  }

  listar(): Observable<any> {
    return this.http.get("http://localhost:8080/api/clientes")
  }

  login(obj: Cliente): Observable<any> {
    return this.http.post("http://localhost:8080/api/cliente/login", obj)
  }
  
  esqueciSenha(obj: Cliente): Observable<any> {
    return this.http.post("http://localhost:8080/api/cliente/recupera", obj);
  }

  redefinirSenha(email: string, novaSenha: string, token: string) {
    return this.http.post("http://localhost:8080/api/cliente/redefinir", { email, novaSenha, token });
  }
}
