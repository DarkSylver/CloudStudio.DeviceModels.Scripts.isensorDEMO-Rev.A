function parseUplink(device, payload) {
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    if (!jsonPayload) { return; }

    // Procesar JSON de Node-RED
    if (jsonPayload.device === "Nodered") {
        const data = jsonPayload.data;
        
        // Recorrer los departamentos en el JSON de Node-RED
        Object.keys(data).forEach(department => {
            const departmentNumber = parseInt(department.match(/\d+/)[0]); // Extraer el número de departamento
            let pulso = data[department]; // Obtener el valor del departamento desde el JSON de Node-RED
            
            // Redondear el valor del pulso a dos decimales
            pulso = parseFloat(pulso.toFixed(2));
            
            // Actualizar el valor del sensor correspondiente en tu sistema
            const departmentEndpoint = device.endpoints.byAddress(departmentNumber);
            if (departmentEndpoint) {
                departmentEndpoint.updateGenericSensorStatus(pulso);
                env.log(`Departamento ${departmentNumber} valor --> ${pulso}`);
            }
        });
    }
}
