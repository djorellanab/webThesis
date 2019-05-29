import { getAngleName, AnglesOfMovement} from './enums/angles-of-movement';
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
        switch(this.join){
            case  2: return "Cuello";
            case  4: return "Hombro izquierdo";
            case  8: return "Hombro derecho";
            case  5: return "Codo izquierdo";
            case  9: return "Codo derecho";
            case  6: return "Muñeca izquierda";
            case 10: return "Muñeca derecha";
            case  1: return "Espalda";
            case 12: return "Cadera izquierda";
            case 16: return "Cadera derecha";
            case 13: return "Rodilla izquierda";
            case 17: return "Rodilla derecha";
            case 14: return "Píe izquierdo";
            case 18: return "Píe derecho";
            default: return "Ángulo no identificado";
        }
    }
}