import {start} from "repl";

class MapLocation {
    name: string;
    starting_x: number;
    starting_y: number;
    ending_x:number;
    ending_y:number;
    order:number;




    constructor(line:string){
            let vals = line.split(",")
            this.name = vals[0];
            this.starting_x = parseFloat(vals[1]);
            this.starting_y =  parseFloat(vals[2]);
            this.ending_x =  parseFloat(vals[3]);
            this.ending_y =  parseFloat(vals[4]);
            this.order =  vals[5] ? parseFloat(vals[5]) : 2;
        }

    toCsvRow():string {
        let arr: any[] = [this.name, this.starting_x, this.starting_y, this.ending_x, this.ending_y, this.order]
        return arr.join(",")

    }
}


export default MapLocation;