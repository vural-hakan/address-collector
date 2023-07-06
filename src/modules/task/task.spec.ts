import {
  DatalyticsService,
  GraphService,
  NotificationService,
} from '@services';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PremiumEntity, PremiumService } from '../premium';
import { TaskController, TaskEntity, TaskLogEntity, TaskService } from './';
import { StorageProvider, TranslationService, VisionProvider } from '@common';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import {
  DailyUserStatsEntity,
  DailyUserStatsService,
} from '../daily-user-stats';

describe('TaskController', () => {
  let controller: TaskController;

  const mockTypeorm = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAndCount: jest.fn(),
  };

  const mockTranslate = {
    t: jest.fn(),
  };

  const mockTypeormReset = () => {
    mockTypeorm.find.mockReset();
    mockTypeorm.findOne.mockReset();
    mockTypeorm.save.mockReset();
    mockTypeorm.create.mockReset();
    mockTypeorm.update.mockReset();
    mockTypeorm.delete.mockReset();
    mockTypeorm.findAndCount.mockReset();
  };

  afterEach(() => {
    mockTypeormReset();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      imports: [ScheduleModule.forRoot(), HttpModule],
      providers: [
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockTypeorm,
        },
        {
          provide: getRepositoryToken(TaskLogEntity),
          useValue: mockTypeorm,
        },
        {
          provide: getRepositoryToken(PremiumEntity),
          useValue: mockTypeorm,
        },
        {
          provide: getRepositoryToken(DailyUserStatsEntity),
          useValue: mockTypeorm,
        },
        {
          provide: TranslationService,
          useValue: mockTranslate,
        },
        TaskService,
        PremiumService,
        GraphService,
        NotificationService,
        StorageProvider,
        VisionProvider,
        DailyUserStatsService,
        DatalyticsService,
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleCron()', () => {
    it('tasks', async () => {
      mockTypeorm.find.mockImplementationOnce(async () => {
        return [
          {
            id: 1,
            name: 'test',
            value: {
              cronExpression: '* * * * * *',
            },
            timezone: 'Europe/Istanbul',
            isWorking: false,
            isFailed: false,
            isActive: true,
            createdAt: 1,
            updatedAt: 1,
          },
        ];
      });
      await controller.handleCron();
    });
  });
});
