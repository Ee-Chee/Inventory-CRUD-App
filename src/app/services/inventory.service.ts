import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goods } from 'src/app/interfaces/goods';
import { Observable } from "rxjs";

// const baseUrl = 'http://localhost:8082/api/inventory';
const baseUrl = 'https://eat-happy-inventur-api.herokuapp.com/api/inventory';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {
    userId: number;

    constructor(private http: HttpClient) { }

    getQuantity() {
        return this.http.get(`${baseUrl}/amount`);
    }

    getGoods(): Observable<Goods[]> {
        return this.http.get<Goods[]>(`${baseUrl}/goods`);
    }
    //By default HttpClient return Observable<Object>. But in our case here, an array of objects is returned.
    //Use interface and redefine data type for http shall solve the typescript compiler error

    updateQuantity(data) {
        return this.http.post(`${baseUrl}/changeAmount`, data);
    }

}
