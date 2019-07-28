export const STARTING_DEBT = 0;
export const TRAVEL_COST = 2.5;
export const MILLION = 1000000;
export const BILLION = MILLION * 1000;
export const TRILLION = BILLION * 1000;
export const STARTING_CASH = 30;

const CITIES = [
  {
    id: 'sea',
    name: 'Seattle',
  },
  {
    id: 'nyc',
    name: 'New York',
  },
  {
    id: 'mia',
    name: 'Miami',
  },
];

export const itemPouches = [
  {
    amount: 50,
    cost: 40,
  },
  {
    amount: 75,
    cost: 100,
  },
  {
    amount: 150,
    cost: 500,
  },
  {
    amount: 500,
    cost: 10000,
  },
  {
    amount: 100 * 10 * 10 * 10 * 10,
    cost: 100 * 10 * 10 * 10 * 10,
  },
];

export const purchasableItems = [
  {
    visibleInitially: true,
    id: 'coffee',
    quantity: 0,
    value: 2,
    min: 1,
    max: 3,
    title: 'Coffee',
    imageSrc: 'https://freeiconshop.com/wp-content/uploads/edd/coffee-takeaway-flat.png',
  },
  {
    visibleInitially: true,
    id: 'flowers',
    quantity: 0,
    value: 8,
    min: 7,
    max: 15,
    title: 'Flowers',
    imageSrc: 'http://www.iconarchive.com/download/i103416/paomedia/small-n-flat/flower.ico',
  },
  {
    visibleInitially: true,
    id: 'kiwi',
    quantity: 0,
    value: 4,
    min: 3.75,
    max: 5,
    title: 'Kiwi',
    imageSrc: 'https://img.icons8.com/cotton/2x/kiwi-fruit.png',
  },
  {
    visibleInitially: false,
    id: 'concertTickets',
    quantity: 0,
    value: 30,
    min: 25,
    max: 32,
    title: 'Concert Tickets',
    imageSrc:
      'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2015/04/20235524/Ocghx21U8BBFNQJf1hCCoAM1COWogYiv0AFliocu-972x597.jpeg',
  },
  {
    visibleInitially: true,
    id: 'fineArt',
    quantity: 0,
    value: 10000,
    min: 10000,
    max: 10000 * 3,
    title: 'Fine art',
    imageSrc: 'placeholder.jpg',
    specificToPlayer: 'rene',
  },
  {
    id: 'rover',
    quantity: 0,
    value: 100,
    min: 50,
    max: 150,
    title: 'Rover',
    imageSrc: 'https://apprecs.org/gp/images/app-icons/300/aa/com.rover.android.jpg',
  },
  {
    id: 'goog',
    quantity: 0,
    value: 623,
    min: 500,
    max: 800,
    title: 'Google',
    imageSrc:
      'https://cdn3.iconfinder.com/data/icons/google-suits-1/32/1_google_search_logo_engine_service_suits-512.png',
  },
  {
    id: 'msft',
    quantity: 0,
    value: 300,
    min: 100,
    max: 500,
    title: 'Microsoft',
    imageSrc: 'https://cdn1.iconfinder.com/data/icons/flat-and-simple-part-1/128/microsoft-512.png',
  },

  {
    id: 'lambo',
    quantity: 0,
    value: 300000,
    min: 200000,
    max: 300000,
    title: 'Lamborghini',
    imageSrc:
      'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/media/assets/submodel/8551.jpg',
  },

  {
    id: 'house',
    quantity: 0,
    value: MILLION * 5,
    min: MILLION,
    max: MILLION * 10,
    title: 'House in Beverly Hills',
    imageSrc:
      'data:image/jpeg;base64,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',
  },
  {
    id: 'spaceShuttle',
    quantity: 0,
    value: BILLION,
    min: BILLION, // 1 billion
    max: BILLION * 1.5,
    title: 'Intergalactic Spacecraft',
    imageSrc:
      'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2003/05/spacelab_in_orbit_1970s_concept/10209076-2-eng-GB/Spacelab_in_orbit_1970s_concept_large.jpg',
  },
  {
    id: 'spaceShuttle',
    quantity: 0,
    value: BILLION,
    min: BILLION * 50,
    max: BILLION * 5.1,
    title: 'Space Colony on Venus',
    imageSrc: 'https://statik.tempo.co/data/2019/04/04/id_831576/831576_720.jpg',
  },
];
