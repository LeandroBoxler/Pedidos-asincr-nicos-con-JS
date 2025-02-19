

let favorites = sessionStorage.getItem("favorites22")? JSON.parse(sessionStorage.getItem("favorites22")):sessionStorage.setItem("favorites22",JSON.stringify([]))


const favoriteChange = (e,id) =>{
  
   e.target.classList.toggle("fa-solid")


   if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !=id)
    
    sessionStorage.setItem("favorites22",JSON.stringify(favorites))
   }else{
    favorites.push(id)
    sessionStorage.setItem("favorites22",JSON.stringify(favorites))
   }
   
  if (favorites.length) {
    const nuevo = document.createElement("a")
    const app = document.getElementById("root");
    nuevo.setAttribute("href",`favoritas.html`)
    nuevo.textContent = `favorita`;
    app.appendChild(nuevo);

  }
  
  }

 



window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  

  
  // Aqui debemos agregar nuestro fetch
  /*app.use('*', (req,res) => {
  return res.status(404).json({
    status : 404,
    msg: 'not found'
  })
})*/



  try {
    const response = await fetch("http://localhost:3031/api/movies")
    
    const result   = await response.json();
    const {data,meta} = result  
    
    
    
    data.forEach((movie) => {
      console.log(movie.id)
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const link = document.createElement("a")
      link.textContent = "editar"
      link.setAttribute("href",`formulario.html?id=${movie.id}&edit=${true}`)

      card.appendChild(link)

      const favoriteLink = document.createElement("a")
      favoriteLink.setAttribute("href","#")
      favoriteLink.setAttribute("class","favorite")
      favoriteLink.style.color="red"
      favoriteLink.innerHTML=`<i class="fa-regular ${favorites.includes(movie.id)?"fa-solid":"fa-regular"} fa-heart fa-lg"></i>` 
      favoriteLink.setAttribute ("onClick",`favoriteChange(event,${movie.id})`)
      
      card.appendChild(favoriteLink)
    });
  
    
  } catch (error) {
    console.log(error)
  }



  // Codigo que debemos usar para mostrar los datos en el frontend
    
 
};
