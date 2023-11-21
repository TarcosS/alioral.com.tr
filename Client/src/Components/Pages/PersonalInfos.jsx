import React, { useEffect, useState } from "react";
import SectionDetail from "../Widgets/SectionDetail";
import ListWidget from "../Widgets/ListWidget";
import ElementController from "../Widgets/PersonalElementController";
import instance from "../../utils/instance";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const PersonalInfo = (props) =>  {
    const [sections, setSection] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        document.title = "Personal Info";
        fetchData()
    }, [])

    const fetchData = () => {
        instance.get("/api/person/getPersonInfo")
        .then(result => {
            setSection(result.data.sections);
            setDescription(result.data.description)

        })
        .catch(error => console.log('error', error));
    }
    const personInfos = [
        {
            title: "Doktora",
            isDateRange: true,
            years: [1992, 1997],
            desc: null,
            statu: "Fen Bilimlerin Enstitüsü/Makine Mühendisliği (DR)",
            place: "Balıkesir Üniversitesi",
            desc: ["Tez Adı: Dönel iş parçaları için bilgisayar destekli süreç planlama sisteminin geliştirilmesi (1997)", "Tez Danışmanı : Mustafa Cemal Çakır"]
        }, 
        {
            title: "Yüksek Lisans",
            isDateRange: true,
            years: [1988, 1991],
            desc: null,
            statu: "Fen Bilimlerin Enstitüsü/Makine Mühendisliği (YL) (TEZLİ)",
            place: "Uludağ Üniversitesi",
            desc: ["Tez Adı: Halatlı kaldırma düzeneklerinde poliamid esaslı malzemeden yapılmış makaraların kullanılabilirliğinin incelenmesi (1991)", "Tez Danışmanı : Mahmut Nedim Gerger"]
        },
        {
            title: "Lisans",
            isDateRange: true,
            years: [1984, 1988],
            desc: null,
            statu: "Balıkesir Mühendislik Fakültesi/Makine Mühendisliği",
            place: "Uludağ Üniversitesi",
            desc: []
        }
    ]
    const kurumlar = [
        "Tınaz Tarım Makineleri (1988)",
        "MEB. Özel Bigadiç Surucu Kursu Motor ve Trafik Öğretmenliği(1989)",
        "Uludağ Üni. Balikesir Mühendislik Fakültesi Makina Mühendisliği Bolumu Arş.Gör. (1989-1992)",
        "Balıkesir Üni. Mühendislik-Mimarlık Fakültesi Makina Mühendisliği Bölümü Arş. Gör. (1992-1997)",
        "Balıkesir Üni. Mühendislik-Mim. Fakültesi Makina Mühendisliği Bölümü Öğr. Üyesi (Yrd. Doç. Dr.) (1997-1998)",
        "Balıkesir Çok Programlı Astsubay Hazırlama Okulu Komutanlığı Makina Bölümü Bilgisayar Öğr. (CNC-AutoCAD) (1998-1999)",
        "Balıkesir Üni. Müh.-Mim. Fakültesi Makina Mühendisliği Bölümü (Yrd. Doç. Dr.) (1999-2011)",
        "Balıkesir Üni. Müh. Fakültesi Makina Mühendisliği Bölümü (Doç. Dr) (2011-2017)",
        "Balıkesir Üni. Müh. Fakültesi Makina Mühendisliği Bölümü (Prof. Dr) (2017- devam)",
        "İşbir Elektrik Ar-Ge Merkezi, Araştırmacı (2017-2019) (Halen Ar-Ge danışmanı olarak görev yapmaktadır.)",
        "Yemtar Makina San.Tic.AŞ, Ar-Ge Merkezi, Araştırmacı (2017-Devam)",
        "Gesbey Enerji Türbini Kule Üretimi AŞ. Araştırmacı (2021-Devam)",
        "Paksan Makina San. ve Tic. AŞ. Ger-Ge Danışmanı"
    ];
    const faals = [
        "BAÜ. Müh.Mim. Fakütesi Bilgisayar Laboratuarlarının Kurulması (2000-2001)",
        "CAD-CAM Günleri 2004 yürütme kurulu üyeliği (Başkan)",
        "TİMAK-CAD-CAM Günleri 2006 Düzenleme Kurulu Üyesi, Yürütme Kurulu Bşk.",
        "Mühendislik ve Kariyer Günleri 2008 Düzenleme Kurulu Üyesi",
        "Ar-Ge Günü 2010 Düzenleme Kurulu (Koordinatör)",
        "TİMAK-CAD-CAM Günleri 2010 Düzenleme Kurulu Başkanı",
        "CNC Tezgahlar Laboratuvarının Kurulması (2010)",
        "TİMAK-CAD-CAM Günleri 2012 Düzenleme Kurulu Başkanı",
        "UTİS Düzenleme Kurulu Üyesi 2011-...",
        "UMTİK Düzenleme Kurulu Üyesi 2016-..."
    ]
    const inputs =  [
        {
            sectionType: 'timeline',
            inputs: [
                {
                    name: 'Bölüm Adı',
                    placeholder: 'Oluşturulacak Bölüm Adı',
                    type: 'text'
                },
                {
                    name: 'Olay',
                    placeholder: 'Olayın Adını Giriniz.',
                    type: 'text'
                },
                {
                    name: 'Tarhi Aralığı',
                    placeholder: 'Olayın Olduğu Tarih Aralığı',
                    type: 'date-range'
                },
                {
                    name: 'Tarhi Aralığı',
                    placeholder: 'Olayın Olduğu Tarih Aralığı',
                    type: 'list',
                }
            ]
        }
    ]
    return (
        <>
            <div 
                className='w-100 bg-light py-3 px-4 rounded-2 d-flex align-items-center fs-6'
            >
                Ali Oral, 1967 yılında Ayancık (Sinop) ‘ta doğdu. Evli ve iki çocuk babasıdır.
            </div>
            {
                props.token ? <ElementController title={'Bilgi'} refetchFunction={fetchData} path={'/person/createSection'}/> : null
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
                                        instance.post('/api/person/deleteSection', {index: index}).then((response) => {
                                            toast.success(response.data.message);
                                            fetchData();
                                        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
                                    }}
                                >Sil</Button>
                            ) : null
                        }
                        {section.title[0] ? <h4 className="mb-4">{section.title}</h4> : null}
                    {
                        
                        section.sectionType === "timeline" ? section.list.map((data, index) => {
                            return (
                                <>
                                    
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
                                <ListWidget
                                    datas={section.list}
                                    type={'ordered'}
                                />
                            </>
                        ) : null
                    }
                    {
                        section.sectionType === "paragraph" ? (
                            <>
                                <span>{section.text}</span>
                            </>
                        ) : null
                    }

                    {
                        section.sectionType === "category-list" ? (
                            section.list.map((data, index) => {
                                return (
                                    <>
                                        <div key={'alt-kategori-' + index}>
                                            <h6>{data['alt-baslik']}</h6>
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
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);