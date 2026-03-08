import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsArray, IsOptional } from "class-validator";
import { projectStatus } from "@/common/tasks.interface";
import { Transform } from "class-transformer";

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: "John Doe", required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "Task Management", required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "This is NESTJS Project for OOP", required: false })
  description?: string;

  @IsEnum(projectStatus)
  @IsOptional()
  @Transform(({ value }) => {
    const map: Record<string, projectStatus> = {
      planning: projectStatus.PLANNING,
      completed: projectStatus.COMPLETED,
      archived: projectStatus.ARCHIVED,
    };
    return map[String(value).toLowerCase()] ?? value;
  })
  @ApiProperty({ example: "Planning" })
  status!: projectStatus;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "2024-01-15T08:00:00.000Z" })
  startDate!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "2024-06-30T17:00:00.000Z" })
  deadline!: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ["task_1708730000000_abcd123"], required: false })
  taskIds?: string[];
}

