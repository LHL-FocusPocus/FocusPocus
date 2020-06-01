export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const CHANGE_BLACKLIST = "CHANGE_BLACKLIST";
export const CHANGE_QUOTA = "CHANGE_QUOTA";
export const SET_WEBSOCKET_GRAPHS = "SET_WEBSOCKET_GRAPHS";

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      // If user has not adjusted their increment or target, set default values here to allow page to load
      if (action.payload.user.options === null) {
        return {
          ...state,
          ...action.payload,
          user: {
            ...action.payload.user,
            options: {
              quotaIncrement: 5,
              quotaTarget: 60,
            },
          },
        };
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }

    case CHANGE_BLACKLIST:
      const { id } = action;

      const clonedBlacklist = [...state.blacklisted];

      // If hostname is truthy, then the blacklisted site is being added instead of deleted
      if (action.hostname) {
        const { hostname, name, category, website_id, user_id } = action;
        const newBlacklistedSite = {
          blacklists_id: id,
          hostname,
          name,
          category,
          website_id,
          user_id,
        };
        clonedBlacklist.unshift(newBlacklistedSite);
      } else {
        // Find index where the blacklisted site lives
        const siteIndex = state.blacklisted.indexOf(
          state.blacklisted.find(
            (site: { blacklists_id: number }) => site.blacklists_id === id
          )
        );

        clonedBlacklist.splice(siteIndex, 1);
      }
      return {
        ...state,
        blacklisted: clonedBlacklist,
      };

    case CHANGE_QUOTA:
      const { used, all_browse_time } = state.quota;
      const newQuota = {
        minutes: action.allotment,
      };

      const quotaData = {
        allotment: newQuota,
        used: {
          minutes: used.minutes,
        },
        all_browse_time: {
          minutes: all_browse_time.minutes,
        },
      };

      return {
        ...state,
        quota: quotaData,
      };

    case SET_WEBSOCKET_GRAPHS:
      const { quota, donutGraph, radialGraph } = action.payload;
      return {
        ...state,
        quota,
        donutGraph,
        radialGraph,
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
