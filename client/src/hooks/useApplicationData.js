import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer, {
  SET_DASHBOARD_DATA,
  SET_BLACKLIST_DATA,
  CHANGE_BLACKLIST,
} from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklisted: [],
  });

  // const [loading, setLoading] = useState(false)

  const setDashboard = () => {
    return axios.get("/api/data/dashboard").then(userData => {
      const dashboardData = userData.data;
      dispatch({
        type: SET_DASHBOARD_DATA,
        payload: dashboardData,
      });
    })
  };

  useEffect(() => {
    // setLoading(true);
    axios
      .get("/api/data/dashboard")
      .then(userData => {
        console.log("GETTING CALLED");
        const dashboardData = userData.data;
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboardData,
        });
      })
      // .then(() => console.log("state", state))
      .catch(e => console.error(e));
  }, []);

  /*     const setDashboard = async () => {
      await axios.get("/api/data/dashboard").then(userData => {
        console.log("GETTING CALLED");
        console.log("state", state);
        const dashboardData = userData.data;
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboardData,
        });
      });
    };
    setDashboard() */

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
  return { state, disableBlacklistedSite, addBlacklistedSite, setDashboard };
}
