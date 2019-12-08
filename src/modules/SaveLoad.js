import React, { useContext, useState } from 'react'
import MainContext from '../providers/MainContext'
import Files from 'react-files'
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
  
    const confirmLoadProfile = () => {
        p.setDialog({
            open: true,
            header: 'Overwrite account data', 
            message: <> 
                Are you sure you want to load account data? <br /> 
                This will remove current work. <br />
                Make sure you save. 
            </>, 
            confirm: ()=>{
              loadedData && p.importData(loadedData)
            },
            reject: ()=> null 
          }) 
    }


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

    const s = {
        dropCont: {
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            marginTop: '20px',
            backgroundColor: '#e9e9e9',
            border: '3px solid #fff',
            boxShadow: '0 0 6px #d9d9d9'
        },
        fileDrop: {
            padding: '25px 20px',
            cursor: "pointer",
            fontStyle: 'italic'
        }
    }

    return (
        <ContentBox title='Import / export data' exClass='sm'>
            <div>
                <div className='max'>
                    <label className='mt-40 d-bl center mb-10'>Export to file and download</label>
                    <button 
                        onClick={()=> handleClick()}
                        className='btn mt-10'
                    > <FontAwesomeIcon icon={faFileExport} /> &nbsp;&nbsp; Export </button> 
                </div>
                <div className='max' style={{borderTop: '1px solid #c7c7c7', marginTop: '30px'}}>
                    <label className='mt-40 d-bl mb-10 center'>Import account file</label>
                    <div className="files" style={s.dropCont}>
                        <Files onChange={file => {fileReader.readAsText(file[file.length - 1])} } style={s.fileDrop} id='asd'>
                            { loadedData && loadedData.profile ?
                                `Load profile: ${loadedData.profile}` :
                                'Drop files here or click to upload' }
                        </Files>
                    </div>
                    { loadedData && <button onClick={confirmLoadProfile} className='btn blue mt-40'>
                        <FontAwesomeIcon icon={faUpload} /> &nbsp;&nbsp; Load data</button> }
                </div>
            </div>
        </ContentBox>
    )
}

export default SaveLoad
 
 
