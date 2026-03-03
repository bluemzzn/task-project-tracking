import { Injectable, NotFoundException } from "@nestjs/common";
import projectDataJson from "../data/project.json";
import { CreateProjectDto } from "./dto/CreateProjectDto";
import { UpdateProjectDto } from "./dto/UpdateProjectDto";
import { ProjectData, Type } from "@/common/tasks.interface";
import { ProjectEntities } from "@/common/projects.entities";
import { TasksService } from "@/tasks/tasks.service";

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
        new Date(pj.startAt),
        new Date(pj.deadline),
        new Date(pj.createdAt),
        new Date(pj.updatedAt),
        pj.statusDelete,
        pj.taskId,
      ),
  );

  constructor(private readonly taskService: TasksService) {}

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

  createProject(createProjectDto: CreateProjectDto) {}

  updateProject(id: number, updateProjectDto: UpdateProjectDto) {}

  deleteProject(id: number) {}
}
