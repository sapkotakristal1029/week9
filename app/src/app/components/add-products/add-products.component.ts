import { CommonModule } from '@angular/common';
import { ProductService } from './../../service/product.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
})
export class AddProductsComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    units: 0,
  };

  message: string = '';

  constructor(private ProductService: ProductService, private router: Router) {}

  onSubmit(): void {
    this.ProductService.createProduct(this.product).subscribe(
      (response) => {
        if (response.status) {
          this.message = 'Product added successfully';
          this.product = {
            name: '',
            description: '',
            price: 0,
            units: 0,
          };
        } else {
          this.message = 'Error adding product: ' + response.message;
        }
      },
      (error) => {
        this.message = 'Server error: ' + error.message;
      }
    );
  }

  onGoBack(): void {
    this.router.navigate(['/products']);
  }
}
