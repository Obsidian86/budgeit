import styled from 'styled-components'

export default styled.div`
width: 100%;
display: flex;
justify-content: space-between;
.contentBox{
    padding: 0;
    width: calc((100% - 265px) / 2);
    padding: 5px;
    &:first-child{
        width: 265px;
    }
}
@media screen and (max-width: 1150px){
    flex-wrap: wrap;
    width: 99%;
    margin-top: -28px;
    .contentBox{
        padding: 0;
        width: calc(50% - 30px);
        padding: 5px;
        margin-top: 0;
        &:first-child{
            margin: 45px auto 23px auto;
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
    background-color: #fff;
    width: calc(100% - 20px);
    margin-top: 15px;
    margin-bottom: 7px;
    border-radius: 4px;
    & .contentBox{
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