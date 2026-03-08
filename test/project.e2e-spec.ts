import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';


describe('Project API (e2e)', () => {
  let app: INestApplication;
  let projectId: string;

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

  it('/projects (POST) create project', async () => {
    const res = await request(app.getHttpServer())
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

        projectId = res.body.id;

        expect(projectId).toBeDefined();
  });

  it('/projects (GET) get all projects', async () => {
    const res = await request(app.getHttpServer())
      .get('/projects')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/projects/:id (PATCH) update project', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/projects/${projectId}`)
      .send({
        title: 'Updated Project Title'
      })
      .expect(200);

    expect(res.body.title).toBe('Updated Project Title');
  });

  it('/projects/:id (DELETE) delete project', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/projects/${projectId}`)
      .expect(200);

    expect(res.body.id).toBe(projectId);
  });

});