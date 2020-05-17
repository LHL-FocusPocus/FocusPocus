import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer, {
  SET_DASHBOARD_DATA,
  SET_BLACKLIST_DATA,
  CHANGE_BLACKLIST,
  CHANGE_QUOTA,
} from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklisted: [],
    donutGraph: [],
    leaderboard: [],
    lineGraph: [],
    radialGraph: [],
    shameboard: [],
    user: {},
    quota_today: {},
  });

  // const [loading, setLoading] = useState(false)
  useEffect(() => {
    axios
      .get("/api/data/dashboard")
      .then(dashboard => {
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboard.data,
        });
      })
      .catch(e => console.error(e));
  }, []);

  const setDashboard = async () => {
    const userData = await axios.get("/api/data/dashboard");
    const dashboardData = userData.data;
    dispatch({
      type: SET_DASHBOARD_DATA,
      payload: dashboardData,
    });
  };

  const disableBlacklistedSite = id => {
    axios.put(`/api/user/blacklists/disable/${id}`, id).then(res => {
      dispatch({
        type: CHANGE_BLACKLIST,
        id: res.data.id,
      });
    });
  };

  /*     const { quotaStart, quotaIncrement, quotaTarget } = req.body;
 */

  const changeQuota = (quotaStart, quotaTarget, quotaIncrement) => {
    console.log('object', object)
    // axios
    //   .put("/api/user/adjust_quota", {
    //     dailyQuota,
    //     targetQuota,
    //     quotaIncrement,
    //   })
    //   .then(() => {
    //     dispatch({
    //       type: CHANGE_QUOTA,
    //       allotment: dailyQuota,
    //     });
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
  };

  const addBlacklistedSite = host_name => {
    axios
      .post("/api/user/blacklists/add", { host_name })
      .then(res => {
        const { id, hostname, name, category } = res.data;
        dispatch({
          type: CHANGE_BLACKLIST,
          id,
          hostname,
          name,
          category,
        });
      })
      .catch(e => console.error(e));
  };

  return {
    state,
    disableBlacklistedSite,
    addBlacklistedSite,
    setDashboard,
    changeQuota,
  };
}
