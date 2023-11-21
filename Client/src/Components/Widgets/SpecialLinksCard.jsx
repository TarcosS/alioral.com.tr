import { Button } from 'react-bootstrap';
import './Styles/SpecialLinksCard.css'
import './Styles/LessonCard.css'

import instance from '../../utils/instance';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

function SpecialLinksCard({title, links, id, refetchCards, token}) {
    return (
        <div className="SpecialLinksCard position-relative">
            {
                token ? (
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
                            instance.post('/api/special-links/deleteCard', {id: id}).then((response) => {
                                toast.success(response.data.message);
                                refetchCards();
                            }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
                        }}
                    >Sil</Button>
                ) : null
            }
            <div className="SpecialLinksCardHeader">
                {title}
            </div>
            <div className="SpecialLinksCardBody">
                {
                    links.map((link, index) => (<a key={index} href={link.link}>{link.link}</a>))
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(SpecialLinksCard);