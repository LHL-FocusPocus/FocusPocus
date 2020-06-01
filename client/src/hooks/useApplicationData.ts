import { useReducer, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import reducer, {
  SET_DASHBOARD_DATA,
  CHANGE_BLACKLIST,
  CHANGE_QUOTA,
  SET_WEBSOCKET_GRAPHS,
} from "../reducers/application";

const WEBSOCKET_URL =
  process.env.REACT_APP_WEBSOCKET_URL || "http://localhost:9000";

export default function useApplicationData() {
  const [state, dispatch]: any = useReducer(reducer, {
    blacklisted: [],
    donutGraph: [],
    leaderboard: [],
    lineGraph: [],
    radialGraph: [],
    shameboard: [],
    user: {},
    quota: {},
  });

  const setDashboard = async () => {
    const userData = await axios.get("/api/data/dashboard");
    const dashboardData = userData.data;
    dispatch({
      type: SET_DASHBOARD_DATA,
      payload: dashboardData,
    });
  };

  const setWebsocketGraphs = async () => {
    const userData = await axios.get("/api/data/dashboard");
    const dashboardData = userData.data;
    dispatch({
      type: SET_WEBSOCKET_GRAPHS,
      payload: dashboardData,
    });
  };

  useEffect(() => {
    // Websocket connection
    const conn = socketIOClient(WEBSOCKET_URL);

    conn.on("refresh", () => {
      setWebsocketGraphs();
    });

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

  const disableBlacklistedSite = (blacklists_id: number) => {
    axios
      .put(`/api/user/blacklists/disable/${blacklists_id}`, blacklists_id)
      .then(res => {
        dispatch({
          type: CHANGE_BLACKLIST,
          id: res.data.id,
        });
      });
  };

  const changeQuota = (
    quotaStart: number,
    quotaTarget: number,
    quotaIncrement: number
  ) => {
    return axios
      .post("/api/user/adjust_quota", {
        quotaStart,
        quotaTarget,
        quotaIncrement,
      })
      .then(res => {
        dispatch({
          type: CHANGE_QUOTA,
          allotment: quotaStart,
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  const addBlacklistedSite = (host_name: string) => {
    axios
      .post("/api/user/blacklists/add", { host_name })
      .then(res => {
        const { id, hostname, name, category, website_id, user_id } = res.data;
        dispatch({
          type: CHANGE_BLACKLIST,
          id,
          hostname,
          name,
          category,
          user_id,
          website_id,
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
