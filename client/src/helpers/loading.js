import React from "react";

export default function loading(Component) {
  return function loadingComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component {...props} />;
    }
    return (
      <Component>
        <h1>LOADING...</h1>
      </Component>
    );
  };
}
