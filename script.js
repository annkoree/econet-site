
const storageKey = 'econet_demo_v2';
function loadState(){
  const raw = localStorage.getItem(storageKey);
  if(raw){try{return JSON.parse(raw);}catch(e){}}
  return {name:'',points:0,counts:{paper:0,plastic:0,general:0}};
}
function saveState(s){localStorage.setItem(storageKey,JSON.stringify(s));}
let state=loadState();
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('nameInput').value=state.name||'';updateUI();});
function addItem(type){
  if(!['paper','plastic','general'].includes(type))return;
  state.counts[type]=(state.counts[type]||0)+1;
  state.points=(state.points||0)+(type==='general'?2:10);
  saveState(state);updateUI();
}
function updateUI(){
  document.getElementById('paperCount').textContent=state.counts.paper||0;
  document.getElementById('plasticCount').textContent=state.counts.plastic||0;
  document.getElementById('generalCount').textContent=state.counts.general||0;
  document.getElementById('points').textContent=state.points||0;
}
document.getElementById('nameInput')?.addEventListener('input',e=>{state.name=e.target.value;saveState(state);});
function resetProfile(){
  if(confirm('Сбросить профиль и локальные данные?')){
    state={name:'',points:0,counts:{paper:0,plastic:0,general:0}};
    saveState(state);updateUI();
  }
}
