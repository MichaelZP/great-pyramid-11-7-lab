'use strict';
const $=id=>document.getElementById(id),fmt=(v,n=2)=>v.toFixed(n);
const colors={1:'#70dfca',2:'#ffbe86'},names={perspective:'Widok perspektywiczny',side:'Widok z boku · XZ',top:'Widok z góry · XY'};
let current={progress:0,phase:0,speed:1,running:false},player;
// Optional stage 11 extension; stage 10 works without it.
const extension=globalThis.VortexPreviewExtension;
let sourceCache;
let sectionCache;
function cachedSection(alpha,z0){if(sectionCache?.alpha!==alpha||sectionCache?.z0!==z0)sectionCache={alpha,z0,value:section(alpha,z0)};return sectionCache.value;}
let torusCache;
function torusLines(d){if(torusCache?.d!==d)torusCache={d,pair:Vortex.pair(d).map(t=>({t,rings:Array.from({length:6},(_,j)=>Vortex.loop(u=>Vortex.point(t,u,Vortex.TAU*j/6),96)),sections:Array.from({length:12},(_,j)=>Vortex.loop(v=>Vortex.point(t,Vortex.TAU*j/12,v),48)),lanes:Array.from({length:3},(_,j)=>Vortex.loop(a=>Vortex.lane(t,a,Vortex.TAU*j/3))),theta:Vortex.loop(u=>Vortex.point(t,u,t.id===1?0:Math.PI)),psi:Vortex.loop(v=>Vortex.point(t,0,v))}))};return torusCache.pair;}
function cachedSource(o,q){const key=[o.alpha,o.z0,o.lo,o.hi,$('variant').value,q].join('|');if(sourceCache?.key!==key)sourceCache={key,value:Vortex.source(o,$('variant').value,q)};return sourceCache.value;}
function setup(id){const canvas=$(id),box=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,extension?.pixelRatio?.()??2);const width=Math.round(box.width*d),height=Math.round(box.height*d);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}const ctx=canvas.getContext('2d');ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,box.width,box.height);return{ctx,w:box.width,h:box.height};}
function projection(view,w,h){
 const custom=extension?.projection?.(view,w,h);if(custom)return custom;
 const scale=Math.min((w-40)/16,(h-50)/17),c=[0,0,7];
 return p=>{
  if(view==='side')return[w/2+p[0]*scale,h/2-(p[2]-7)*scale];
  if(view==='top')return[w/2+p[0]*scale,h/2-p[1]*scale];
  // A fixed perspective camera. Geometry and camera never fit each other.
  const x=.8660254038*p[0]-.5*p[1],radial=.5*p[0]+.8660254038*p[1];
  const y=.8660254038*(p[2]-c[2])-.5*radial,depth=.8660254038*radial+.5*(p[2]-c[2]);
  const k=35/(35-depth);return[w/2+x*scale*k,h/2-y*scale*k];
 };
}
function stroke(ctx,points,color,width=1,dash=[]){ctx.beginPath();for(let i=0;i<points.length;i++)i?ctx.lineTo(...points[i]):ctx.moveTo(...points[i]);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
function arrow(ctx,project,from,to,color){const a=project(from),b=project(to),dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len<.5)return;const x=dx/len,y=dy/len;stroke(ctx,[a,b],color,2);stroke(ctx,[[b[0]-6*x+3*y,b[1]-6*y-3*x],b,[b[0]-6*x-3*y,b[1]-6*y+3*x]],color,2);}
function draw(id,view,o,q,d){
 const {ctx,w,h}=setup(id),project=projection(view,w,h),fade=Vortex.reveal(current.progress),source=cachedSource(o,q),pair=Vortex.pair(d),records=[];
 const systems=$('systems').value,visible=t=>systems==='both'||systems===(t===1?'first':'second');
 const line=(points,color,width,layer,system=0,alpha=1,dash=[])=>{if(alpha<=0)return;records.push({points,layer,system,alpha});ctx.globalAlpha=alpha;stroke(ctx,points.map(project),color,width,dash);ctx.globalAlpha=1;};
 const label=(text,p,color,dx=8,dy=-8)=>{if(extension?.labels?.()===false)return;const a=project(p);ctx.font='12px system-ui';const width=ctx.measureText(text).width,x=Math.max(4,Math.min(w-width-4,a[0]+dx)),y=Math.max(15,Math.min(h-4,a[1]+dy));ctx.fillStyle='#0e202be8';ctx.fillRect(x-2,y-13,width+4,17);ctx.fillStyle=color;ctx.fillText(text,x,y);};
 if($('pyramidLayer').checked){
  const corners=[[-5.5,-5.5,0],[5.5,-5.5,0],[5.5,5.5,0],[-5.5,5.5,0]],V=[0,0,7];
  line([...corners,corners[0]],'#839dab',1.3,'pyramid');for(const p of corners)line([p,V],'#839dab',1.3,'pyramid');
  if(view!=='top'){label('V · Z=7',V,'#e8d79c',9,-18);label('O',[0,0,0],'#b5c9d2',8,16);}
 }
 if(view==='top'){line([[-6.3,0,7],[6.3,0,7]],'#536f80',1,'axis',0,1,[3,5]);line([[0,-6.3,7],[0,6.3,7]],'#536f80',1,'axis',0,1,[3,5]);label('+X',[6.3,0,7],'#b5c9d2',-18,-8);label('+Y',[0,6.3,7],'#b5c9d2',8,0);}
 else line([[0,0,-.5],[0,0,14.5]],'#a593bb',1,'axis',0,1,[4,5]);
 extension?.draw?.({id,ctx,project,pair,visible,fade,current,records,colors});
 for(const record of source.lines){if(!visible(record.id))continue;
  const enabled={surface:'surfaceLayer',section:'sectionLayer',plane:'planeLayer'}[record.layer];
  if($(enabled).checked)line(record.points,colors[record.id],record.layer==='section'?2.5:1,record.layer,record.id,record.layer==='surface'?.22:record.layer==='plane'?.4:.85,record.id===2?[4,3]:[]);
 }
 for(const cached of torusLines(d)){const t=cached.t;if(!visible(t.id))continue;const color=colors[t.id],dash=t.id===2?[4,3]:[];
  if($('torusLayer').checked){
   for(const points of cached.rings)line(points,color,1,'torus',t.id,fade.torus*.4,dash);
   for(const points of cached.sections)line(points,color,1,'torus',t.id,fade.torus*.4,dash);
   if(fade.torus>0&&view!=='top')label(`T${t.id} · Z=${fmt(t.center[2],1)}`,Vortex.point(t,Math.PI,0),color,4,-20);
  }
  if($('linksLayer').checked&&$('sectionLayer').checked&&($('torusLayer').checked||$('trajectoryLayer').checked)){
   const endpoint=Stage8.transform(o.points[0],o,source.frame,t.id===2),target=Vortex.point(t,0,t.id===1?Math.PI/2:-Math.PI/2);
   line([endpoint,target],color,1,'link',t.id,fade.torus*.7,[2,6]);
  }
  if($('trajectoryLayer').checked&&fade.paths>0){
   for(let j=0;j<3;j++){
    const offset=Vortex.TAU*j/3;
    line(cached.lanes[j],color,1.6,'trajectory',t.id,fade.paths*.7,dash);
    const point=Vortex.lane(t,current.phase,offset),a=project(point);ctx.globalAlpha=fade.paths;ctx.fillStyle=color;ctx.beginPath();ctx.arc(...a,4.5,0,Vortex.TAU);ctx.fill();ctx.strokeStyle='#0e202b';ctx.lineWidth=1.5;ctx.stroke();ctx.globalAlpha=1;records.push({layer:'marker',system:t.id,point});
   }
   // Separate reference loops and arrows for each of the two motions.
   const v=t.id===1?0:Math.PI;
   line(cached.theta,color,2,'thetaGuide',t.id,fade.paths,dash);
   line(cached.psi,color,2,'psiGuide',t.id,fade.paths,dash);
   ctx.globalAlpha=fade.paths;
   for(const angle of extension?.labels?.()===false?[]:[.6,Math.PI+.6]){
    const from=Vortex.point(t,angle-t.sign*.13,v),to=Vortex.point(t,angle+t.sign*.13,v);arrow(ctx,project,from,to,color);records.push({layer:'thetaArrow',system:t.id,from,to});
   }
   for(const angle of extension?.labels?.()===false?[]:[0,Math.PI]){
    const from=Vortex.point(t,0,angle-t.sign*.35),to=Vortex.point(t,0,angle+t.sign*.35);arrow(ctx,project,from,to,color);records.push({layer:'psiArrow',system:t.id,from,to});
   }
   ctx.globalAlpha=1;
   if(view==='top')label(`T${t.id} θ${t.sign>0?'+ ↺':'− ↻'}`,Vortex.point(t,t.id===1?2.6:5.5,v),color,-25,t.id===1?-12:22);
   else label(`T${t.id} ψ${t.sign>0?'+':'−'}`,Vortex.point(t,0,0),color,8,t.id===1?23:-18);
  }
 }
 return records;
}
function redraw(){const started=extension?.now?.();try{
 extension?.update?.(current);
 const alpha=Number($('alpha').value),z0=Number($('z0').value),q=Number($('scaleFactor').value),d=extension?.distance?.()??Number($('distance').value);
 if(!Number.isFinite(alpha)||!Number.isFinite(z0))throw Error('Parametry cięcia muszą być skończone.');
 if(!(q>=.005&&q<=2))throw Error('Skala q musi wynosić 0,005–2.');
 const o=cachedSection(alpha,z0);Vortex.pair(d);$('error').textContent='';
 const records=draw('scene',$('view').value,o,q,d);draw('side','side',o,q,d);draw('top','top',o,q,d);
 $('viewTitle').textContent=names[$('view').value];$('distanceValue').textContent=fmt(d,1);
 $('parameters').textContent=`C₁=(0;0;${fmt(7-d/2)}), C₂=(0;0;${fmt(7+d/2)}). R₁=R₂=2,4 u; r₁=r₂=0,65 u. Odległość środków d=${fmt(d)} u; szczelina osiowa d−2r=${fmt(d-1.3)} u. ${extension?.accepted?'Położenie i zwroty zaakceptowane przez autora; efekty do odbioru.':'Wariant roboczy do oceny autora.'}`;
 $('sourceNumbers').textContent=`α=${fmt(alpha,9)}°; z₀=${fmt(z0)}; q=${fmt(q,3)}. L/W=${fmt(o.ratio,9)}, błąd względem φ=${fmt(Math.abs(o.ratio/((1+Math.sqrt(5))/2)-1)*100,6)}% (próg 0,1%). ${Math.abs(o.ratio/((1+Math.sqrt(5))/2)-1)<=.001?'Zgodność w granicach tolerancji modelu.':'Poza tolerancją modelu.'} Przekrój jest owalem, nie elipsą.`;
 $('stage').textContent=current.progress<.25?'1 / Konstrukcja dwóch powierzchni i przekrojów.':current.progress<.65?'2 / Stopniowe odsłonięcie torusów i trajektorii.':current.progress<.75?'2 / Końcowe odsłonięcie trajektorii; znaczniki nieruchome.':'3 / Przeciwbieżny ruch dostępny po odtworzeniu. Linie powiązań są schematem, nie przekształceniem powierzchni.';
 return records;
 }catch(e){$('error').textContent=e.message;for(const id of ['scene','side','top'])setup(id);$('parameters').textContent='';$('sourceNumbers').textContent='';$('stage').textContent='';player?.pause();return[];}finally{if(started!==undefined)extension?.measured?.(extension.now()-started);}
}
function state(snapshot){current=snapshot;$('play').disabled=$('reduced').checked||snapshot.running||Boolean($('error').textContent);$('pause').disabled=!snapshot.running;$('speedValue').textContent=`${fmt(snapshot.speed,2)}×`;
 $('motionStatus').textContent=$('reduced').checked?'Ograniczony ruch · wybieraj nieruchome klatki suwakiem.':snapshot.running?(snapshot.progress<1?'Pokaz w ruchu · następnie ciągły obieg.':'Przeciwbieżny obieg · Pauza zatrzyma znaczniki.'):'Pauza · ręczna kontrola kierunków i warstw.';
}
const preference=matchMedia('(prefers-reduced-motion: reduce)');$('reduced').checked=preference.matches;
player=Vortex.clock({request:fn=>requestAnimationFrame(fn),cancel:id=>cancelAnimationFrame(id),onState:state,onFrame:snapshot=>{current=snapshot;$('progress').value=String(snapshot.progress*100);$('progressValue').textContent=`${fmt(snapshot.progress*100,1)}%`;if(!extension?.shouldRender||extension.shouldRender())redraw();state(player.snapshot());}});
$('play').addEventListener('click',()=>{if(!$('reduced').checked&&!$('error').textContent)player.play();});$('pause').addEventListener('click',()=>player.pause());$('reset').addEventListener('click',()=>player.reset());$('circulate').addEventListener('click',()=>player.seek(1));$('progress').addEventListener('input',()=>player.seek(Number($('progress').value)/100));
$('speed').addEventListener('input',()=>player.setSpeed(Number($('speed').value)));
$('reduced').addEventListener('change',()=>player.pause());preference.addEventListener('change',e=>{if(e.matches){$('reduced').checked=true;player.pause();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)player.pause();});window.addEventListener('pagehide',()=>player.pause());
for(const id of ['distance','alpha','z0','variant','scaleFactor'])$(id).addEventListener('input',()=>{if(id!=='distance'||!extension?.smoothDistance)player.pause();if(id==='alpha'||id==='z0')$('preset').value='custom';redraw();state(player.snapshot());});
$('preset').addEventListener('change',()=>{player.pause();const value={pyramid:Math.atan(14/11)*180/Math.PI,golden:51.795319255897588,lange:51.84,huntley:Math.acos(2/(1+Math.sqrt(5)))*180/Math.PI}[$('preset').value];if(value!==undefined){$('alpha').value=String(value);$('z0').value='7.65';}redraw();state(player.snapshot());});
for(const id of ['view','systems','pyramidLayer','surfaceLayer','planeLayer','sectionLayer','torusLayer','trajectoryLayer','linksLayer'])$(id).addEventListener('input',redraw);
window.addEventListener('resize',redraw);extension?.init?.({redraw,snapshot:()=>player.snapshot()});player.reset();
