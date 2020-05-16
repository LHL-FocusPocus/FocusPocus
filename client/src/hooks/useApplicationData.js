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
    quota_today: {
      allotment: {
        minutes: 120,
      },
    },
    donutGraph: [],
    leaderboard: [],
    lineGraph: [],
    radialGraph: [],
    shameboard: [],
    user: {},
  });
  console.log("state", state);

  // const [loading, setLoading] = useState(false)

  const setDashboard = async () => {
    const userData = await axios.get("/api/data/dashboard");
    console.log(userData);
    const dashboardData = userData.data;
    dispatch({
      type: SET_DASHBOARD_DATA,
      payload: dashboardData,
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/data/dashboard"),
      axios.get("/api/user/blacklists"),
    ])
      .then(all => {
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: all[0].data,
        });
        dispatch({
          type: SET_BLACKLIST_DATA,
          blacklisted: all[1].data,
        });
      })
      .catch(e => console.error(e));
  }, []);

  const disableBlacklistedSite = id => {
    axios.put(`/api/user/blacklists/disable/${id}`, id).then(res => {
      console.log("TEST");
      dispatch({
        type: CHANGE_BLACKLIST,
        id: res.data.id,
      });
    });
  };

  const changeQuota = quotaInMinutes => {
    axios
      .put("/api/user/adjust_quota", {
        quotaInMinutes,
      })
      .then(() => {
        dispatch({
          type: CHANGE_QUOTA,
          allotment: quotaInMinutes,
        });
      })
      .catch(e => {
        console.error(e);
      });
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
