// Syntetyczne zdarzenia wysyłane do dokumentu klienta (iframe tego samego origin).
// NIEZWERYFIKOWANE z prawdziwym Eaglercraft – klient nie jest dołączony.
let frame;export const setFrame=f=>{frame=f};
const doc=()=>{try{return frame&&frame.contentDocument}catch{return null}};
const tgt=()=>{const d=doc();return d&&(d.querySelector('canvas')||d.body)};
const K={KeyW:[87,'w'],KeyA:[65,'a'],KeyS:[83,'s'],KeyD:[68,'d'],Space:[32,' '],ShiftLeft:[16,'Shift'],KeyE:[69,'e']};
export function key(code,down){const t=tgt(),k=K[code];if(!t||!k)return;
 t.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,key:k[1],keyCode:k[0],which:k[0],bubbles:true,cancelable:true}))}
export function mouse(btn,down){const t=tgt();if(!t)return;
 t.dispatchEvent(new MouseEvent(down?'mousedown':'mouseup',{button:btn,buttons:down?(btn===2?2:1):0,bubbles:true,cancelable:true,view:t.ownerDocument.defaultView}))}
export function look(dx,dy){const t=tgt();if(!t)return;
 t.dispatchEvent(new MouseEvent('mousemove',{movementX:dx,movementY:dy,bubbles:true,view:t.ownerDocument.defaultView}))}
