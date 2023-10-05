import React, { useState } from 'react';
import FromComp from '../../components/templateFrom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import CoreApi from "../../../coreApi/CoreApi";
import { clearFromValue } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
function Creative(props) {
    const formdata = useSelector(state => state.formdata)
    const titleORLogo = formdata['formData']
    const userDetail = formdata['inputValues']
    const [disabled, setDisabled] = useState(true)
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [selectedText, setSelectedText] = useState(null);
    const [choose_template_Area, setChoose_template_Area] = useState(false)
    const [parviewTemplate, setParviewTemplate] = useState(false)
    const [creativeId, setCreativeId] = useState(null)
   const dispatch=useDispatch;
    // tempate header show hide funtion
    const show_template_handle = () => {
        setChoose_template_Area(true)
    }
    const hide_template_handle = () => {
        setChoose_template_Area(false)
    }


    const previewShowHandle = () => {
        setParviewTemplate(true)
    }
    const previewHideHandle = () => {
        setParviewTemplate(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '0px',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getCreativedId(id) {
        setCreativeId(id);
    }

    useEffect(() => {
        if ((titleORLogo && titleORLogo.uploadLogoOne?.name) ||
            (titleORLogo && titleORLogo.uploadLogoTwo?.name) ||
            (titleORLogo && titleORLogo.uploadLogoThree?.name) ||
            (titleORLogo && titleORLogo.uploadLogoFour?.name) ||
            (titleORLogo && titleORLogo.uploadLogoFive?.name) ||
            (titleORLogo && titleORLogo.uploadLogoSix?.name)
            || (userDetail && userDetail[0])) {
            setDisabled(false)
            // console.log(disabled, "disabled")
        } else {
            setDisabled(true)
            // console.log(disabled, "disabled")
        }
    }, [titleORLogo, userDetail]);

    const removeLogo = (flag) => {
        if (flag === "logoOne") {
            dispatch(clearFromValue(titleORLogo.uploadLogoOne));
            console.log("logoOne")
        } else if (flag === "logoTwo") {
            console.log("logoOne")
        }
    }

    const generatePoster = () => {
        CoreApi.call('creative/generate?id=' + creativeId, 'GET')
        .then(async (response) => {
            openModal();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div className='container-fluid'>
                <header className='choose_Template_header'>
                    <h2 className='h2'>Create Creative</h2>
                    {/*  */}
                    <button button onClick={show_template_handle} className='btn btn-primary'>
                        {/* <img className='choose_icon' src={process.env.PUBLIC_URL + "images/weSport/choose_icon.svg"} /> */}
                        Choose Tempalte
                    </button>
                </header>

                {choose_template_Area &&
                    <section className='choose_template_Area'>
                        <div className='choose_template_Area_inner'>
                            <div className='template'><img alt='tempalte' src={process.env.PUBLIC_URL + "images/weSport/image 2.png"} /> </div>
                            <div className='template'><img alt='tempalte' src={process.env.PUBLIC_URL + "images/weSport/image 2.png"} /> </div>
                            <div className='template'><img alt='tempalte' src={process.env.PUBLIC_URL + "images/weSport/image 2.png"} /> </div>
                            <div className='template'><img alt='tempalte' src={process.env.PUBLIC_URL + "images/weSport/image 2.png"} /> </div>
                            <div className='template'><img alt='tempalte' src={process.env.PUBLIC_URL + "images/weSport/image 2.png"} /> </div>
                        </div>
                        <button className='hide_template_handle' onClick={hide_template_handle}></button>
                    </section>
                }
                <div className='row border-top'>
                    <div className='left_section col col-md-4 col-sm-12'>
                        <FromComp 
                            tournament = {props.tournament}
                            creative={getCreativedId}/>
                    </div>
                    <div className='col col-md-8 col-sm-12 right_section'>
                        {/* template view  */}
                        <div className={parviewTemplate ? "parviewTemplate" : ""}>
                            {parviewTemplate &&
                                <button onClick={previewHideHandle} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>}
                            <section className="template_view">
                                <img width='100%' src={process.env.PUBLIC_URL + "images/weSport/bg_banner.jpeg"} />
                                <div className='template_inner'>
                                    <header className='template_view_header'>
                                        {parviewTemplate ?
                                            <>
                                                {((titleORLogo && titleORLogo.logoOne) || (titleORLogo && titleORLogo.uploadLogoOne?.name)) &&
                                                    <div className='logo_view'>
                                                        <div className='sponsor_name show'>{titleORLogo.logoOne}</div>
                                                        {titleORLogo && titleORLogo.uploadLogoOne?.name
                                                            && <div className='logo updLoad'>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoOne)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>
                                                        }

                                                    </div>
                                                }
                                                {((titleORLogo && titleORLogo.logoTwo) || (titleORLogo && titleORLogo.uploadLogoTwo?.name)) &&
                                                    <div className='logo_view'>
                                                        <div className='sponsor_name show'>{titleORLogo.logoTwo}</div>
                                                        {titleORLogo && titleORLogo.uploadLogoTwo?.name &&
                                                            <div className='logo updLoad'>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoTwo)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>}

                                                    </div>
                                                }
                                                {((titleORLogo && titleORLogo.logoThree) || (titleORLogo && titleORLogo.uploadLogoThree?.name)) &&
                                                    <div className='logo_view'>
                                                        <div className='sponsor_name show'>{titleORLogo.logoThree}</div>
                                                        {titleORLogo && titleORLogo.uploadLogoThree?.name &&
                                                            <div className='logo updLoad'>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoThree)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>
                                                        }

                                                    </div>
                                                }
                                            </>
                                            :
                                            <>
                                                {/* logo one */}
                                                <div className='logo_view'>
                                                    {titleORLogo && titleORLogo.logoOne ? <div className='sponsor_name show'>{titleORLogo.logoOne}</div> : <div className='sponsor_name'>Title will display here</div>}
                                                    {titleORLogo && titleORLogo.uploadLogoOne?.name ?
                                                        (<div className='logo updLoad'>
                                                            <div className='overlay'>
                                                                <button onClick={() => removeLogo("logoOne")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <img src={URL.createObjectURL(titleORLogo.uploadLogoOne)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                        </div>)
                                                        :
                                                        <div className='logo'>
                                                            <span className='logo_img' >Logo 1</span>
                                                            <span className='logo_text'>Will Dispaly Here</span>
                                                        </div>
                                                    }
                                                </div>
                                                {/* logo two */}
                                                <div className='logo_view'>
                                                    {titleORLogo && titleORLogo.logoTwo ? <div className='sponsor_name show'>{titleORLogo.logoTwo}</div> : <div className='sponsor_name'>Title will display here</div>}
                                                    {titleORLogo && titleORLogo.uploadLogoTwo?.name ?
                                                        (<div className='logo updLoad' >
                                                            <div className='overlay'>
                                                                <button onClick={() => removeLogo("logoTwo")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <img src={URL.createObjectURL(titleORLogo.uploadLogoTwo)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                        </div>)
                                                        :
                                                        <div className='logo'>
                                                            <span className='logo_img' >Logo 2</span>
                                                            <span className='logo_text'>Will Dispaly Here</span>
                                                        </div>
                                                    }
                                                </div>
                                                {/* logo three */}
                                                <div className='logo_view'>
                                                    {titleORLogo && titleORLogo.logoThree ? <div className='sponsor_name show'>{titleORLogo.logoThree}</div> : <div className='sponsor_name'>Title will display here</div>}
                                                    {titleORLogo && titleORLogo.uploadLogoThree?.name ?
                                                        (<div className='logo updLoad'>
                                                            <div className='overlay'>
                                                                <button onClick={() => removeLogo("logoThree")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <img src={URL.createObjectURL(titleORLogo.uploadLogoThree)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                        </div>)
                                                        :
                                                        <div className='logo'>
                                                            <span className='logo_img' >Logo 2</span>
                                                            <span className='logo_text'>Will Dispaly Here</span>
                                                        </div>
                                                    }
                                                </div></>
                                        }

                                    </header>
                                    {/* player info section  */}
                                    <div className='inner_View'>
                                        <div className='player_img_name'>
                                            <img className='player_img' src={process.env.PUBLIC_URL + "images/weSport/player_img.png"} />
                                            <div className='player_name'>Player Name </div>
                                        </div>
                                        <div className='player_detail'>
                                            {parviewTemplate ?
                                                <>
                                                    {userDetail && userDetail[0] && <p className='first'>{userDetail[0]}</p>}
                                                    {userDetail && userDetail[1] && <p>{userDetail[1]}</p>}
                                                    {userDetail && userDetail[2] && <p>{userDetail[2]}</p>}
                                                    {userDetail && userDetail[3] && <p>{userDetail[3]}</p>}
                                                    {userDetail && userDetail[4] && <p>{userDetail[4]}</p>}
                                                    {userDetail && userDetail[5] && <p>{userDetail[5]}</p>}
                                                </> : <>

                                                    <ul>
                                                        {userDetail && userDetail[0] ?
                                                            <li>{userDetail[0]}</li>
                                                            :
                                                            <li>Your text 1 will appear here </li>
                                                        }
                                                        {userDetail && userDetail[1] ?
                                                            <li>{userDetail[1]}</li>
                                                            :
                                                            <li>Your text 2 will appear here </li>
                                                        }
                                                        {userDetail && userDetail[2] ?
                                                            <li>{userDetail[2]}</li>
                                                            :
                                                            <li>Your text 3 will appear here </li>
                                                        }
                                                        {userDetail && userDetail[3] ?
                                                            <li>{userDetail[3]}</li>
                                                            :
                                                            <li>Your text 4 will appear here </li>
                                                        }
                                                        {userDetail && userDetail[4] ?
                                                            <li>{userDetail[4]}</li>
                                                            :
                                                            <li>Your text 5 will appear here </li>
                                                        }
                                                        {userDetail && userDetail[5] ?
                                                            <li>{userDetail[5]}</li>
                                                            :
                                                            <li>Your text 6 will appear here </li>
                                                        }
                                                    </ul></>}
                                            {/* <ul>
                                            {inputValues.map((value, index) => (
                                                <li key={index}>{value}</li>
                                            ))}
                                            </ul> */}
                                        </div>
                                    </div>

                                    <footer className='template_view_footer'>
                                        <div className='weSport_logo logo_view'>
                                            <div className='logo border0'><img src={process.env.PUBLIC_URL + "images/weSport/wst_logo.png"} /></div>
                                            <div className='sponsor_name'>www.wesportstech.com</div>
                                        </div>
                                        <div className='footer_logo'>
                                            {parviewTemplate ?
                                                <>
                                                    {((titleORLogo && titleORLogo.logoFour) || (titleORLogo && titleORLogo.uploadLogoFour?.name)) &&
                                                        <div className='logo_view'>
                                                            {titleORLogo && titleORLogo.uploadLogoFour?.name &&
                                                                (<div className='logo updLoad'>
                                                                    <img src={URL.createObjectURL(titleORLogo.uploadLogoFour)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                                </div>)
                                                            }
                                                            <div className='sponsor_name show'>{titleORLogo.logoFour}</div>
                                                        </div>
                                                    }

                                                    {((titleORLogo && titleORLogo.logoFive) || (titleORLogo && titleORLogo.uploadLogoFive?.name)) &&
                                                        <div className='logo_view'>
                                                            {titleORLogo && titleORLogo.uploadLogoFive?.name &&
                                                                (<div className='logo updLoad'>
                                                                    <img src={URL.createObjectURL(titleORLogo.uploadLogoFive)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                                </div>)
                                                            }
                                                            <div className='sponsor_name show'>{titleORLogo.logoFive}</div>
                                                        </div>
                                                    }

                                                    {((titleORLogo && titleORLogo.logoSix) || (titleORLogo && titleORLogo.uploadLogoSix?.name)) &&
                                                        <div className='logo_view'>
                                                            {titleORLogo && titleORLogo.uploadLogoSix?.name &&
                                                                (<div className='logo updLoad'>
                                                                    <img src={URL.createObjectURL(titleORLogo.uploadLogoSix)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                                </div>)
                                                            }
                                                            <div className='sponsor_name show'>{titleORLogo.logoSix}</div>
                                                        </div>
                                                    }
                                                    {((titleORLogo && titleORLogo.logoSeven) || (titleORLogo && titleORLogo.uploadLogoSeven?.name)) &&
                                                        <div className='logo_view'>
                                                            {titleORLogo && titleORLogo.uploadLogoSeven?.name &&
                                                                (<div className='logo updLoad'>
                                                                    <img src={URL.createObjectURL(titleORLogo.uploadLogoSeven)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                                </div>)
                                                            }
                                                            <div className='sponsor_name show'>{titleORLogo.logoSeven}</div>
                                                        </div>
                                                    }
                                                    {((titleORLogo && titleORLogo.logoEight) || (titleORLogo && titleORLogo.uploadLogoEight?.name)) &&
                                                        <div className='logo_view'>
                                                            {titleORLogo && titleORLogo.uploadLogoEight?.name &&
                                                                (<div className='logo updLoad'>
                                                                    <img src={URL.createObjectURL(titleORLogo.uploadLogoEight)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                                </div>)
                                                            }
                                                            <div className='sponsor_name show'>{titleORLogo.logoEight}</div>
                                                        </div>
                                                    }
                                                    {((titleORLogo && titleORLogo.logoNine) || (titleORLogo && titleORLogo.uploadLogoNine?.name)) &&
                                                        <div className='logo_view'>
                                                            {titleORLogo && titleORLogo.uploadLogoNine?.name &&
                                                                (<div className='logo updLoad'>
                                                                    <img src={URL.createObjectURL(titleORLogo.uploadLogoNine)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                                </div>)
                                                            }
                                                            <div className='sponsor_name show'>{titleORLogo.logoNine}</div>
                                                        </div>
                                                    }

                                                </> :
                                                <>
                                                    <div className='logo_view'>
                                                        {titleORLogo && titleORLogo.uploadLogoFour?.name ?
                                                            (<div className='logo updLoad'>
                                                                <div className='overlay'>
                                                                    <button onClick={() => removeLogo("logoFour")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoFour)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>)
                                                            :
                                                            <div className='logo'>
                                                                <span className='logo_img' >Logo 2</span>
                                                                <span className='logo_text'>Dispaly Here</span>
                                                            </div>
                                                        }
                                                        {titleORLogo && titleORLogo.logoFour ? <div className='sponsor_name show'>{titleORLogo.logoFour}</div> : <div className='sponsor_name'>Title display here</div>}
                                                    </div>
                                                    <div className='logo_view'>
                                                        {titleORLogo && titleORLogo.uploadLogoFive?.name ?
                                                            (<div className='logo updLoad'>
                                                                <div className='overlay'>
                                                                    <button onClick={() => removeLogo("logoFive")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoFive)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>)
                                                            :
                                                            <div className='logo'>
                                                                <span className='logo_img' >Logo 2</span>
                                                                <span className='logo_text'>Dispaly Here</span>
                                                            </div>
                                                        }
                                                        {titleORLogo && titleORLogo.logoFive ? <div className='sponsor_name show'>{titleORLogo.logoFive}</div> : <div className='sponsor_name'>Title display here</div>}
                                                    </div>
                                                    <div className='logo_view'>
                                                        {titleORLogo && titleORLogo.uploadLogoSix?.name ?
                                                            (<div className='logo updLoad'>
                                                                <div className='overlay'>
                                                                    <button onClick={() => removeLogo("logoSix")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoSix)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>)
                                                            :
                                                            <div className='logo'>
                                                                <span className='logo_img' >Logo 2</span>
                                                                <span className='logo_text'>Dispaly Here</span>
                                                            </div>
                                                        }
                                                        {titleORLogo && titleORLogo.logoSix ? <div className='sponsor_name show'>{titleORLogo.logoSix}</div> : <div className='sponsor_name'>Title display here</div>}
                                                    </div>
                                                    <div className='logo_view'>
                                                        {titleORLogo && titleORLogo.uploadLogoSeven?.name ?
                                                            (<div className='logo updLoad'>
                                                                <div className='overlay'>
                                                                    <button onClick={() => removeLogo("logoSeven")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoSeven)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>)
                                                            :
                                                            <div className='logo'>
                                                                <span className='logo_img' >Logo 2</span>
                                                                <span className='logo_text'>Display Here</span>
                                                            </div>
                                                        }
                                                        {titleORLogo && titleORLogo.logoSeven ? <div className='sponsor_name show'>{titleORLogo.logoSeven}</div> : <div className='sponsor_name'>Title display here</div>}
                                                    </div>
                                                    <div className='logo_view'>
                                                        {titleORLogo && titleORLogo.uploadLogoEight?.name ?
                                                            (<div className='logo updLoad'>
                                                                <div className='overlay'>
                                                                    <button onClick={() => removeLogo("logoEight")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoEight)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>)
                                                            :
                                                            <div className='logo'>
                                                                <span className='logo_img' >Logo 2</span>
                                                                <span className='logo_text'>Dispaly Here</span>
                                                            </div>
                                                        }
                                                        {titleORLogo && titleORLogo.logoEight ? <div className='sponsor_name show'>{titleORLogo.logoEight}</div> : <div className='sponsor_name'>Title display here</div>}
                                                    </div>
                                                    <div className='logo_view'>
                                                        {titleORLogo && titleORLogo.uploadLogoNine?.name ?
                                                            (<div className='logo updLoad'>
                                                                <div className='overlay'>
                                                                    <button onClick={() => removeLogo("logoNine")} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <img src={URL.createObjectURL(titleORLogo.uploadLogoNine)} alt="Selected" style={{ maxWidth: '100px' }} />
                                                            </div>)
                                                            :
                                                            <div className='logo'>
                                                                <span className='logo_img' >Logo 2</span>
                                                                <span className='logo_text'>Dispaly Here</span>
                                                            </div>
                                                        }
                                                        {titleORLogo && titleORLogo.logoNine ? <div className='sponsor_name show'>{titleORLogo.logoNine}</div> : <div className='sponsor_name'>Title display here</div>}
                                                    </div>
                                                </>
                                            }




                                        </div>

                                    </footer>
                                </div>
                            </section>
                        </div>
                        {/* page button */}
                        <div className='footer_button right'>
                            <button onClick={previewShowHandle} disabled={disabled} className='btn btn-secondary mr-2'>Preview</button>
                            <button onClick={() => generatePoster()} type='submit' className='btn btn-primary'>
                                <img class="choose_icon_pencil" src='images/weSport/genratePencil.svg' alt='genratePencil.svg' />
                                Generate for All Players
                            </button>
                        </div>
                    </div>

                </div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                // contentLabel="Example Modal"
                >
                    {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                    <div className='model_header'>
                        <div>
                            <div className='modal-body-text'><p>Please Wait....</p></div>
                            <div><img className='choose_icon' src={process.env.PUBLIC_URL + "images/weSport/crossIcon.svg"} alt='crossIcon.svg' /></div>
                        </div>
                    </div>

                    <div className='model_body modal-body-text'>
                        <p>It will take some time,genrating creatives in Progress</p>
                    </div>
                    <div className='model_footer'>
                        <button onRequestClose={closeModal} className='modal-btn'>Cancel</button>
                        <button className='modal-btn'>OK</button>
                    </div>
                </Modal>

                {/** */}
                {/* <div>
                    <div className="float-left w-100 h-100 tools-development-screen">
                        <div className=" d-flex  justify-content-center app-left-side">
                            <div className="row">
                                <div className="tools-content">
                                    <span>Zingit Solutions laucnhed their Mobile Application and Chrome Extension to make the communication quick and easy.</span>
                                    <div className="application-details">
                                        <div className="application-left">
                                            <p>Zingit Mobile Application is available for IOS and you can download it from here Chrome Extension
                                                is available for Zingit Inbox and you can add it from here.</p>
                                            <form >
                                                <input type="text" name="title" placeholder="Design title here..." onChange={handleChange} />
                                                <input type="file" accept="image/*" onChange={imageSelect} />

                                                <div class="file-upload">
                                                    
                                                    <img src="https://i.stack.imgur.com/dy62M.png" />
                                                    <input type="file" name="somename" accept="image/*" onChange={imageSelect} />
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" d-flex app-right-side">
                            <div className="row">
                                <div className="tools-content">
                                    <div className="aplications-image-extension">
                                        <h2>{selectedText}</h2>
                                        {selectedImage && <img className='creative-logo' src={selectedImage} alt="ChromeExtension" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>


        </>
    );
}


// const mapStateToProps = (state /*, ownProps*/) => {
//     return {
//         formdata: state.formdata,
//     };
//   };

//   const mapDispatchToProps = {
//     updateFromValue
//   };

// export default connect(mapStateToProps, mapDispatchToProps)(Creative);

export default Creative


