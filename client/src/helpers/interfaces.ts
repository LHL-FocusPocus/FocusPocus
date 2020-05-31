export interface QuotaData {
  used: {
    minutes: number;
  };
  allotment: {
    minutes: number;
  };
  all_browse_time: {
    minutes: number;
  };
}

export interface OptionsData {
  quotaTarget: number;
  quotaIncrement: number;
}

export interface Dashboard {
  donutGraph: object[];
  lineGraph: object[];
  radialGraph: object[];
  leaderboard: object[];
  shameboard: object[];
  user: any;
  quota_today: QuotaData;
  topBlacklisted: object[];
  blacklisted: object[];
}
