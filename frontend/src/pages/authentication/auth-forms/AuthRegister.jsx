import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const handleShowTerms = () => setShowTerms(true);

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowTerms(false);
  };

  const handleRejectTerms = () => {
    setAcceptedTerms(false);
    setShowTerms(false);
  };

  const handleRoleChange = (event, setFieldValue) => {
    const { name, checked } = event.target;
    setFieldValue(name, checked);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    
    console.log('Se presiono el boton');
    alert('Formulario enviado');
    
    console.log('Formulario enviado con los valores:', values);
    const dataForAPI = {
      nombre: values.nombre,
      apellido: values.apellido,
      mail: values.email,
      username: values.username,
      contrasena: values.contrasena,
      esconductor: values.esconductor,
      espropietario: values.espropietario
    };

    console.log('Datos para la API:', dataForAPI);

    try {
      const response = await fetch("https://localhost:7294/Usuario/Agregar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForAPI),
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar el usuario');
      }
  
      const result = await response.json();
      console.log('Usuario agregado con ID:', result);
      // Aquí puedes manejar la respuesta, como redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    changePassword('');
  }, []);



  return (
    <>

<Dialog open={showTerms} onClose={handleRejectTerms}>
        <DialogTitle>Términos y Condiciones</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Al usar esta aplicación, acepta que no nos hacemos responsables por daños, pérdidas o inconvenientes relacionados con el uso del servicio de alquiler de garaje. Es su responsabilidad asegurar la seguridad de su vehículo y pertenencias.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectTerms} color="secondary">Cancelar</Button>
          <Button onClick={handleAcceptTerms} color="primary">Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          email: '',
          username:'',
          contrasena: '',
          esconductor: false,
          espropietario: false,
        }}
        validationSchema={Yup.object().shape({
          nombre: Yup.string().max(255).required('Se necesita llenar el campo Nombre'),
          apellido: Yup.string().max(255).required('Se necesita llenar el campo Apellido'),
          email: Yup.string().email('El email debe ser válido').max(255).required('Se necesita llenar el campo Email'),
          username: Yup.string().max(255).required('Se necesita llenar el campo Nombre de Usuario'),
          contrasena: Yup.string().max(255).required('Se necesita llenar el campo Contraseña')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, isSubmitting, touched, values, setFieldValue, handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="nombre-signup">Nombre*</InputLabel>
                  <OutlinedInput
                    id="nombre-login"
                    type="nombre"
                    value={values.nombre}
                    name="nombre"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.nombre && errors.nombre)}
                  />
                </Stack>
                {touched.nombre && errors.nombre && (
                  <FormHelperText error id="helper-text-nombre-signup">
                    {errors.nombre}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="apellido-signup">Apellido*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.apellido && errors.apellido)}
                    id="apellido-signup"
                    type="apellido"
                    value={values.apellido}
                    name="apellido"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                </Stack>
                {touched.apellido && errors.apellido && (
                  <FormHelperText error id="helper-text-apellido-signup">
                    {errors.apellido}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.username && errors.username)}
                  id="username"
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Jhonny02"
                />
              </Stack>
              {touched.username && errors.username && (
                <FormHelperText error id="helper-text-username">
                  {errors.username}
                </FormHelperText>
              )}
            </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Rol</InputLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="esconductor"
                        checked={values.esconductor}
                        onChange={(event) => handleRoleChange(event, setFieldValue)}
                      />
                    }
                    label="Conductor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="espropietario"
                        checked={values.espropietario}
                        onChange={(event) => handleRoleChange(event, setFieldValue)}
                      />
                    }
                    label="Propietario"
                  />
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="jhon@gmail.com"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>

              
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.contrasena && errors.contrasena)}
                    id="contrasena"
                    type={showPassword ? 'text' : 'password'}
                    value={values.contrasena}
                    name="contrasena"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                </Stack>
                {touched.contrasena && errors.contrasena && (
                  <FormHelperText error id="helper-text-contrasena">
                    {errors.contrasena}
                  </FormHelperText>
                )}
              </Grid>

              


              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={acceptedTerms} onClick={handleShowTerms} />}
                  label="Acepto los términos y condiciones"
                />
                {!acceptedTerms && (
                  <FormHelperText error id="helper-text-terms">
                    Debe aceptar los términos y condiciones para registrarse
                  </FormHelperText>
                )}
              </Grid>




              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting || !acceptedTerms}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Crear Cuenta
                  </Button>
                </AnimateButton>
              </Grid>

            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
