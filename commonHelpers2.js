import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";const t=document.querySelector(".form");t.addEventListener("submit",a);function a(r){r.preventDefault();const o=t.querySelector('input[name="delay"]').value,i=t.elements.state.value;new Promise((e,n)=>{setTimeout(()=>{i==="fulfilled"?e(o):n(o)},o)}).then(e=>{s.success({icon:!1,message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter",messageColor:"white",backgroundColor:"#4CAF50"})}).catch(e=>{s.error({icon:!1,message:`❌ Rejected promise in ${e}ms`,messageColor:"white",position:"topCenter",backgroundColor:"#E53935"})})}
//# sourceMappingURL=commonHelpers2.js.map
