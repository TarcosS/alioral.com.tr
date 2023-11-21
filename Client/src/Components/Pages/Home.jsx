import React, { useEffect, useState } from "react";
import ElementController from "../Widgets/AnnouncementElementController";
import instance from "../../utils/instance";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

const Home = (props) => {
    const [announces, setAnnounces] = useState([]);

    useEffect(() => {
        document.title = "Prof. Dr. Ali Oral";
        getAnounces();
    }, []);
    
    const getAnounces = () => {
        instance.get('/api/announcement/getAnnouns').then((response) => {
            setAnnounces(response.data.data)
        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
    }
    return (
        <div className="row gx-0">
            <div 
                className='d-flex flex-column gap-3 col-md-8 col-lg-9'
            >
                <div
                    className="bg-light rounded-2 d-flex justify-content-center align-items-center flex-column w-100" 
                    style={{
                        height: "140px",
                        opacity: "1",
                        backgroundImage: "url('/assets/images/HomePageImage.png')",
                        backgroundRepeat: "none",
                        backgroundSize: 'cover',
                    }}
                >
                    <div
                        className="d-flex flex-column justify-content-center align-items-center rounded-1"
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#ececece3'
                        }}
                    >
                        <span className="fs-1 text-dark">Prof. Dr. Ali Oral</span>
                        <span className="fs-2 text-dark">Hoşgeldiniz!</span>
                    </div>
                </div>
                {
                    props.token ? <ElementController title={'Duyuru'} refetchFunction={getAnounces} /> : null
                }
            </div>
            <div className="ps-md-3 pt-3 pt-md-0 col-md-4 col-lg-3">
                <div className='bg-light p-3 rounded-2 d-flex flex-column gap-3' style={{minHeight: '40dvh', maxHeight: '80dvh', overflow: 'auto'}}>
                    <div>
                        <h4>Duyurular</h4>
                        <hr />
                    </div>
                    {
                        announces.map((announce) => {
                            return (
                                <div 
                                    className="d-flex flex-column gap-1 p-2 rounded-2 position-relative"
                                    style={{
                                        border: '1px solid #717171'
                                    }}
                                >  
                                    {
                                        props.token ? (
                                            <Button
                                                className='deleteButton' 
                                                size='sm' 
                                                variant='danger' 
                                                style={{
                                                    position: 'absolute',
                                                    right: '0',
                                                    top: 0
                                                }}
                                                onClick={() => {
                                                    instance.post('/api/announcement/deleteAnnoun', {id: announce._id}).then((response) => {
                                                        toast.success(response.data.message);
                                                        getAnounces();
                                                    }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
                                                }}
                                            >Sil</Button>
                                        ) : null
                                    }
                                    <h6>{announce.konu}</h6>
                                    <span style={{
                                        fontSize: '14px'
                                    }}>
                                        {announce['duyuru-metni']}
                                    </span>
                                    <span 
                                        className="text-end"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: 'bold'
                                        }}
                                    >20.30.2023</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);