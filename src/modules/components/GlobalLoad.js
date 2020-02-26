import React from 'react'
import ContentBox from '../interface/ContentBox'

const GlobalLoad = () => {
    return(
        <ContentBox title='Loading' exClass='mt-100' temId='loading'>
            <div className={`mt-40`}>
                <h2>Loading data...</h2>
            </div>
        </ContentBox>
    )
}

export default GlobalLoad