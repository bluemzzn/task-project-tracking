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
  IsOptional,
} from "class-validator";

export class CreateProjectDto {
  @IsEnum(Type)
  @IsNotEmpty()
  @ApiProperty({ example: "PROJECT" })
  type!: Type.PROJECT;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "John Doe" })
  name!: string;

  // @IsNotEmpty()
  // @IsNumber()
  // @ApiProperty({ example: 1 })
  // id!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Task Management" })
  title!: string;

  @IsString()
  @ApiProperty({ example: "This is NESTJS Project for OOP," })
  description!: string;

  @IsNotEmpty()
  @IsEnum(projectStatus)
  @ApiProperty({ example: "Planning" })
  status!: projectStatus;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ["task_1708730000000_abcd123"],
    required: false,
  })
  taskIds?: string[];
}
