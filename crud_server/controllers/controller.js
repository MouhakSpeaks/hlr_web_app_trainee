import Data from "../models/model.js";

class DataController {
  /**
   * @method postData
   */
  async postData(req, res) {
    try {
      const payload = req.body.GetResponseSubscriber;

      const isUserExists = await Data.find({
        "GetResponseSubscriber.imsi": payload.imsi,
        "GetResponseSubscriber.msisdn": payload.msisdn,
      });
      console.log(isUserExists.length)

      if (isUserExists.length > 0) {
        res.status(400).json({ message: "Data Already Exists" });
        return res.end()
      } else {
        const data = {
          GetResponseSubscriber: {
            imsi: payload.imsi,
            msisdn: payload.msisdn,
            hlrsn: payload.hlrsn,
            cardType: payload.cardType,
            nam: payload.nam,
            services: {
              clip: {
                prov: payload.services.clip.prov,
              },
              smsmt: payload.services.smsmt,
              optgprss: {
                optgprs: payload.services.optgprss.optgprs,
              },
              odboc: {
                odboc: payload.services.odboc.odboc,
              },
              odbroam: {
                odbroam: payload.services.odbroam.odbroam,
              },
              category: {
                category: payload.services.category.category,
              },
              eps: {
                prov: payload.services.eps.prov,
              },
              smdp: payload.services.smdp,
            },
            rroption: payload.rroption,
            skey: payload.skey,
          },
        };

        const d = new Data(data);
        await d.save();
        console.log("Saved!!");
        return res.status(201).json({ message: "Data Saved" });
      }
    } catch (error) {
      console.log("Error while postData API calling: ", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @method getAllData
   */
  async getAllData(req, res) {
    try {
      const data = await Data.find({ isDeleted: false });

      return res.status(201).json(data);
    } catch (error) {
      console.log("Error while getAllData api calling: ", error.message);
      return res.status(500).json(error.message);
    }
  }

  /**
   * @method getDataByImsi
   */
  async getDataByImsi(req, res) {
    try {
      const { imsi } = req.params;

      const data = await Data.findOne({
        "GetResponseSubscriber.imsi": imsi,
        isDeleted: false,
      });

      if (!data) {
        return res.status(404).json({ error: "Data not found" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log("Error while getDataByImsi API call: ", error.message);
      return res.status(500).json(error.message);
    }
  }

  /**
   * @method getDataByMsisdn
   */
  async getDataByMsisdn(req, res) {
    try {
      const { msisdn } = req.params;

      const data = await Data.findOne({
        "GetResponseSubscriber.msisdn": msisdn,
        isDeleted: false,
      });

      if (!data) {
        return res.status(404).json({ error: "Data not found" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.log("Error while getDataByMsisdn API call: ", error.message);
      return res.status(500).json(error.message);
    }
  }

  /**
   * @method getSelectiveDataByImsi
   */
  async getSelectiveDataByImsi(req, res) {
    try {
      let data = null;
      let imsiList = req.body.imsiList;
      let ResultImsi = [];
      console.log(imsiList);
      for (let i = 0; i < imsiList.length; i++) {
        data = await Data.findOne({
          "GetResponseSubscriber.imsi": imsiList[i].imsi,
          isDeleted: false,
        });
        ResultImsi.push(data);
        if (!data) {
          return res.status(404).json({ error: "Data not found" });
        }
      }

      return res.json(ResultImsi);
    } catch (error) {
      console.log(
        "Error while getSelectiveDataByImsi API call: ",
        error.message
      );
      return res.status(500).json(error.message);
    }
  }

  /**
   * @method updateDataByImsi
   */
  async updateDataByImsi(req, res) {
    try {
      const { imsi } = req.params;
      const updateData = req.body;

      const updatedData = await Data.findOneAndUpdate(
        { "GetResponseSubscriber.imsi": imsi },
        updateData,
        { new: true }
      );

      if (!updatedData) {
        return res.status(404).json({ error: "Data not found" });
      }

      return res.status(200).json({ message: "Data edited!" });
    } catch (error) {
      console.log("Error while updateDataByImsi api calling: ", error.message);
      return res.status(500).json(error.message);
    }
  }

  /**
   * @method deleteDataByImsi
   */
  async deleteDataByImsi(req, res) {
    try {
      const { imsi } = req.params;

      const deletedData = await Data.findOneAndDelete({
        "GetResponseSubscriber.imsi": imsi,
      });

      if (!deletedData) {
        return res.status(404).json({ error: "Data not found" });
      }

      return res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.log("Error while deleteDataByImsi api calling: ", error.message);
      return res.status(500).json(error.message);
    }
  }

  /**
   * @method deleteDataByImsi
   */
  async deleteData(req, res) {
    try {
      const { imsi } = req.params;

      const updatedData = await Data.findOneAndUpdate(
        { "GetResponseSubscriber.imsi": imsi },
        { isDeleted: true },
        { new: true }
      );

      if (!updatedData) {
        return res.status(404).json({ error: "Data not found" });
      }

      return res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      console.log("Error while deleteData API calling: ", error.message);
      return res.status(500).json(error.message);
    }
  }
}

export default DataController = new DataController();
