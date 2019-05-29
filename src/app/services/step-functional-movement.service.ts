import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FunctionalMovement } from '../models/functional-movement';
import { StepFunctionalMovement } from '../models/step-functional-movement';
import { DetailOfStepFunctionalMovement } from '../models/detail-of-step-functional-movement';
import{ AppConstants} from '../app.constants';

@Injectable({ providedIn: 'root' })
export class StepFunctionalMovementService {

    constructor(private http: HttpClient) {}

    post(stepFunctionalMovement: StepFunctionalMovement[]){
        return this.http.post<any>(`${AppConstants.baseURL}/api/v1/stepfunctionalmovement`, StepFunctionalMovement);
    }

    get(_id: string){
        return this.http.get<any>(`${AppConstants.baseURL}/api/v1/stepfunctionalmovement/${_id}`);
    }

}