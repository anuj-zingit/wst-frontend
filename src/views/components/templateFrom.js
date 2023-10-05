import React, { useEffect, useState } from 'react';
import SelectBox from './selectBox';
import AccordionCom from './AccordionCom';
import { Form } from 'react-bootstrap';
import { updateFromValue } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as AWS from "aws-sdk";
import CoreApi from "../../coreApi/CoreApi";

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIA3E43MGUFXINACTVJ",
    secretAccessKey: "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"
});
var s3Client = new AWS.S3();

const FromComp = (props) => {
    const dispatch = useDispatch();
    const formdata = useSelector(state => state?.formdata)
    const titleORLogo = formdata['formData']
    const userDetail = formdata['inputValues']
    const [formData, setFormData] = useState({
        logoOne: '',
        logoTwo: '',
        logoThree: '',
        logoFour: '',
        logoFive: '',
        logoSix: '',
        logoSeven: '',
        logoEight: '',
        logoNine: ''
    });

    const [inputValues, setInputValues] = useState(['']);
    const [inputLimt, setInputLimt] = useState(true)


    const sponsorName = [
        { value: "Title Sponsor", label: "Title Sponsor" },
        { value: "Powered By", label: "Powered By" },
        { value: "Associated Sponsor", label: "Associated Sponsor" },
        { value: "Co - Sponsor", label: "Co - Sponsor" },
        { value: "Venue Partner", label: "Venue Partner" },
        { value: "Prize Partner", label: "Prize Partner" },
        { value: "Media Partner", label: "Media Partner" },
        { value: "F&B Partner", label: "F&B Partner" },
        // { value: "Under the Aegis", label: "Under the Aegis" },
        { value: "Organized By", label: "Organized By" },
    ]

    // handle Title Change 
    const handleTitleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle Logo Change
    const handleLogoChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        }
    };

    const getKeyByValue = (obj, value) => {
        return Object.keys(obj).filter(key => obj[key] === value);
    }

    const getImageName = (value) => {
        if(value === 'LogoOne')
            return 1;
        else if(value === 'LogoTwo')
            return 2;
        else if(value === 'LogoThree')
            return 3;
        else if(value === 'LogoFour')
            return 4;
        else if(value === 'LogoFive')
            return 5;
        else if(value === 'LogoSix')
            return 6;
        else if(value === 'LogoSeven')
            return 7; 
        else if(value === 'LogoEight')
            return 8;
        else if(value === 'LogoNine')
            return 9;
    }

    const save = async (e) => {
        // ++++ create folder (if not exists) with tournament_name
        //upload files and save urls in local
        //call API to save creatives ++++
        
        const folderName = props.tournament.user_id + '_' + props.tournament.category_id + '_' + props.tournament.id + '/'; //organizerid_sports_categoryid_tournamentid
        await CoreApi.uploadFolder('wesportstech-creatives', folderName)
        .then(async (response) => {
            const imagelocation = response.Location;
            const map1 = new Map();

            // loop sponsor names
            for(let name of sponsorName) {
                let key = getKeyByValue(formData, name.value);
                let ckey = key[0] && key[0].charAt(0).toUpperCase() + key[0].slice(1);
                let imageName = key[0] && (formData[key[0]].trim()) + '_'+ getImageName(ckey);

                imageName && await CoreApi.uploadFileToS3('wesportstech-creatives', folderName + imageName + ".jpg", formData['upload' + ckey])
                .then(async (response) => {
                    if(formData[key[0]]) {
                        map1.set(formData[key[0]].trim(), imagelocation + escape(imageName) + ".jpg");
                    }
                    props.creative(response.id);
                }).catch((error) => {
                    console.log(error);
                });
            }

            // call save creatives API
            let params = {
                "name":  props.tournament.title,
                "tournamentId": props.tournament.id,
                "tag": props.tournament.title,
                "titleSponsor": map1.get('Title Sponsor'),
                "poweredBy": map1.get('Powered By'),
                "associatedSponsor": map1.get('Associated Sponsor'),
                "status": "active",
                "coSponsor": map1.get('Co - Sponsor'),
                "venuePartner": map1.get('Venue Partner'),
                "prizePartner": map1.get('Prize Partner'),
                "mediaPartner": map1.get('Media Partner'),
                "fnbPartner": map1.get('F&B Partner'),
                "organizedBy": map1.get('Organized By'),
                "organizerId": props.tournament.user_id,
                "templateId": 1,
                "description": [
                    { "line_1": inputValues[0] },
                    { "line_2": inputValues[1] },
                    { "line_3": inputValues[2] },
                    { "line_4": inputValues[3] },
                    { "line_5": inputValues[4] },
                    { "line_6": inputValues[5] }
                ]
            }
            console.log(params);
            await CoreApi.call('creative/add', 'POST', params)
            .then(async (response) => {
                // TODO : SUCCESS MSG
                props.creative(response.id);
            }).catch((error) => {
                console.log(error);
            });
                    
        }).catch((error) => {
            console.log(error);
        });
    }

    // add input element 
    const addInputElement = (e) => {
        e.preventDefault();
        setInputValues([...inputValues, '']);
        if (inputValues.length >= 5) {
            setInputLimt(false)
        }
        else {
            setInputLimt(true)
        }
    };
    // delete input element
    const deleteInputElement = (index, e) => {
        e.preventDefault();
        if (inputValues.length > 1) {
            const newInputValues = [...inputValues];
            newInputValues.splice(index, 1);
            setInputValues(newInputValues);
        } 
        setInputLimt(true)
    };

    // Text area handle
    const handleInputChange = (value, index) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };


    // 

    // use effect 
    useEffect(() => {
        const alldata = { formData, inputValues }
        dispatch(updateFromValue(alldata));
        // console.log(inputValues.length, "length")
    }, [inputValues, formData])

    return (

        <>

            <Form className='form' id='style-1'>
                <h4 className='brand_head'>Top Band</h4>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoOne?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 1">
                    <SelectBox
                        name="logoOne"
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoOne}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoOne"><img width="15px" height="15px" src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoOne' onChange={handleLogoChange} class="form-control" id="uploadLogoOne" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoTwo?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 2">
                    <SelectBox
                        name='logoTwo'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoTwo}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoTwo"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoTwo' onChange={handleLogoChange} class="form-control" id="uploadLogoTwo" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoThree?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 3">
                    <SelectBox
                        name='logoThree'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoThree}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoThree"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoThree' onChange={handleLogoChange} class="form-control" id="uploadLogoThree" />
                    </div>
                </AccordionCom>
                {/* text area */}
                <div className='text_from_area'>
                    <AccordionCom className={(userDetail && userDetail[0]) ? "accordion-wrapper active" : "accordion-wrapper"} title="Enter Text">
                        <div id="input-container">
                            {inputValues.map((value, index) => (
                                <div key={index} className="input-element">
                                    <textarea
                                        type="text"
                                        className='form-control'
                                        value={value}
                                        placeholder='Enter Your Text 1'
                                        onChange={(e) => handleInputChange(e.target.value, index)}
                                        maxLength={30}
                                    />
                                    <div className='d-flex add_delete'>
                                        <span className='limt_Style'>*Maximum Character limit: 30 </span>
                                        {index > 0 && (
                                            <button onClick={(e) => deleteInputElement(index, e)} className='delete'>Delete</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='d-flex add_more'>
                            <span className='limt_Style'>*Maximum Generate fields: 6</span>
                            {inputLimt && <button onClick={addInputElement} className='add_more_icon'>+</button>}
                            {/* <button onClick={(e) => console.log(getAllInputValues(e))}>Get All Values</button> */}
                        </div>
                    </AccordionCom>
                </div>
                <h4 className='brand_head'>Bottom Band</h4>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoFour?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 4">
                    <SelectBox
                        name='logoFour'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoFour}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoFour"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoFour' onChange={handleLogoChange} class="form-control" id="uploadLogoFour" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoFive?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 5">
                    <SelectBox
                        name='logoFive'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoFive}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoFive"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoFive' onChange={handleLogoChange} class="form-control" id="uploadLogoFive" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoSix?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 6">
                    <SelectBox
                        name='logoSix'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoSix}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoSix"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoSix' onChange={handleLogoChange} class="form-control" id="uploadLogoSix" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoSeven?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 7">
                    <SelectBox
                        name='logoSeven'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoSeven}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoSeven"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoSeven' onChange={handleLogoChange} class="form-control" id="uploadLogoSeven" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoEight?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 8">
                    <SelectBox
                        name='logoEight'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoEight}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoEight"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoEight' onChange={handleLogoChange} class="form-control" id="uploadLogoEight" />
                    </div>
                </AccordionCom>
                <AccordionCom className={(titleORLogo && titleORLogo.uploadLogoNine?.name) ? "accordion-wrapper active" : "accordion-wrapper"} title="Logo 9">
                    <SelectBox
                        name='logoNine'
                        label="Add Field Label"
                        className="form-control"
                        options={sponsorName}
                        value={formdata.logoNine}
                        onChange={handleTitleChange}
                    />
                    <div class="input-group custom-file-button">
                        <label class="input-group-text" htmlFor="uploadLogoNine"><img src={process.env.PUBLIC_URL + "images/weSport/upload_icon.svg"} />Upload File</label>
                        <input type="file" name='uploadLogoNine' onChange={handleLogoChange} class="form-control" id="uploadLogoNine" />
                    </div>
                </AccordionCom>
            </Form>
            <div className='footer_button left'><button className='btn btn-secondary w-100' onClick={save}>Save</button></div>
        </>
    )
}



// const mapStateToProps = (state /*, ownProps*/) => {
//     return {
//         formdata: state.formdata,
//     };
//   };

//   const mapDispatchToProps = {
//     updateFromValue
//   };

// export default connect(mapStateToProps, mapDispatchToProps)(FromComp);

export default FromComp
