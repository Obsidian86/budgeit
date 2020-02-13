import React, { useContext, useState } from 'react'
import MainContext from '../providers/MainContext'
import ContentBox from './interface/ContentBox'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faUpload } from "@fortawesome/free-solid-svg-icons";

const SaveLoad = () => {
    const p = useContext(MainContext)
    const [loadedData, updateLoadedData] = useState(null)

    let fileReader = new FileReader();
    fileReader.onload = (event) => {
        const importedData = JSON.parse(event.target.result)
        if(importedData) {
            let valid = importedData.profile            
            if (valid) updateLoadedData(importedData) 
        }
    };

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
        <ContentBox title='Export data' exClass='sm'>
            <div>
                <div className='max'>
                    <label className='mt-40 d-bl center mb-10'>Export to file and download</label>
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
 
 
