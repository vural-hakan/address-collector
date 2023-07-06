import { Controller, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OSMProvider, OverPassProvider } from '@common';
import { AddressService } from '@modules/address';

@Controller()
export class TaskController {
  private readonly logger = new Logger(TaskController.name);
  constructor(
    private readonly overPassProvider: OverPassProvider,
    private readonly osmProvider: OSMProvider,
    private readonly addressService: AddressService,
  ) {}

  async onModuleInit() {
    //this.recursiveDataCollector();
    const values = await this.addressService.getAddressWithLocation(
      38.053698979792024,
      36.652723290680136,
    );
    if (values.length > 0) {
      const addresses = values[0]['_source'].address;
      console.log(addresses);
    } else {
      console.log('Address not found');
    }
  }
  async recursiveDataCollector() {
    const cities = await this.overPassProvider
      .getUpperL3Relations()
      .catch((err) => {
        this.logger.error('List failed', JSON.stringify(err, null, 2));
      });
    if (cities) {
      for (const city of cities) {
        if (city.id > 0) {
          this.logger.log(city.id, 'checking');
          const dbData = await this.addressService.checkAddressWithId(city.id);

          if (!dbData) {
            const cityData = await this.osmProvider
              .getOSMDetail(city.id)
              .catch((err) => {
                this.logger.error(
                  city.id,
                  'City failed',
                  JSON.stringify(err, null, 2),
                );
              });
            if (cityData) {
              await this.addressService.createAddress(cityData);
            }
          }
        }
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000));
    this.recursiveDataCollector();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'testCron' })
  async testCron() {
    this.logger.log('testCron');
  }
}
