import React, { useContext } from "react";
import { useState, useEffect, useReducer } from "react";
import LoadingBox from "../LoadingBox";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../App";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Col, Row } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, message_json: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const { state, setState } = useContext(StateContext);
  const [codeInput, setCodeInput] = useState("");
  const [result, setResult] = useState("");
  const [option, setOption] = useState("Catalyst");

  const [{ loading, error, message_json }, dispath] = useReducer(reducer, {
    message_json: "",
    loading: false,
    error: "",
  });


  const submitHandler = async (e) => {
    e.preventDefault();
    dispath({ type: "FETCH_REQUEST" });
    try {
      const response = await fetch("http://localhost:5000/asked/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: codeInput,
          option,
        }),
      });

      const data = await response.json();

      setResult(
        data.messages.reduce(
          (result, choice) => `${result} ${choice.message.content}`,
          ""
        )
      );

      dispath({ type: "FETCH_SUCCESS", payload: data.message });
    } catch (err) {
      dispath({ type: "FETCH_FAIL", payload: err.message });
    }
  };

  const handleAttachClick = (e) => {
    e.preventDefault();
  };

  const handlePasteClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {loading && (
        <div className="loading_container">
          <LoadingBox />
        </div>
      )}
      <div className="text-center m-0 app-bar">boolai</div>
      <div className="result-container">
        <textarea className="result-box" type="text" value={result} readOnly />
      </div>
      <div className="code-box">
        <CodeEditor
          value={codeInput}
          language="solidity"
          placeholder="Please enter Solidity code."
          onChange={(e) => setCodeInput(e.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            width: "100%",
            margin: "0 0 0 0",
            backgroundColor: "#151319",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
      <Row className="control-container">
        <Col md={4}>
          <button type="button" onClick={handleAttachClick}>
            Attach
          </button>
          <button type="button" className="ms-2" onClick={handlePasteClick}>
            Paste
          </button>
        </Col>
        <Col md={4} style={{ textAlign: "center" }}>
          <select className="select-box" onChange={(e) => setOption(e.target.value)}>
            <option value="Catalyst">Gas Optimisation Report</option>
            <option value="Developer">Edge Case Report</option>
            <option value="Executive">Attack Vector Report</option>
            <option value="Generic">Simple Audit Report</option>
            <option value="Scientist">Vulnerability Report</option>
          </select>
        </Col>
        <Col md={4} style={{ textAlign: "right" }}>
          <button type="button" onClick={submitHandler}>
            Submit
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
