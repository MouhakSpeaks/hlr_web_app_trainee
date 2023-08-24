import mongoose from "mongoose";

const obj = {
  type: Object,
  required: true,
};

const str = {
  type: String,
  required: true,
};

const serSchema = {
  wsdl: obj,
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
    service: [serSchema],
    response: [resSchema],
  },
  {
    timestamps: true,
  }
);

/**
 * {
  "_id": "Unique identifier",
  "timestamp": "Timestamp of the SOAP call",
  "service": {
    "wsdl": "WSDL URL of the SOAP service",
    "method": "SOAP method called",
    "headers": {
      "key1": "value1",
      "key2": "value2",
      ...
    },
    "body": "SOAP request body"
  },
  "response": {
    "statusCode": "HTTP status code",
    "headers": {
      "key1": "value1",
      "key2": "value2",
      ...
    },
    "body": "SOAP response body"
  }
}
 */

const SoapLogs = mongoose.model("SoapLog", LogSchema);
export default SoapLogs;
