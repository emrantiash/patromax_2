import { I18n } from "i18n-js";

import en from './en.json';
import bn from './bn.json';

 const i18n = new I18n({
  en ,
  bn 
});

i18n.enableFallback = true 
export {i18n }



//   i18n.locale = getLocales()[1].languageCode

// console.log(i18n.t('Total'));
