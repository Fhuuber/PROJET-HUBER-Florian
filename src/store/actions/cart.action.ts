import { Product } from "../models/product";

export namespace CartAction {
    export class Add {
        static readonly type = "[Product] Add";
        constructor (public product:Product) { }
    }

    export class Delete {
        static readonly type = "[Product] Delete";
        constructor (public product:Product) { }
    }

    export class EmptyCart {
        static readonly type = "[Product] EmptyCart";
        constructor () { }
    }
}
