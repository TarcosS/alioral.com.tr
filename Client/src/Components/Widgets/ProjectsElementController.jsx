import { useRef, useState } from 'react'
import './Styles/ElementController.css'
import { Button, Form } from 'react-bootstrap'
import { formatToSlug } from '../../utils/formatter';
import instance from '../../utils/instance';
import { toast } from 'react-toastify';

const ElementController = ({title, refetchFunction, path='/projects/createProject'}) => {
    const [list, updateList] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data[formatToSlug('Proje Adı')] = e.target[formatToSlug('Proje Adı')].value;
        data[formatToSlug('Fotograf Ekle')] = e.target[formatToSlug('Fotograf Ekle')].files;
        console.log(data)
        instance.postForm('/api' + path, data).then((response) => {
            toast.success(response.data.message);
            e.target[formatToSlug('Proje Adı')].value = '';
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
                <Form.Group className="col-md-4 mb-3">
                    <Form.Label>Proje Adı</Form.Label>
                    <Form.Control name={formatToSlug('Proje Adı')} type='text' placeholder='Proje Adı giriniz' />
                </Form.Group>
                <Form.Group controlId="formFile" className="col-md-4 mb-3">
                    <Form.Label>Fotograf Ekle</Form.Label>
                    <Form.Control name={formatToSlug('Fotograf Ekle')} type="file" />
                </Form.Group>
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