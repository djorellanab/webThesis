import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { FunctionalMovement } from '../models/functional-movement';
import{ AppConstants} from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FunctionalMovementService {

    constructor(private http: HttpClient) {}

    post(functionalMovement: FunctionalMovement){
        return this.http.post<any>(`${AppConstants.baseURL}/api/v1/functionalmovement`, functionalMovement);
    }

    get(desde?:number, limite?:number){
        let url = `${AppConstants.baseURL}/api/v1/functionalmovement`;
        if (desde && limite){url += `?desde=${desde}&limite=${limite}`}
        return this.http.get<any>(url);
    }

    getById(id: string){
        return this.http.get<any>(`${AppConstants.baseURL}/api/v1/functionalmovement/${id}`);
    }

    put(id: string, description: string, movementFactor: number){
        return this.http.put<any>(`${AppConstants.baseURL}/api/v1/functionalmovement/${id}`, {description, movementFactor});
    }

    delete(id: string){
        return this.http.delete<any>(`${AppConstants.baseURL}/api/v1/functionalmovement/${id}`);
    }

    getMetadata(id: string): Observable<HttpResponse<Blob>>{
        return this.http.get<Blob>(`${AppConstants.baseURL}/api/v1/functionalmovement/metadata/${id}`,
        { observe: 'response',
          responseType: 'blob' as 'json'});
    }
}