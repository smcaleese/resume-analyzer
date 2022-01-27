import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'


const SkillCard = ({ className, skill, color }) => {

    const StyledDiv = styled.div`
    width:100px;
    height:40px;
    background-color: rgb(${color}) !important;
    margin: 5px 25px 5px 25px;
    position: relative;
    color: #fff;
    font-weight: bold;
    
    //Angled edges from https://codepen.io/Paulie-D/pen/bGoxvw 
    &:after{
        content:"";/* required */
        position: absolute; /* takes the 'cap' out off flow */
        top:0; /* stick it to top edge of the sign */
        left:100%; /* push it way overto the right*/
        height:0; /* we're doing this with borders remember */
        width:0; 
        border-width: 20px;
        border-style:solid;
        border-color: rgb(${color}); /* same as bg of our rectangle */
        /* now we make some of theborders disappear*/
        border-top-color:transparent;
        border-bottom-color:transparent;
        border-right-color:transparent;
    }
    
    &:before{
        content:"";/* required */
        position: absolute; /* takes the 'cap' out off flow */
        top:0; /* stick it to top edge of the sign */
        right:100%; /* push it way overto the right*/
        height:0; /* we're doing this with borders remember */
        width:0; 
        border-width: 20px;
        border-style:solid;
        border-color: rgb(${color}); /* same as bg of our rectangle */
        /* now we make some of theborders disappear*/
        border-top-color:transparent;
        border-bottom-color:transparent;
        border-left-color:transparent;
    `

    return(
        <StyledDiv className={classnames(className, 'center')}>
            {skill}
        </StyledDiv>
    )
}

export default styled(SkillCard)`

`