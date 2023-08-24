import React, { useState, useEffect, Suspense } from 'react'
import { DropDown1, DropDown2, DropDown3, DropDown4, DropDown5, DropDown6, DropDown7, DropDown8 } from './DropDowns/DropDown'
import { Switch, Spin, Modal } from 'antd'
import { postData } from './PostData'
import PopUp_1 from './Popups/PopUp_1'

const CreateMyForm = () => {
  const [data, setData] = useState({
    GetResponseSubscriber: {
      imsi: null,
      msisdn: null,
      hlrsn: null,
      cardType: "",
      nam: "",
      services: {
        clip: {
          prov: "" //Dropdown
        },
        smsmt: "",
        optgprss: {
          optgprs: [
            { prov: false, cntxId: null },
          ]
        },
        odboc: {
          odboc: ""
        },
        odbroam: {
          odbroam: ""
        },
        category: {
          category: ""
        },
        eps: {
          prov: false
        },
        smdp: ""
      },
      rroption: "",
      skey: ""
    }
  })

  const handleChange_1 = (event, index, key) => {
    const { value } = event.target;

    setData(prevData => ({
      ...prevData,
      GetResponseSubscriber: {
        ...prevData.GetResponseSubscriber,
        services: {
          ...prevData.GetResponseSubscriber.services,
          optgprss: {
            ...prevData.GetResponseSubscriber.services.optgprss,
            optgprs: prevData.GetResponseSubscriber.services.optgprss.optgprs.map((item, i) => {
              if (i === index) {
                const parsedValue = parseInt(value);
                const isValid = !isNaN(parsedValue) && parsedValue.toString().length === 1;
                return {
                  ...item,
                  [key]: isValid ? parsedValue : ''
                };
              }
              return item;
            })
          }
        }
      }
    }));
  };

  const [error, setError] = useState(false)
  const [isSubmitted, setisSubmitted] = useState(false)
  const [personalError, setPersonalerror] = useState(false)
  const [isLoading, setisLoading]= useState(false)
  const [pop, setPop]= useState(false)
  const handleSwitch = (index) => {
    setData(prevData => {
      const updatedOptgprs = prevData.GetResponseSubscriber.services.optgprss.optgprs.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            prov:!item.prov
          };
        }
        return item;
      });

      return {
        ...prevData,
        GetResponseSubscriber: {
          ...prevData.GetResponseSubscriber,
          services: {
            ...prevData.GetResponseSubscriber.services,
            optgprss: {
              ...prevData.GetResponseSubscriber.services.optgprss,
              optgprs: updatedOptgprs,
            },
          },
        }
      };
    });
  };

  const handleSwitch_2 = () => {
    setData(prevData => ({
      ...prevData,
      GetResponseSubscriber: {
        ...prevData.GetResponseSubscriber,
        services: {
          ...prevData.GetResponseSubscriber.services,
          eps: {
            prov: !prevData.GetResponseSubscriber.services.eps.prov
          }
        }
      }
    }));
  };

  const handleAdd = () => {
    setData(prevData => ({
      ...prevData,
      GetResponseSubscriber: {
        ...prevData.GetResponseSubscriber,
        services: {
          ...prevData.GetResponseSubscriber.services,
          optgprss: {
            ...prevData.GetResponseSubscriber.services.optgprss,
            optgprs: [
              ...prevData.GetResponseSubscriber.services.optgprss.optgprs,
              { prov: false, cntxId: null },
            ]
          }
        }
      }
    }));
  };

  const handleDelete = (index) => {
    setData(prevData => {
      const updatedOptgprs = [...prevData.GetResponseSubscriber.services.optgprss.optgprs];
      updatedOptgprs.splice(index, 1);

      return {
        ...prevData,
        GetResponseSubscriber: {
          ...prevData.GetResponseSubscriber,
          services: {
            ...prevData.GetResponseSubscriber.services,
            optgprss: {
              ...prevData.GetResponseSubscriber.services.optgprss,
              optgprs: updatedOptgprs
            }
          }
        }
      };
    });
  };

  const handleChange = (parentKey, childKey, grandChildKey, value) => {
    if (parentKey === 'hlrsn' || parentKey === 'imsi' || parentKey === 'msisdn' || parentKey === 'skey') {
      setData(prevData => ({
        ...prevData,
        GetResponseSubscriber: {
          ...prevData.GetResponseSubscriber,
          [parentKey]: value ? parseInt(value) : null
        }
      }));
    } else {
      setData(prevData => ({
        ...prevData,
        GetResponseSubscriber: {
          ...prevData.GetResponseSubscriber,
          [parentKey]: childKey
            ? {
              ...prevData.GetResponseSubscriber[parentKey],
              [childKey]: grandChildKey
                ? {
                  ...prevData.GetResponseSubscriber[parentKey][childKey],
                  [grandChildKey]: value
                }
                : value
            }
            : value
        }
      }));
    }
  };

  const isOptgprsValid = data.GetResponseSubscriber.services.optgprss.optgprs.some(
    (item) =>
      !Number.isInteger(item.cntxId) ||
      item.cntxId.toString().length !== 1
  );
  const convertObjectToString = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((item) => {
        if (typeof item === 'object' && item !== null) {
          return convertObjectToString(item);
        } else {
          return item.toString();
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (let key in obj) {
        const newKey = key.toString();
        const value = obj[key];
        newObj[newKey] =
          typeof value === 'object' && value !== null
            ? convertObjectToString(value)
            : value.toString();
      }
      return newObj;
    } else {
      return obj.toString();
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

  
    // Check if required fields are not empty
    if (
      data.GetResponseSubscriber.imsi === null ||
      data.GetResponseSubscriber.msisdn === null ||
      data.GetResponseSubscriber.hlrsn === null ||
      data.GetResponseSubscriber.cardType.trim() === "" ||
      data.GetResponseSubscriber.nam.trim() === ""
    ) {
      setError(true);
      alert("Enter all required fields");
    } else {
      const convertedFormData = convertObjectToString(data);
      const payloadString = JSON.stringify(convertedFormData);
      console.log(payloadString);  
    
      // Check for numeric validations
      if (
        isNaN(parseInt(data.GetResponseSubscriber.imsi)) ||
        data.GetResponseSubscriber.imsi.toString().length !== 14 ||
        isNaN(parseInt(data.GetResponseSubscriber.msisdn)) ||
        data.GetResponseSubscriber.msisdn.toString().length !== 10 ||
        isNaN(parseInt(data.GetResponseSubscriber.hlrsn)) ||
        data.GetResponseSubscriber.hlrsn.toString().length !== 1 ||
        isNaN(parseInt(data.GetResponseSubscriber.skey)) ||
        data.GetResponseSubscriber.skey.toString().length > 9
      ) {
        setPersonalerror(true);
      } else {
        // Check for optgprs validation
        if (isOptgprsValid) {
          setPersonalerror(true);
        } else {
          // All validations pass, submit the data
          setisLoading(true)
          postData(convertedFormData, setPop)
            .then(() => {
              console.log(convertedFormData);
              setisSubmitted(true);
              
            })
            .catch((error) => {
              console.error("Error submitting data:", error);
            }).finally(()=>{
              setisLoading(false);
              // setTimeout(()=>setisLoading(false),500);//wait a few seconds to hide
            });
        }
      }
    }
  };
  
  
  useEffect(() => {
    if (isSubmitted) {
      // Reset the form fields
      setData({
        GetResponseSubscriber: {
          imsi: null,
          msisdn: null,
          hlrsn: null,
          cardType: "",
          nam: "",
          services: {
            clip: {
              prov: ""
            },
            smsmt: "", //text
            optgprss: {
              optgprs: [
                { prov: false, cntxId: '' },
              ]
            },
            odboc: {
              odboc: ""
            },
            odbroam: {
              odbroam: ""
            },
            category: {
              category: ""
            },
            eps: {
              prov: false
            },
            smdp: ""
          },
          rroption: "",
          skey: null
        }
      });
    }
  }, [isSubmitted]);

  return (
    <>
    <h1 className='test'>Hello</h1>
      <div className='createMyForm'>
          <div className='firstrowform'>
            <div className='firstcont'>
              <p>IMSI</p>
              {personalError === false ?
                <input
                  className='input imsi'
                  name="imsi"
                  value={data.GetResponseSubscriber.imsi === null ? "" : data.GetResponseSubscriber.imsi}
                  
                  onChange={e => handleChange('imsi', null, null, parseInt(e.target.value))}
                />
                : <label>*Numeric and length 14</label>
              }

            </div>
            <div className='firstcont'>
              <p>MSISDN</p>
              {personalError === false ?
                <input
                  className='input msisdn'
                  name="msisdn"
                  value={data.GetResponseSubscriber.msisdn === null ? "" : data.GetResponseSubscriber.msisdn}
                  
                  onChange={e => handleChange('msisdn', null, null, parseInt(e.target.value))}
                />
                : <label>*Numeric and length 10</label>
              }
            </div>
            <div className='firstcont'>
              <p>HLRSN</p>
              {personalError === false ?
                <input
                  className='input hlrsn'
                  name="hlrsn"
                  value={data.GetResponseSubscriber.hlrsn === null ? "" : data.GetResponseSubscriber.hlrsn}
                  
                  onChange={e => handleChange('hlrsn', null, null, parseInt(e.target.value))}
                />
                : <label>*Numeric and length 1</label>
              }
            </div>
            <div className='firstcont'>
              <p>Cardtype</p>
              <DropDown1
                value1={data.GetResponseSubscriber.cardType}
                onChange1={e => { handleChange('cardType', null, null, e.target.value) }}
              />
            </div>
            <div className='firstcont'>
              <p>Nam</p>
              <DropDown2
                value2={data.GetResponseSubscriber.nam}
                onChange2={e => { handleChange('nam', null, null, e.target.value) }}
              />
            </div>
          </div>

          <h1  className='serviceh1'>Services</h1>
          <div className='services'>
            <div className='leftservices'>
                <input
                  value={data.GetResponseSubscriber.services.smsmt}
                  placeholder='SMSMT'
                  onChange={e => { handleChange('services', 'smsmt', null, e.target.value) }}
                />
                <div className='leftcontent'>
                  <p>CLIP</p>
                  <DropDown3
                    value3={data.GetResponseSubscriber.services.clip.prov}
                    onChange3={e => { handleChange('services', 'clip', 'prov', e.target.value) }}
                  />
                </div>
                <div className='leftcontent'>
                  <p>ODBOC</p>
                  <DropDown4
                    value4={data.GetResponseSubscriber.services.odboc.odboc}
                    onChange4={e => handleChange("services", "odboc", "odboc", e.target.value)}
                  />

                </div>
                <div className='leftcontent'>
                  <p>ODBROAM</p>
                  <DropDown5
                    value5={data.GetResponseSubscriber.services.odbroam.odbroam}
                    onChange5={e => handleChange("services", "odbroam", "odbroam", e.target.value)}
                  />
                </div>
                <div className='leftcontent'>
                  <p>Category</p>
                  <DropDown6
                    value6={data.GetResponseSubscriber.services.category.category}
                    onChange6={e => handleChange("services", "category", "category", e.target.value)}
                  />

                </div>
                <div className='leftcontent'>
                  <p>EPS</p>
                  <div className="switch-container">
                    <Switch
                      checked={data.GetResponseSubscriber.services.eps.prov}
                      onChange={handleSwitch_2}
                      style={{
                        backgroundColor: data.GetResponseSubscriber.services.eps.prov ? 'green' : 'lightgrey',
                      }}
                    />
                  </div>
                </div>
      
                <div className='leftcontent'>
                  <p>SMDP</p>
                  <DropDown8
                    value8={data.GetResponseSubscriber.services.smdp}
                    onChange8={e => handleChange("services", "smdp", null, e.target.value)}
                  />
                </div>
            
          </div>
            <div className='optgprs'>
              {data.GetResponseSubscriber.services.optgprss.optgprs.length !== 5?
                <button className="addbutton" onClick={handleAdd}>+</button>
                : <button className='addbuttondisabled'>+</button>
              }

              {data.GetResponseSubscriber.services.optgprss.optgprs.map((item, index) => (
                <div className="arrinpfield" key={index}>
                  <p>PROV</p>
                  <Switch
                    // className='epsswitch'
                    checked={item.prov}
                    onChange={() => handleSwitch(index)}
                    style={{backgroundColor:item.prov?"green":"lightgrey", marginTop:"5px", marginRight:"10px"}}
                  />

                  <p>CNTXLD</p>
                  {personalError === false ?
                    <input
                      className='arrinp'
                      type="text"
                      value={item.cntxId === null ? "" : item.cntxId}
                      onChange={e => handleChange_1(e, index, 'cntxId')}
                    />
                    : <label>*Numeric and 1 digit only</label>
                  }
                  {data.GetResponseSubscriber?.services?.optgprss?.optgprs.length!==1?
                    <img
                    className="deletebutton"
                    src='/Images/delete.png'
                    alt="Delete"
                    onClick={() => handleDelete(index)}
                  />:null
                  }
                  
                </div>
              ))}
            </div>
          </div>
          
          <div className='lastPart'>
            <>
              <p>RROPTION</p>
              <DropDown7
                value7={data.GetResponseSubscriber.rroption}
                onChange7={e => handleChange("rroption", null, null, e.target.value)}
              />
            </>

            {personalError === false ?
              <input
                className='input skey'
                name="skey"
                value={data.GetResponseSubscriber.skey === null ? "" : data.GetResponseSubscriber.skey}
                placeholder='SKEY'
                onChange={e => handleChange('skey', null, null, parseInt(e.target.value))}
              />
              : <label>*Numeric and max length 9</label>
            }

          </div>
          {/* {isSubmitted === true ? <p className='submitted'>Your data has been submitted</p> : <p className='notsubmitted'>Your data has not been submitted</p>} */}
        </div>
      
        
        {isLoading?<Spin style={{position:"absolute", top:"50%", left:"50%", height: "40px", width: "40px"}}/>:null}
        {pop===true?<PopUp_1 
          message="Data Created"
          onClose={setPop}
        />:null}
      <div className='firstbtns'><button className="submitbtn" onClick={handleSubmit}>Submit</button></div>
      {/* <button className='updatebtn' onClick={handleUpdate}>Update</button> */}
    </>
  )
}

export default CreateMyForm
