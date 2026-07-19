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

        if (response.status === 401) {
            localStorage.removeItem('rol');
            localStorage.removeItem('token');
            localStorage.removeItem('nameUser');
            window.location.href = '/auth/login';
        }

        data.ok = response.ok;
        return data;
    } catch (error) {
        localStorage.removeItem('rol');  
        localStorage.removeItem('token');  
        localStorage.removeItem('nameUser');
        throw new Error('Ocurrió un error al realizar la petición');
    };
};