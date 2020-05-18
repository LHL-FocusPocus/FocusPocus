export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_BLACKLIST_DATA = "SET_BLACKLIST_DATA";
export const CHANGE_BLACKLIST = "CHANGE_BLACKLIST";
export const CHANGE_QUOTA = "CHANGE_QUOTA";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      // If user has not adjusted their increment or target, set default values here to allow page to load
      if (action.payload.user.options === null) {
        return {
          ...state,
          ...action.payload,
          user: {
            options: {
              quotaIncrement: 5,
              quotaTarget: 0,
            },
          },
        };
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }

    case SET_BLACKLIST_DATA:
      return {
        ...state,
        blacklisted: action.blacklisted,
      };

    case CHANGE_BLACKLIST:
      const { id } = action;

      const clonedBlacklist = [...state.blacklisted];

      // If hostname is truthy, then the blacklisted site is being added instead of deleted
      if (action.hostname) {
        const { hostname, name, category } = action;
        const newBlacklistedSite = { id, hostname, name, category };
        clonedBlacklist.unshift(newBlacklistedSite);
      } else {
        // Find index where the blacklisted site lives
        const siteIndex = state.blacklisted.indexOf(
          state.blacklisted.find(site => site.blacklists_id === id)
        );

        clonedBlacklist.splice(siteIndex, 1);
      }
      return {
        ...state,
        blacklisted: clonedBlacklist,
      };

    case CHANGE_QUOTA:
      const { used, all_browse_time } = state.quota_today;
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
        quota_today: quotaData,
      };
  }
}
