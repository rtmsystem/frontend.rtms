
'use client'
// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

type ConfirmationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  loading: boolean
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { open, setOpen, title, description, onConfirm, loading = false } = props

  const handleConfirmation = () => {
    setOpen(false)
    onConfirm()
  }

  const handleClose = (event: React.SyntheticEvent<Element, Event>, reason: string) => {
    if (reason && reason === "backdropClick") {
      return
    }
    setOpen(false)
  }

  return (
    <Dialog disableEscapeKeyDown={true} fullWidth maxWidth='xs' open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions className='justify-right '>
        <Button disabled={loading} onClick={(event) => handleClose(event, "escapeKeyDown")} color='secondary' variant='outlined'>Cancelar</Button>
        <LoadingButton
        className='!text-white'
          loading={loading}
          onClick={handleConfirmation} color='primary' variant='contained' >{loading ? 'Publicando...' : 'Confirmar'}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog