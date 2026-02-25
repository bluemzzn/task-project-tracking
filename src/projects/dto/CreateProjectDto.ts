import { ProjectData, projectStatus, TasksData, Type } from '@/common/tasks.interface';
import { IsEnum, IsString, IsBoolean, IsArray, IsNumber , IsNotEmpty} from 'class-validator';


export class CreateProjectDto implements ProjectData {
  @IsEnum(Type)
  @IsNotEmpty()
  type!: Type.PROJECT;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;
  
  @IsString()
  description!: string;
    
  @IsNotEmpty()
  @IsEnum(['Planning' , 'Completed' , 'Archived'])
  status!: projectStatus;

  @IsString()
  startAt!: string;

  @IsString()
  deadline!: string;

  @IsBoolean()
  isOverdue!: boolean;

  @IsArray()
  subTasks!: TasksData[];
}
