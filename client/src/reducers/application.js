export const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";

export default function reducer(state, action) {
  switch(action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload
      }
  }
}
