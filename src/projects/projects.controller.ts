import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from "./dto/CreateProjectDto";
import { UpdateProjectDto } from "./dto/UpdateProjectDto";

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProject() {
    return this.projectsService.getAllProjects();
  }

  @Get(":id")
  getProjectbyId(@Param("id", ParseIntPipe) id: number) {
    return this.projectsService.getProjectbyId(id);
  }

  @Post()
  createProject(@Body(ValidationPipe) createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Patch(":id")
  updateProject(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Patch(":id/recovery")
  recovery(@Param("id" , ParseIntPipe) id: number) {
    return this.projectsService.recoveryProject(id);
  }

  @Delete(":id")
  deleteProject(@Param("id", ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(id);
  }
}
