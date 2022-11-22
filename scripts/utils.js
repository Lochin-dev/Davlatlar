
// ========================= CUSTOM DOM SELLLECTOR ========================
const $=sellector => document.querySelector(sellector)
const $$=sellector =>document.querySelectorAll(sellector)


// ========================= DYNAMIK CREATE_ELEMENT =======================

   const createElement =function(tegName,className,content){
      const newElement=document.createElement(tegName);
      if(className){
         newElement.setAttribute('class' , className);
      }
      if(content){
         newElement.innerHTML=content;
      }
      return newElement
   }

