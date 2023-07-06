export interface IAddress {
  localname: string;
  place_id: number;
  osm_id: number;
  osm_type?: string;
  place_type?: string;
  class: string;
  type: string;
  admin_level?: number;
  rank_address?: number;
  distance: number;
  isaddress: boolean;
}
