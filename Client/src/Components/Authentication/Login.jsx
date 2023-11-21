import { Button, Form } from "react-bootstrap"
import instance from "../../utils/instance";
import { connect, useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/authController";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = (props) => {
    const dispatch = useDispatch();
    const redirect = useNavigate();
    redirect()
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = e.target;
        instance.post('/api/auth/login', {email: email.value, password: password.value}).then((response) => {
            if(response?.data){
                toast.success('Hoş Geldiniz!')
                localStorage.setItem('jwtToken', response?.data.token)
                dispatch(setToken());
                redirect('/');
            }
        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null);
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div
                className="rounded-2 p-4"
                style={{
                    width: '450px',
                    backgroundColor: '#e4e4e4'
                }}
            >  
                <h3 className="text-center">Giriş Yap</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>E-Posta</Form.Label>
                        <Form.Control name="email" type="text"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control name="password" type='password'/>
                    </Form.Group>
                    <Button type="submit" className="w-100">
                        Giriş Yap
                    </Button>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    setToken: () => dispatch(setToken())
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);