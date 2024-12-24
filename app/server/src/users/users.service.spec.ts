// e2e/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: process.env.MongoDB_URI || 'mongodb://localhost:27017/testdb',
          entities: [Users],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([Users]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should connect and findAll users', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
  });
});