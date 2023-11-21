import React from 'react'
import './Styles/ListWidget.css'

export default function ListWidget({datas = ["Deneme", "Denem2"], type = ""}) { 
    return (
        <div className='ListWidget'>
            
            {
                type === "ordered" ? (
                    <ol>
                        {
                            datas.map((data, index)=>(
                                <li key={index}>{data.satir}</li>
                            ))
                        }
                    </ol>
                ) : null
            }
            {
                type === "unordered" ? (
                    <ul>
                        {
                            datas.map((data, index)=>(
                                <li key={index}>{data.satir}</li>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}