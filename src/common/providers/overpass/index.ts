import { Injectable } from '@nestjs/common';
import { IBaseRelation } from '@types';
import axios from 'axios';

@Injectable()
export class OverPassProvider {
  getUpperL3Relations(): Promise<IBaseRelation[]> {
    return new Promise((resolve, reject) => {
      const url =
        'https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0A%28%0A%20%20%0A%20%20relation%5B%22place%22%3D%22city%22%5D%3B%0A%20%20relation%5B%22admin_level%22%3D%223%22%5D%3B%0A%20%20relation%5B%22admin_level%22%3D%224%22%5D%3B%0A%20%20relation%5B%22admin_level%22%3D%225%22%5D%3B%0A%20%20relation%5B%22admin_level%22%3D%226%22%5D%3B%0A%20%20relation%5B%22admin_level%22%3D%227%22%5D%3B%0A%20%20relation%5B%22admin_level%22%3D%228%22%5D%3B%0A%29%3B%0Aout%20ids%3B';

      axios
        .get(url)
        .then((response) => {
          const relations = response.data;
          const cities = relations.elements;
          return resolve(cities);
        })
        .catch((err) => {
          return reject(err.message);
        });
    });
  }
}
