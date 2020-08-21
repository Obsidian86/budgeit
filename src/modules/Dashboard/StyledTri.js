import styled from 'styled-components'

export default styled.div`
width: 98%;
display: flex;
justify-content: space-between;
.contentBox{
    padding: 0;
    width: calc(50% - 190px);
    padding: 5px;
    &:first-child{
        width: 260px;
    }
}
@media screen and (max-width: 1150px){
    flex-wrap: wrap;
    width: 100%;
    margin-top: -28px;
    .contentBox{
        padding: 0;
        width: calc(50% - 30px);
        padding: 5px;
        &:first-child{
            margin: 0 auto 15px auto;
            padding-top: 10px;
            padding-bottom: 10px;
            width: calc(100% - 26px);
            & i {
                margin-left: 10px;
            }
        }
    }
}

@media screen and (max-width: 525px){
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    margin-top: -25px;
    background-color: #fff;
    width: 95%;
    margin-bottom: 7px;
    border: 1px solid #a38f8f;
    box-shadow: 0 0 0 8px #fff, 0 0 10px #000;
    & .contentBox{
        margin: 0 auto 0 auto;
        padding: 5px 0 13px 0;
        box-shadow: none;
        border: none;
        width: 93%;
        padding-left: 2%;
        padding-right: 2%;
        &:first-child{
            margin: 0;
            & i {
                margin-left: 10px;
                margin-top: 5px;
            }
            & span {
                margin-top: 5px;
            }
        }
    }
}
`