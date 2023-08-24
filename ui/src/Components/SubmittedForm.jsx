import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect, useCallback } from "react";
import { produce } from "immer";
import Navbar from "./Navbar";
import { Spin, Switch } from "antd";
import axios from "axios";
import PopUp_1 from "./Popups/PopUp_1";

const SubmittedForm = () => {
  const [searchResults, setsearchResults] = useState([]);
  const [input, setInput] = useState("");
  const [input_1, setInput_1] = useState("");
  const [editEnable, setEditEnable] = useState(false);
  // const data= [
  //   {
  //     GetResponseSubscriber: {
  //       imsi: 734025000145829, //Numeric  and length==14
  //       msisdn: 584124997370,//Numeric and length= 10
  //       hlrsn: 1,//Numeric and length=1
  //       cardType: "USIM",//Dropdown
  //       nam: "BOTH",
  //       services: {
  //         clip: {
  //           prov: "PROV"//Dropdown
  //         },
  //         smsmt: "Hello",//Text
  //         optgprss: { //min element=1 and max element=5
  //           optgprs: [
  //             {
  //               prov: true,//Toggle
  //               cntxId: 3//numeric 1 digit
  //             },
  //             {
  //               prov: true,
  //               cntxId: 5
  //             },
  //             {
  //               prov: true,
  //               cntxId: 3
  //             },
  //             {
  //               prov: true,
  //               cntxId: 5
  //             }
  //           ]
  //         },
  //         odboc: {//dropdown
  //           odboc: "BOIC"
  //         },
  //         odbroam: {//dropdown
  //           odbroam: "BROHPLMNC"
  //         },
  //         category: {//dropdown
  //           category: "COMMON"
  //         },
  //         eps: {//toggle
  //           prov: true
  //         },
  //         smdp: "MSC"//dropdown
  //       },
  //       rroption: "ALL_PLMNS",//dropdown
  //       skey: 0//numeric 0-9
  //     }
  //   },
  //   {
  //     GetResponseSubscriber: {
  //       imsi: 12345678901234, //Numeric  and length==14
  //       msisdn: 1234568990,//Numeric and length= 10
  //       hlrsn: 2,//Numeric and length=1
  //       cardType: "USIM",//Dropdown
  //       nam: "BOTH",
  //       services: {
  //         clip: {
  //           prov: "PROV"//Dropdown
  //         },
  //         smsmt: "Hello",//Text
  //         optgprss: { //min element=1 and max element=5
  //           optgprs: [
  //             {
  //               prov: true,//Toggle
  //               cntxId: 3//numeric 1 digit
  //             },
  //             {
  //               prov: true,
  //               cntxId: 5
  //             },
  //             {
  //               prov: true,
  //               cntxId: 3
  //             },
  //             {
  //               prov: true,
  //               cntxId: 5
  //             }
  //           ]
  //         },
  //         odboc: {//dropdown
  //           odboc: "BOIC"
  //         },
  //         odbroam: {//dropdown
  //           odbroam: "BROHPLMNC"
  //         },
  //         category: {//dropdown
  //           category: "COMMON"
  //         },
  //         eps: {//toggle
  //           prov: true
  //         },
  //         smdp: "MSC"//dropdown
  //       },
  //       rroption: "ALL_PLMNS",//dropdown
  //       skey: 1//numeric 0-9
  //     }
  //   },
  //   {
  //     GetResponseSubscriber: {
  //       imsi: 79348043978052, //Numeric  and length==14
  //       msisdn: 2905293403,//Numeric and length= 10
  //       hlrsn: 3,//Numeric and length=1
  //       cardType: "USIM",//Dropdown
  //       nam: "BOTH",
  //       services: {
  //         clip: {
  //           prov: "PROV"//Dropdown
  //         },
  //         smsmt: "Hello",//Text
  //         optgprss: { //min element=1 and max element=5
  //           optgprs: [
  //             {
  //               prov: false,//Toggle
  //               cntxId: 1//numeric 1 digit
  //             },
  //             {
  //               prov: true,
  //               cntxId: 5
  //             },
  //             {
  //               prov: false,
  //               cntxId: 2
  //             },
  //             {
  //               prov: true,
  //               cntxId: 5
  //             }
  //           ]
  //         },
  //         odboc: {//dropdown
  //           odboc: "BOIC"
  //         },
  //         odbroam: {//dropdown
  //           odbroam: "BROHPLMNC"
  //         },
  //         category: {//dropdown
  //           category: "COMMON"
  //         },
  //         eps: {//toggle
  //           prov: true
  //         },
  //         smdp: "MSC"//dropdown
  //       },
  //       rroption: "ALL_PLMNS",//dropdown
  //       skey: 3//numeric 0-9
  //     }
  //   },

  // ]
  const [data, setData_1] = useState([]);
  const [imsi, setImsi] = useState("");
  const [search, setSearch] = useState(false);
  const [isLoading, setisLoading]= useState(false);
  // useEffect(()=>{
  //   // axios.get(`https://localhost:5000/all-data/${imsi}`).then(
  //   //   res=>setData_1(res.data)
  //   // )
  // },[search])
  const handleSearchChange = (value) => {
    setInput(value);
  };
  const handleSearchChange_1 = (value) => {
    setInput_1(value);
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    console.log(input);
    console.log(data);
    // axios.get(`http://localhost:5000/data/${input}`)
    // .then((res) => {
    //   console.log(res);
    //   setData_1(res.data);
    // });
    if(input.length!==0){
      try{
      const request = ["GET", `${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/data/${input}`, axios.defaults.headers.common, ""];
      setisLoading(true)
      let res = await axios.get(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/data/${input}`)
      console.log(res.data);
      setData_1([res.data]);
      try {
        const response = [res.status + ":" + res.statusText, res.headers, res.data];
        const dataReturn = [response, request]
        console.log(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`); 
        await axios.post(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`, dataReturn)
      } catch (error) {
        console.log("Error saving log! --> ", error.message);
      }

      }
      catch(err){
        alert('No data found');
      }
      finally{
        setisLoading(false)
      }
    }
    else if(input_1.length!==0){
      try{
      const request = ["GET", `${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/data/${input_1}`, axios.defaults.headers.common, ""];
      setisLoading(true)
      let res = await axios.get(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/get-data-by-msisdn/${input_1}`)
      console.log(res.data);
      setData_1([res.data]);
      try {
        const response = [res.status + ":" + res.statusText, res.headers, res.data];
        const dataReturn = [response, request]
        console.log(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`); 
        await axios.post(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`, dataReturn)
      } catch (error) {
        console.log("Error saving log! --> ", error.message);
      }
      }
      catch(err){
        alert("No data found");
      }
      finally{
        setisLoading(false);
      }

    }
    
    
    console.log(data);
    setInput("");
    setInput_1("");
    setEditEnable(true);
    setSearch(true);
    setImsi(input);
    setthrowError(false)
  };
  useEffect(()=>{
    setsearchResults(data);
  },[data])
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(e);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("keydown", handleSearchKeyDown, true);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleSearchKeyDown, true);
    };
  }, []);
  const [enable, setEnable] = useState(true);
  const enableEdit = () => {
    setEnable(false);
  };
  const enableCancel = () => {
    setEnable(true);
  };
  const handleChange = (field, nestedField, nestedField_2, value) => {
    setData_1(prevData => {
      return produce(prevData, draftData => {
        if (nestedField) {
          if (nestedField_2) {
            draftData[0].GetResponseSubscriber[field][nestedField][nestedField_2] = value;
          } else {
            draftData[0].GetResponseSubscriber[field][nestedField] = value;
          }
        } else {
          draftData[0].GetResponseSubscriber[field] = value;
        }
      });
    });
  };
  
  const handleSwitch = (id) => {
    setData_1((prevData) => {
      return produce(prevData, (newData) => {
        newData[0].GetResponseSubscriber.services.optgprss.optgprs[id].prov = !newData[0].GetResponseSubscriber.services.optgprss.optgprs[id].prov;
      });
    });
  };
  const handleSwitch_2 = () => {
    setData_1(prevData => {
      return produce(prevData, draftData => {
        draftData[0].GetResponseSubscriber.services.eps.prov = !draftData[0].GetResponseSubscriber.services.eps.prov;
      });
    });
  };
  const handleChange_1 = (e, index, field) => {
    const { value } = e.target;
    setData_1(prevData => {
      return produce(prevData, draftData => {
        draftData[0].GetResponseSubscriber.services.optgprss.optgprs[index][field] = value;
      });
    });
  };
      // setData_1((prevData) => {
      //   return produce(prevData, (newData) => {
      //     newData[0].GetResponseSubscriber.services.optgprss.optgprs[id].prov = !newData[0].GetResponseSubscriber.services.optgprss.optgprs[id].prov;
      //   });
      // });
  
  const handleDelete = (id) => {
    setData_1((prevData) => {
      return produce(prevData, (newData) => {
        newData[0].GetResponseSubscriber.services.optgprss.optgprs.splice(id, 1);
      });
    });
   
  };
  const [throwError, setthrowError] =useState(false)
  const [showPopup, setshowPopup] = useState(false)
  const handleUpdateData = async () => {
    if((!Number.isInteger(parseInt(data[0].GetResponseSubscriber.hlrsn)))
    ||(!Number.isInteger(parseInt(data[0].GetResponseSubscriber.skey)))
    &&(data[0].GetResponseSubscriber.hlrsn.trim().length===0)
    ||(data[0].GetResponseSubscriber.skey.trim().length===0)
    ){
      setthrowError(true)
    }
    else if(data[0].GetResponseSubscriber.hlrsn.trim().length>1 || data[0].GetResponseSubscriber.skey.trim().length>1){
      setthrowError(true)
    }
    else{
      try {
        const imsiNumber = data[0].GetResponseSubscriber.imsi;
        setisLoading(true)
        setData_1([])
        setEnable(!enable)
        const res_1 = await axios.put(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/update-data/${imsiNumber}`, data[0]);
        // const request = ["GET", `${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/update-data/${imsiNumber}`, axios.defaults.headers.common, ""];
        // const res_1 = await axios.put(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/delete/${imsiNumber}`, data[0]);
        // const response = [res_1.status + ":" + res_1.statusText, res_1.headers, res_1.data];
        // const dataReturn = [response, request]
        // await axios.post(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/addRestLog`, dataReturn)

        try {
          const request = ["PUT", `${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/delete/${imsiNumber}`, axios.defaults.headers.common, ""];
          const response = [res_1.status + ":" + res_1.statusText, res_1.headers, res_1.data];
          const dataReturn = [response, request]
          await axios.post(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`, dataReturn);
          console.log("Log Saved!");
        } catch (error) {
          console.log("Error saving log! --> ", error.message);
        }

        setshowPopup(true)
      } catch (error) {
        alert("Error updating data:", error);
      }
      finally{
        setisLoading(false)
      }
    }
   
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateData();
    setEditEnable(true);
  };
  const handleAdd = useCallback(() => {
    setData_1((prevData) => {
      return produce(prevData, (newData) => {
        const optgprs = [...newData[0].GetResponseSubscriber.services.optgprss.optgprs];
        optgprs.push({
          prov: false,
          cntxId: null,
        });
        newData[0].GetResponseSubscriber.services.optgprss.optgprs = optgprs;
      });
    });
  }, []);
  const handleDeleteForm = async()=>{
    const imsiNumber = data[0].GetResponseSubscriber.imsi;
    try{
      setEnable(!enable)
      setData_1([]);
      setisLoading(true);
      const res_1 = await axios.put(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/delete/${imsiNumber}`, data[0]);
      try {
        const request = ["PUT", `${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/delete/${imsiNumber}`, axios.defaults.headers.common, ""];
        const response = [res_1.status + ":" + res_1.statusText, res_1.headers, res_1.data];
        const dataReturn = [response, request]
        await axios.post(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`, dataReturn);
        console.log("Log Saved!");
      } catch (error) {
        console.log("Error saving log! --> ", error.message);
      }

    }
    catch(err){
      alert("Error deleting data",err)
    }
    finally{
      setTimeout(()=>setisLoading(false),500);
    }
      
   

      console.log(`http://${process.env.REACT_APP_LOG_ENDPOINT}:${process.env.REACT_APP_LOG_PORT}/addRestLog`);
      await axios.put(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_SERVER_PORT}/delete/${imsiNumber}`, data[0]);
  }

 

  return (
    <div className="searchData">
      <Navbar />
      <div className="searchfield">
        <input
          disabled={!enable}
          placeholder="Search IMSI"
          className="search"
          value={input}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <input
          disabled={!enable}
          placeholder="Search MSISDN"
          className="search msisdn-search"
          value={input_1}
          onChange={(e) => handleSearchChange_1(e.target.value)}
        />
        <img
          className="searchbtn"
          src="/Images/search.png"
          onClick={handleSearchClick}
        ></img>
      </div>
      <div className="resultField">
        {searchResults.length === 0?  (
          <p>Type IMSI or MSISDN</p>
        ) : (
          searchResults.map((data, index) => (
            <div className="searchResults" key={index}>
              <div className="submformfp">
              <div className="subfcont">
                <p>Imsi: </p>
                  <input
                    value={data.GetResponseSubscriber?.imsi}
                    disabled={true}
                  ></input>
              </div>
              <div className="subfcont">
                <p>Msisdn: </p>
                <input
                  value={data.GetResponseSubscriber?.msisdn}
                  disabled={true}

                ></input>
              </div>
              <div className="subfcont">
                <p>hlrsn: </p>
                {throwError===true?<p style={{color: "red", fontSize:"10px"}}>Enter Valid number</p>: <input
                  value={data.GetResponseSubscriber?.hlrsn}
                  disabled={enable}
                  onChange={e => handleChange('hlrsn', null, null, e.target.value)}
                ></input>}
              </div>
              <div className="subfcont">
                <p>CardTyp: </p>
                <select  value={data.GetResponseSubscriber?.cardType} disabled={enable}  onChange={e => { handleChange('cardType', null, null, e.target.value) }}>
                  <option>
                    **{data.GetResponseSubscriber?.cardType}**
                  </option>
                  <option value="option1">
                    OPT1
                  </option>
                  <option value="option2">
                    OP2
                  </option>
                  <option value="option3">
                    OP3
                  </option>
                </select>
              </div>
              <div className="subfcont">
                  <p>Nam: </p>
                  <select value={data.GetResponseSubscriber?.nam} disabled={enable} onChange={e => { handleChange('nam', null, null, e.target.value) }}>
                    <option>
                      **{data.GetResponseSubscriber?.nam}**
                    </option>
                    <option value="option1">
                      OPT1
                    </option>
                    <option value="option2">
                      OPT2
                    </option>
                    <option value="option3">
                      OPT3
                    </option>
                  </select>
                </div>
              </div>
              <div className="serv_name">
                <h2>Services</h2>
              </div>
              
              <div className="submservices">
                <div className="leftside">
                  <div className="leftcont">
                    <p>Clip: </p>
                    <select value={data.GetResponseSubscriber?.services?.clip?.prov} disabled={enable} onChange={e => { handleChange('services', 'clip', 'prov', e.target.value) }}>
                      <option>
                        **{data.GetResponseSubscriber?.services?.clip?.prov}**
                      </option>
                      <option
                        value="option1"
                      >
                        OPT1
                      </option>
                      <option
                      value="option2"
                      >OPT2</option>
                       <option
                      value="option3"
                      >OPT3</option>
                    </select>
                  </div>
                  <div className="leftcont">
                    <p>Smsmt: </p>
                    <input
                      value={data.GetResponseSubscriber?.services?.smsmt}
                      disabled={enable}
                      onChange={e => { handleChange('services', 'smsmt', null, e.target.value) }}
                    ></input>
                  </div>
                  <div className="leftcont">
                    <p>ODBOC</p>
                    <select   value={data.GetResponseSubscriber?.services?.odboc?.odboc} disabled={enable} onChange={e => handleChange("services", "odboc", "odboc", e.target.value)}>
                      <option>
                        **{data.GetResponseSubscriber?.services?.odboc?.odboc}**
                      </option>
                      <option value="option1">
                        OPT1
                      </option>
                      <option value="option2">
                        OPT2
                      </option>
                      <option value="option3">
                        OPT3
                      </option>
                    </select>
                  </div>
                  <div className="leftcont">
                    <p>ODBROAM</p>
                    <select value={data.GetResponseSubscriber?.services?.odbroam?.odbroam} disabled={enable} onChange={e => handleChange("services", "odbroam", "odbroam", e.target.value)}>
                      <option>
                        **{data.GetResponseSubscriber?.services?.odbroam?.odbroam}**
                      </option>
                      <option value="option1">
                        OPT1
                      </option>
                      <option value="option2">
                        OPT2
                      </option>
                      <option value="option3">
                        OPT3
                      </option>
                    </select>
                  </div>
                  <div className="leftcont">
                    <p>Category</p>
                    <select value={ data.GetResponseSubscriber?.services?.category?.category} disabled={enable} onChange={e => handleChange("services", "category", "category", e.target.value)}>
                      <option>
                       ** {
                          data.GetResponseSubscriber?.services?.category
                            ?.category
                        }**
                      </option>
                      <option value="option1">OPT1</option>
                      <option value="option2">OPT2</option>
                      <option value="option3">OPT3</option>
                    </select>
                  </div>
                  <div className="leftcont">
                    <p>EPS</p>
                    <div className="eps">
                      <Switch
                        checked={
                          JSON.parse(data.GetResponseSubscriber?.services?.eps?.prov)
                        }
                        disabled={enable}
                        onChange={handleSwitch_2}
                      />
                    </div>
                  </div>
                  <div className="leftcont">
                    <p>SMDP: </p>
                    <select value={data.GetResponseSubscriber?.services?.smdp} disabled={enable} onChange={e => handleChange("services", "smdp", null, e.target.value)}>
                      <option>
                        **{data.GetResponseSubscriber?.services?.smdp}**
                      </option>
                      <option value="option1">OPT1</option>
                      <option value="option2">OPT2</option>
                      <option value="option3">OPT3</option>
                      
                    </select>
                  </div>
                </div>
                <div className="rightoptgrs">
                  {data.GetResponseSubscriber?.services?.optgprss?.optgprs
                    .length !== 5?(
                    <button disabled={enable} onClick={handleAdd} className="subaddbutton">+</button>
                  ) : (
                    <button className="subaddbuttondisabled">+</button>
                  )}
                  
                  {data.GetResponseSubscriber?.services?.optgprss?.optgprs?.map(
                    (item, id) => {
                      return (
                        <div className="rcont" key={id}>
                          <p>PROV</p>
                          <Switch checked={JSON.parse(item.prov)} disabled={enable} onChange={() => handleSwitch(id)} />
                          <p>CNTXID</p>
                          <input disabled={enable} value={item.cntxId} onChange={e => handleChange_1(e, id, 'cntxId')}></input>
                          {!enable&&data.GetResponseSubscriber?.services?.optgprss?.optgprs
                    .length !== 1?<img
                            className="deletebutton"
                            src="/Images/delete.png"
                            alt="Delete"
                            onClick={() => handleDelete(id)}
                          />:null}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <p>RROPTION</p>
              <select value={data.GetResponseSubscriber?.rroption} disabled={enable} onChange={e => handleChange("rroption", null, null, e.target.value)}>
                <option>
                  **{data.GetResponseSubscriber?.rroption}**
                </option>
                <option value="option1">OPT1</option>
                <option value="option2">OPT2</option>
                <option value="option3">OPT3</option>
              </select>
              <p>SKEY: </p>
              {throwError===true?<p style={{color: "red", fontSize:"10px"}}>Enter Valid number</p>:
              <input
                disabled={enable}
                value={data.GetResponseSubscriber?.skey}
                onChange={e => handleChange('skey', null, null, e.target.value)}
              ></input>}
            </div>
          ))
        )}
        {isLoading?<Spin style={{position:"absolute", top:"50%", left:"50%"}}/>:null}
        {showPopup===true?<PopUp_1 
          message = "Data Updated successfully!"
          onClose = {setshowPopup}
        />:null}
      </div>
      <div className="allbtns">
        {editEnable === true ? (
          <>
            <button onClick={enableEdit}>Edit</button>
            <button disabled={enable} onClick={handleFormSubmit}>Update</button>
            <button onClick={enableCancel} disabled={enable}>
              Cancel
            </button>
            {enable === false ? <button onClick={handleDeleteForm}>Delete</button> : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SubmittedForm;
