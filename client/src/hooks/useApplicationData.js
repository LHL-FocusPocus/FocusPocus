import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DASHBOARD_DATA } from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklist: [],
    quota_today: {},
    donutGraph: [],
    lineGraph: [],
    radialGraph: [],
    shameboard: [],
    leaderboard: [],
  });

  useEffect(() => {
    axios
      .get("/api/data/dashboard")
      .then(userData => {
        // console.log(userData);
        // console.log(userData);

        // console.log('userData', userData)
        // console.log('userData.data', userData.data)
        // console.log('donut', userData)
        const {
          donutGraph,
          lineGraph,
          radialGraph,
          shameboard,
          leaderboard,
          quota_today,
        } = userData.data;
        // console.log('donutGraph', donutGraph)
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: {
            quota_today,
            donutGraph,
            lineGraph,
            radialGraph,
            shameboard,
            leaderboard,
          },
        });
      })
      .catch(e => console.error(e));
  }, []);

  return { state };
}
