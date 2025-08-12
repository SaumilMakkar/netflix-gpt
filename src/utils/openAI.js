import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';
 export const openai = new OpenAI({
  apiKey:process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser:true  // store securely
});


