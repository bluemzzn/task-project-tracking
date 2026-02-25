import { Injectable, NotFoundException } from "@nestjs/common";
import projectDataJson from "../data/project.json";
import { CreateProjectDto } from "./dto/CreateProjectDto";
import { UpdateProjectDto } from "./dto/UpdateProjectDto";
import { ProjectData } from "@/common/tasks.interface";
// import { DatabaseService } from "./database.service";

@Injectable()
export class ProjectsService {
    private projects = projectDataJson;

    //  constructor(private readonly DatabaseService : DatabaseService){}

    async getAllData(){
        return this.projects;
    }

    async getProjectbyId(id: number){
        //  const project = this.projects.find(project => project.id === id)

        //  if(!project){
        //      throw new NotFoundException('Project Not Found');
        //  }
        //  return project;
    }

    async createProject(createProjectDto : CreateProjectDto){
    
    }

    async updateProject(id : number, updateProjectDto : UpdateProjectDto){
    
    }

    async deleteProject(id : number){
    
    }
}

