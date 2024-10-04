import { useLocation } from 'react-router-dom';
import { Typography, Breadcrumbs as MuiBreadcrumbs, Link, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Breadcrumbs({ navigation, title, ...others }) {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {
          if (location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  }, [location, navigation]);

  let breadcrumbContent;
  let currentPath = location.pathname;

  // Lógica personalizada para "Mi Perfil"
  if (currentPath === '/apps/profiles/account/basic') {
    breadcrumbContent = (
      <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
        <MuiBreadcrumbs aria-label="breadcrumb">
          <Link to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Typography variant="subtitle1" color="textPrimary">
            Mi Perfil
          </Typography>
        </MuiBreadcrumbs>
      </MainCard>
    );
  } else {
    let mainContent;
    let itemContent;
    let itemTitle = '';

    // collapse item
    if (main && main.type === 'collapse') {
      mainContent = (
        <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
          {main.title}
        </Typography>
      );
    }

    // items
    if (item && item.type === 'item') {
      itemTitle = item.title;
      itemContent = (
        <Typography variant="subtitle1" color="textPrimary">
          {itemTitle}
        </Typography>
      );

      // main
      if (item.breadcrumbs !== false) {
        breadcrumbContent = (
          <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
              <Grid item>
                <MuiBreadcrumbs aria-label="breadcrumb">
                  <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                    Home
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
              {title && (
                <Grid item sx={{ mt: 2 }}>
                  <Typography variant="h5">{item.title}</Typography>
                </Grid>
              )}
            </Grid>
          </MainCard>
        );
      }
    }
  }

  return breadcrumbContent;
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
  others: PropTypes.any
};
