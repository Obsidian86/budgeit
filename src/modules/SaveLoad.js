import React, { useContext, useState } from 'react'
import MainContext from '../providers/MainContext'
import Files from 'react-files'
import ContentBox from './interface/ContentBox'

const SaveLoad = () => {
    const p = useContext(MainContext)
    const [loadedData, updateLoadedData] = useState(null)

    const { profile, amount, accounts, budget, total, savingsTable, incomeSources, saveState, setDialog } = p

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
        const importedData = JSON.parse(event.target.result)
        if(importedData) {
            let valid = importedData.profile            
            valid && updateLoadedData(importedData)
        }
    };

    const confirmLoadProfile = () => {
        setDialog({
            open: true,
            header: 'Load account data', 
            message: <>Are you sure you want to load account data? <br /> This will remove current work. <br /> Make sure you save. </>, 
            confirm: ()=>{
              loadedData && saveState(loadedData)
            },
            reject: ()=>{ return null }
          }) 
    }

    const makeJson = (input) => {
        let outPut = []
        for ( let i = 0; i < input.length; i++ ) {
            outPut[i] = input.charCodeAt(i);
        }
        return new Uint8Array( outPut );
    }

    const handleClick = () => {
        const data = makeJson( JSON.stringify({ 
            profile, amount, accounts, budget, total, savingsTable, incomeSources
        }, null, 4) );

        const blob = new Blob( [ data ], {
            type: 'application/octet-stream'
        });
         
        const link = document.createElement( 'a' )
        link.setAttribute( 'href', URL.createObjectURL( blob ))
        link.setAttribute( 'download', `${profile || 'file'}.json` )
        
        const event = document.createEvent( 'MouseEvents' )
        event.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
        link.dispatchEvent( event );
    }

    const s = {
        dropCont: {
            width: '80%',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'lightgray',
            borderRadius: '5px'
        },
        fileDrop: {
            padding: '14px 10px',
            cursor: "pointer"
        }
    }

    return (
        <ContentBox title='Import / export data'>
            <label className='mt-40 d-bl'>Export to file and download</label>
            <button 
                onClick={()=> handleClick()}
                className='btn narrow mt-10'
            > Export </button> 

            <label className='mt-40 d-bl mb-10'>Import account file</label>
            <div className="files mt-40" style={s.dropCont}>
                <Files onChange={file => fileReader.readAsText(file[0]) } style={s.fileDrop}>
                    { loadedData && loadedData.profile ?
                        `Load profile: ${loadedData.profile}` :
                        'Drop files here or click to upload' }
                </Files>
                { loadedData && <button onClick={confirmLoadProfile} className='btn blue'>Load data</button> }
            </div>
        </ContentBox>
    )
}

export default SaveLoad
 
 
