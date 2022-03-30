import React from 'react'
import { Spinner } from 'react-bootstrap'
import classnames from 'classnames'

const LoadingSpinner = () => {
    return (
        <div className='center'>
            <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading</span>
            </Spinner>
        </div>
    )
}

export default LoadingSpinner
