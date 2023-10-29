
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArticleIcon from '@mui/icons-material/Article';
import LanguageIcon from '@mui/icons-material/Language';


import { Typography, Button, Link } from '@mui/material';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#fff',
        color: '#000',
        textAlign: 'left', // Change 'center' to 'left'
        padding: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        marginLeft:'20px'
    };

    const IconStyle = {
        backgroundColor: 'black',
        padding: '5px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        marginRight: '5px',
    };

    const ContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom:'10px'
    };

    return (
        <div style={footerStyle}>
            <div style={{ ...columnStyle, flex: 1 }}>
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

            </div>
            <div style={{ ...columnStyle, flex: 1 }}>
                <Link href="#" style={ContainerStyle}>
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
                <Link href="#" style={ContainerStyle}>
                    <div style={IconStyle}>
                        <LanguageIcon style={{ color: 'white' }} fontSize='small' />
                    </div>
                    <Typography variant="body1">editablestudios.com</Typography>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
