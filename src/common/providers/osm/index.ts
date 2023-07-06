import { Injectable } from '@nestjs/common';
import { IAddressDetail } from '@types';
import axios from 'axios';

@Injectable()
export class OSMProvider {
  getOSMDetail(id: number): Promise<IAddressDetail> {
    return new Promise((resolve, reject) => {
      const url =
        'https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=' +
        id +
        '&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json';
      axios
        .get(url)
        .then((resp) => {
          return resolve(resp.data);
        })
        .catch((err) => {
          return reject(err.message);
        });
    });
  }
}
