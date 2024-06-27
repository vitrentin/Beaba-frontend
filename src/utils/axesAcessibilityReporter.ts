export async function axeAcessibilityReporter() {
  if (process.env.NODE_ENV === "dev" && typeof window !== "undefined") {
    const axe = await require("@axe-core/react");
    const React = await require("react");
    const ReactDOM = await require("react-dom");
    axe(React, ReactDOM, 1000);
  }
}
