// Función para generar un color aleatorio x nombre
const getColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
    }
    
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#DAF7A6',
        '#33FFF6', '#FF33D4', '#FF8C33', '#8C33FF', '#FF3333'
    ];
    
    return colors[hash % colors.length]; // Selecciona un color basado en el hash
};

export default getColorFromName;