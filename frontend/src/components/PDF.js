import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import { useNavigate } from "react-router-dom";

// Create Document Component
const MyDocument = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();
  const [doc, setDoc] = useState({});
  useEffect(() => {
    const index1 = state.summary.indexOf("1. Overview");
    const index2 = state.summary.indexOf("2. Contract Structure");
    const index3 = state.summary.indexOf("3. Function Analysis");

    const title = state.summary.substring(0, index1);
    const part1 = state.summary.substring(index1 + 12, index2);
    const part2 = state.summary.substring(index2 + 22, index3);
    const part3 = state.summary.substring(index3 + 21);

    setDoc({
      title,
      part1,
      part2,
      part3,
    });
  }, [state.summary]);

  return <div style={{ margin: "20px"}}>
    <h2>{doc.title}</h2>
    <h3>1. Overview:</h3>
    <p>{doc.part1}</p>
    <h3>2. Contract Structure:</h3>
    <p>{doc.part2}</p>
    <h3>3. Function Analysis:</h3>
    <p>{doc.part3}</p>
    <button onClick={() => navigate("/")}>Return</button>
  </div>;
};

export default MyDocument;
