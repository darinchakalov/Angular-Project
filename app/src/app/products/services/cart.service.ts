import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addExistingItem, addItem } from 'src/app/+store/actions';
import { selectGlobalItems } from 'src/app/+store/selectors';
import { IProduct } from 'src/app/shared/interfaces/product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  currentCartItems = JSON.parse(localStorage.getItem('global')!).items;
  items: any[] | undefined;
  constructor(private store: Store<any>) {
    let items$ = this.store.select(selectGlobalItems);
    items$.subscribe((items) => (this.items = items));
  }

  isAlreadyAdded(product: IProduct): boolean {
    return this.items!.some((x: any) => x.product._id == product._id);
  }

  getCurrentCount(product: IProduct): number {
    let currentItem = this.items!.find(
      (x: any) => x.product._id == product._id
    );
    return currentItem.productCount;
  }

  addToCart(product: IProduct): void {
    if (this.isAlreadyAdded(product)) {
      let currentCount = this.getCurrentCount(product);
      this.store.dispatch(
        addExistingItem({ item: product, productCount: currentCount + 1 })
      );
    } else {
      this.store.dispatch(addItem({ item: product, productCount: 1 }));
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product was added to cart',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
