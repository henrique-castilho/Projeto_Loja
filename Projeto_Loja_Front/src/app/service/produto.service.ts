import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  gravar(obj: Produto):Observable<any>{
    return this.http.post("http://localhost:8080/api/produto", obj);
  }
  
  alterar(obj: Produto):Observable<any>{
    return this.http.put("http://localhost:8080/api/produto", obj);
  }
  
  carregar(valor: string):Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/"+ valor);
  }

  remover(valor: string):Observable<any>{
    return this.http.delete("http://localhost:8080/api/produto/"+ valor);
  }

  vitrine():Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/vitrine");
  }

  buscar(palavraChave: string):Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/busca/"+ palavraChave)
  }

  detalhe(codigo: number): Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/detalhe/"+ codigo)
  } 
}
