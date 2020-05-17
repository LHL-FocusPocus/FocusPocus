export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_BLACKLIST_DATA = "SET_BLACKLIST_DATA";
export const CHANGE_BLACKLIST = "CHANGE_BLACKLIST"; //TODO: Should not combine dispatch events, its okay to separate otherwise logic gets convulated
export const CHANGE_QUOTA = "CHANGE_QUOTA";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload,
      };
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
          state.blacklisted.find((site) => site.blacklists_id === id)
        );

        clonedBlacklist.splice(siteIndex, 1);
      }
      return {
        ...state,
        blacklisted: clonedBlacklist,
      };

    case CHANGE_QUOTA:
      // console.log("quotaInMinutes", action.allotment);

      const { used, all_browse_time } = state.quota_today;
      const newQuota = {
        minutes: action.allotment,
      };

      // console.log("newQuota", newQuota);
      // console.log("all_browse_time", all_browse_time);

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

    //todo: have default state /error handling, not required but nice to have
  }
}
