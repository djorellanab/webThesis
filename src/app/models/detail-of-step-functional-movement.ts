import {getJointName} from './enums/joints';
export class DetailOfStepFunctionalMovement {
    join: number;
    angle?: number;
    x: number;
    y: number;

    static decodeJson(json:any):DetailOfStepFunctionalMovement{
        if (json === undefined){
            throw new Error("error object Detail");
        }else if(!json.join === undefined){
            throw new Error("error join");
        }else if(!json.angle === undefined){
            throw new Error("error angle");
        }else if(!json.x === undefined){
            throw new Error("error x");
        }else if(!json.y === undefined){
            throw new Error("error y");
        }
        return new DetailOfStepFunctionalMovement( json.join,
            json.x, json.y, json.angle);
    }

    constructor( join:number, x:number, y:number, angle?:number) {
        this.join = join;
        this.x = x;
        this.y = y;
        this.angle = angle;
      }
    
    public  get  nameAngle(): string { 
        return getJointName(this.join);
    }
}