import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Styles/Projects.css"
import ElementController from "../Widgets/ProjectsElementController";
import instance from "../../utils/instance";
import { Button } from "react-bootstrap";
import {connect} from 'react-redux'
import { toast } from "react-toastify";
const Projects = (props) => {
    const [projects, setProjects] = useState([])
    const getProjects = () => {
        instance.get('/api/projects/getProjects').then((response) => {
            setProjects(response.data.data);
        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
    }
    useEffect(()=>{
        getProjects()
    },[])
    return(
        <>
            {
                props.token ? 
                    <ElementController title={'Proje'} refetchFunction={getProjects}/> : null
            }
            
            <div className='w-100 bg-light py-3 px-4 rounded-2 d-flex flex-column fs-6 gap-3'>
                <div className="row g-4">
                    {
                    projects[0] ? projects.map((project)=>(
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            
                            <div
                            className="rounded-2 ProjectCard position-relative" 
                            style={{
                                backgroundImage: "url('/assets/images/"+ project.path +"')",
                                backgroundSize: "cover",
                                aspectRatio: "1"
                            }}>
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
                                                instance.post('/api/projects/deleteProject', {id: project._id}).then((response) => {
                                                    toast.success(response.data.message);
                                                    getProjects();
                                                }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
                                            }}
                                        >Sil</Button>
                                    ) : null
                                }
                                <div className="ProjectDesc">
                                    {project.title}
                                </div>
                            </div>
                        </div>
                    )) : <h6>Hiç proje bulunamadı...</h6>
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Projects);