export class FunctionalMovement {
    id: number;
    name: string;
    steps: number[];
    anglesOfMovement: number[];
    description: string;
    height: number;
    depth: number;
    movementFactor?: number;
    gdb?: string;
    time_stamp?: number;
    time_stamp_hour?: number;
    state?: boolean;

    constructor(id:number, name:string, steps:number[], anglesOfMovement:number[], descripion:string,
        height: number, depth: number, state?: boolean, movementFactor?:number, gdb?:string, 
        time_stamp?: number, time_stamp_hour?:number){
        let date = new Date();
        this.id = id;
        this.name = name;
        this.steps = steps;
        this.anglesOfMovement = anglesOfMovement;
        this.description = descripion || "";
        this.height = height;
        this.depth = depth;
        this.movementFactor = movementFactor || 0.10;
        this.gdb = gdb || "";
        this.time_stamp = time_stamp || date.getDate();
        this.time_stamp_hour = time_stamp_hour || date.getHours();
        this.state = state || false;
    }
}