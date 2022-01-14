// Define your request
import fetch from "node-fetch";
import express from "express";
import crypto from "crypto";
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const http_method = "GET"; // Change to POST if endpoint requires data
const request_path = "/v3/balance/";
const json_payload = {}; // Needed for POST endpoints requiring data

// Create the signature

const payload = JSON.stringify(json_payload);
if (http_method == "POST") {
  message += payload;
}

const app = express();
import axios from "axios";

app.get("/v1/balance/", async function (req, res) {
  const nonce = new Date().getTime();
  const message = nonce + http_method + request_path;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");
  const auth_header = "Bitso " + key + ":" + nonce + ":" + signature;

  const response = await axios.get(`https://api.bitso.com/v3/balance/`, {
    headers: {
      Authorization: auth_header,
      "Content-Type": "application/json",
    },
  });
  res.send(response.data);
});

app.get("/v1/account_status/", async function (req, res) {
  const nonce = new Date().getTime();
  const message = nonce + http_method + "/v3/account_status/";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");
  const auth_header = "Bitso " + key + ":" + nonce + ":" + signature;

  const response = await axios.get(`https://api.bitso.com/v3/account_status/`, {
    headers: {
      Authorization: auth_header,
      "Content-Type": "application/json",
    },
  });
  res.send(response.data);
});

app.get("/v1/ledger/withdrawals/", async function (req, res) {
  const nonce = new Date().getTime();
  const message = nonce + http_method + "/v3/ledger/withdrawals/";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");
  const auth_header = "Bitso " + key + ":" + nonce + ":" + signature;

  const response = await axios.get(
    `https://api.bitso.com/v3/ledger/withdrawals/`,
    {
      headers: {
        Authorization: auth_header,
        "Content-Type": "application/json",
      },
    }
  );
  res.send(response.data);
});

app.listen(3000);
