export interface QuotaData {
  used: {
    minutes: number;
    hours?: number;
    seconds?: number;
  };
  allotment: {
    minutes: number;
    hours?: number;
    seconds?: number;
  };
  all_browse_time: {
    minutes: number;
    hours?: number;
    seconds?: number;
  };
}

export interface OptionsData {
  quotaTarget: number;
  quotaIncrement: number;
}

export interface DashboardInterface {
  donutGraph: object[];
  lineGraph: object[];
  radialGraph: object[];
  leaderboard: object[];
  shameboard: object[];
  user: any;
  quota: QuotaData;
  topBlacklisted: object[];
  blacklisted: object[];
}
