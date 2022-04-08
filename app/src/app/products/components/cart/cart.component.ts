import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearGlobalState, removeItem } from 'src/app/+store/actions';
import { selectGlobalItems } from 'src/app/+store/selectors';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items: any;
  items$ = this.store.select(selectGlobalItems);

  constructor(
    private store: Store<any>,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  getTotal() {
    if (localStorage.getItem('global')) {
      let products = JSON.parse(localStorage.getItem('global')!).items;
      let prices = products.map((x: any) => x.product.price * x.productCount);
      return prices.reduce((prev: number, cur: number) => prev + cur, 0);
    }
  }

  emptyCart(): void {
    this.store.dispatch(clearGlobalState());
    localStorage.removeItem('global');
  }

  finishOrder(): void {
    this.productService.finishOrder(this.cartService.items);
    this.emptyCart();
  }

  removeItemFromCart(item: any): void {
    this.store.dispatch(removeItem({ item: item }));
  }
}
