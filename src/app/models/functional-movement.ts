import {getJointName} from "./enums/joints";
export class FunctionalMovement {
    _id: string;
    name: string;
    steps: number[];
    anglesOfMovement: number[];
    description: string;
    height: number;
    depthMin: number;
    depthMax: number;
    movementFactor?: number;
    time_stamp?: number;
    time_stamp_hour?: number;
    state?: boolean;
    file?: string;
    focusJoin: number; 

    public get nameFocusJoin(): string{ return getJointName(this.focusJoin);}
    public get namesAnglesOfMovement(): string[]{ 
        return this.anglesOfMovement.map(e => getJointName(e) )
    }

    public get rangeteps() : any[]{
        if (this.steps.length <2) {return []}
        let range = this.steps[1] - this.steps[0];
        range *= this.movementFactor;
        let total = this.steps.length - 1;
        return this.steps.map((e, i) =>{
            if (i === 0)
            {
                return {min: 0,  avg:0, max: range}
            }
            else if (i === total)
            {
                return {min: e-range,  avg:e, max: e}
            }
            else
            {
                let _range = range/2;
                return {min: e-_range,  avg:e, max: e+_range}
            }
        });
    }
    public static get  dummy(): FunctionalMovement { return new FunctionalMovement('','',[],[],'',0,0,0,0); }
    constructor(id:string, name:string, steps:number[], anglesOfMovement:number[], description:string,
        height: number, depthMin: number, depthMax: number,focusJoin: number, state?: boolean, movementFactor?:number, file?:string, 
        time_stamp?: number){
        let date = new Date();
        this._id = id;
        this.name = name;
        this.steps = steps;
        this.anglesOfMovement = anglesOfMovement;
        this.description = description || "";
        this.height = height;
        this.depthMin = depthMin;
        this.depthMax = depthMax;
        this.movementFactor = movementFactor || 0.10;
        this.time_stamp = time_stamp || date.getTime();
        this.state = state || false;
        this.focusJoin = focusJoin;
        this.file =  file;
    }
}