import { Module, OnModuleInit } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_HOST.split(','),
    }),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule implements OnModuleInit {
  constructor(private readonly addressServices: AddressService) {}
  public async onModuleInit() {
    await this.addressServices.createIndex();
  }
}
