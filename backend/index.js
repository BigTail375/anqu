const fetch = require("node-fetch");

const constants = require("./components/Constants");

const API_KEY = "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";

const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

const PurposeData = {
  Catalyst: {
    systemMessage:
      "You are a smart contract security researcher, you have been set a task to write a short report on a smart contract pasted below, write a summary on how they could improve gas optimisation also include the code for any advised changes and reccomendations, the report must contain a front page (name of contract, language and language version with the current date) and contents page. Contains more than 1500 words",
    description: "Gas Optimisation Report 🚀",
  },
  Custom: {
    systemMessage:
      "You are a smart contract security researcher, you have been set a task to write a full report on a smart contract pasted below, write a summary of the contract functions, edge cases, vulnerbilities and attack vectors, also include the code for any advised changes and reccomendations, the report must contain a front page (name of contract, language and language version with the current date) and contents page. Contains more than 1500 words",
    description: "Full Comprehensive Report",
  },
  Developer: {
    systemMessage:
      "You are a smart contract security researcher, you have been set a task to write a short report on a smart contract pasted below, write a summary on any edge cases present also include the code for any advised changes and reccomendations, the report must contain a front page (name of contract, language and language version with the current date) and contents page. Contains more than 1500 words",
    description: "Edge Case Report",
  },
  Executive: {
    systemMessage:
      "You are a smart contract security researcher, you have been set a task to write a short report on a smart contract pasted below, write a summary on any attack vectors present also include the code for any advised changes and reccomendations, the report must contain a front page (name of contract, language and language version with the current date) and contents page. Contains more than 1500 words",
    description: "Attack Vector Report",
  },
  Generic: {
    systemMessage:
      "You are a smart contract security researcher, you have been set a task to write a short report on a smart contract pasted below, write a summary of the contract functions, edge cases, vulnerbilities and attack vectors, also include the code for any advised changes and reccomendations, the report must contain a front page (name of contract, language and language version with the current date) and contents page. Contains more than 1500 words",
    description: "Simple Audit Report",
  },
  Scientist: {
    systemMessage:
      "You are a smart contract security researcher, you have been set a task to write a short report on a smart contract pasted below, write a summary on any vulnberbilities present also include the code for any advised changes and reccomendations, the report must contain a front page (name of contract, language and language version with the current date) and contents page. Contains more than 1500 words",
    description: "Vulnerability Report",
  },
};

app.post("/asked", async (req, res) => {
  const prompt1 = req.body.option;
  const prompt2 = req.body.userInput;

  console.log(prompt1);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(API_KEY),
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: PurposeData[prompt1].systemMessage,
        },
        {
          role: "user",
          content: prompt2,
        },
      ],
      max_tokens: 2048,
    }),
  });

  const data = await response.json();

  console.log(data);

  res.send(JSON.stringify({ messages: data.choices }));
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
