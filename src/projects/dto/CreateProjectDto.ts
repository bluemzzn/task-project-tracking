import { projectStatus, Type } from "@/common/tasks.interface";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Task Management" })
  title!: string;

  @IsString()
  @ApiProperty({ example: "This is NESTJS Project for OOP," })
  description!: string;

  @IsNotEmpty()
  @IsEnum(projectStatus)
  @Transform(({ value }) => {
    const map: Record<string, projectStatus> = {
      planning: projectStatus.Planning,
      completed: projectStatus.Completed,
      archived: projectStatus.Archived,
    };
    return map[String(value).toLowerCase()] ?? value;
  })
  @ApiProperty({ example: "Planning" })
  status!: projectStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "2024-01-15T08:00:00.000Z" })
  startAt!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "2024-06-30T17:00:00.000Z" })
  deadline!: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ["task_1708730000000_abcd123"] })
  taskIds?: string[];
}
