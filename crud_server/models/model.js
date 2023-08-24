import mongoose from "mongoose";

const strR = {
  type: String,
  required: true,
};

const strNR = {
  type: String,
};

const servicesSchema = {
  clip: {
    prov: strNR,
  },
  smsmt: strNR,
  optgprss: {
    optgprs: [
      {
        prov: strR,
        cntxId: strR,
      },
    ],
  },
  odboc: {
    odboc: strR,
  },
  odbroam: {
    odbroam: strR,
  },
  category: {
    category: strR,
  },
  eps: {
    prov: strNR,
  },
  smdp: strNR,
};

const DataSchema = new mongoose.Schema(
  {
    GetResponseSubscriber: {
      imsi: strR,
      msisdn: strR,
      hlrsn: strR,
      cardType: strNR,
      nam: strR,
      services: servicesSchema,
      rroption: strNR,
      skey: strNR,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", DataSchema);
export default Data;
