export interface Response {
  statusCode: number;
  message?: string;
  data?: { [key: string]: any };
}
