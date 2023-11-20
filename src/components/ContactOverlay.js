"use client"
import { createBooking } from "@/externalApi";
import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ContactOverlay = ({ setOpen, open }) => {
  const [phone, setPhone] = useState("");
  const [isValidPhone, setValidPhone] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleClick = () => {
    createBooking(phone)
      .then((res) => {
        setSuccessMessage("Custom booking created");
        setTimeout(() => {
          router.push(`user/${localStorage.getItem("uid")}`, { shallow: false });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validatePhoneNumber = (number) => {
    // Basic validation: 11 digits and only numbers
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (e) => {
    setPhone(e);
    setValidPhone(!validatePhoneNumber(e));
  };
  return (
    <Dialog onClose={() => setOpen(false)} open={open} >
      <DialogContent>
        <Stack justifyContent='center' spacing={3} sx={{ maxWidth: "400px" }} p= {2}>
          <Typography variant='h4' gutterBottom align='center'>
            Scheduling Call
          </Typography>
          <Typography variant='h6' gutterBottom align='center' fontSize={"2vw"}>
            We&rsquo;ll reach out to you on WhatsApp
          </Typography>
          <TextField
            placeholder='Your Contact Number'
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          {successMessage && (
            <Typography variant='body1' color='success' align='center'>
              {successMessage}
            </Typography>
          )}
          <Button variant='contained' size='large' onClick={handleClick} disabled={isValidPhone}>
            Next
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ContactOverlay;

