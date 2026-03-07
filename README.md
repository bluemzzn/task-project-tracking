## Technology Stack 

- NestJS

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

## Project Struture

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
├── .gitignore
├── Guide.md
├── LICENSE
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```