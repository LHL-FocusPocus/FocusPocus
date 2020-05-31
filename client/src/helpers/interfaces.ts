export interface QuotaData {
  used: {
    minutes: number;
  };
  allotment: {
    minutes: number;
  };
  all_browse_time: {
    minutes: number;
  }
}

export interface OptionsData {
  quotaTarget: number;
  quotaIncrement: number;
}