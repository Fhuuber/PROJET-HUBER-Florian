import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CartStateModel } from './cart.state-model';
import { CartAction } from '../actions/cart.action';

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    products : []
  }
})
@Injectable()
export class CartState {

    @Selector () 
    static getProductsNumber (state:CartStateModel) {
        return state.products.length;
    }
    
    @Action (CartAction.Add)
    add(
        {getState, patchState } :  StateContext<CartStateModel>,
        { product }: CartAction.Add) {
        const state = getState();
        patchState({products : [...state.products, product]});
    }

    @Action (CartAction.Delete)
    delete(
        {getState, patchState } :  StateContext<CartStateModel> ,
        { product }: CartAction.Delete) {
        const state = getState();
        patchState({products : [...state.products.filter(p => !(p.name.match(product.name)))]});
    }

    @Action (CartAction.EmptyCart)
    emptyCart(
        {getState, patchState } :  StateContext<CartStateModel> ,
        { }: CartAction.EmptyCart) {
        const state = getState();
        patchState({products : [...state.products.filter(p => !(p.name.match("")))]});
    }
}