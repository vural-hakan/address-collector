import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { OSMProvider, OverPassProvider } from '@common';
import { TaskController } from './task.controller';
import { AddressService } from '@modules/address';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  controllers: [TaskController],
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_HOST.split(','),
    }),
  ],
  providers: [OverPassProvider, OSMProvider, AddressService],
})
export class TaskModule {}
