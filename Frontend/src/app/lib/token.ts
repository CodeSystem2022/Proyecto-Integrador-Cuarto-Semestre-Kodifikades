function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

function setAuthToken(token: string) {
  localStorage.setItem("token", token);
  return true;
}

function removeAuthToken(remove: boolean){
  if(!remove) return;
  localStorage.removeItem('token');
}
export { getToken, setAuthToken, removeAuthToken };
