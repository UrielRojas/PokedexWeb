window.onload = main; 

function main(){

    //Llama la función cada 30 ClickBoton()
    let timer = setInterval(() => {
        ClickBoton(timer);
    }, 30*1000);

    //Entra a la función ClickBoton si es presionada
    let btnLoad = document.getElementById("btnLoad");
    btnLoad.addEventListener('click', ClickBoton);

}



//cargar el URL de la api
async function loadAPI(url){
    let response = await fetch(url);
    return await response.json();
}


async function ClickBoton(timer){
    //Limpia el intervarlo si entra a la función
    clearInterval(timer);

    //Declaración de variables
    let randomNumber = Math.floor(Math.random() * (1010 - 1 + 1)) + 1; //Genera número aleatorios
    let jsonAbilities = await loadAPI(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
    let listaPoke = [];
    let list_group_item = document.getElementById("Poke-list");

    console.log(jsonAbilities);

    //Limpia las etiquetas creadas
    if(list_group_item.firstChild != null){
        while (list_group_item.firstChild) {
            list_group_item.removeChild(list_group_item.firstChild);
        }
    }
    

    
    //Agregar nombre del pokemon
    document.getElementById("pokeName").innerHTML = jsonAbilities.name;

    //Agrega las habilidades del pokemon
    for (let i = 0; i < jsonAbilities.abilities.length; i++) {
        listaPoke[i] = jsonAbilities.abilities[i].ability.name
        //console.log(jsonAbilities.abilities[i].ability.name);

        let tag = document.createElement("li");
        tag.innerHTML = `Habilidad ${i+1}: ${listaPoke[i]}`;
        list_group_item.appendChild(tag);
    }

    //Agregar las imágenes del pokemon
    if(jsonAbilities.sprites.back_default!=null){
        document.getElementById("pokeImgB").src = jsonAbilities.sprites.back_default;
    }else document.getElementById("pokeImgB").src = 'https://static.thenounproject.com/png/1496955-200.png';
    if(jsonAbilities.sprites.back_shiny!=null){
        document.getElementById("pokeImgD").src = jsonAbilities.sprites.back_shiny;
    }else document.getElementById("pokeImgD").src = 'https://static.thenounproject.com/png/1496955-200.png';
    
    if(jsonAbilities.sprites.front_default!=null){
        document.getElementById("pokeImgS").src = jsonAbilities.sprites.front_default;
    }else document.getElementById("pokeImgS").src = 'https://static.thenounproject.com/png/1496955-200.png';
    
    if(jsonAbilities.sprites.front_shiny!=null){
        document.getElementById("pokeImgDS").src = jsonAbilities.sprites.front_shiny;
    }else document.getElementById("pokeImgDS").src = 'https://static.thenounproject.com/png/1496955-200.png';
    
    

}