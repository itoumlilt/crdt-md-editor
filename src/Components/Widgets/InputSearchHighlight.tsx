import * as React from "react";

interface Props {
  icon: any;
  setSearch: any;
}

export const InputSearchHighlight = ({ icon: Icon, setSearch }: Props) => (
  <div
    style={{
      position: "relative",
      paddingBottom: "10px",
      marginBottom: "1px",
    }}
  >
    <Icon
      size={18}
      style={{
        position: "absolute",
        top: "0.5em",
        left: "0.5em",
        color: "#ccc",
      }}
    />
    <input
      data-testid="ToolbarSearchHighlightInput"
      type="search"
      placeholder="Quick Search..."
      onChange={(e) => setSearch(e.target.value)}
      style={{
        boxSizing: "border-box",
        fontSize: "0.85em",
        width: "100%",
        padding: "0.5em",
        paddingLeft: "2em",
        border: "2px solid #ddd",
        background: "#fafafa",
      }}
    />
  </div>
);
