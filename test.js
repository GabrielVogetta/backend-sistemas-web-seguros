(() => {
  // Login
  fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3ODk2NDU4MTEyNjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODk4NjAyMjQsImV4cCI6MTc4OTg2MzgyNH0.zKujTMH3r4mjuv68Txv2Md8rH5LmNmZqBXhj7V238_c"
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log("Erro: " + error)
    })

    // 8080/login", {
    //   method: "POST",
    //   headers: {
    //     authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3ODk2NDU4MTEyNjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODk4NjAyMjQsImV4cCI6MTc4OTg2MzgyNH0.zKujTMH3r4mjuv68Txv2Md8rH5LmNmZqBXhj7V238_c"
    //   }

})()