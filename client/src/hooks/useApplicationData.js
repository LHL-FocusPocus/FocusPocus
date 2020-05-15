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
  });

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
    axios
      .get("/api/data/dashboard")
      .then(userData => {
        console.log(userData);

        const dashboardData = userData.data;
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboardData,
        });
      })
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    axios.get("/api/user/blacklists").then(blacklist => {
      dispatch({
        type: SET_BLACKLIST_DATA,
        blacklisted: blacklist.data,
      });
    });
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

  // const setDashboard = async () => {
  //   const userData = await axios.get("/api/data/dashboard");
  //   console.log(userData)
  //   const dashboardData = userData.data;
  //   dispatch({

  const changeQuota = quotaInMinutes => {
    console.log("TEST", quotaInMinutes)
    dispatch({
      type: CHANGE_QUOTA,
      allotment: quotaInMinutes,
    });
    axios
      .put("/api/user/adjust_quota", {
        quotaInMinutes,
      })
      .then(res => {
        console.log('res', res)
        // console.log("quota", quota);


        // const quota = newQuota.data.split(" ")[0];

        console.log("res.data", res.data);
      });

    // console.log("newQuota", quota);
    // dispatch({
    //   type: CHANGE_QUOTA,
    // })
    console.log("state", state);
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
