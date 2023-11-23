
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';
import { Typography, Link } from '@mui/material';

const Footer = () => {
    const ContainerStyle = {
        display: 'flex',
        marginBottom: '10px',
    };

    const IconStyle = {
        backgroundColor: 'black',
        padding: '5px',
        borderRadius: '10px',
        display: 'flex',
       
        marginRight: '5px',
    };


    const EditablesStyle = {
        textAlign: 'left',
        fontSize: '1.5rem', // Change the font size as needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', // Vertically center the content
    };

    return (
        <Grid container spacing={3} justifyContent="center" p={5} id="contact">
            <Grid item xs={12} md={4}>
                <Box style={EditablesStyle} >
                   Editables Studios
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box textAlign="left">
                    <div style={ContainerStyle}>
                        <div style={IconStyle}>
                            <PhoneIcon style={{ color: 'white' }} fontSize='small' />
                        </div>
                        <Typography variant="body1">(123) 456-7890</Typography>
                    </div>
                    <div style={ContainerStyle}>
                        <div style={IconStyle}>
                            <HomeIcon style={{ color: 'white' }} fontSize='small' />
                        </div>
                        <Typography variant="body1">House#4, Road#15, Block-C, Bashundhara</Typography>
                    </div>
                    <div style={ContainerStyle}>
                        <div style={IconStyle}>
                            <EmailIcon style={{ color: 'white' }} fontSize='small' />
                        </div>
                        <Typography variant="body1">editablestudios@gmail.com</Typography>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box textAlign="left">
                    <Link href="#" style={ContainerStyle} underline="hover">
                        <div style={IconStyle}>
                            <FacebookIcon style={{ color: 'white' }} fontSize='small' />
                        </div>
                        <Typography variant="body1">editablestudios</Typography>
                    </Link>
                    <div style={ContainerStyle}>
                        <div style={IconStyle}>
                            <ArticleIcon style={{ color: 'white' }} fontSize='small' />
                        </div>
                        <Typography variant="body1">Terms of service</Typography>
                    </div>
                    <Link href="#" style={ContainerStyle} underline="hover">
                        <div style={IconStyle}>
                            <LanguageIcon style={{ color: 'white' }} fontSize='small' />
                        </div>
                        <Typography variant="body1">editablestudios.com</Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Footer;
