const key='cleancity_reports_v1';
let reports=JSON.parse(localStorage.getItem(key)||'[]');
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(key,JSON.stringify(reports));render()}
function render(){
 $('total').textContent=reports.length;$('resolved').textContent=reports.filter(x=>x.status==='Resolved').length;$('open').textContent=reports.filter(x=>x.status==='Open').length;
 const f=$('filter').value;const shown=reports.filter(x=>f==='all'||x.status===f);
 $('list').innerHTML=shown.length?shown.slice().reverse().map(x=>`<article class="item"><div><h3>${esc(x.location)} · ${esc(x.category)}</h3><p>${esc(x.description)}</p><small>${new Date(x.created).toLocaleString()}</small>${x.status==='Open'?`<button class="resolve" onclick="resolveReport('${x.id}')">Mark as resolved →</button>`:''}</div><span class="status ${x.status}">${x.status}</span></article>`).join(''):'<div class="empty">No reports here yet. Be the first to contribute!</div>';
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('form').addEventListener('submit',e=>{e.preventDefault();reports.push({id:crypto.randomUUID(),location:$('location').value.trim(),category:$('category').value,description:$('description').value.trim(),status:'Open',created:new Date().toISOString()});save();e.target.reset();toast('Report submitted successfully.')});
function resolveReport(id){reports=reports.map(x=>x.id===id?{...x,status:'Resolved'}:x);save();toast('Report marked as resolved.')}
$('filter').addEventListener('change',render);
function toast(s){$('toast').textContent=s;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2200)}
render();
