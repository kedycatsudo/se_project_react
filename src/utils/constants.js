export const weatherOptions = [
  {
    day: true,
    condition: 'clear',
    url: new URL('../assets/day/day_clear.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'clouds',
    url: new URL('../assets/day/day_cloudy.svg', import.meta.url).href,
  },
  {
    day: true,
    condition: 'rainy',
    url: new URL('../assets/day/day_rainy.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'storm',
    url: new URL('../assets/day/day_storm.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'snow',
    url: new URL('../assets/day/day_snow.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'fog',
    url: new URL('../assets/day/day_fog.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clear',
    url: new URL('../assets/night/night_clear.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clouds',
    url: new URL('../assets/night/night_cloudy.svg', import.meta.url).href,
  },
  {
    day: false,
    condition: 'rainy',
    url: new URL('../assets/night/night_rainy.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'storm',
    url: new URL('../assets/night/night_storm.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'snow',
    url: new URL('../assets/night/night_snow.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'fog',
    url: new URL('../assets/night/night_fog.png', import.meta.url).href,
  },
];
export const defaultClothingItems = [
  {
    _id: 0,
    name: 'Cap',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591',
  },
  {
    _id: 1,
    name: 'Hoodie',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8',
  },
  {
    _id: 2,
    name: 'Jacket',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad',
  },
  {
    _id: 3,
    name: 'Sneakers',
    weather: 'warm',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f',
  },
  {
    _id: 4,
    name: 'T-Shirt',
    weather: 'hot',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09',
  },
  {
    _id: 5,
    name: 'Coat',
    weather: 'cold',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4',
  },
  {
    _id: 5,
    name: 'Hat',
    weather: 'warm',
    link: 'telegram-cloud-photo-size-2-5282725103550971737-y.png',
  },
];
export const coordinates = { latitude: 36.2497114, longitude: -83.7988651 };
export const APIkey = '163c410ee7b797ec70a789955eb022c4';
