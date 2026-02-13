import { Controller, Param, Get } from "@nestjs/common";

@Controller('tasks') //handle routes named '/tasks'
export class TasksController{
    /*
    GET /tasks
    GET /tasks/:id
    POST /tasks
    PATCH /tasks/:id
    DELETE /tasks/:id
    */
   @Get() //get /tasks
   findAll(){
    return[]
   }

   @Get(':id')
   findOne(@Param('id') id: string){
    return { id };
   }

};
