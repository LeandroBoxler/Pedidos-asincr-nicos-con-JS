window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  const favorites = JSON.parse(sessionStorage.getItem("favorites22"))

  //Codigo que debemos usar para mostrar los datos en el frontend


    try {
  
      const response = await fetch("http://localhost:3031/api/movies")
    
      const result   = await response.json();
      const {data,meta} = result 
  

      console.log(data)
      console.log(favorites)

      if (favorites.length == 0) {
        
        const noPeli = document.createElement("H1")
        noPeli.textContent="no hay peliculas"
        noPeli.setAttribute("class","hola")
        app.appendChild(noPeli)
        

        

      }

    data.forEach((movie) => {



      favorites.forEach(a => {
 
        if (movie.id == a) {

        
      
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
  
    }  });
    });
    const inicio = document.createElement("a")
    inicio.textContent="volver"
    inicio.setAttribute("href",`home.html`)
    
    app.appendChild(inicio) } catch (error) {
      
    }

};
