import React from 'react'
import SnackBar from '@material-ui/core/SnackBar'
import Alert from '@material-ui/lab/Alert'

export default ({open, handleClose, children, severity}) => (
  <SnackBar 
    open={open} 
    onClose= {handleClose}
    autoHideDuration={2000}
  >
  <Alert onClose= {handleClose} variant='filled' severity={severity}>
    {children}
  </Alert>
  
  </SnackBar>
)