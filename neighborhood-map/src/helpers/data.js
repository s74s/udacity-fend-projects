export const mapCenter = {
  lat: 51.706894, 
  lng: 39.160884
}

export const MAP_API_KEY = 'AIzaSyAge91jiV8-YghZrpS9-uWHTdj3ePgXybg'

export const FS = {
  API_URL_SEARCH: '//api.foursquare.com/v2/venues/search',
  LL: `${mapCenter.lat},${mapCenter.lng}`,
  V: '20180517',
  CLIENT_ID: 'DO4L4MWG23AOWZNZ55FIYVB2GAI4WFFYFJIUSXK15KPHDSRK',
  CLIENT_SECRET: 'XE4BBGLAT54ZJLCK4LAT142NZUMMSBLVUNZJYZEUDJCK4GAW',
}

export const FS_API_SEARCH_URL = `${FS.API_URL_SEARCH}?client_id=${FS.CLIENT_ID}&client_secret=${FS.CLIENT_SECRET}&ll=${FS.LL}&v=${FS.V}`