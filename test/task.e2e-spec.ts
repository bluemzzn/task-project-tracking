import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Task API (e2e)', () => {
  let app: INestApplication;
  let taskId: string;

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

  it('/tasks (POST) create task', async () => {
    const res = await request(app.getHttpServer())
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

    taskId = res.body.id;

    expect(taskId).toBeDefined();
  });

  it('/tasks (GET) get all tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

 it('/tasks (PATCH) update task', async () => {
    const res = await request(app.getHttpServer())
      .patch('/tasks')
      .send([
        {
          id: taskId,
          data: {
            title: 'Updated Authentication System'
          }
        }
      ])
      .expect(200);

    expect(res.body[0].title).toBe('Updated Authentication System');
  });

  it('/tasks/:id (DELETE) delete task', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200);

    expect(res.body.id).toBe(taskId);
  });

});