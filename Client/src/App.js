import './App.css';
import Navigation from './Components/Navigation/Navigation';
import { useEffect, useState } from 'react';
// Include Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import { setToken } from './redux/reducers/authController';
import { connect } from 'react-redux';

function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      props.setToken();
    }, 2000)
  },[])
  return (
    <>
      {
      isLoading ? (
        <div className='LoadingBG'>
          <img className="LoadingCardIcon" src={'/assets/icons/gear.svg'}/>
        </div>
      ) : (
            <div 
              className='d-flex flex-row'
              style={{
                background: "linear-gradient(rgb(229 229 229), rgb(208 208 208))"
              }}
            >
              <Navigation />
              <div
                className='d-flex flex-column w-100 p-md-3 p-2 gap-3'
                style={{minHeight: '100vh'}}
              >
                <Header />
                <Outlet />
              </div>
            </div>
          )
        }
    </>
  );
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(setToken())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
