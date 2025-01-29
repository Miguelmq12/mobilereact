import React from "react";

const TopBar = ({ onLogout }: { onLogout: () => void }) => {
    return (
      <div className="topbar">
        <h3>Top Bar</h3>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    );
  };
export default TopBar;