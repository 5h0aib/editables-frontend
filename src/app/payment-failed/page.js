"use client"
import Image from 'next/image';
import { Button} from "@mui/material"
import { useRouter } from "next/navigation"

const PaymentSuccess = () => {

  const router = useRouter()
  
  const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // This will center vertically
  };

  const headingStyle = {
    textAlign: 'center',
  };

  const buttonStyle = {
    borderRadius: '15px'
  };

  const watermarkStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '15vw', // Increase the font size
    color: 'rgba(0, 0, 0, 0.02)', // Lighter color with opacity
    zIndex: -1, // Place it behind other content
  };

  return (
    <div style={centerStyle}>
      <h1 style={watermarkStyle}>Editables</h1>
      <h1 style={headingStyle}>Payment Failed</h1>
      <Image
        src="/fail.gif"
        alt="fail"
        width={300} // Set the width you desire
        height={300} // Set the height you desire
      />
      <Button variant='contained' size='small'  style={buttonStyle} onClick={() => router.push(`/user/${localStorage.getItem('uid')}`, { shallow: true })}>
               Go to Dashboard
      </Button>
    </div>
  );
};

export default PaymentSuccess;
