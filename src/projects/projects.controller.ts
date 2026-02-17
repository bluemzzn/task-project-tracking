import { Controller, Get } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {

  constructor(private ProjectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.ProjectsService
  }
}
