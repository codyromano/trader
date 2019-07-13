import { CLASS_PLANT } from 'aurae-config/resourceClasses';

/**
* Defines the text, graphic and initial stats for game items.
* This information does not change.
*/
const resourceTypes = [
  {
    class: CLASS_PLANT,
    resourceTypeId: 'sweetSprout',
    evolvesInto: [
      {
        childId: 'sugarOak',
        weight: 1
      }
    ],
    evolveSound: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/plant-evolved.mp3',
    title: 'Sweet Sprout',
    itemClassDescription: 'Dessert plant',
    fullDescription: `Discovered by Belgian explorers in the year 2035, the Sweet Sprout
      is a mystical cold-weather plant. With enough water, it evolves into the Sugar
      Oak: a mighty tree that yields baked delicacies.`,
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-image-sugar-sprout.jpg',
    imageSrcFull: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-image-sugar-sprout-full.gif',
    stats: {
      level: 1,
      waterLevel: 0
    }
  },
  {
    class: CLASS_PLANT,
    resourceTypeId: 'sugarOak',
    evolvesInto: [],
    evolveSound: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/plant-evolved.mp3',
    title: 'Sugar Oak',
    itemClassDescription: 'Dessert plant',
    fullDescription: `Engaging description`,
    imageSrc: 'https://www.models-resource.com/resources/big_icons/15/14427.png',
    imageSrcFull: 'https://arc-anglerfish-arc2-prod-spectator.s3.amazonaws.com/public/EHYBETU4DBDVBFCGWX6ETXNEOU',
    stats: {
      level: 2,
      waterLevel: 0
    }
  },
  {
    class: CLASS_PLANT,
    resourceTypeId: 'steamBean',
    evolvesInto: [
      {
        childId: 'gigaBean',
        weight: 1
      }
    ],
    evolveSound: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/plant-evolved.mp3',
    title: 'Steam Bean',
    itemClassDescription: 'Coffee plant',
    fullDescription: `A marvel of genetic engineering, the Steam Bean contains billions
      of nanorobots. They arrange themselves into cappuccino art while your
      neighborhood barista pours you a cup.`,
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-image-sugar-java-bean.jpg',
    imageSrcFull: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-image-steam-bean-full.gif',
    stats: {
      level: 1,
      waterLevel: 0
    }
  },
  {
    class: CLASS_PLANT,
    resourceTypeId: 'gigaBean',
    evolvesInto: [],
    evolveSound: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/sound-effects/plant-evolved.mp3',
    title: 'Gigabean',
    itemClassDescription: 'Coffee plant',
    fullDescription: `Coming soon`,
    imageSrc: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-evolved-gigabean.png',
    imageSrcFull: 'https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/resource-gigabean.gif',
    stats: {
      level: 2,
      waterLevel: 0
    }
  }
];

export default resourceTypes;
