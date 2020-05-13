export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
export const SET_BLACKLIST_DATA = "SET_BLACKLIST_DATA";

export default function reducer(state, action) {
  switch(action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case SET_BLACKLIST_DATA:
      return {
        ...state,
        blacklist: action.blacklist
      }
  }
}
