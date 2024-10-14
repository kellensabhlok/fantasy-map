import {start} from "repl";

class MapLocation {
    name: string;
    starting_x: number;
    starting_y: number;
    ending_x:number;
    ending_y:number;
    order:number;

    // constructor(name:string, starting_x: number, starting_y:number, ending_x:number, ending_y:number, order:number) {
    //     this.name = name;
    //     this.starting_x = starting_x;
    //     this.starting_y = starting_y;
    //     this.ending_x = ending_x;
    //     this.ending_y = ending_y;
    //     this.order = order;
    // }
    constructor(line:string){
            let vals = line.split(",")
            this.name = vals[0];
            this.starting_x = parseFloat(vals[1]);
            this.starting_y =  parseFloat(vals[2]);
            this.ending_x =  parseFloat(vals[3]);
            this.ending_y =  parseFloat(vals[4]);
            this.order =  parseFloat(vals[5]);
        }
}


export default MapLocation;