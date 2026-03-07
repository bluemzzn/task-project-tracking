import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProjectData, Type } from "./../src/common/tasks.interface";
import { ProjectEntities } from "./../src/common/projects.entities";

describe('Project API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/projects (POST) create project', () => {
    return request(app.getHttpServer())
      .post('/projects')
      .send({
        type: 'projects',
        name: 'John Doe',
        title: 'Task Management',
        description: 'Implement login with JWT',
        status: 'Planning',
        startDate: '2024-01-15T08:00:00.000Z',
        deadline: '2024-06-30T17:00:00.000Z',
        taskIds: []
      })
      .expect(201);
  });

  it('/projects (GET) get all projects', () => {
    return request(app.getHttpServer())
      .get('/projects')
      .expect(200);
  });

});