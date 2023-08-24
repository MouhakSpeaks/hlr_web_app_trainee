import mongoose from "mongoose";

const obj = {
  type: Object,
  required: true,
};

const str = {
  type: String,
  required: true,
};

const reqSchema = {
  url: obj,
  method: obj,
  headers: obj,
  body: str,
};

const resSchema = {
  statusCode: obj,
  headers: obj,
  body: str,
};

const LogSchema = new mongoose.Schema(
  {
    request: [reqSchema],
    response: [resSchema],
  },
  {
    timestamps: true,
  }
);

/**
 * "request": {
    "url": "URL of the API endpoint",
    "method": "HTTP method (GET, POST, PUT, DELETE, etc.)",
    "headers": {
      "key1": "value1",
      "key2": "value2",
      ...
    },
    "body": "Request payload (if applicable)"
  },
  "response": {
    "statusCode": "HTTP status code",
    "headers": {
      "key1": "value1",
      "key2": "value2",
      ...
    },
    "body": "Response payload (if applicable)"
 */

const RestLogs = mongoose.model("RestLog", LogSchema);
export default RestLogs;
