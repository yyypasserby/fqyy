import React from "react";
import { StyleSheet, css } from "aphrodite";

function App() {
  return <div className={css(styles.app)}>FQYY</div>;
}

export default App;

const styles = StyleSheet.create({
  app: {
    backgroundColor: "red",
    height: 500,
    width: 500,
  },
});
