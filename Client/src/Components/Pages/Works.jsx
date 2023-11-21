import React, { useEffect, useState } from "react";
import "./Styles/Works.css"
import ElementController from "../Widgets/PersonalElementController";
import instance from "../../utils/instance";
import SectionDetail from "../Widgets/SectionDetail";
import ListWidget from "../Widgets/ListWidget";
import { connect } from 'react-redux'
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const Works = (props) => {
    const [sections, setSections] = useState([])
    const getWorks = () => {
        instance.get('/api/works/getWorks').then((response) => {
            setSections(response.data.data)
        }).catch(error => console.log('error', error));
    }

    useEffect(() => {
        getWorks();
    }, [])
    return (
        <>
            {
                props.token ?
                <ElementController 
                    title={'İş Geçmişi'}
                    refetchFunction={getWorks}
                    path={'/works/createSection'}
                /> : null
            }
            
            {
                sections.map((section, index) => (
                    <div 
                        className='w-100 bg-light py-3 px-4 rounded-2 d-flex flex-column fs-6 position-relative'
                        key={index}
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
                                        instance.post('/api/works/deleteSection', {index: index}).then((response) => {
                                            toast.success(response.data.message);
                                            getWorks();
                                        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
                                    }}
                                >Sil</Button>
                            ) : null
                        }
                        {
                            section.sectionType === "timeline" ? section.list.map((data, index) => {
                                return (
                                    <>
                                        {section.title[0] ? <h4 className="mb-4">{section.title}</h4> : null}
                                        <SectionDetail
                                            key={index}
                                            title={data['olay']}
                                            desc={data.list}
                                            years={data['tarih-araligi']}
                                            statu={data['konu']}
                                            place={data['yer']}
                                    />
                                    </>
                                )
                            }) : null
                        }

                        {
                            section.sectionType === "list" ? (
                                <>
                                    {section.title[0] ? <h4 className="mb-4">{section.title}</h4> : null}
                                    <ListWidget
                                        datas={section.list}
                                        type={'ordered'}
                                    />
                                </>
                            ) : null
                        }
                        {
                            section.sectionType === "parapgraph" ? (
                                <>
                                    {section.title[0] ? <h4 className="mb-4">{section.title}</h4> : null}
                                    <span>{section.text}</span>
                                </>
                            ) : null
                        }
                        {
                            section.sectionType === "category-list" ? (
                                section.list.map((data, index) => {
                                    return (
                                        <>
                                            {section.title[0] ? <h4 className="mb-4">{section.title}</h4> : null}
                                            <div key={'alt-kategori-' + index}>
                                                <h5>{data['alt-baslik']}</h5>
                                                <ul>
                                                    {
                                                        data.list.map((listItem, index) => {
                                                            return <li key={'item-' + index}>{listItem.satir}</li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </>
                                    )
                                })
                            ) : null
                        }

                    </div>
                ))
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Works);