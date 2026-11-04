const P='yehhicraft:';
export const get=(k,d)=>{try{const v=localStorage.getItem(P+k);return v==null?d:JSON.parse(v)}catch{return d}};
export const set=(k,v)=>{try{localStorage.setItem(P+k,JSON.stringify(v))}catch(e){console.warn('storage',e)}};
export const url=p=>new URL(p,document.baseURI).href;
