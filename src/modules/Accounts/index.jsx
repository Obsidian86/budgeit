import React, { useContext, useState, useEffect } from 'react'
import MainContext from '../../providers/MainContext'
import ContentBox from '../interface/ContentBox'
import SoftList from '../interface/SoftList'
import Form from '../interface/Form'
import { IP } from '../../utilities/formUtilities'
import { money } from '../../utilities/convert'
import * as accountFunctions from './accountsFunctions'
import s from './styles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import TransfersForm from './TransfersForm'
import { parsedCurrentDate } from '../components/calendar/dateFunctions'
 
const Accounts = () => {
    const p = useContext(MainContext)
    const [showForm, updateShowForm] = useState(false)
    const [errors, updateErrors] = useState({})
    const [edittingItem, updateEdittingItem ] = useState(null)
    const [transfersState, updateTransfersState] = useState(null)
    const [parentWidth, updateParentWidth] = useState(500)
    const [showOptionsParent, updateShowOptions] = useState(null)
    const { proccessAccounts, handleSubmit, deleteAccount } = accountFunctions

    const getWidth = () => {
        const ss = document.getElementById('accountsModule')
        ss && updateParentWidth(ss.offsetWidth - 50)
      }
      useEffect(() => {
          getWidth()
          window.addEventListener('resize', getWidth)
          return function(){window.removeEventListener('resize', getWidth)}
      })

    const handleEditTransfers = (tr) => updateTransfersState({...tr})
    const handleDelete = (id, clearData) => deleteAccount(id, clearData, p, updateEdittingItem, updateShowForm, updateErrors)
    const handleSubmitForm = formData => handleSubmit(formData, edittingItem, p, updateEdittingItem, updateShowForm, updateErrors)

    const useShowOptions = (edittingItem || showForm) ? null : showOptionsParent
    const {total, liquid, accountList} = proccessAccounts(
        s, false, p, updateEdittingItem, updateShowForm, p.accountTransfers, handleEditTransfers, parentWidth, useShowOptions, updateShowOptions
    )

    return (
        <ContentBox title='Accounts' exClass={'mx row'} itemId='accountsModule' icon={<FontAwesomeIcon icon={faUniversity} />}>
            <div className='right w-99 pt-50' style={{marginRight: '-17px' }}>
                {!showForm && <button 
                    className={`btn ${transfersState ? 'red' : 'blue'}`} 
                    onClick={() => transfersState ? updateTransfersState(null) : updateTransfersState({date: parsedCurrentDate(Date.now())})}
                >
                    <i><FontAwesomeIcon icon={faExchangeAlt} /></i> &nbsp;
                    { transfersState ? 'Cancel transfer set up' : 'Set up auto transfers'}
                </button> }
                {!transfersState && accountList.length > 0 &&
                    <button className='btn mr-20' onClick={()=> updateShowForm(!showForm)} >
                        {showForm ? 'Hide form' : 'Add account'}
                    </button> 
                }
            </div>
            <div className={`mt-10 ${(showForm || accountList.length < 1) ? 'md' : 'max'}`}> 
                { transfersState &&
                    <TransfersForm updateTransfersState={updateTransfersState} transferState={transfersState} p={p} /> 
                }
                { accountList.length < 1 ? <div className='center-all'><h2 className='mb-60'>Add an account </h2></div>
                : <>
                    <SoftList split>
                        <li className='fw-b'>
                            <span style={s.intFirst}>Account name</span>
                            <span style={s.intRight}>Interest rate</span>
                            <span style={s.intRight}>Current balance</span>
                            <span style={s.intLast}>{'+'}</span>
                        </li>
                        {accountList}
                    </SoftList>
                    <div className='right' style={{marginBottom: '5px'}}>
                        <h3 style={{padding: '0px 8px 7px 6px', color: 'green'}} >Liquid: {money(liquid)} </h3>
                        <h3 style={{padding: '0px 8px 7px 6px', color: 'orange'}} >Non liquid: {money(total - liquid)} </h3>
                        <h3 style={{padding: '0px 8px 7px 6px'}}>Total: {money(total)}</h3>
                    </div>
                </>}
            </div>
            {(showForm || accountList.length < 1)  && <div className='md' id='accountForm'>
                <Form
                    reDefault   
                    defaultFormData = {edittingItem ? edittingItem : {}}
                    render={(updateField, formData, clearData) => {
                        return(
                            <>
                                <IP type='text' alias='name' data={formData} label='Account name' errors={errors} onChange={e => updateField(e) } showPH='Account name' />
                                <IP type='number' alias='interest' data={formData} label='Interest rate' errors={errors} onChange={e => updateField(e) } showPH='0%' />
                                <IP type='number' alias='amount' data={formData} label='Amount' errors={errors} onChange={e => updateField(e) } showPH='Amount' />
                                <IP type='checkbox' style={{margin: '0 auto'}} alias='liquid' data={formData} label='Liquid' errors={errors} onChange={e => {
                                    updateField({
                                        target: {
                                            value: formData.liquid ? false : true,
                                            name: 'liquid'
                                        }
                                    })
                                }} />
                                <span className='right mt-40'>
                                    { edittingItem && 
                                        <button
                                            className='btn red'
                                            onClick={()=> handleDelete(formData.id, clearData)}
                                        >
                                            Delete
                                        </button>
                                    }
                                    <button 
                                        className='btn blue' 
                                        onClick={() =>{
                                            edittingItem && updateShowForm(false);
                                            updateEdittingItem(null);
                                            updateErrors({})
                                            clearData();
                                        }}
                                    >
                                        {edittingItem ? 'Cancel' : 'Clear'}
                                    </button>
                                    <button className='btn' onClick={ handleSubmitForm.bind(null, formData) }>Submit</button>
                                </span>
                            </>
                        )
                    }}
                />
            </div>}
        </ContentBox>
    )
}

export default Accounts