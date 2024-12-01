export interface Session {
  sid: string;
  time: Date;
  expiration_time: Date;
  url: string;
  utm_source: string;
  exps?: string;
}
