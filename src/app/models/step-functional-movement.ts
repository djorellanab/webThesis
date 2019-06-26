import { DetailOfStepFunctionalMovement } from "./detail-of-step-functional-movement";

export class StepFunctionalMovement {
    functionalMovement: string;
    step: number;
    time: number;
    clasification: boolean;
    detailsOfStepFunctionalMovement: DetailOfStepFunctionalMovement[]; 
    pathImage?:string;
    factorMovement: number;

    static decodeJson(json:any):StepFunctionalMovement{
        if (json === undefined){
            throw new Error("error Step object");
        }else if(json.functionalMovement === undefined){
            throw new Error("error functionalMovement");
        }else if(!json.step === undefined){
            throw new Error("error step");
        }else if(!json.time === undefined){
            throw new Error("error time");
        }else if( !json.factorMovement === undefined){
            throw new Error("error factorMovement");
        }
        let step = new StepFunctionalMovement(json.functionalMovement, json.step, json.time, json.factorMovement, json.pathImage);
        step.detailsOfStepFunctionalMovement = [];
        json.detailsOfStepFunctionalMovement.forEach(function (detail) {
            step.detailsOfStepFunctionalMovement.push(DetailOfStepFunctionalMovement.decodeJson(detail));
        });
        return step;
    }

    
    static dummy():StepFunctionalMovement{
        return new StepFunctionalMovement("",0,0,0);
    }


    constructor(functionalMovement: string, step:number, time:number, factorMovement:number ,pathImage?:string) {
        this.functionalMovement = functionalMovement;
        this.step = step;
        this.time = time;
        this.pathImage = pathImage;
        this.factorMovement = factorMovement;
      }
    
}