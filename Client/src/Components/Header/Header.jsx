import React from "react";
import { connect } from "react-redux";
import { ctrlNav } from "../../redux/reducers/navController";

import './Header.css'
import { removeToken } from "../../redux/reducers/authController";
import { Button } from "react-bootstrap";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHeaderMax: true,
            date: "İyi Günler 👋"
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                date: new Intl.DateTimeFormat("tr-TR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false,
                    timeZone: "Europe/Istanbul",
                }).format(new Date())
            })
        }, 1000)
    }

    render() {
        return (
            <div 
                className="Header"
            >
                <div 
                    className="NavigationController"
                    style={{
                        transform: `rotate(${this.props.isNavOpen ? "0deg" : "180deg"})`
                    }}
                    onClick={()=>{
                        this.props.navCounter()
                    }}
                >
                    <img src="/assets/icons/navbarControl.svg" alt="" />
                </div>
                <div 
                    className="HamburgerController"
                    onClick={()=>{
                        this.props.navCounter()
                        document.querySelector('.Navigation').classList.add('NavigationMobileAnimation')
                    }}
                >
                    <img src="/assets/icons/hamburger.svg" alt="" />
                </div>
                <div 
                    className="SearchController"
                >
                    <img src="/assets/icons/search.svg" alt="" />
                </div>
                <div
                    className="SearchWrapper"
                >
                    {this.state.date}
                    {/* <input className="border-0" style={{width: "inherit", color: "rgba(0,0,0,0.7)"}} type="text" placeholder="Ara..." /> */}
                </div>
                <div
                    className="bg-light d-flex flex-row align-items-center rounded-2 h-100"
                >
                    <div className="PersonImage"> 
                        
                    </div>
                    <span className="PersonName">Prof. Dr. Ali Oral</span>
                </div>
                {
                    this.props.token ? (
                        <Button variant={'danger'} size='sm' onClick={this.props.clearToken}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
                    ) : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isNavOpen: state.navCounter.isNavOpen,
    token: state.auth.token
})
const mapDispatchToProps = (dispatch) => ({
    navCounter: () => dispatch(ctrlNav()),
    clearToken: () => dispatch(removeToken())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);