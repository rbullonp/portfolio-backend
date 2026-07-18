const menuButton=document.querySelector('.menu-toggle');
const mainNav=document.querySelector('.main-nav');
const navLinks=[...document.querySelectorAll('.main-nav a[href^="#"]')];
const isEnglish=document.documentElement.lang==='en';
const menuLabels=isEnglish?{open:'Open menu',close:'Close menu'}:{open:'Abrir menú',close:'Cerrar menú'};

function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',menuLabels.open);mainNav.classList.remove('open');document.body.classList.remove('menu-open')}

menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='false';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?menuLabels.close:menuLabels.open);mainNav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});
navLinks.forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});

document.querySelectorAll('.project-summary').forEach(button=>button.addEventListener('click',()=>{const project=button.closest('.project');const open=button.getAttribute('aria-expanded')==='true';document.querySelectorAll('.project.open').forEach(item=>{if(item!==project){item.classList.remove('open');item.querySelector('.project-summary').setAttribute('aria-expanded','false')}});project.classList.toggle('open',!open);button.setAttribute('aria-expanded',String(!open))}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}),{rootMargin:'-35% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>activeObserver.observe(section));
