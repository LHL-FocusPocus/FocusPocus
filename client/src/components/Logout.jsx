import React from "react";
import axios from "axios";

export default function Logout(props) {
    // const classes = useStyles();
    const { history } = props;

    const handleLogout = event => {
        axios
        .post("/api/user/logout" /*, credentials, { withCredentials: true } */ )
        .then(res => {
          console.log(res);
          console.log("Successful Logout");
          history.push("/");
        })
        .catch(e => {
          console.error(e);
        });
    }

}