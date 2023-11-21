import { useEffect, useState } from 'react';
import ElementController from '../Widgets/LinksElementController'
import SpecialLinksCard from '../Widgets/SpecialLinksCard'
import './Styles/SpecialLinks.css'
import instance from '../../utils/instance';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

function SpecialLinks(props){
    const [card, setCard] = useState([]);
    const getCards = () => {
        instance.get('/api/special-links/getCards').then((response)=> {
            setCard(response.data.data || [])
        }).catch(err => err.response ? toast.error((err.response.data || '').message) : null)
    }
    useEffect(()=>{
        getCards();
    },[])
    const cardInfos = [
        {
            title: "Bağlama Elemanları (Fastening Devices)",
            links: [
                "https://www.hydratight.com",
                "https://www.mbo-osswald.de",
                "https://www.textronfasteningsystems.com",
                "https://www.emhart.com",
                "https://www.nord-lock.com",
                "https://www.tappex.co.uk",
                "https://www.inovan.de",
                "http://www.seeger-orbis.com"
            ]
        },
        {
            title: "Adezivler (Adhesives)",
            links: [
                "https://www.loctite.com",
                "https://www.3m.com",
                "https://www.devcon.com" ,
                "http://www.huntsman.com/"
            ]
        },
        {
            title: "Yaylar (Springs)",
            links: [
                "https://www.lesjoforsab.com",
                "https://www.kern-liebers.com",
                "https://www.baumann-springs.com",
                "https://www.generaleressorts.com"
            ]
        },
        {
            title: "Kavramalar (Couplings and Clutches)",
            links: [
                "http://www.ortlinghaus.de",
                "http://www.mayr.de/",
                "http://www.skf.com",
                "http://www.lovejoy-inc.com/",
                "http://www.emerson-ept.com/",
                "https://www.beldenuniversal.com",
                "http://www.rimteccorporation.com/",
                "https://www.wichita.co.uk",
                "http://www.renold.com/",
                "https://www.suco.de",
                "https://www.hilliardcorp.com",
                "https://www.reell.com"
            ]
        },
        {
            title: "Rulmanlı Yataklar (Rolling Bearings)",
            links: [
                "http://www.skf.com",
                "http://www.fag.com",
                "http://www.timken.com",
                "http://www.ina.com",
                "http://www.nsk.com"
            ]
        },
        {
            title: "Dişli Çarklar (Gearing)",
            links: [
                "http://www.flender.com",
                "http://www.nord.com",
                "http://www.remas.com.tr/",
                "http://www.yr.com.tr/",
                "http://www.gleason.com",
                "http://www.klingelnberg.info/",
                "http://www.tandler.de",
                "http://www.ketterer.de",
                "http://industrial-drives.zf.com",
                "http://www.davall.co.uk",
                "http://www.piv-drives.com"
            ]
        },
        {
            title: "Kayış-Kasnak Mekanizmaları (Belting)",
            links: [
                "http://www.sdp-si.com/",
                "http://www.goodyearptp.com/",
                "http://www.siegling.com/",
                "http://www.ammeraal-beltech.com/",
                "http://www.habasit.com/"
            ]
        },
        {
            title: "Zincirler (Chain Drives)",
            links: [
                "http://www.ustsubaki.com/",
                "http://www.renold.com/",
                "http://www.ramseychain.com/"
            ]
        },
        {
            title: "For a detailed search follow the link",
            links: [
                "http://www.directindustry.com/"
            ]
        }
    ]
    return (
        <>
            {
                props.token ?
                <ElementController 
                    title={'Link Kart'}
                    refetchFunction={getCards}
                /> : null
            }
            <div className="SpecialLinks">
                <div className='row w-100 g-0'>
                        {
                            card.map(({_id, title, links}, index)=>(
                                <div className='column col-sm-6 col-lg-4  p-1 p-md-2 p-lg-3' key={index}>
                                    <SpecialLinksCard
                                        title={title}
                                        links={links}
                                        id={_id}
                                        refetchCards={getCards}
                                    />
                                </div>
                            ))
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
export default connect(mapStateToProps, mapDispatchToProps)(SpecialLinks);