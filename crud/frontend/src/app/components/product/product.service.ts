import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { Product } from './product-create/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  //Popup de confirmação e ou erro
  showMessage(msg: string , isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }

  // Envia dados do novo produto para o servidor e chama metodo de erro
  create(product:Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    )
  }

  // Le um produto já armazenado no servidor e chama metodo de erro
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    )
  }

  //Tras o produto conforme seu ID para poder fazer a alteração e chama metodo de erro
  readById(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    )
  }

  // Produto alterado, substitui/atualiza o existente e chama metodo de erro
  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    )
  }

  //Exclui o produto e chama metodo de erro
  delete(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    )
  }
  
  // Msg de erro e retorna observable vazio
  erroHandler(e: any): Observable<any>{
    this.showMessage("Ocorreu um erro!", true)
    return EMPTY
  }
}
