export interface ParsedResponse {
  type: string;
  status: number;
  data: {
    success: boolean;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any[] | object;
  };
}
