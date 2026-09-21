// Simular token salvo no frontend
// Em caso real, seria salvo em cookie ou localstorage
let token = "";
let user = {};
let users = [];

async function login(email, password) {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    });
    const data = await response.json();
    token = await data.user.token;
    user = data.user;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
}

async function returnUsers(){
   const response = await fetch(`http://localhost:${process.env.PORT || 3000}/users`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });
 
    const data = await response.json();
    return data;
}

async function test(){
  // Realizar login de admin
  await login('admin@email.com', '123');
  console.log("Primeiro passo: admin loga")
  
  // Receber lista de usuários
  users = await returnUsers();
  // Verificar admin
  console.log("Segundo passo: admin existe")
  console.log(users.find(user => user.role === "admin"));

  // Deletar a si mesmo
  const deleteResponse = await deleteUser(user.id);
  console.log("Tercerio passo, admin se deleta: " + deleteResponse.message);

  // Realizar login de operador
  await login('operator@email.com', '456');
  console.log("Quarto passo: operator loga")

  // Receber lista de usuários
  users = await returnUsers();
  
  // Verificar admin
  console.log("Quinto passo: admin não existe")
  console.log(users.find(user => user.role === "admin"));
}

test();