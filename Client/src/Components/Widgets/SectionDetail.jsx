import "./Styles/SectionDetail.css"

export default function SectionDetail({title, years, desc, bodyTitle, place, statu}) {
    return (
        <div className="SectionDetail_Item">
            <div className="SD_Header">
                <div>
                    {title}
                </div>
                {
                    Array.isArray(years) ? (
                        <div className="SD_Dates">
                            <span>{years[0]}</span>-<span>{years[1]}</span>
                        </div>
                    ) : null
                }
                
            </div>
            <div className="SD_Body">
                {
                    place && statu ? (
                        <div className="SD_BodyTitleWrapper">
                            <div className="SD_BodyTitle">{place}</div>
                            <div className="SD_BodyTitle">{statu}</div>
                        </div>
                    ) : null
                }
                {/* <div className="SD_BodyTitle">{bodyTitle}</div> */}
                {
                    desc?.map((el, index) => <div key={index} className="SD_BodyElement">{el.satir}</div>)
                }

            </div>
        </div>  
    )
}