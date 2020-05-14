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
      // console.log("state", state);
      // console.log("action", action);
      // const blacklist = state.blacklist;
      // console.log("blacklist", blacklist);
      // console.log("action.id", action.id);
      const { id } = action;
      // Find index where the blacklisted site lives
      const siteIndex = state.blacklist.indexOf(
        state.blacklist.find(site => site.blacklists_id === id)
      );

      const clonedBlacklist = [...state.blacklist]

      clonedBlacklist.splice(siteIndex, 1);

      
      // console.log("siteIndex", siteIndex);
      // const siteIndex = blacklist.indexOf(blacklist["blacklist_id"] === action.id)
      // console.log('siteIndex', siteIndex)
      // const newBlacklist = {
      //   ...state.blacklist[siteIndex],
      // };
      console.log('state', state)

      // return {
      //   ...state,

      // }

      // console.log('newBlacklist', newBlacklist)
  }
}

/* [] {blacklists_id: 3, user_id: 1, website_id: 3, hostname: "twitter.com", name: "Twitter", …}
1: {blacklists_id: 4, user_id: 1, website_id: 5, hostname: "cnn.com", name: "CNN", …}
2: {blacklists_id: 5, user_id: 1, website_id: 6, hostname: "instagram.com", name: "Instagram", …}
3: {blacklists_id: 6, user_id: 1, website_id: 7, hostname: "pinterest.ca", name: "Pinterest", …}
4: {blacklists_id: 7, user_id: 1, website_id: 8, hostname: "youtube.com", name: "Youtube", …}
length: 5 */
