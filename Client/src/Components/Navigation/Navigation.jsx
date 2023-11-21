import React, { useState } from "react";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { ctrlNav } from "../../redux/reducers/navController";
import { connect } from "react-redux";
// CSS
import "./Navigation.css"
const navConf = [
    {
        title: "Ana Sayfa",
        link: "/",
        icon: "main-page"
    },
    {
        title: "Kişisel Bilgiler",
        link: "/personal-infos",
        icon: "personal-info"
    },
    {
        title: "Çalışmalar",
        link: "/works",
        icon: "works"
    },
    {
        title: "Projeler",
        link: "/projects",
        icon: "projects"
    },
    {
        title: "Dersler",
        link: "/lessons",
        icon: "lessons"
    },
    {
        title: "Danışmanlıklar",
        link: "/consultancies",
        icon: "consultancies"
    },
    {
        title: "Önemli Linkler",
        link: "/special-links",
        icon: "special-links"
    }
]

const Navigation = ({isNavOpen}) => {
    const {pathname} = useLocation();
    return (
        <div
            style={
                isNavOpen ? {
                    width: "20%",
                    maxWidth: "230px",
                    minWidth: "200px"
                } : {
                    width: "5%",
                    maxWidth: "230px",
                    minWidth: "72px"
                }
            }
            className="Navigation nav"
        >
            <div className='position-fixed'>
                <div>
                    <img src="/assets/images/ataturk.png" style={
                        {
                            padding: isNavOpen ? "32px" : "2px",
                            transition: "all 200ms",
                            width: isNavOpen ? "auto" : "56px",
                            marginBottom: isNavOpen ? "" : "1rem",
                            marginTop: isNavOpen ? "" : ".9rem"
                        }
                    } alt="" srcSet="" />
                </div>
                {
                    navConf.map((item, index) => {
                        return (
                            <div 
                                key={index} 
                                className={`w-100 nav-item ${isNavOpen ? "mb-2" : "mb-1"} d-flex justify-content-center ${pathname === item.link && "active"}`}
                                onClick={()=> {
                                    document.querySelector('.Navigation').classList.remove('NavigationMobileAnimation')
                                }}
                            >
                                <Link 
                                    to={item.link}
                                    className={"nav-link text-light d-flex align-items-center"} 
                                    style={{
                                        width: isNavOpen ? "180px" : "auto",
                                        aspectRatio: isNavOpen ? "" : "1"
                                    }}
                                >
                                    <img src={"/assets/icons/" + item.icon + ".svg"} className={isNavOpen ? "me-3" : ""} alt="" />
                                    {isNavOpen ? <span>{item.title}</span> : null}
                                </Link>
                            </div >
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isNavOpen: state.navCounter.isNavOpen,
})
const mapDispatchToProps = (dispatch) => ({
    navCounter: () => dispatch(ctrlNav())
})
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
