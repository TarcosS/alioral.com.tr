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
                            return <li key={'linkList-'+index} className='d-flex flex-row align-items-center w-100 justify-content-between mb-2 gap-3'>
                                <a href={listItem[formatToSlug(inputs[0].name)]} className='text-black fs-6' target="_blank" rel="noopener noreferrer">{listItem[formatToSlug(inputs[0].name)]}</a>
                                <Button onClick={() => {removeItemToList(index)}} type='button' size='sm' variant='danger'>Sil</Button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

const ElementController = ({title, refetchFunction, path='/special-links/createCard'}) => {
    const [list, updateList] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data['kart-basligi'] = e.target['kart-basligi'].value;
        data.links = list;
        instance.post('/api' + path, data).then((response) => {
            toast.success(response.data.message);
            e.target['kart-basligi'].value = '';
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
                    <Form.Label>Kart Başlığı</Form.Label>
                    <Form.Control name={'kart-basligi'} type='text' placeholder='Kart Başlığı giriniz' />
                </Form.Group>
                <ListForm list={list} updateList={updateList} inputs={
                    [
                        {
                            name: 'Link',
                            placeholder: 'Link giriniz.',
                            type: 'text'
                        }
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