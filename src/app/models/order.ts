import { User } from './user';
export class Order {

    constructor(
        public user: User,
        public carts: any[],
        public email: string,
        public paymentId: string,
        public date: string,
        public total: number
    ){}
}
