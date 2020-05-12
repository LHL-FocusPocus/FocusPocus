import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DASHBOARD_DATA } from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklist: [],
  });

  useEffect(() => {
    axios
      .get("/api/data/dashboard")
      .then(userData => {
        const dashboard = userData.data;
        // console.log('dashboard', dashboard)
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboard,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return { state };
}
