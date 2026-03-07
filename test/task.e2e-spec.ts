import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProjectData, Type } from "./../src/common/tasks.interface";
import { ProjectEntities } from "./../src/common/projects.entities";
describe('Task API (e2e)', () => {
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

  it('/tasks (POST) create task', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'Build Auth Module',
        title: 'Authentication System',
        description: 'Test task',
        priority: 'LOW',
        startDate: '2026-02-24T09:00:00.000Z',
        deadline: '2026-02-28T18:00:00.000Z',
        estimatedHours: 12
      })
      .expect(201);
  });

  it('/tasks (GET) get all tasks', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200);
  });

});