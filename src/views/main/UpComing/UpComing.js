import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import CoreApi from "../../../coreApi/CoreApi";
import moment from "moment-timezone";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import history from "../../../Utilities/history"


const UpComing = (props) => {
    const [tournament, setTournament] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [loader, setLoader] = useState(true)
    // const history = useHistory();
    const navigate = (type) => {
        if (type === 'applicationtool') {
            history.push('/applicationtool');
        } else {
            // CoreApi.call('sso/validate?token=' + store.getState().token).then(response => {
            //   if (response && response.userName) {
            //     const url = config[env].VALIDATE_URL + "?type=" + type + "&accessToken=" + store.getState().token;
            window.open('https://wesportstech.com/', "_blank");
            //   } else {
            //     this.props.history.push('/login');
            //   }
            // }).catch(() => {
            //   this.props.history.push('/login');
            // });
        }
    }

    const upComingData = async () => {
        await CoreApi.CoreApiToken('organizor/tournaments', 'get')
            .then((response) => {
                setTournament(response)
                setLoader(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        upComingData()
    }, []);

    const ImageUrl = 'https://wesportstech.com/storage/';


    function RemoveHTMLTags(s) {
        const pattern = /<.*?>/g;
        s = s.replace(pattern, "");
        return s;
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const scrollViewhandle = (e) => {
        setSearchValue(e.target.value)
        CoreApi.CoreApiToken(`organizor/tournaments?search=${searchValue}`)
            .then((response) => {
                setTournament(response)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const view = (obj) => {
        console.log(obj)
        history.replace('/applicationTool?id=' + obj.id );
    }

    return (
        <>
            {loader === true ? 
            <div className="loader">
            <div class="spinner-border text-primary " role="status">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
             : <>
                <Header props={props} />
                <div className="container-fluid upcoming_page">
                    <div className="header_title">
                        {/* <h2 className="h2">Upcoming Tournaments</h2> */}
                        <div class="search-container">
                            <form>
                                <input type="text" value={searchValue} onChange={scrollViewhandle} placeholder="Search.." className="from-control" name="search" />
                                <button><img src={process.env.PUBLIC_URL + "images/weSport/search_icon.svg"} alt='search_icon' /></button>
                            </form>
                        </div>
                    </div>


                    {/* loop */}

                    <div className="crousel_container">
                        <>
                            {
                                tournament && tournament ?
                                    <>{tournament.map((card) => {
                                        return (
                                            <>
                                                <div className="col back">
                                                    <h2 className="card-label h2">{moment(card.lable, 'MM YYYY').format('MMMM  YYYY')}</h2>
                                                    <Carousel
                                                        responsive={responsive}
                                                        swipeable={false}
                                                        draggable={false}
                                                        infinite={true}
                                                        autoPlay={false}
                                                        keyBoardControl={true}
                                                        partialVisible={false}
                                                        dotListClass="custom-dot-list-style"
                                                        containerClass="carousel-container"
                                                        className="upcoming_detail"
                                                        itemClass="carousel-item-padding-40-px"
                                                        autoPlaySpeed={1000}
                                                    >
                                                        {card && card ? card.events.map((obj) => {
                                                            return (
                                                                <div className="col" key={obj}>
                                                                    <div className="card upcoming_card" key={obj.id}>
                                                                        <img className='uc_banner' alt="cricket" src={`${ImageUrl + obj.thumbnail}`} />
                                                                        <div className="card-body">
                                                                            <div className="game_name">{obj.event_category}</div>
                                                                            <h5 className="card-title text-1">{obj.title}</h5>
                                                                            <ul>
                                                                                <li className="date_time"><span className="icon_bg"><img alt="date_icon" src={process.env.PUBLIC_URL + "images/weSport/date_icon.png"} /></span>{moment(obj.start_date).utc().format("Do MMMM  YYYY")}|{moment(obj.start_time, ["HH:mm"]).format('hh:mm a')}-{moment(obj.end_time, ["HH:mm"]).format('hh:mm a')}</li>
                                                                                {obj.address !== null ? <li className="area_name"><span className="icon_bg"><img alt="location_icon" src={process.env.PUBLIC_URL + "images/weSport/location_icon.png"} /></span><span className="text">{obj.address}, <span className="city_name">{obj.city}</span></span></li> : <div className="default-height"></div>}
                                                                            </ul>
                                                                            <button onClick={() => { view(obj) }} class="btn btn-secondary">View</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                            :
                                                            ""
                                                        }</Carousel>
                                                </div>
                                            </>
                                        )
                                    })}</>
                                    : <></>
                            }
                        </>
                    </div>
                </div>
            </>
            }
        </>
    );
}



export default UpComing;

