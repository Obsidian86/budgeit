import React, { useContext } from "react";
import { money, calcMoney, percent } from "../utilities/convert";
import MainContext from "../providers/MainContext";
import ContentBox from "./interface/ContentBox";
import ProgressBar from "./interface/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledCredit = styled.div`
    & {
        text-align: left;
        .credit-list-item {
            margin-bottom: 21px;
            & > .title-row {
                padding: 10px;
                color: #fff;
                font-weight: bold;
                border-radius: 5px 5px 0 0;
                background-color: #00bbd4;
                display: flex;
                justify-content: space-between;
                align-items: center;
                & > * {
                    padding: 0;
                    margin: 0;
                }
            }
            & .descr {
                display: block;
                padding-bottom: 10px;
                margin-top: 20px;
                color: gray;
            }
            & .credit-item-body {
                padding: 10px;
                padding-bottom: 14px;
                display: block;
                border-left: 3px solid #00bbd4;
            }
        }
    }
`

const Credit = () => {
    const p = useContext(MainContext);
    let creditTotaluse = 0
    let creditTotalMax = 0
    const creditAccounts = p.accounts.filter(a => {
        const isCreditAccount = a.accountType === 'Credit'
        if (isCreditAccount) {
            creditTotaluse = calcMoney(creditTotaluse, a.amount)
            if (a.creditLimit) {
                creditTotalMax = calcMoney(creditTotalMax, a.creditLimit)
            }
        }
        return isCreditAccount
    })
    const creditNode = (title, limit, amount, max, allUsage, a = {}) => {
        const noLimit = a.creditLimit && a.creditLimit === "0.00"
        const maxItemsList = []
        if (limit) maxItemsList.push(limit)
        if (max && limit !== max) maxItemsList.push(max)
        if (allUsage && limit !== allUsage) maxItemsList.push(allUsage)
        const { interest, name } = a
        return (
            <div className='credit-list-item' key={title}>
                <div className='title-row'>
                    <h4>{title}</h4>
                    <span> {money(amount)}</span>
                </div>
                <div className='credit-item-body'>
                {name && 
                    <div className='p-5'>
                        <p className='p-0 m-0'>
                            Account interest rate { interest }% <br />
                            Approximately { money(interest / 100 * amount) } in fees per year.
                        </p>
                    </div>
                }
                {
                    !noLimit && maxItemsList.map((item, index) => {
                        return (
                            <span key={index}>
                                <span className='descr'>
                                    Using {
                                        percent(amount, item)
                                    } of {
                                        item === limit
                                            ? 'account limit'
                                            : item === allUsage
                                                ? 'all used credit'
                                                    :'total credit'
                                    } {
                                        money(item)
                                    }
                                </span>
                                <ProgressBar
                                    percent={ amount / item * 100 }
                                    height={10}
                                    color="gray"
                                    bg="white"
                                    radius={5}
                                />
                            </span>
                        )
                    })
                }
                </div>
            </div>
        )}
    return (
        <ContentBox title='Credit' itemId='recommendedModule' icon={<FontAwesomeIcon icon={faCreditCard} />}>
            <StyledCredit className='row mt-40'>
                <p className='sm remark'>
                    Maintaining an appropriate amount of credit usage is an important factor in financial independence. 
                    It is generally recommended to keep credit usage under 30%. 
                    See a breakdown of your credit accounts and total credit usage here.
                </p>
                <div className='lg mb-20'>
                    <p className='right'>{ creditAccounts.length } total credit accounts</p>
                    { creditTotalMax !== 0 && creditNode('All overview', creditTotalMax, creditTotaluse, creditTotalMax) }
                    {
                        creditAccounts.map(a => {
                            return creditNode(
                                a.name,
                                a.creditLimit,
                                a.amount,
                                creditTotalMax,
                                creditTotaluse,
                                a
                            )
                        })
                    }
                </div>
            </StyledCredit>
        </ContentBox>
    );
};


export default Credit;
