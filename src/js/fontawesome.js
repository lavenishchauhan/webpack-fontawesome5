import{library,dom} from '@fortawesome/fontawesome-svg-core';
import {faSpinner, faAllergies,faUser} from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

let fontIcon = [faSpinner, faAllergies,faUser,faTwitter];

library.add(fontIcon);
dom.watch();




