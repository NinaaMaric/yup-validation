import { Button } from '@material-ui/core'
import React from 'react'

export const PirmaryButton = ({children, ...props}) => {
    return (
        <Button type="submit" color="primary" variant="contained" {...props} >
            {children}
        </Button>
    )
}
