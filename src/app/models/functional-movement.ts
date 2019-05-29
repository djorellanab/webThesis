export class FunctionalMovement {
    id: number;
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

    constructor(id:number, name:string, steps:number[], anglesOfMovement:number[], description:string,
        height: number, depthMin: number, depthMax: number, state?: boolean, movementFactor?:number, gdb?:string, 
        time_stamp?: number, time_stamp_hour?:number){
        let date = new Date();
        this.id = id;
        this.name = name;
        this.steps = steps;
        this.anglesOfMovement = anglesOfMovement;
        this.description = description || "";
        this.height = height;
        this.depthMin = depthMin;
        this.depthMax = depthMax;
        this.movementFactor = movementFactor || 0.10;
        this.time_stamp = time_stamp || date.getDate();
        this.time_stamp_hour = time_stamp_hour || date.getHours();
        this.state = state || false;
    }
}