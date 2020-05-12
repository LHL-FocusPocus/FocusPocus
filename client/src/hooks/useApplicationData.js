import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DASHBOARD_DATA
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklist: [],
  });

  // const analyticsRender = () => {

  // }
  useEffect(() => {
    Promise.resolve(axios.get("/api/data/dashboard"))
      .then(userData => {
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: userData,
        });
      })
      .catch(e => console.error(e));
  }, []);

  return
}
