import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product.model";
import { Order } from "./order.model";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string | null = null;
    auth_headers: object;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
        this.auth_headers = { "Authorization": `Bearer<${this.auth_token}>` };
    }

    authenticate(user: string, pass: string): Observable<any> {
        const body = { name: user, password: pass };

        let req = this.http.post<any>(this.baseUrl + 'login', body, this.auth_headers);

        req.subscribe(data => {
            this.auth_token = data.success ? data.token : null;
        });

        return req;
    }

    // Products handlers.
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + 'products')
    }
    saveProduct(product: Product): Observable<Product> {
        let res = this.http.post<Product>(this.baseUrl + 'products', product, this.auth_headers);

        res.subscribe(data => {
            console.log(data)
        });

        return res;
    }
    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(this.baseUrl + `products/${product.id}`, product);
    }
    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(this.baseUrl + `products/${id}`);
    }

    // Order handlers.
    getOrders(): Observable<Order[]> { 
        return this.http.get<Order[]>(this.baseUrl + 'orders');
    }
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + 'orders', order)
    }
    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(this.baseUrl + `orders/${order.id}`, order);
    }
    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(this.baseUrl + `orders/${id}`);
    }
}