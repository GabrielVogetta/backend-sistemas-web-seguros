async function getUsers() {
  const url = 'http://localhost:8080/api/users';
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch failed:', error.message);
  }
};

getUsers();