export const weatherOptions = [
  {
    day: true,
    coordinate:"clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },

  {
    day: true,
    coordinate:"cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    coordinate:"fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },

  {
    day: true,
    coordinate:"rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },

  {
    day: true,
    coordinate:"snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },

  {
    day: true,
    coordinate:"storm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },

  {
    day: false,
    coordinate:"clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },

  {
    day: false,
    coordinate:"cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    coordinate:"fog",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },

  {
    day: false,
    coordinate:"rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },

  {
    day: false,
    coordinate:"snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },

  {
    day: false,
    coordinate:"storm",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },

  
];

export const defaultWeatherOptions ={
  day:{
    url: new URL ("../assets/day/default.png", import.meta.url).href,
  },
  night:{
    url: new URL ("../assets/night/default.png", import.meta.url).href,
  },
};

  
export const defaultClothingItems = [
    {
      _id: 0,
      name: "Cap",
      weather: "hot",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
    },
    {
      _id: 1,
      name: "Hoodie",
      weather: "warm",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    },
    {
      _id: 2,
      name: "Jacket",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
    },
    {
      _id: 3,
      name: "Sneakers",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
    },
    {
      _id: 4,
      name: "T-Shirt",
      weather: "hot",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    },
    {
      _id: 5,
      name: "Coat",
      weather: "cold",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    }
  ]

  export const coordinates = {
    latitude:38.883930,
    longitude:-77.173698,
  };

  export const APIkey = "74f850b460fbdc6214c892c288ed5bf8";