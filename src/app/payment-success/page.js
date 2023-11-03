import Image from 'next/image';
import { Button} from "@mui/material"
import Link from "next/link"

const PaymentSuccess = () => {
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
    marginTop: '50px',
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
      <h1 style={headingStyle}>Payment Successful</h1>
      <p>Your order has been confirmed</p>
      <Image
        src="/tick.gif"
        alt="Tick"
        width={150} // Set the width you desire
        height={150} // Set the height you desire
        style = {{ marginTop:"50px" }}
      />
      <Link href="step_final">
      <Button variant='contained' size='small'  style={buttonStyle}>
                Proceed to Upload Images
      </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
