import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsArray, IsOptional } from "class-validator";
import { projectStatus } from "@/common/tasks.interface";

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
  @ApiProperty({ example: "Planning", required: false })
  status?: projectStatus;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ["task_1708730000000_abcd123"], required: false })
  taskIds?: string[];
}