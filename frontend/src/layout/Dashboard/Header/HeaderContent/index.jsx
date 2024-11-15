// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { GithubOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    // verificar medidas
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!downLG && <Box sx={{ width: '1150px' }} />} 

      <IconButton
        component={Link}
        href="https://github.com/Nachoff13/Proyecto-Estacionamiento"
        target="_blank"
        disableRipple
        color="secondary"
        title="Repo"
        sx={{ color: 'text.primary', bgcolor: '#bddeff' }}
      >
        <GithubOutlined />
      </IconButton>

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </Box>
  );
}
