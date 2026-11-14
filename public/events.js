/* Muzayyan · event types by wedding style. Used by the order form, free try, edit page and kit.
 */
(function(){
const NAMES={mehndi:"Mehndi",mayun:"Mayun",dholki:"Dholki",sangeet:"Sangeet",nikah:"Nikah",baraat:"Baraat",rukhsati:"Rukhsati",walima:"Walima",engagement:"Engagement",
 welcome:"Welcome Party",bridalshower:"Bridal Shower",bachelor:"Bachelor Party",bachelorette:"Bachelorette Party",rehearsal:"Rehearsal Dinner",ceremony:"Ceremony",cocktail:"Cocktail Hour",reception:"Reception",afterparty:"After Party",
 henna:"Henna Night",katb:"Katb Al-Kitab",zaffa:"Zaffa",other:"Event"};
const STYLES={
 southasian:{label:"South Asian",events:["mehndi","mayun","dholki","sangeet","nikah","baraat","rukhsati","walima","engagement"],def:["nikah","baraat","walima"]},
 western:{label:"Western",events:["engagement","bridalshower","bachelor","bachelorette","welcome","rehearsal","ceremony","cocktail","reception","afterparty"],def:["ceremony","reception"]},
 arab:{label:"Arab",events:["engagement","henna","katb","zaffa","reception"],def:["katb","zaffa"]}
};
const IMG={mehndi:"baraat",mayun:"baraat",dholki:"baraat",sangeet:"baraat",nikah:"nikah",baraat:"baraat",rukhsati:"baraat",walima:"walima",engagement:"nikah",
 welcome:"baraat",bridalshower:"nikah",bachelor:"baraat",bachelorette:"baraat",rehearsal:"walima",ceremony:"nikah",cocktail:"walima",reception:"walima",afterparty:"baraat",
 henna:"baraat",katb:"nikah",zaffa:"baraat",other:"walima"};
function styleOf(types){types=types||[];for(const s of ["western","arab"])if(types.some(t=>STYLES[s].events.includes(t)&&!STYLES.southasian.events.includes(t)))return s;return "southasian"}
window.BW_EVENTS={NAMES,STYLES,IMG,styleOf,name:k=>NAMES[k]||NAMES.other};
})();
