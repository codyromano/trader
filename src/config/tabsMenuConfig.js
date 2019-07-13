import routePaths from 'aurae-config/routePaths';

export const TAB_ID_GARDEN = 'garden';
export const TAB_ID_WEATHER = 'weather';
export const TAB_ID_TREATS = 'treats';

export default [
  {
    id: TAB_ID_GARDEN,
    label: 'Your Garden',
    pathname: routePaths.VIEW_GARDEN,
    value: routePaths.VIEW_GARDEN,
    relatedRouteIds: {
      garden: true,
      placeResource: true,
      plant: true
    }
  },
  {
    id: TAB_ID_WEATHER,
    label: 'Weather',
    pathname: routePaths.WEATHER_PAGE,
    value: routePaths.WEATHER_PAGE,
    relatedRouteIds: {
      weather: true
    }
  },
  {
    id: TAB_ID_TREATS,
    label: 'Treats',
    pathname: routePaths.TREATS,
    value: routePaths.TREATS,
    // Note: Redux should be the single source of truth for notices. This
    // is just the initial notice value - here temporarily for demo purposes.
    notices: 0,
    relatedRouteIds: {
      treats: true
    }
  }
];
