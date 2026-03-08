export const useApi = async <T>(pathUrl: string = '', method = 'GET', body = {}): Promise<T> => {
    try {
        const urlBase = 'http://localhost:8000/api';
        const token = localStorage.getItem('token') || '';
        const options: RequestInit = {
            method,
            headers: {
                'Accept': 'aplication/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if (Object.keys(body).length > 0) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${urlBase}${pathUrl}`, options);
        const data = await response.json();

        // TODO: Ver que pasa cuando vence el token, o que se borre del localstorage y ejecutar alguna acción 
        data.ok = response.ok;
        return data;
    } catch (error) {
        localStorage.removeItem('rol');  
        localStorage.removeItem('token');  
        throw new Error('Ocurrió un error al realizar la petición');
    };
};