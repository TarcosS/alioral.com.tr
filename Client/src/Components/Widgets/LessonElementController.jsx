import { useRef, useState } from 'react'
import './Styles/ElementController.css'
import { Button, Form } from 'react-bootstrap'
import { formatToSlug } from '../../utils/formatter';
import instance from '../../utils/instance';
import { toast } from 'react-toastify';


const ListForm = ({list, updateList, inputs}) => {
    const linkName = useRef();
    const addItemToList = (e) => {
        let allInputs = linkName.current.querySelectorAll('input');
        let data = {};
        allInputs.forEach(input => {
            data[input.name] = input.value;
            input.value = ''
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
                        <Form.Label>Link</Form.Label>
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
                            return <li key={'linkList-'+index} className='d-flex flex-row align-items-center w-100 justify-content-between mb-2'><a href={ process.env.PUBLIC_URL + '/pdfs/' + listItem[formatToSlug(inputs[1].name)]} className='text-black' style={{fontSize: '16px'}} target="_blank" rel="noopener noreferrer">{listItem[formatToSlug(inputs[0].name)]}</a><Button onClick={() => {removeItemToList(index)}} type='button' size='sm' variant='danger'>Sil</Button></li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

const ElementController = ({title, refetchFunction, inputs}) => {
    const [list, updateList] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data[formatToSlug('Ders Adı')] = e.target[formatToSlug('Ders Adı')].value;
        data[formatToSlug('Açıklama')] = e.target[formatToSlug('Açıklama')].value;
        data[formatToSlug('Icon Dosya Adı')] = e.target[formatToSlug('Icon Dosya Adı')].value;
        data.links = list;
        instance.post('/api/lesson/createLesson', data).then((response) => {
            toast.success(response.data.message)
            e.target[formatToSlug('Ders Adı')].value = '';
            e.target[formatToSlug('Açıklama')].value = '';
            e.target[formatToSlug('Icon Dosya Adı')].value = '';
            updateList([])
            refetchFunction();
        }).catch((err) => {
            if(err) {
                console.error(err)
            }
        })

    }
    return (
        <div className="ElementController">
            <h4>{title} ekle</h4>
            <Form className='row' onSubmit={handleSubmit}>
                <Form.Group className="col-md-3 mb-3">
                    <Form.Label>Ders Adı</Form.Label>
                    <Form.Control name={'ders-adi'} type='text' placeholder='Ders Adı giriniz' />
                </Form.Group>
                <Form.Group className="col-md-3 mb-3">
                    <Form.Label>Açıklama</Form.Label>
                    <Form.Control name={'aciklama'} type='text' placeholder='Açıklama giriniz' />
                </Form.Group>
                <Form.Group className="col-md-3 mb-3">
                    <Form.Label>Icon Dosya Adı</Form.Label>
                    <Form.Control name={'icon-dosya-adi'} type='text' placeholder='Svg dosya eklenmeli! example.svg' />
                </Form.Group>
                <ListForm list={list} updateList={updateList} inputs={
                    [
                        {
                            name: 'Link Adı',
                            placeholder: 'Link Adı giriniz.',
                            type: 'text'
                        },
                        {
                            name: 'Link',
                            placeholder: 'Link giriniz.',
                            type: 'text'
                        },
                    ]
                }/>
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