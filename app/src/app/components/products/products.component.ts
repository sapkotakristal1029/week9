import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router'; // For navigating to update page
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ProductsComponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  showUpdateForm = false; // Control form visibility
  selectedProduct: any = null; // Store the selected product to update

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Method to load products
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        if (response.status) {
          this.products = response.data;
        } else {
          console.error('Error fetching products', response.message);
        }
      },
      (error) => {
        console.error('Server error', error);
      }
    );
  }

  // Method to handle product update (toggle form visibility and set selected product)
  onUpdateProduct(product: any): void {
    this.selectedProduct = { ...product }; // Clone product object
    this.showUpdateForm = !this.showUpdateForm; // Toggle form visibility
  }

  // Method to handle update form submission
  onSubmitUpdate(): void {
    if (this.selectedProduct) {
      this.productService
        .updateProduct(this.selectedProduct._id, this.selectedProduct)
        .subscribe(
          (response) => {
            if (response.status) {
              this.loadProducts(); // Reload products after successful update
              console.log('Product updated successfully');
              this.showUpdateForm = false; // Hide the update form after submission
            } else {
              console.error('Error updating product', response.message);
            }
          },
          (error) => {
            console.error('Server error', error);
          }
        );
    }
  }

  // Method to handle product deletion
  onDeleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        (response) => {
          if (response.status) {
            this.loadProducts(); // Reload products after deletion
            console.log('Product deleted successfully');
          } else {
            console.error('Error deleting product', response.message);
          }
        },
        (error) => {
          console.error('Server error', error);
        }
      );
    }
  }

  // Method to cancel the update process
  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.selectedProduct = null;
  }
  navigatetoAdd(): void {
    this.router.navigate(['/products/add']);
  }
}
