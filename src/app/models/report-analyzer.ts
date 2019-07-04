import {getJointName} from './enums/joints';

class PowerAnalyzer {
    repetitions: number;
    time: number;

    constructor(repetitions:number, time: number){
        this.repetitions = repetitions;
        this.time = time;
    }

    static decodeJson(json:any):PowerAnalyzer{
        if (json === undefined){
            throw new Error("error VariablesAnalyzer");
        }
        if (json.repetitions === undefined){
            throw new Error("error repetitions");
        }
        if (json.time === undefined){
            throw new Error("error time");
        }
        return new PowerAnalyzer(json.repetitions,json.time);
    }

    static dummy():PowerAnalyzer{
        return new PowerAnalyzer(0,0);
    }
}

class PointAnalyzer{
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    static decodeJson(json:any):PointAnalyzer{
        if (json === undefined){
            throw new Error("error variable PointAnalyzer");
        }
        if (json.x === undefined){
            throw new Error("error x");
        }
        if (json.y === undefined){
            throw new Error("error y");
        }
        return new PointAnalyzer(json.x , json.y);
    }

    static dummy():PointAnalyzer{
        return new PointAnalyzer(0,0);
    }
}

class EnduranceAnalyzer{
    uid: string;
    label: string;
    showLine: boolean;
    data: PointAnalyzer[];

    constructor(uid:string, label: string, showLine: boolean, data: PointAnalyzer[]){
        this.uid = uid;
        this.label = label;
        this.showLine = showLine;
        this.data = data;
    }

    static decodeJson(json:any):EnduranceAnalyzer{
        if (json === undefined){
            throw new Error("error variable EnduranceAnalyzer");
        }
        if (json.uid === undefined){
            throw new Error("error uid");
        }
        if (json.label === undefined){
            throw new Error("error label");
        }
        if (json.showLine === undefined){
            throw new Error("error showLine");
        }
        if (json.data === undefined){
            throw new Error("error data");
        }
        return new EnduranceAnalyzer(json.uid,json.label ,json.showLine, json.data);
    }

    static dummy():EnduranceAnalyzer{
        return new EnduranceAnalyzer('','',false,[]);
    }
}

class FlexibilityAnalyzer{
    joint: number;
    angle: number;
    name: string;

    public get nameJoin(): string{ 
        console.log("entro");
        return getJointName(this.joint);}

    constructor(joint:number, angle: number,name: string){
        this.joint = joint;
        this.angle = angle;
        this.name = name;
    }

    static decodeJson(json:any):FlexibilityAnalyzer{
        if (json === undefined){
            throw new Error("error variable FlexibilityAnalyzer");
        }
        if (json.joint === undefined){
            throw new Error("error joint");
        }
        if (json.angle === undefined){
            throw new Error("error angle");
        }
        if (json.name === undefined){
            throw new Error("error angle");
        }
        return new FlexibilityAnalyzer(json.joint,json.angle,json.name);
    }

    static dummy():FlexibilityAnalyzer{
        return new FlexibilityAnalyzer(0,0, '');
    }
}

class AgilityAnalyzer{
    joints: FlexibilityAnalyzer[];
    step: number;
    time: number;
    
    constructor(joints:FlexibilityAnalyzer[], step: number, time:number){
        this.joints = joints;
        this.step = step;
        this.time = time;
    }

    static decodeJson(json:any):AgilityAnalyzer{
        if (json === undefined){
            throw new Error("error variable AgilityAnalyzer");
        }
        if (json.joints === undefined){
            throw new Error("error joints");
        }
        if (json.step === undefined){
            throw new Error("error step");
        }
        if (json.time === undefined){
            throw new Error("error time");
        }
        return new AgilityAnalyzer(json.joints,json.step, json.time);
    }

    static dummy():AgilityAnalyzer{
        return new AgilityAnalyzer([],0,0);
    }
}

class SpeedAnalyzer{
    repetitionsBySerie: number;
    timeByRepetition: number;

    constructor(repetitionsBySerie:number, timeByRepetition: number){
        this.repetitionsBySerie = repetitionsBySerie;
        this.timeByRepetition = timeByRepetition;
    }

    static decodeJson(json:any):SpeedAnalyzer{
        if (json === undefined){
            throw new Error("error variable analyzer object");
        }
        if (json.repetitionsBySerie === undefined){
            throw new Error("error repetitionsBySerie");
        }
        if (json.timeByRepetition === undefined){
            throw new Error("error timeByRepetition");
        }
        return new SpeedAnalyzer(json.repetitionsBySerie, json.timeByRepetition);
    }

