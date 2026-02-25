import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsNumber, IsDateString } from "class-validator";

export class CreateTaskDto {

  @ApiProperty({ example: "Build Auth Module" })
  @IsString()
  name!: string;

  @ApiProperty({ example: "Authentication System" })
  @IsString()
  title!: string;

  @ApiProperty({ example: "Implement login with JWT" })
  @IsString()
  description!: string;

  @ApiProperty({ enum: ["LOW", "MEDIUM", "HIGH"], example: "HIGH" })
  @IsEnum(["LOW", "MEDIUM", "HIGH"])
  priority!: "LOW" | "MEDIUM" | "HIGH";

  @ApiProperty({ example: "2026-02-24T09:00:00.000Z" })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: "2026-02-28T18:00:00.000Z" })
  @IsDateString()
  deadline!: string;

  @ApiProperty({ example: 12 })
  @IsNumber()
  estimatedHours!: number;
}