import SectionDetail from '../Widgets/SectionDetail'
import './Styles/Consultancies.css'

export default function Consultancies() {
    const consultancies = [
        {
            title: "Kısmi zamanlı araştırmacı /DANIŞMAN",
            isDateRange: true,
            deneme: 'danışmanlıklar',
            years: [2017, 2019],
            desc: null,
            desc: ["İşbir Elektrik AŞ. Ar-Ge Merkezini kuruluşunu sağlayan ekibin liderliğini yapmış olup sonrasında, Ar-Ge Merkezi Kanunu uyarınca kısmi zamanlı araştırmacı olarak görev yapmıştır. Halen Danışman olarak hizmet verilmektedir."]
        },
        {
            title: "DANIŞMAN",
            isDateRange: true,
            deneme: 'evet',
            years: [2019, 2020],
            desc: null,
            desc: ["Yapel Tarım Makinaları Ltd.Şti."]
        },
        {
            title: "Kısmi zamanlı araştırmacı /DANIŞMAN",
            isDateRange: true,
            deneme: 'evet',
            years: [2020, "Devam"],
            desc: null,
            desc: ["Gesbey Enerji Türbini Kule Üretim San. ve Tic. A.Ş., proje danışmanlığı ile başlayan çalışmalar, Ar-Ge Merkezi Kanunu uyarınca kısmi zamanlı araştırmacı olarak devam etmektedir."]
        },
        {
            title: "Kısmi zamanlı araştırmacı /DANIŞMAN",
            isDateRange: true,
            deneme: 'danışmanlıklar',
            years: [2017, "Devam"],
            desc: null,
            desc: ["YEMTAR AŞ., Ar-Ge Merkezi Kanunu uyarınca kısmi zamanlı araştırmacı olarak görev yapmaktadır."]
        },
        {
            title: "DANIŞMAN",
            isDateRange: true,
            deneme: 'danışmanlıklar',
            years: [2019, "Devam"],
            desc: null,
            desc: ["İşbir Elektrik AŞ. Ar-Ge Danışmanı"]
        },
        {
            title: "DANIŞMAN",
            isDateRange: true,
            deneme: 'kararsiz',
            years: [2019, "Devam"],
            desc: null,
            desc: ["Paksan Makina Sanayi Tic.A.Ş. (Proje danışmanlıkları, Ar-Ge merkezi kuruluş çalışmaları)"]
        },
    ]
    return (
        <div className='Consultancies'>
            <div className="Consultancies_Header">
                Danışmanlıklar
            </div>
            <div className="Consultancies_Body">
                Makina tasarım ve imalat alanında TEYDEB ve KOSKEB projelerine destek vermektedir.
                {/* {
                    consultancies.map(({title, years, desc, bodyTitle, statu, place}, index) => (
                        <SectionDetail 
                            key={index}
                            title={title}
                            desc={desc}
                            years={years}
                            bodyTitle={bodyTitle}
                            statu={statu}
                            place={place}
                        />
                    ))
                } */}
                
            </div>
        </div>
    )
}