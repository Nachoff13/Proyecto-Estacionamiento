// SearchBar.jsx
import React, { useState } from 'react';
import { MenuItem, Button, Select, InputLabel, FormControl, Tooltip, IconButton } from '@mui/material';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { useGetLocalidad } from 'src/api/Localidad';

const SearchBar = ({ onSearch }) => {
  const [selectedLocalidad, setSelectedLocalidad] = useState('');
  const { localidad, localidadLoading, localidadError } = useGetLocalidad();

  const handleSearch = () => {
    onSearch({ selectedLocalidad: selectedLocalidad ? Number(selectedLocalidad) : '' });
  };

  if (localidadError) {
    return <div>Error al cargar las localidades.</div>;
  }

  if (localidadLoading) {
    return <div>Cargando localidades...</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', marginTop: '15px' }}>
      <FormControl variant="outlined" style={{ width: '300px' }}>
        <InputLabel>Filtre por Localidad...</InputLabel>
        <Select
          value={selectedLocalidad}
          onChange={(e) => setSelectedLocalidad(e.target.value)}
          label="Localidad"
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          {localidad.map((loc) => (
            <MenuItem key={loc.id} value={loc.id}>
              {loc.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title="Buscar">
        <IconButton
          color="primary"
          onClick={handleSearch}
          sx={{
            border: '1px solid lightblue',
            padding: '10px',
          }}
        >
          <SearchOutlined style={{ fontSize: '24px' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default SearchBar;
