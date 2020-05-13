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
        const dashboard = userData.data;
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboard,
        });
      })
      .then(() => setLoading(false))
      .catch(e => console.error(e));
  }, []);

  return { state, loading, setLoading };
}
