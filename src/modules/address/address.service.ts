import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { v4 as uuid4 } from 'uuid';
import { AddressMapping } from './mappings';
import { IAddressDetail } from '@types';

@Injectable()
export class AddressService {
  index = 'address';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async createIndex() {
    const checkIndex = await this.elasticsearchService.indices.exists({
      index: this.index,
    });
    if (!checkIndex) {
      await this.elasticsearchService.indices.create({
        index: this.index,
        body: {
          mappings: AddressMapping,
          settings: {
            'index.mapping.total_fields.limit': '10000',
          },
        },
      });
    }
  }

  async createAddress(data: IAddressDetail): Promise<any> {
    return this.elasticsearchService.index({
      index: this.index,
      id: uuid4(),
      body: {
        ...data,
      },
      refresh: true,
    });
  }
  async checkAddressWithId(id: number): Promise<boolean> {
    const query = {
      bool: {
        must: [
          {
            match: {
              // eslint-disable-next-line camelcase
              osm_id: id,
            },
          },
        ],
      },
    };

    const checkOSMData = await this.elasticsearchService.search({
      index: this.index,
      query,
    });

    return checkOSMData.hits.hits.length > 0;
  }
  async getAddressWithLocation(latitude: number, longitude): Promise<any[]> {
    const query = {
      bool: {
        must: {
          // eslint-disable-next-line camelcase
          match_all: {},
        },
        filter: {
          // eslint-disable-next-line camelcase
          geo_shape: {
            geometry: {
              shape: {
                type: 'point',
                coordinates: [longitude, latitude],
              },
            },
          },
        },
      },
    };

    const getAddress = await this.elasticsearchService.search({
      index: this.index,
      query,
    });
    return getAddress.hits.hits;
  }
}
