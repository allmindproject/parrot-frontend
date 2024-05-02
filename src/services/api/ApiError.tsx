class ApiError extends Error {
  data: unknown;
  status: number;
  statusText: string;

  constructor(
    message: string,
    data: unknown,
    status: number,
    statusText: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
    this.status = status;
    this.statusText = statusText;
  }
}

export default ApiError;
