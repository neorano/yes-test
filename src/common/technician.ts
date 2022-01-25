import { Task } from "./task";

export class Technician {

    id:number;

    name:String;

    tasks:Task[]=[];

    constructor (id:number, name:String){
        this.id=id;
        this.name=name;
    }
}