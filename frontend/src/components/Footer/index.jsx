import React from "react";
export default function Footer() {
  return (
    <>
      <div
        className="py-2 footer"
        style={{
          position: "relative",
          bottom: "0",
          width: "100vw",
          height: "2.5rem",
        }}
      >
        <p style={{ margin: "auto", fontWeight: "lighter" }}>
          &copy; SnapFeed , All rights reserved
        </p>
      </div>
    </>
  );
}
