import React from "react";

const PageNotFound_404 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        padding: "20px",
        boxShadow: "gray 0 0 1px 1px",
      }}
    >
      <div style={{ fontSize: "4rem", color: "gray", fontWeight: "bold" }}>
        404
      </div>
      <div style={{ fontSize: "2rem" }}>
        Error Occured! Page could not be found
      </div>
    </div>
  );
};

export default PageNotFound_404;