    static dummy():SpeedAnalyzer{
        return new SpeedAnalyzer(0,0);
    }
}

class VariablesAnalyzer{
    restTime: number;
    workTime: number;
    series: number;

    constructor(restTime:number, workTime: number, series: number){
        this.restTime = restTime;
        this.workTime = workTime;
        this.series = series;
    }

    static decodeJson(json:any):VariablesAnalyzer{
        if (json === undefined){
            throw new Error("error variable analyzer object");
        }
        if (json.restTime === undefined){
            throw new Error("error rest time");
        }
        if (json.workTime === undefined){
            throw new Error("error work time");
        }
        if (json.series === undefined){
            throw new Error("error series");
        }
        return new VariablesAnalyzer(json.restTime,json.workTime ,json.series);
    }

    static dummy():VariablesAnalyzer{
        return new VariablesAnalyzer(0,0,0);
    }

}

class GeneralResults{
    repetitions: number;
    duration: number;

    constructor(repetitions:number, duration: number){
        this.repetitions = repetitions;
        this.duration = duration;
    }

    static decodeJson(json:any):GeneralResults{
        if (json === undefined){
            throw new Error("error variable analyzer object");
        }
        if (json.repetitions === undefined){
            throw new Error("error repetitions");
        }
        if (json.duration === undefined){
            throw new Error("error duration");
        }
        return new GeneralResults(json.repetitions,json.duration);
    }

    static dummy():GeneralResults{
        return new GeneralResults(0,0);
    }

}

export class ReportAnalyzer{
    variablesAnalyzer: VariablesAnalyzer;
    generalResults: GeneralResults;
    datasIa: Array<Array<number>>;
    endurance: EnduranceAnalyzer[];
    power: PowerAnalyzer;
    speed: SpeedAnalyzer;
    agility: AgilityAnalyzer[];

    show:boolean;

    constructor(variablesAnalyzer: VariablesAnalyzer, generalResults: GeneralResults, datasIa: Array<Array<number>>,
         endurance: EnduranceAnalyzer[], power: PowerAnalyzer, speed: SpeedAnalyzer, agility: AgilityAnalyzer[]){
        this.variablesAnalyzer = variablesAnalyzer;
        this.generalResults = generalResults;
        this.datasIa = datasIa;
        this.endurance = endurance;
        this.power =power;
        this.speed = speed;
        this.agility = agility;
        this.show = false;
    }

    static decodeJson(json:any):ReportAnalyzer{
        if (json === undefined){
            throw new Error("error Step object");
        }
        if (json.variablesAnalyzer === undefined){
            throw new Error("error variablesAnalyzer");
        }
        if (json.generalResults === undefined){
            throw new Error("error generalResults");
        }
        if (json.datasIa === undefined){
            throw new Error("error generalResults");
        }
        if (json.endurance === undefined){
            throw new Error("error endurance");
        }
        if (json.power === undefined){
            throw new Error("error power");
        }
        if (json.speed === undefined){
            throw new Error("error speed");
        }
        if (json.agility === undefined){
            throw new Error("error agility");
        }
        let _variablesAnalyzer = VariablesAnalyzer.decodeJson(json.variablesAnalyzer);
        let _generalResults = GeneralResults.decodeJson(json.generalResults);
        let _endurance = [];
        json.endurance.forEach(elementEndurance => {
            _endurance.push(EnduranceAnalyzer.decodeJson(elementEndurance));
        });
        let _power = PowerAnalyzer.decodeJson(json.power);
        let _speed = SpeedAnalyzer.decodeJson(json.speed);
        let _agility = [];
        json.agility.forEach(elementAgility=> {
            _agility.push(AgilityAnalyzer.decodeJson(elementAgility));
        });
        return new ReportAnalyzer(_variablesAnalyzer, _generalResults, json.datasIa,_endurance,_power,_speed,_agility);
    }

    static dummy():ReportAnalyzer{
        return new ReportAnalyzer(VariablesAnalyzer.dummy(), GeneralResults.dummy(), [],[],
         PowerAnalyzer.dummy(),SpeedAnalyzer.dummy(),[]);
    }

    updateShow(show:boolean){
        this.show = show;
    }
}