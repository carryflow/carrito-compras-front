import { Product } from './product';
export class Cart {

    constructor(
        public product: Product,
        public qty:number =1,
        public importe: number,
    ){}

    calcularImporte(){
        return this.importe = this.product.price * this.qty;
    }
    
}
