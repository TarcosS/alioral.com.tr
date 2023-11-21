import { useRef, useState } from 'react'
import './Styles/ElementController.css'
import { Button, Form } from 'react-bootstrap'
import { formatToSlug } from '../../utils/formatter';
import instance from '../../utils/instance';
import { toast } from 'react-toastify';

const ElementController = ({title, refetchFunction}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data[formatToSlug('Konu')] = e.target[formatToSlug('Konu')].value;
        data[formatToSlug('Duyuru Metni')] = e.target[formatToSlug('Duyuru Metni')].value;
        instance.post('/api/announcement/createAnnoun', data).then((response) => {
            toast.success(response.data.message)
            e.target[formatToSlug('Konu')].value = '';
            e.target[formatToSlug('Duyuru Metni')].value = '';
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
                    <Form.Label>Konu</Form.Label>
                    <Form.Control name={'konu'} type='text' placeholder='Konu giriniz' />
                </Form.Group>
                <Form.Group className="col-md-12 mb-3">
                    <Form.Label>Duyuru Metni</Form.Label>
                    <Form.Control as={'textarea'} maxLength={150} style={{
                        resize: 'none',
                        height: '80px'
                    }} type='text' name={formatToSlug('Duyuru Metni')} placeholder='Duyuru Metni giriniz' />
                </Form.Group>    
                <div>
                    <Button variant="primary" type="submit">
                        Paylaş
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ElementController;