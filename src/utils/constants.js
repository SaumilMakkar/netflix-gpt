export const LOGO="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
export const USER_AVATAR="https://avatars.githubusercontent.com/u/150394809?v=4"

export const API_OPTIONS={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+ process.env.REACT_APP_TMDB_KEY
  }
};

export const MOVIE_OPTIONS={
  
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2I2ODgzYjE4Y2M4ZmVkNWQwYjQ2MTgxZDEyNzU2ZSIsIm5iZiI6MTc1NDczODQ1My40MTkwMDAxLCJzdWIiOiI2ODk3MmYxNTY3NjA4M2VmMjI5MmU5ZWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.K5a0ynFTBHOL0pwmaW-NbrWZG_pirLOnJFnAHp3bOwY'
  }
};

export const IMG_CDN="https://image.tmdb.org/t/p/w200/"

export const BG_IMAGE='https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg'

export const SUPPORTED_LANGUAGES=[
  {
    identifier:"en",
    name:"English"
  },
   {
    identifier:"hindi",
    name:"Hindi"
  },
   {
    identifier:"spanish",
    name:"Spanish"
  },

]

export const OPENAI_KEY=process.env.REACT_APP_OPENAI_KEY