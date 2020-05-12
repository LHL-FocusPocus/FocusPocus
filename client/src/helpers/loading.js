import React from "react";

function loading(Component) {
  return function loadingComponent({ isLoading, ...props }) {
    if (!iLoading) {
      return <Component {...props} />;
    }
    return <h1>LOADING...</h1>;
  };
}
