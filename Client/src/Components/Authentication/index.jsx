import { Outlet } from "react-router-dom"

const AuthenticationLayout = () => {
    return (
        <div 
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '100dvh',
                width: '100dvw'
            }}
        >
            <Outlet />
        </div>
    )
}

export default AuthenticationLayout