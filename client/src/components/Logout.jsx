// import React from "react";
// import axios from "axios";
// import Button from "@material-ui/core/Button";
// import styled from "styled-components";
// import { useHistory } from "react-router-dom";



// export default function Logout(props) {
//     // const classes = useStyles();
//     const history = useHistory();

// // TODO: Push logout button to bottom of drawer -> can't get it to work without forcing it with margin (but irrelevant on full screen mode)
// // const Button = styled(List)`
// //   ${"" /* margin-top: auto; */}
// //   margin-top: 35%;
// // `;

//     // const history = useHistory()

//     const handleLogout = event => {
//         axios
//         .post("/api/user/logout" /*, credentials, { withCredentials: true } */ )
//         .then(res => {
//           console.log(res);
//           console.log("Successful Logout");
//           history.push("/");
//         })
//         .catch(e => {
//           console.error(e);
//         });
//     }

//     return(
// //         <Button
// //         type="submit"
// // // This clears cookies right now
// //         onClick={handleLogout()}
        
// //         >
// //         Logout
// //         </Button>
//       //   <Button>
//       //   <ListItem button id="logout">
//       //     <ListItemIcon>
//       //       <PowerSettingsNewIcon />
//       //     </ListItemIcon>
//       //     <ListItemText primary="Log Out" />
//       //   </ListItem>
//       // </Button>
//     )

// }