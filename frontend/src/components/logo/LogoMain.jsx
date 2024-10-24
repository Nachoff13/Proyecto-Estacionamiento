// material-ui
import { useTheme } from '@mui/material/styles';


import logo from 'assets/images/logo.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100%' }}>
      <img src={logo}  width="150" />
    </div>
  );
};

export default Logo;
