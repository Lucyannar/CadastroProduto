import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { ProductCrudComponent } from "./views/product-crud/product-crud.component";
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

// Rotas da URL
const routes: Routes = [
    //Rota inicial
  {
    path: "",
    component: HomeComponent
  },
  //Rota de listagem de produtos
  {
    path: "products",
    component: ProductCrudComponent
  },
  // Rota novo produto
  {
    path:"products/create",
    component: ProductCreateComponent
  },
  //:id para entender que é um paramentro e ñ colocar a palavra ':id' na rota
  //Rota dinamica
  {
    path:"products/update/:id",
    component: ProductUpdateComponent
  },
  //Rota para excluir o produto
  {
    path:"products/delete/:id",
    component: ProductDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
