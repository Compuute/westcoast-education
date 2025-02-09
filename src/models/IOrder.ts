import { ICustomer } from "./ICustomer.js";
import { ICourse } from "./ICourse.js";

export interface IOrder {
    id: string;
    orderDate: string;  
    customer: ICustomer;
    courses: ICourse[];
}
