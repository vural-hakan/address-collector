import { Response, ResponseMessages } from '@common';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressService } from './address.service';

@Controller()
export class AddressController {
  constructor(private readonly addressServices: AddressService) {}

  @MessagePattern('ping')
  async getLocationToAddress(
    @Payload() payload: { latitude; longitude },
  ): Promise<Response> {
    console.log(payload.latitude, payload.longitude);
    return {
      data: payload,
      statusCode: HttpStatus.OK,
      message: ResponseMessages.SUCCESS,
    };
  }
}
