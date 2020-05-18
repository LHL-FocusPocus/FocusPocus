import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import reducer, {
  SET_DASHBOARD_DATA,
  SET_BLACKLIST_DATA,
  CHANGE_BLACKLIST,
  CHANGE_QUOTA,
} from "../reducers/application";

const ENDPOINT = "http://localhost:9000";

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

  const [connection, setConnection] = useState({});

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

  const disableBlacklistedSite = blacklists_id => {
    // console.log("ID before axios put=====>", blacklists_id);
    axios
      .put(`/api/user/blacklists/disable/${blacklists_id}`, blacklists_id)
      .then(res => {
        // console.log("res inisde axios =======>", res);
        // console.log("site id inside axios =======>", id);
        dispatch({
          type: CHANGE_BLACKLIST,
          id: res.data.id,
        });
      });
  };

  const changeQuota = (quotaStart, quotaTarget, quotaIncrement) => {
    axios
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

  const addBlacklistedSite = host_name => {
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

  // Websocket connection
  useEffect(() => {
    const conn = socketIOClient(ENDPOINT);
    setConnection(conn);

    connection.on("connect", () => {
      console.log("i have connected");
      connection.emit("foo", "bar");
    });
  });

  return {
    state,
    disableBlacklistedSite,
    addBlacklistedSite,
    setDashboard,
    changeQuota,
  };
}
