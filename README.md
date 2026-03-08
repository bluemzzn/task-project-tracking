## Project Overview

This project is a Task-Project Tracking API developed using NestJS to manage projects and their associated tasks. The system is designed following the principles of Object-Oriented Programming (OOP) and adopts a modular architecture consistent with NestJS best practices.

The application provides RESTful API endpoints that allow users to create, update, retrieve, and manage project and task information. Additionally, the system integrates Swagger API documentation, enabling developers to easily explore and test the available endpoints through an interactive interface.

Instead of using a traditional database, the system utilizes file-based storage (JSON) to store project and task data. This approach simplifies development and is suitable for lightweight applications or educational purposes. The system also implements Data Transfer Objects (DTOs) to validate and control incoming request data, ensuring data consistency and integrity.
The core data models of the system include:
ProjectData — Represents the main project entity and stores project-related information.
TasksData — Represents individual tasks that belong to a project or it can be a standalone task too.

Each project can contain multiple tasks, and the relationship between projects and tasks is maintained through the taskIds field within the project data structure.

## Contributors


| Name | GitHub Name | Student ID |
|------|-------------|------------|
| กุลจิรา นามใจ | bluemzzn | 68011621 |
| ภัสราภรณ์ ผดุงศิลป์ | patsaporn-phadungsil | 68010852 |
| พิมพ์ลดา ปฏิพัทธ์ปถวี | mandyint | 68010792 |
| ภานุพงศ์ คูหารุ่งกิจเจริญ | AustinGH22 | 68010859 |

## Technology Stack 

- NestJS
- Swagger API

## Get Started

First, install dependencies

```
npm install
```

Second, run the development server

```
npm run start
```

Open http://localhost:3000 with your Thunder Client or Postman to see the result

OR

Open http://localhost:3000/api to see API Documentation (Swagger)

## Project Structure

```
task-project-nestjs/
├── dist/
├── docs/
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml02.png
├── src/
│   ├── common/
│   │   ├── tasks.interface.ts
│   │   └── projects.entities.ts
│   ├── data/
│   │   ├── data.json
│   │   └── project.json
│   ├── projects/
│   │   ├── dto/
│   │   │   ├── CreateProjectDto.ts
│   │   │   └── UpdateProjectDto.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.controller.spec.ts
│   │   ├── projects.module.ts
│   │   ├── projects.service.ts
│   │   └── projects.service.spec.ts
│   ├── tasks/
│   │   ├── dto/
│   │   │   └── create-task.dto.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.controller.spec.ts
│   │   ├── tasks.model.ts
│   │   ├── tasks.module.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.service.spec.ts
│   ├── app.module.ts
│   ├── app.spec.ts
│   └── main.ts
├── subjects/
│   ├── evaluation.md
│   ├── models.md
│   ├── requirement.md
│   └── submission.md
├── test/
├── .eslintrc.js
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

## Documentations
Project documentation can be found in the `docs/` directory:

- [API Specification](docs/api-specification.md)
- [Data Model](docs/data-model.md)
- [UML Diagram](docs/UML-Diagram.png)
