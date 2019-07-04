class DetailRepetition{
    detail:string;
    value:number;

    constructor(detail:string, value:number)
    {
        this.detail = detail;
        this.value = value;
    }

    static decodeJson(json:any):DetailRepetition{
        if (json === undefined){
            throw new Error("error DetailRepetition");
        }
        if (json.detail === undefined){
            throw new Error("error detail");
        }
        if (json.value === undefined){
            throw new Error("error value");
        }
        return new DetailRepetition(json.detail,json.value);
    }

    static dummy():DetailRepetition{
        return new DetailRepetition('',0);
    }
}

class DetailStep{
    detail:string;
    goodData:number;
    badData:number;

    constructor(detail:string, goodData:number, badData:number)
    {
        this.detail = detail;
        this.goodData = goodData;
        this.badData = badData;
    }

    static decodeJson(json:any):DetailStep{
        if (json === undefined){
            throw new Error("error DetailStep");
        }
        if (json.detail === undefined){
            throw new Error("error detail");
        }
        if (json.goodData === undefined){
            throw new Error("error goodData");
        }
        if (json.badData === undefined){
            throw new Error("error badData");
        }
        return new DetailStep(json.detail,json.goodData,json.badData);
    }

    static dummy():DetailStep{
        return new DetailStep('',0,0);
    }
}

export class ReportIA{
    detailSteps: DetailStep[];

    show:boolean;

    constructor(detailSteps:DetailStep[])
    {
        this.detailSteps = detailSteps;
        this.show = false;
    }

    updateShow(show:boolean):void{
        this.show=show;
    }
    static decodeJson(json:any):ReportIA{
        if (json === undefined){
            throw new Error("error DetailStep");
        }
        if (json.detailSteps === undefined){
            throw new Error("error detailSteps");
        }
        let _detailsSteps: DetailStep[] = [];
        json.detailRepetitions.forEach(elementDetailStep => {
            _detailsSteps.push(DetailStep.decodeJson(elementDetailStep));
        });
        return new ReportIA(_detailsSteps);
    }

    static dummy():ReportIA{
        return new ReportIA([]);
    }

 
    public get getTotalStepsPos(): (number|string){
        if (this.detailSteps.length > 0)
        {
            return Object.keys(this.detailSteps).reduce((prev, key) =>{
                return prev + this.detailSteps[key].goodData;});
        }else
        {
            return "Sin porcentaje de datos correctos";
        }
    }

    public get getTotalStepsNeg(): (number|string){
        if (this.detailSteps.length > 0)
        {
            return Object.keys(this.detailSteps).reduce((prev, key) =>{
                return prev + this.detailSteps[key].badData;});
        }else
        {
            return "Sin porcentaje de datos incorrectos";
        }
    }
}