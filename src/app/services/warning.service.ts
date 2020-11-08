import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WarningService {
  constructor(private http: HttpClient) {}

  getActiveWarnings(roomId) {
    return this.http.get<any>(`${environment.apiUrl}/Room/${roomId}/alarms?openOnly=true`);
  }

  getAllWarnings(roomId) {
    return this.http.get<any>(`${environment.apiUrl}/Room/${roomId}/alarms`);
  }
}
