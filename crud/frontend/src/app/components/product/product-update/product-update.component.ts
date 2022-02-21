import { Product } from './../product-create/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  // Inicia com os dados preenchidos
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  //Atualiza as informações do produto e volta p listagem
  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/products']);
    });
  }

  // Volta para tela da listagem dos produtos
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
