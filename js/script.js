//  API'S
const apiKey = "20336aae4b9d87e49b117a21043ee1d2";
const apiCountryURL ="https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// variáveis e ID'S
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button")


//  Funções
const toggleLoader = () => {    //loading
    loader.classList.toggle("hide"); // Se estiver visível, remova-o, caso contrário, adicione-o
  };

const getWeatherData = async(city) => { //botar a cidade na api de busca, com unidades metricas e pt_br
    toggleLoader();
    const apiWratherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWratherURL) //obter resposta da api
    const data = await res.json(); //transforma de json para objetos js
    toggleLoader();
    errorMessageContainer.classList.add("hide");
    return data;
    
};
//erro 
const showErrorMessage = () => { // funcao que tira o hide do texto de erro
    errorMessageContainer.classList.remove("hide");
  };
  const hideInformation = () => { //funcao que esconde a mensagem de erro depois de checar se houve ou não um erro.
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
    suggestionContainer.classList.add("hide");
  };

const showWeatherData = async(city) => { //pegar a cidade do input
    const data = await getWeatherData(city) // chama a função
    if (data.cod === "404") {
        showErrorMessage();
        
        return;
    };
    //mudando os elementos de acodo com o preview da fetch api
    cityElement.innerText = data.name; // muda o nome na interface para o nome que digitou
    tempElement.innerText = parseInt(data.main.temp) // muda a temperatura
    descElement.innerText = data.weather[0].description; //muda a descrição
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`); //muda o icon do clima
    countryElement.setAttribute("src", apiCountryURL + data.sys.country); //muda o icon do pais
    humidityElement.innerText = `${data.main.humidity}%`; //muda a umidade 
    windElement.innerText = `${data.wind.speed}km/h`; //muda o vento

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`; //

    weatherContainer.classList.remove("hide"); // remove a mensagem de erro caso não tenha erro

};


  
//  Eventos
searchBtn.addEventListener("click", async (e) =>{ //add evento de click
    e.preventDefault(); //Cancela o evento se for cancelável, sem parar a propagação do mesmo.

    const city = cityInput.value; //valor do input (nome da cidade)
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{ //adiciona evento de tecla

    if(e.code === "Enter"){ //confere se a tecla é o Enter
        const city = e.target.value //valor do input

        showWeatherData(city); // aciona a funcao passando a cidade
    }
});

suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });