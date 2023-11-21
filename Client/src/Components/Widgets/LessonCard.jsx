import { useState } from 'react'
import './Styles/LessonCard.css'
import { Button } from 'react-bootstrap'
import instance from '../../utils/instance'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

function LessonCard({id, title, description, links, iconPath, refetchLessons, token}) {
    const [isDetailed, setIsDetailed] = useState(false)
    const makeDetailed = () => setIsDetailed(!isDetailed)
    return (
        <div className="LessonCard">
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
                            instance.post('/api/lesson/deleteLesson', {id: id}).then((response) => {
                                toast.success(response.data.message);
                                refetchLessons();
                            }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
                        }}
                    >Sil</Button>
                ) : null
            }
            <div className="LessonCardHeader">
                {title}
            </div>
            <div className="LessonCardDesc">
                {description}
            </div>
            {
                isDetailed ? (
                    <div className="LessonCardBody">
                        <ul>
                            {
                                links.map((link, index) => (<li key={index}><a href={process.env.PUBLIC_URL + 'pdfs/' + link.link} target='_blank'>{link['link-adi']}</a></li>))
                            }
                        </ul>
                    </div>
                ) : null
            }
            <div className="LessonsCardMore us-none" 
                onClick={()=>{makeDetailed()}}
            >
                DAHA { isDetailed ? "AZ" : "FAZLA"} 
                <img src="/assets/icons/arrow.svg" style={{transform: isDetailed ? "rotate(180deg)" : "none "}} alt="" />
            </div>
            <img className="LessonsCardIcon" src={'/assets/icons/' + iconPath}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(LessonCard);