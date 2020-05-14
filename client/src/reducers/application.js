export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_BLACKLIST_DATA = "SET_BLACKLIST_DATA";
export const CHANGE_BLACKLIST = "CHANGE_BLACKLIST";

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
      
      // Find index where the blacklisted site lives
      const siteIndex = state.blacklisted.indexOf(
        state.blacklisted.find(site => site.blacklists_id === id)
      );

      const clonedBlacklist = [...state.blacklisted];

      clonedBlacklist.splice(siteIndex, 1);

      return {
        ...state,
        blacklisted: clonedBlacklist,
      };
  }
}
