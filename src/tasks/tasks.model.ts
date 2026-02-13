import { TasksData, ProjectData } from "./tasks.interface";

class Tasks{
    private data: TasksData;
    constructor(data: TasksData){
        this.data = data;
    }

    markDone(){
        if(this.isOverdue()){

        }
    }
}