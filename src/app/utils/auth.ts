export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('Authorization');
  return !!token;
}; 