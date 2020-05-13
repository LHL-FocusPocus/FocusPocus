import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer, { SET_DASHBOARD_DATA, SET_BLACKLIST_DATA } from "../reducers/application";


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklist: [],
  });

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/data/dashboard")
      .then(userData => {
        const dashboardData = userData.data;
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboardData,
        });
      })
      // This is not really doing what I intended...
      .then(() => console.log('state', state))
      .catch(e => console.error(e));

  }, []);

  useEffect(() => {
    axios.get("/api/user/blacklists")
    .then(blacklist => {
      dispatch({
        type: SET_BLACKLIST_DATA,
        blacklist: blacklist.data
      })
    })
  }, state.blacklist)

  return { state, loading, setLoading };
}
