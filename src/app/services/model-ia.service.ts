import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import{ AppConstants} from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class modelIAService {

    constructor(private http: HttpClient) {}

    predict(id:string, datasIa: Array<Array<number>>){
        return this.http.post<any>(`${AppConstants.baseURL}/api/v1/ia/predict`, {id,datasIa});
    }

    train(id:string){
        return this.http.get<any>(`${AppConstants.baseURL}/api/v1/ia/train/${id}`);
    }
}