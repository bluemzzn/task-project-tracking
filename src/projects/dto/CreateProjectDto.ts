import {
  ProjectData,
  projectStatus,
  TasksData,
  Type,
} from "@/common/tasks.interface";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsString,
  IsArray,
  IsNumber,
  IsNotEmpty,
} from "class-validator";

export class CreateProjectDto implements ProjectData {
  @IsEnum(Type)
  @IsNotEmpty()
  @ApiProperty({ example: "PROJECT" })
  type!: Type.PROJECT;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "John Doe" })
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  id!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Task Management" })
  title!: string;

  @IsString()
  @ApiProperty({ example: "This is NESTJS Project for OOP," })
  description!: string;

  @IsNotEmpty()
  @IsEnum(["Planning", "Completed", "Archived"])
  @ApiProperty({ example: "Planning" })
  status!: projectStatus;

  @IsString()
  @ApiProperty({ example: "2026-02-24T09:00:00.000Z" })
  startAt!: Date;

  @IsString()
  @ApiProperty({ example: "2026-02-24T09:00:00.000Z" })
  deadline!: Date;
 
  @IsString()
  @ApiProperty({ example: "2026-02-24T09:00:00.000Z" })
  createdAt!: Date;
 
  @IsString()
  @ApiProperty({ example: "2026-02-24T09:00:00.000Z" })
  updatedAt!: Date;

  @IsNotEmpty()
  @IsEnum({ ACTIVE: "INACTIVE" })
  @ApiProperty({ enum: ["ACTIVE", "INACTIVE"], example: "INACTIVE" })
  statusDelete!: "ACTIVE" | "INACTIVE";

  @IsArray()
  subTasks!: TasksData[];
}
