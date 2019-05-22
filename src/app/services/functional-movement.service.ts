import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FunctionalMovement } from '../models/functional-movement';
import{ AppConstants} from '../app.constants';

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

    put(id: string, description: string, movementFactor: number, anglesOfMovement:number[] ){
        return this.http.put<any>(`${AppConstants.baseURL}/api/v1/functionalmovement/${id}`, {description, movementFactor, anglesOfMovement});
    }

    delete(id: string){
        return this.http.delete<any>(`${AppConstants.baseURL}/api/v1/functionalmovement/${id}`);
    }
}