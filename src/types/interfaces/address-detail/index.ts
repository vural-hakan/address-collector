import { IAddress } from '../address';

export interface IAddressDetail {
  place_id: number;
  parent_place_id: number;
  osm_type: string;
  osm_id: number;
  category: string;
  type: string;
  admin_level: number;
  localname: string;
  names: any;
  addresstags: any;
  housenumber?: string;
  country_code: string;
  indexed_date: string;
  importance: number;
  calculated_importance: number;
  extratags: any;
  calculated_wikipedia: string;
  icon: string;
  rank_address: number;
  rank_search: number;
  isarea: boolean;
  centroid: {
    type: string;
    coordinates: number[];
  };
  geometry: {
    type: string;
    coordinates: number[][];
  };
  address: IAddress[];
  linked_places: IAddress[];
}
