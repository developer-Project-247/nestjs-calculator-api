import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Calculator API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.each([
    ['add', 10, 5, 15],
    ['subtract', 10, 5, 5],
    ['multiply', 10, 5, 50],
    ['divide', 10, 5, 2],
  ])(
    'performs %s correctly',
    async (operation, a, b, result) => {
      await request(app.getHttpServer())
        .post('/calculator')
        .send({ operation, a, b })
        .expect(201)
        .expect({ result });
    },
  );

  it('rejects division by zero', async () => {
    await request(app.getHttpServer())
      .post('/calculator')
      .send({ operation: 'divide', a: 10, b: 0 })
      .expect(400);
  });
});