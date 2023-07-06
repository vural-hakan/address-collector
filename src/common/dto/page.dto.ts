export class PageDto {
  constructor(since: number, limit: number, items: any) {
    this.since = since;
    this.count = items.length;
    this.isLast = this.count < limit;
    this.items = items;
  }
  since: number;
  count: number;
  isLast: boolean;
  items?: Array<any>;
}
