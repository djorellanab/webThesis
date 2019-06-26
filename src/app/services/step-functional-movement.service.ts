import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { FunctionalMovement } from '../models/functional-movement';
import { StepFunctionalMovement } from '../models/step-functional-movement';
import { DetailOfStepFunctionalMovement } from '../models/detail-of-step-functional-movement';
import{ AppConstants} from '../app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StepFunctionalMovementService {

    constructor(private http: HttpClient) {}

    post(stepFunctionalMovement: StepFunctionalMovement[], functionalMovement:string){
        stepFunctionalMovement.forEach(element => {
            element.pathImage = "";
        });
        return this.http.post<any>(`${AppConstants.baseURL}/api/v1/stepfunctionalmovement`, {stepFunctionalMovement,functionalMovement});
    }

    get(_id: string, clasification?: boolean, step?: number){
        let _url: string = `${AppConstants.baseURL}/api/v1/stepfunctionalmovement/${_id}`;
        _url+=`?clasification=${clasification}&step=${step}`;
        return this.http.get<any>(_url);
    }

    getCSV(_id: string): Observable<HttpResponse<Blob>>{
        let _url: string = `${AppConstants.baseURL}/api/v1/stepfunctionalmovement/csv/${_id}`;
        return this.http.get<any>(_url,
            { observe: 'response',
              responseType: 'blob' as 'json'});
    }

}