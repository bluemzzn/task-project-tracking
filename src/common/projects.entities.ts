import {
  ProjectData,
  projectStatus,
  Type,
} from "@/common/tasks.interface";

export class ProjectEntities implements ProjectData {
  constructor(
    public type: Type.PROJECT,
    public name: string,
    public id: number,
    public title: string,
    public description: string,
    public status: projectStatus,
    public startDate: Date,
    public deadline: Date,
    public createdAt: Date,
    public updatedAt: Date,
    public statusDelete: "ACTIVE" | "INACTIVE",
    public taskIds: string[],
  ) {}

  static create(data: Partial<ProjectData>): ProjectEntities {
    const now = new Date();
    return new ProjectEntities(
      Type.PROJECT,
      data.name || "",
      data.id || 0,
      data.title || "",
      data.description || "",
      data.status || projectStatus.PLANNING,
      data.startDate ?? now,
      data.deadline ?? now,
      data.createdAt ?? now,
      data.updatedAt ?? now,
      data.statusDelete || "ACTIVE",
      data.taskIds ?? [],
    );
  }

   public toggleDelete(): void{
        this.statusDelete = this.statusDelete === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    }
}
