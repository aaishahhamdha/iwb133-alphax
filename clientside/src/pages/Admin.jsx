import React from 'react'
import './Dashboard.css'
import Calendar from '../Components/Calendar'
import '../index.css'
import Menu from '../Components/Menu-admin'
import AddMenu from '../Components/AddMenu'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import Meal from '../Components/Images/meal.json';



const Admin = () => {
 
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Meal,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div className='dashboard'>
      <div className='left col-left'>
          <div className='col1-top'>
              <Button variant="outlined" onClick={handleClickOpen} sx={{marginTop: '2%', color: 'var(--background-color)', backgroundColor: 'var(--orange)' , marginLeft:'4.8%'}}>
              <FontAwesomeIcon icon={faPlus} /> Edit Today's Menu
              </Button>
          </div>
          <div className='col1-bot'>
            <Menu />
          </div>
      </div>
      <div className='admin-right' style={{
        background: 'linear-gradient(to right, transparent 50%, transparent 50%)',
        borderLeft: '1px solid var(--text-primary)', display:'flex', flexDirection:'column'
      }}>
         <div>
      <Lottie 
	    options={defaultOptions}
        height={300}
        width={300}
      />
    </div>
         <Calendar/>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
            width: '100%'
        }}
        PaperProps={{
        component: 'form',
        onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
        },
        
        }}
    >
        <DialogTitle>Add Food</DialogTitle>
        <DialogContent>
        <DialogContentText>
            <AddMenu></AddMenu>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} sx={{backgroundColor: 'var(--green)', color: 'var(--background-color)'}}>Done</Button>
        </DialogActions>
    </Dialog>
    </div>
  )
}

export default Admin