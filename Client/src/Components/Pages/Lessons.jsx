import './Styles/Lessons.css'
import LessonCard from "../Widgets/LessonCard"
import ElementController from '../Widgets/LessonElementController'
import { useEffect, useState } from 'react'
import instance from '../../utils/instance'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

function Lessons(props) {
    const [lessons, setLessons] = useState([])
    const lessonInfos = [
        {
            title: "Makine Elemanları I",
            desc: "Makina Elemanları I Ders sunumları konular ilerledikçe burada yayınlanacaktır.",
            links: [
                {
                    linkTitle: "Makina Elemanlarında Mukavemet Hesapları",
                    link: process.env.PUBLIC_URL + '/pdfs/makel1/0012022.pdf'
                },
                {
                    linkTitle: "Yapıştırma-Lehim-Kaynak Bağları",
                    link: process.env.PUBLIC_URL + '/pdfs/makel1/yap_leh_kaynak.pdf'
                },
                {
                    linkTitle: "Cıvatalar",
                    link: process.env.PUBLIC_URL + '/pdfs/makel1/civatalar.pdf'
                },
                {
                    linkTitle: "Yaylar",
                    link: process.env.PUBLIC_URL + '/pdfs/makel1/yaylar.pdf'
                }
            ],
            iconPath: "vida.svg"
        },
        {
            title: "Makine Elemanları II",
            desc: "Makina Elemanları II Ders sunumları konular ilerledikçe burada yayınlanacaktır.",
            links: [
                {
                    linkTitle: "Akslar ve Miller",
                    link: process.env.PUBLIC_URL + '/pdfs/makel2/AKSLARMILLER2023.pdf'
                },
                {
                    linkTitle: "Kavramalar",
                    link: process.env.PUBLIC_URL + '/pdfs/makel2/KAVRAMALAR2023.pdf'
                },
                {
                    linkTitle: "Kaymalı Yataklar",
                    link: process.env.PUBLIC_URL + '/pdfs/makel2/KAYMALIYATAKLAR2022.pdf'
                },
                {
                    linkTitle: "Mil Gobek Baglantilari",
                    link: process.env.PUBLIC_URL + '/pdfs/makel2/Mil.pdf'
                }
            ],
            iconPath: "gear.svg"
        },
        {
            title: "Modern Talaşlı İmalat",
            desc: "",
            links: [
                {
                    linkTitle: 'CNC Tezgahlar',
                    link: process.env.PUBLIC_URL + '/pdfs/mti/cnc.pdf'
                }
            ],
            iconPath: "talas.svg"
        },
        {
            title: "Transport Tekniği",
            desc: "Transport Tekniği Slaytlar(Y.Doç.Dr. Nedim GERGER, Doç.Dr. Ali ORAL)",
            links: [
                {
                    linkTitle: 'Transport Tekniği - 1',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t1.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 2',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t2.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 3',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t3.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 4',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t4.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 5',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t5.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 6',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t6.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 7',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t7.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 8',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t8.pdf'
                },
                {
                    linkTitle: 'Transport Tekniği - 9',
                    link: process.env.PUBLIC_URL + '/pdfs/transport/t9.pdf'
                },
            ],
            iconPath: "calculator.svg"
        },
        {
            title: "Bilgisayar  Destekli Üretim Ergoomi",
            desc: "(Aktif Değil)",
            links: [
                
            ],
            iconPath: "upload_computer.svg"
        },
        
    ]
    const refetchLessons = () => {
        instance.get('/api/lesson/getLessons').then((response) => {
            setLessons(response.data.data);
        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
    }
    useEffect(() => {
        refetchLessons();
    }, [])

    const inputs = [
        [
            {
                name: 'Ders Adı',
                placeholder: 'Ders Adı giriniz',
                type: 'text'
            },
            {
                name: 'Açıklama',
                placeholder: 'Açıklama giriniz',
                type: 'text'
            },
            {
                name: 'Icon Dosya Adı',
                placeholder: 'Svg dosya eklenmeli! example.svg',
                type: 'text'
            },
            {
                name: 'Link',
                type: 'list',
                inputs: [
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
            },
        ]
    ]
    return (
        <div className='d-flex flex-column gap-3'>
            { props.token ? <ElementController title={'Ders'} refetchFunction={refetchLessons} inputs={inputs} /> : null}
            <div className="Lessons">
                <div className='row w-100 g-0'>
                    {lessons.map(({_id, title, description, links, iconPath}, index) => (
                        <div className='column col-sm-6 col-lg-4  p-1 p-md-2 p-lg-3' key={index}>
                            <LessonCard 
                                id={_id}
                                title={title}
                                description={description}
                                links={links}
                                iconPath={iconPath}
                                refetchLessons={refetchLessons}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const mapDispatchToProps = (dispatch) => ({
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Lessons);