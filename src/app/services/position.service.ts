import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PositionService {
  constructor(private http: HttpClient) {}

  getPositions(roomId) {
    return this.http.get<any>(`${environment.apiUrl}/Room/${roomId}/status`);
  }

  // getProduct(id: number) {
  //   return this.http.get<any>(`${environment.apiUrl}/product/${id}`);
  // }

  // createProduct(name: string, description: string, product_type: ProductType) {
  //   return this.http.post<any>(`${environment.apiUrl}/product`, {
  //     name,
  //     description,
  //     product_type,
  //   });
  // }

  // editProduct(
  //   id: number,
  //   name: string,
  //   description: string,
  //   product_type: ProductType
  // ) {
  //   return this.http.post<any>(`${environment.apiUrl}/product/${id}`, {
  //     name,
  //     description,
  //     product_type,
  //   });
  // }
}
