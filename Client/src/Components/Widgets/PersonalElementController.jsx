import { useRef, useState } from 'react'
import './Styles/ElementController.css'
import { Button, Form } from 'react-bootstrap'
import { formatToSlug } from '../../utils/formatter';
import instance from '../../utils/instance';
import SectionDetail from './SectionDetail';
import { toast } from 'react-toastify';


const ListForm = ({list, updateList, inputs}) => {
    const linkName = useRef();
    const addItemToList = (e) => {
        let allInputs = linkName.current.querySelectorAll('input');
        let data = {};
        allInputs.forEach(input => {
            data[input.name] = input.value;
        })
        
        updateList(prev => {
            return [...prev, data]
        })
    }

    const removeItemToList = (index) => {
        updateList(prev => {
            let newList = [...prev];
            newList.splice(index, 1)
            return newList
        })
    }
    return (
        <>
            <div className='d-flex flex-column col-md-3'>
                <div ref={linkName}>
                    <Form.Group className="mb-3">
                        <Form.Label>Satır</Form.Label>
                        <div className='d-flex flex-row gap-2 align-items-center'>    
                            <div className='d-flex gap-2'>
                                {
                                    inputs?.map((input, index) => <Form.Control key={'input-'+index} name={formatToSlug(input.name)} ref={linkName} type={input.type} placeholder={input.placeholder} />)
                                }
                            </div>
                            <Button onClick={addItemToList} className='ratio-1x1' type='button'>+</Button>
                        </div>
                    </Form.Group>
                </div>
                <ul>
                    {
                        list.map((listItem, index) => {
                            return <li key={'linkList-'+index} className='d-flex flex-row align-items-center w-100 justify-content-between mb-2'>{listItem[formatToSlug(inputs[0].name)]}<Button onClick={() => {removeItemToList(index)}} type='button' size='sm' variant='danger'>Sil</Button></li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

const ElementController = ({title, refetchFunction, path}) => {
    const [list, updateList] = useState([]);
    const [sectionList, updateSectionList] = useState([])
    const removeItemToSectionList = (index) => {
        updateSectionList(prev => {
            let newList = [...prev];
            newList.splice(index, 1)
            return newList
        })
    }
    const [sectionType, setSectionType] = useState('timeline') // timeline | paragraph | list | category list
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data.title = e.target['bolum-adi'].value
        
        switch(sectionType) {
            case 'timeline': 
                data.list = sectionList;
                break;
            case 'paragraph': 
                data.text = e.target.paragraph.value;
                break;
            case 'list': 
                data.list = list;
                break;
            case 'category-list': 
                data.list = sectionList;
                break;
            default:
                return 'ERROR: Unknown section type ' + sectionType;
        }

        data.sectionType = sectionType;
        instance.post('/api' + path, data).then((response) => {
            toast.success(response.data.message);
            updateList([])
            refetchFunction();
        }).catch((err) => {
            if(err) {
                console.error(err)
            }
        })

    }
    const SectionRenderer = ({sectionType}) => {
        const formRef = useRef(0);
        var form = <></>
        switch(sectionType) {
            case 'timeline':
                form = (
                    <div className='row' ref={formRef}>
                        <Form.Group className="col-md-3 mb-3">
                            <Form.Label>Olay</Form.Label>
                            <Form.Control name={'olay'} type='text' placeholder='Olay ismi giriniz' />
                        </Form.Group>
                        <Form.Group className="col-md-3 mb-3">
                            <Form.Label>Tarhi Aralığı</Form.Label>
                            <div className='d-flex flex-row gap-2 align-items-center'>    
                                <div className='d-flex gap-2'>
                                    <Form.Control name={formatToSlug('Tarhi Aralığı') + '1'} type='number' placeholder='from' />
                                    <Form.Control name={formatToSlug('Tarhi Aralığı') + '2'} type='number' placeholder='to' />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="col-md-3 mb-3">
                            <Form.Label>Yer</Form.Label>
                            <Form.Control name={'yer'} type='text' placeholder='Yer giriniz' />
                        </Form.Group>
                        <Form.Group className="col-md-3 mb-3">
                            <Form.Label>Konu</Form.Label>
                            <Form.Control name={'konu'} type='text' placeholder='Konu giriniz' />
                        </Form.Group>
                        <ListForm 
                            list={list}
                            updateList={updateList}
                            inputs={[
                                {
                                    name: 'Satır',
                                    placeholder: 'Bir satır giriniz',
                                    type: 'text'
                                }
                            ]}
                        />
                        <div>
                            <Button 
                                className='float-end'
                                onClick={() => {
                                    var createdListItem = {};
                                    var inputs = formRef.current.querySelectorAll('input');
                                    Array.from(inputs).map((input) => {
                                        if(input.name === 'tarhi-araligi1' || input.name === 'tarhi-araligi2'){
                                            createdListItem['tarih-araligi'] = [Array.from(inputs).find((input) => input.name === 'tarhi-araligi1').value, Array.from(inputs).find((input) => input.name === 'tarhi-araligi2').value];
                                        }else if(!(input.name === 'satir')){
                                            createdListItem[input.name] = input.value;
                                        }
                                    });
                                    createdListItem['list'] = list;
                                    updateSectionList(prev => {
                                        return [...prev, createdListItem]
                                    })
                                }}
                            >Listeye Ekle</Button>
                        </div>
                        {
                            sectionList[0] ? (
                                <>
                                    <h4>Ön Gösterim</h4>
                                    <hr />
                                    {
                                        sectionList.map((sectionElement, index) => {
                                            return (
                                                <div className='d-flex flex-row justify-content-between'>
                                                    <SectionDetail
                                                        key={index}
                                                        title={sectionElement['olay']}
                                                        desc={sectionElement.list}
                                                        years={sectionElement['tarih-araligi']}
                                                        statu={sectionElement['konu']}
                                                        place={sectionElement['yer']}
                                                    />
                                                    <Button onClick={() => {removeItemToSectionList(index)}} type='button' size='sm' variant='danger'>Sil</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            ) : null
                        }
                    </div>
                );
                break;
            case 'paragraph':
                form =  <>
                            <Form.Group className="col-md-6 mb-3">
                                <Form.Label>Paragraf</Form.Label>
                                <Form.Control as={'textarea'} maxLength={150} name={'paragraph'} type='text' placeholder='Anlatın...' />
                            </Form.Group>
                        </>
                break;
            case 'list':
                form =  <>  
                            <ListForm 
                                list={list}
                                updateList={updateList}
                                inputs={[
                                    {
                                        name: 'Satır',
                                        placeholder: 'Bir satır giriniz',
                                        type: 'text'
                                    }
                                ]}
                            />
                        </>
                break;
            case 'category-list':
                form =  <div className='row' ref={formRef}>
                            <Form.Group className="col-md-3 mb-3">
                                <Form.Label>Alt Başlık</Form.Label>
                                <Form.Control name={formatToSlug('Alt Başlık')} type='text' placeholder='Alt Başlık giriniz' />
                            </Form.Group>
                            <ListForm 
                                list={list}
                                updateList={updateList}
                                inputs={[
                                    {
                                        name: 'Satır',
                                        placeholder: 'Bir satır giriniz',
                                        type: 'text'
                                    }
                                ]}
                            />
                            <div>
                                <Button 
                                    className='float-end'
                                    onClick={() => {
                                        var createdListItem = {};
                                        var inputs = formRef.current.querySelectorAll('input');
                                        Array.from(inputs).map((input) => {
                                            if(!(input.name === 'satir')){
                                                createdListItem[input.name] = input.value;
                                            }
                                        });
                                        createdListItem['list'] = list;
                                        updateSectionList(prev => {
                                            return [...prev, createdListItem]
                                        })
                                    }}
                                >Listeye Ekle</Button>
                            </div>
                            {
                                sectionList[0] ? (
                                    <>
                                        <h4>Ön Gösterim</h4>
                                        <hr />
                                        {
                                            sectionList.map((sectionElement, index) => {
                                                return (
                                                    <div key={'alt-kategori-' + index} className='d-flex flex-row justify-content-between'>
                                                        <div>
                                                            <h5>{sectionElement['alt-baslik']}</h5>
                                                            <ul>
                                                                {
                                                                    sectionElement.list.map((listItem, index) => {
                                                                        return <li key={'item-' + index}>{listItem.satir}</li>
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                        <Button onClick={() => {console.log(index); removeItemToSectionList(index)}} type='button' size='sm' variant='danger'>Sil</Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                ) : null
                            }
                        </div>
                break;
            default:
                break;
        }
        return form
    }
    return (
        <div className="ElementController">
            <h4>{title} ekle</h4>
            <Form className='row' onSubmit={handleSubmit}>
                <div className='row col-12'>
                    <Form.Group className="col-md-3 mb-3">
                        <Form.Label>Bölüm Adı</Form.Label>
                        <Form.Control name={'bolum-adi'} type='text' placeholder='Oluşturulacak Bölüm Adı giriniz' />
                    </Form.Group>
                    <Form.Group className='col-md-3 mb-3'>
                        <Form.Label>Bölüm tipi</Form.Label>
                        <Form.Select onChange={(e) => {setSectionType(e.currentTarget.value); updateList([]); updateSectionList([])}}>
                            <option value="timeline">Zaman Çizelgesi</option>
                            <option value="paragraph">Paragraf</option>
                            <option value="list">Liste</option>
                            <option value="category-list">Kategorize Liste</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <hr />
                <div className='row col-12'>
                   <SectionRenderer sectionType={sectionType}/>
                </div>
                <div>
                    <Button variant="primary" type="submit">
                        Ekle
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ElementController;