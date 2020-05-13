import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer, { SET_DASHBOARD_DATA } from "../reducers/application";


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
      .then(() => setLoading(false))
      .catch(e => console.error(e));
  }, []);

  return { state, loading, setLoading };
}
