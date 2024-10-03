import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </MantineProvider>
  );
}
