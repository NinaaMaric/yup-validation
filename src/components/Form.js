import React from 'react'

export const Form = ({children, ...props}) => {
    return (
        <div>
            <form noValidate {...props}>
                {children}
            </form>
        </div>
    )
}
