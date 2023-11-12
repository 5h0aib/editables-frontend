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

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContent>
        <Stack justifyContent='center' spacing={3} sx={{ maxWidth: "300px" }}>
          <Typography variant='h4' gutterBottom align='center'>
            Scheduling Call
          </Typography>
          <Typography variant='h6' gutterBottom align='center' fontSize={"2vw"}>
            We'll reach out to you on WhatsApp
          </Typography>
          <TextField
            placeholder='Your Contact Number'
            onChange={(e) => setPhone(e.target.value)}
          />
          {successMessage && (
            <Typography variant='body1' color='success' align='center'>
              {successMessage}
            </Typography>
          )}
          <Button variant='contained' size='large' onClick={handleClick}>
            Next
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ContactOverlay;

