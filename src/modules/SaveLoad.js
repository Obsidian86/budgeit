import React, { useContext } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

const SaveLoad = () => {
    const p = useContext(MainContext)

    // EXPORT
    const makeJson = (input) => {
        let outPut = []
        for ( let i = 0; i < input.length; i++ ) {
            outPut[i] = input.charCodeAt(i);
        }
        return new Uint8Array( outPut );
    }

    const handleClick = () => {
        const data = makeJson( JSON.stringify(p.exportData(), null, 4) );

        const blob = new Blob( [ data ], {
            type: 'application/octet-stream'
        });
         
        const link = document.createElement( 'a' )
        link.setAttribute( 'href', URL.createObjectURL( blob ))
        link.setAttribute( 'download', `${p.profile || 'file'}.json` )
        
        const event = document.createEvent( 'MouseEvents' )
        event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
        link.dispatchEvent( event );
    }

    return (
        <ContentBox exClass='sm'>
            <h4 className='section-title'>Export data</h4>
            <div>
                <div className='max center'>
                    <label className='mt-50 d-bl center mb-10'>Export to file and download</label>
                    <button 
                        onClick={()=> handleClick()}
                        className='btn mt-10'
                    > <FontAwesomeIcon icon={faFileExport} /> &nbsp;&nbsp; Export </button> 
                </div>
            </div>
        </ContentBox>
    )
}

export default SaveLoad
 
 
