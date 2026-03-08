import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import projectDataJson from "../data/project.json";
import { CreateProjectDto } from "./dto/CreateProjectDto";
import { UpdateProjectDto } from "./dto/UpdateProjectDto";
import { ProjectData, Type } from "@/common/tasks.interface";
import { ProjectEntities } from "@/common/projects.entities";
import { TasksService } from "@/tasks/tasks.service";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ProjectsService {
  private projects: ProjectData[] = (projectDataJson as any[]).map(
    (pj) =>
      new ProjectEntities(
        Type.PROJECT,
        pj.name,
        pj.id,
        pj.title,
        pj.description,
        pj.status,
        new Date(pj.startDate),
        new Date(pj.deadline),
        new Date(pj.createdAt),
        new Date(pj.updatedAt),
        pj.statusDelete,
        pj.taskIds,
      ),
  );

  constructor(private readonly taskService: TasksService) {}

  private readonly filePath = path.join(__dirname, "../data/project.json");

  getAllProjects(): ProjectData[] {
    return this.projects.filter((pj) => pj.statusDelete === "ACTIVE");
  }

  getProjectbyId(id: number) {
    const projectAdd = this.projects.find(
      (p) => p.id === id && p.statusDelete === "ACTIVE",
    );

    if (!projectAdd) {
      throw new NotFoundException("Project Not Found");
    }

    const subTasks = projectAdd.taskIds.map((taskId) =>
      this.taskService.getTasksById(taskId),
    );
    return { ...projectAdd, subTasks };
  }

  createProject(createProjectDto: CreateProjectDto): ProjectData {
    const newId =
      this.projects.length > 0
        ? Math.max(...this.projects.map((p) => p.id)) + 1
        : 1;

    const newProject = ProjectEntities.create({
      ...createProjectDto,
      id: newId,
      startDate: new Date(createProjectDto.startDate),
      deadline: new Date(createProjectDto.deadline),
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    this.projects.push(newProject);
    this.saveToFile();

    return newProject;
  }

  updateProject(id: number, updateProjectDto: UpdateProjectDto): ProjectData {
    const project = this.projects.find(
      (p) => p.id === id && p.statusDelete === "ACTIVE",
    );

    if (!project) {
      throw new NotFoundException("Project Not Found");
    }

    Object.assign(project, {
    ...updateProjectDto,
    ...(updateProjectDto.startDate && { startDate: new Date(updateProjectDto.startDate) }),
    ...(updateProjectDto.deadline && { deadline: new Date(updateProjectDto.deadline) }),
    updatedAt: new Date(),
  });

    this.saveToFile();
    return project;
  }

  recoveryProject(id: number): ProjectData {
    const project = this.projects.find((p) => p.id === id);

    if (!project) {
      throw new NotFoundException("Project Not Found");
    }

    if (project.statusDelete !== "INACTIVE") {
      throw new BadRequestException("Project is not deleted");
    }

    project.statusDelete = "ACTIVE";
    project.updatedAt = new Date();
    this.saveToFile();
    return project;
  }

  deleteProject(id: number) {
    const project = this.projects.find((p) => p.id === id);

    if (!project) {
      throw new NotFoundException("Project Not Found");
    }

    if (project.statusDelete === "INACTIVE") {
      throw new BadRequestException("Project already inactive");
    }

    project.statusDelete = "INACTIVE";
    project.updatedAt = new Date();
    this.saveToFile();
    return project;
  }

  private saveToFile(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.projects, null, 2));
  }
}
