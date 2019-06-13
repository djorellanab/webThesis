import {getJointName} from './enums/joints';
export class DetailOfStepFunctionalMovement {
    stepFunctionalMovement: number;
    join: number;
    angle?: number;
    x: number;
    y: number;

    static decodeJson(json:any):DetailOfStepFunctionalMovement{
        return new DetailOfStepFunctionalMovement(json.stepFunctionalMovement, json.number,
            json.x, json.y, json.angle);
    }

    constructor(stepFunctionalMovement: number, join:number, x:number, y:number, angle?:number) {
        this.stepFunctionalMovement = stepFunctionalMovement;
        this.join = join;
        this.x = x;
        this.y = y;
        this.angle = angle;
      }
    
    public  get  nameAngle(): string { 
        return getJointName(this.join);
    }
}