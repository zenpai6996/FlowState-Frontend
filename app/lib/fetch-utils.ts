
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchData = async (path:string ,options: RequestInit = {}) => {
  const response = await fetch(`$BASE_URL/${path}`,options);
  return response.json();
};