import { DetailOfStepFunctionalMovement } from "./detail-of-step-functional-movement";

export class StepFunctionalMovement {
    functionalMovement: string;
    step: number;
    time: number;
    clasification: boolean;
    detailsOfStepFunctionalMovement: DetailOfStepFunctionalMovement[]; 
    pathImage?:string;
    status:boolean;

    static decodeJson(json:any):StepFunctionalMovement{
        let step = new StepFunctionalMovement(json.functionalMovement, json.step, json.time, json.status, json.pathImage);
        step.detailsOfStepFunctionalMovement = [];
        json.detailsOfStepFunctionalMovement.forEach(function (detail) {
            step.detailsOfStepFunctionalMovement.push(DetailOfStepFunctionalMovement.decodeJson(json.detail));
        });
        return step;
    }

    
    static dummy():StepFunctionalMovement{
        return new StepFunctionalMovement("",0,0,false);
    }


    constructor(functionalMovement: string, step:number, time:number, status:boolean, pathImage?:string) {
        this.functionalMovement = functionalMovement;
        this.step = step;
        this.time = time;
        this.status = status;
        this.pathImage = pathImage;
      }
    
}