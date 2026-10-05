/* ============================================================
   BookOLX — Frontend marketplace (Next.js/React/TS/Tailwind concept)
   Mock JSON + localStorage persistence. Single-file demo.
============================================================ */
const U = id => `https://images.unsplash.com/photo-${id}?q=80&w=700&auto=format&fit=crop`;
const MOCK_BOOKS = [
 {id:'b1',title:'Atomic Habits',author:'James Clear',category:'Self-Help',price:349,mrp:899,condition:'Like New',type:'used',seller:'Priya Sharma',sellerAvatar:'https://i.pravatar.cc/100?img=47',sellerRating:4.8,sellerSales:42,location:'Mumbai, MH',image:U('1544716278-ca5e3f4abd8c'),description:'Tiny changes, remarkable results. Barely-touched copy — no markings, spine intact, pages crisp. Includes the original habit-tracker insert. Perfect for starting your self-improvement journey.',pages:320,isbn:'978-0735211292',language:'English',postedAt:'2 hours ago',postedDays:0,featured:true,rating:4.9,reviews:132,stock:1,views:342},
 {id:'b2',title:'The Alchemist',author:'Paulo Coelho',category:'Fiction',price:199,mrp:450,condition:'Good',type:'used',seller:'Rahul Verma',sellerAvatar:'https://i.pravatar.cc/100?img=12',sellerRating:4.6,sellerSales:28,location:'Delhi, DL',image:U('1512820790803-83ca734da794'),description:'Coelho timeless fable about following your dreams. Well-loved copy with slight yellowing on edges but all pages clean and binding strong. A must-read for every shelf.',pages:208,isbn:'978-0061122415',language:'English',postedAt:'5 hours ago',postedDays:0,featured:false,rating:4.7,reviews:89,stock:1,views:198},
 {id:'b3',title:'Sapiens: A Brief History of Humankind',author:'Yuval Noah Harari',category:'History',price:499,mrp:599,condition:'New',type:'new',seller:'BookNest Store',sellerAvatar:'https://i.pravatar.cc/100?img=59',sellerRating:4.9,sellerSales:312,location:'Bangalore, KA',image:U('1495446815901-a7297e633e8d'),description:'Brand new, sealed paperback. How did our species conquer the world? The bestselling masterpiece exploring biology, money, religion and empires. Bulk discounts available.',pages:512,isbn:'978-0062316097',language:'English',postedAt:'1 hour ago',postedDays:0,featured:true,rating:4.9,reviews:410,stock:6,views:620},
 {id:'b4',title:"Harry Potter and the Philosopher's Stone",author:'J.K. Rowling',category:'Fantasy',price:399,mrp:650,condition:'Very Good',type:'used',seller:'Ananya Iyer',sellerAvatar:'https://i.pravatar.cc/100?img=45',sellerRating:4.9,sellerSales:67,location:'Pune, MH',image:U('1592496431122-2349e0fbc666'),description:'First book of the magical series. Read once, kept in dust cover. No folds, no scribbles. Hogwarts letter not included, magic guaranteed. Ideal for collectors and first-time readers.',pages:336,isbn:'978-0747532699',language:'English',postedAt:'1 day ago',postedDays:1,featured:false,rating:4.8,reviews:203,stock:1,views:455},
 {id:'b5',title:'The Lean Startup',author:'Eric Ries',category:'Business',price:299,mrp:550,condition:'Good',type:'used',seller:'Vikram Mehta',sellerAvatar:'https://i.pravatar.cc/100?img=13',sellerRating:4.5,sellerSales:19,location:'Hyderabad, TS',image:U('1519389950473-47ba0277781c'),description:'How constant innovation creates radically successful businesses. Some highlighting in first 3 chapters, rest pristine. A startup bible — perfect for founders and product folks.',pages:336,isbn:'978-0307887894',language:'English',postedAt:'2 days ago',postedDays:2,featured:false,rating:4.6,reviews:74,stock:1,views:167},
 {id:'b6',title:'Deep Work',author:'Cal Newport',category:'Self-Help',price:329,mrp:699,condition:'Like New',type:'used',seller:'Sneha Reddy',sellerAvatar:'https://i.pravatar.cc/100?img=32',sellerRating:4.9,sellerSales:53,location:'Chennai, TN',image:U('1481627834876-b7833e8f5570'),description:'Rules for focused success in a distracted world. Read once with extreme care — looks brand new. No creases. Selling because I upgraded to the hardcover edition.',pages:304,isbn:'978-1455586691',language:'English',postedAt:'3 hours ago',postedDays:0,featured:true,rating:4.8,reviews:156,stock:1,views:289},
 {id:'b7',title:'To Kill a Mockingbird',author:'Harper Lee',category:'Classics',price:179,mrp:350,condition:'Acceptable',type:'used',seller:'Ishaan Gupta',sellerAvatar:'https://i.pravatar.cc/100?img=15',sellerRating:4.4,sellerSales:11,location:'Kolkata, WB',image:U('1543002588-bfa74002ed7e'),description:'Pulitzer-winning classic. Reading copy — spine creased, some pencil notes, but 100% readable and complete. Great budget pick for students and literature lovers.',pages:336,isbn:'978-0061120084',language:'English',postedAt:'4 days ago',postedDays:4,featured:false,rating:4.5,reviews:61,stock:1,views:120},
 {id:'b8',title:'1984',author:'George Orwell',category:'Fiction',price:149,mrp:350,condition:'Good',type:'used',seller:'Kavya Nair',sellerAvatar:'https://i.pravatar.cc/100?img=44',sellerRating:4.7,sellerSales:35,location:'Mumbai, MH',image:U('1532012197267-da84d127e765'),description:'Orwell chilling dystopia — more relevant than ever. Solid binding, clean pages, minor cover wear. Big Brother is watching… your bookshelf.',pages:328,isbn:'978-0451524935',language:'English',postedAt:'6 hours ago',postedDays:0,featured:false,rating:4.7,reviews:118,stock:1,views:234},
 {id:'b9',title:'The Psychology of Money',author:'Morgan Housel',category:'Finance',price:279,mrp:499,condition:'New',type:'new',seller:'PageTurner Books',sellerAvatar:'https://i.pravatar.cc/100?img=60',sellerRating:4.9,sellerSales:428,location:'Delhi, DL',image:U('1554224155-6726b3ff858f'),description:'Fresh stock! Timeless lessons on wealth, greed and happiness. Sealed copies with bill. Bestseller — finance shelf essential. Same-day dispatch in Delhi NCR.',pages:256,isbn:'978-0857197689',language:'English',postedAt:'30 mins ago',postedDays:0,featured:true,rating:4.9,reviews:520,stock:12,views:811},
 {id:'b10',title:'Clean Code',author:'Robert C. Martin',category:'Technology',price:649,mrp:1050,condition:'Like New',type:'used',seller:'Arjun Nair',sellerAvatar:'https://i.pravatar.cc/100?img=18',sellerRating:4.8,sellerSales:24,location:'Bangalore, KA',image:U('1555066931-4365d14bab8c'),description:'A handbook of agile software craftsmanship. Developers bible — read once, no markings. MRP over 1000, grab at 40% off. Must-have for interviews and daily coding.',pages:464,isbn:'978-0132350884',language:'English',postedAt:'1 day ago',postedDays:1,featured:false,rating:4.8,reviews:92,stock:1,views:301},
 {id:'b11',title:'The Great Gatsby',author:'F. Scott Fitzgerald',category:'Classics',price:199,mrp:399,condition:'Very Good',type:'used',seller:'Meera Joshi',sellerAvatar:'https://i.pravatar.cc/100?img=26',sellerRating:4.7,sellerSales:31,location:'Pune, MH',image:U('1524578271613-d550eacf6090'),description:'The roaring twenties classic in beautiful print. Minimal wear, crisp pages. Perfect for book clubs and gifting. Pairs well with jazz and nostalgia.',pages:180,isbn:'978-0743273565',language:'English',postedAt:'3 days ago',postedDays:3,featured:false,rating:4.6,reviews:58,stock:1,views:143},
 {id:'b12',title:'Dune (Deluxe Edition)',author:'Frank Herbert',category:'Sci-Fi',price:549,mrp:799,condition:'New',type:'new',seller:'SciFi Central',sellerAvatar:'https://i.pravatar.cc/100?img=61',sellerRating:5.0,sellerSales:187,location:'Mumbai, MH',image:U('1541963463532-d68292c34b19'),description:'Deluxe hardcover with sprayed edges and maps of Arrakis. Sealed. The greatest sci-fi epic — before you watch Part 2, read the legend. Free bookmark included.',pages:688,isbn:'978-0441172719',language:'English',postedAt:'4 hours ago',postedDays:0,featured:true,rating:5.0,reviews:264,stock:4,views:592},
 {id:'b13',title:'Educated: A Memoir',author:'Tara Westover',category:'Memoir',price:329,mrp:599,condition:'Good',type:'used',seller:'Divya Kulkarni',sellerAvatar:'https://i.pravatar.cc/100?img=38',sellerRating:4.6,sellerSales:16,location:'Hyderabad, TS',image:U('1524995997946-a1c2e315a42f'),description:'Powerful memoir of family, survival and the transformative power of education. Light spine crease, pages clean. Unputdownable — finished in two sittings.',pages:352,isbn:'978-0399590504',language:'English',postedAt:'5 days ago',postedDays:5,featured:false,rating:4.7,reviews:83,stock:1,views:176},
 {id:'b14',title:'The Midnight Library',author:'Matt Haig',category:'Fiction',price:299,mrp:550,condition:'Like New',type:'used',seller:'Rohan Das',sellerAvatar:'https://i.pravatar.cc/100?img=22',sellerRating:4.7,sellerSales:29,location:'Chennai, TN',image:U('1507842217343-583bb7270b66'),description:'Between life and death lies a library of infinite lives. Immaculate copy — read once, dust jacket perfect. International bestseller, Goodreads Choice winner.',pages:304,isbn:'978-0525559474',language:'English',postedAt:'2 days ago',postedDays:2,featured:false,rating:4.8,reviews:141,stock:1,views:267},
 {id:'b15',title:'Zero to One',author:'Peter Thiel',category:'Business',price:389,mrp:599,condition:'New',type:'new',seller:'Startup Shelf',sellerAvatar:'https://i.pravatar.cc/100?img=62',sellerRating:4.8,sellerSales:143,location:'Delhi, DL',image:U('1507679799987-c73779587ccf'),description:'Notes on startups — how to build the future. Fresh sealed copies direct from distributor. Essential for founders, VCs and curious minds. Combo deals with Lean Startup.',pages:224,isbn:'978-0804139298',language:'English',postedAt:'8 hours ago',postedDays:0,featured:false,rating:4.7,reviews:178,stock:8,views:389},
 {id:'b16',title:'Pride and Prejudice',author:'Jane Austen',category:'Classics',price:159,mrp:299,condition:'Good',type:'used',seller:'Aisha Khan',sellerAvatar:'https://i.pravatar.cc/100?img=41',sellerRating:4.9,sellerSales:47,location:'Kolkata, WB',image:U('1511108690759-009324a90311'),description:'Elizabeth Bennet and Mr. Darcy — the original enemies-to-lovers. Charming older print, sturdy binding, clean text. A cosy rainy-day companion.',pages:432,isbn:'978-0141439518',language:'English',postedAt:'6 days ago',postedDays:6,featured:false,rating:4.8,reviews:97,stock:1,views:154},
 {id:'b17',title:'The Design of Everyday Things',author:'Don Norman',category:'Design',price:599,mrp:950,condition:'Very Good',type:'used',seller:'Aditya Rao',sellerAvatar:'https://i.pravatar.cc/100?img=53',sellerRating:4.8,sellerSales:22,location:'Bangalore, KA',image:U('1561070791-2526d30994b5'),description:'The bible of UX and human-centered design. Revised edition, barely used. A few sticky tabs (removable). Perfect for designers, PMs and curious engineers.',pages:368,isbn:'978-0465050659',language:'English',postedAt:'1 day ago',postedDays:1,featured:false,rating:4.9,reviews:66,stock:1,views:213},
 {id:'b18',title:'Thinking, Fast and Slow',author:'Daniel Kahneman',category:'Psychology',price:449,mrp:799,condition:'Like New',type:'used',seller:'Neha Bansal',sellerAvatar:'https://i.pravatar.cc/100?img=49',sellerRating:4.9,sellerSales:38,location:'Pune, MH',image:U('1476275466078-4007374efbbe'),description:'Nobel laureate tour of the two systems that drive how we think. Excellent condition — no highlights. Dense but deeply rewarding. Behavioural econ classic.',pages:499,isbn:'978-0374533557',language:'English',postedAt:'12 hours ago',postedDays:0,featured:true,rating:4.8,reviews:190,stock:1,views:376},
 {id:'b19',title:'The Hobbit',author:'J.R.R. Tolkien',category:'Fantasy',price:349,mrp:550,condition:'Good',type:'used',seller:'Aarav Patel',sellerAvatar:'https://i.pravatar.cc/100?img=11',sellerRating:4.7,sellerSales:26,location:'Ahmedabad, GJ',image:U('1519682337058-a94d519337bc'),description:'There and back again — Bilbo unforgettable adventure. Illustrated edition with maps. Light wear on cover corners, inside perfect. Great gateway to Middle-earth.',pages:310,isbn:'978-0547928227',language:'English',postedAt:'3 days ago',postedDays:3,featured:false,rating:4.8,reviews:149,stock:1,views:245},
 {id:'b20',title:'Ikigai: The Japanese Secret',author:'Héctor García',category:'Self-Help',price:249,mrp:550,condition:'New',type:'new',seller:'Wellness Reads',sellerAvatar:'https://i.pravatar.cc/100?img=64',sellerRating:4.8,sellerSales:256,location:'Mumbai, MH',image:U('1497633762265-9d179a990aa6'),description:'Sealed copies of the global phenomenon on living a long, happy, purpose-driven life. Beautiful gift edition. Order 2+ and get free gift wrap.',pages:208,isbn:'978-1786330895',language:'English',postedAt:'7 hours ago',postedDays:0,featured:false,rating:4.7,reviews:332,stock:10,views:468}
];
const CATEGORIES = [
 {name:'Fiction',icon:'fa-book-open',color:'bg-blue-100 text-blue-700'},{name:'Classics',icon:'fa-landmark',color:'bg-amber-100 text-amber-700'},
 {name:'Fantasy',icon:'fa-wand-magic-sparkles',color:'bg-purple-100 text-purple-700'},{name:'Sci-Fi',icon:'fa-rocket',color:'bg-indigo-100 text-indigo-700'},
 {name:'Self-Help',icon:'fa-seedling',color:'bg-green-100 text-green-700'},{name:'Business',icon:'fa-briefcase',color:'bg-orange-100 text-orange-700'},
 {name:'History',icon:'fa-hourglass-half',color:'bg-yellow-100 text-yellow-700'},{name:'Technology',icon:'fa-microchip',color:'bg-cyan-100 text-cyan-700'},
 {name:'Finance',icon:'fa-coins',color:'bg-emerald-100 text-emerald-700'},{name:'Memoir',icon:'fa-feather',color:'bg-rose-100 text-rose-700'},
 {name:'Design',icon:'fa-palette',color:'bg-pink-100 text-pink-700'},{name:'Psychology',icon:'fa-brain',color:'bg-teal-100 text-teal-700'}
];
const CONDITIONS = ['New','Like New','Very Good','Good','Acceptable'];
const LOCATIONS = ['Mumbai','Delhi','Bangalore','Pune','Hyderabad','Chennai','Kolkata','Ahmedabad','Jaipur'];
const PROMOS = {BOOK10:10,WELCOME15:15,READMORE20:20};
const FREE_SHIP = 500, SHIP_COST = 49;

/* ---------- STATE ---------- */
const K = {list:'bookolx_listings_v3',cart:'bookolx_cart_v3',user:'bookolx_user_v3',users:'bookolx_users_v3',wish:'bookolx_wish_v3',orders:'bookolx_orders_v3',recent:'bookolx_recent_v3'};
let listings=[],cart=[],wishlist=[],orders=[],recent=[],user=null,users=[];
let filters={search:'',categories:[],minPrice:0,maxPrice:1500,conditions:[],type:'all',location:'All Locations',minRating:0,sort:'featured'};
let currentView='home',homeTab='all',profileTab='listings',currentBookId=null,detailQty=1,detailsTab='desc';
let sellEditId=null,sellImageData='',deleteId=null,promoApplied=null,profileListingQuery='';
let checkoutState={step:1,shipping:{name:'',phone:'',address:'',city:'',pincode:''},payment:{method:'upi',cardNumber:'',expiry:'',cvv:'',upi:''}};
let chatBookId=null,chatMsgs=[];

/* ---------- HELPERS ---------- */
const $=id=>document.getElementById(id);
const esc=s=>{if(s==null)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');};
const fmt=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const uid=()=>'b'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const getBook=id=>listings.find(b=>b.id===id);
const discount=b=>b.mrp>b.price?Math.round((1-b.price/b.mrp)*100):0;
const catMeta=n=>CATEGORIES.find(c=>c.name===n)||{icon:'fa-book',color:'bg-gray-100 text-gray-700'};
function condStyle(c){return c==='New'?'bg-green-500':c==='Like New'?'bg-teal-500':c==='Very Good'?'bg-blue-500':c==='Good'?'bg-amber-500':'bg-gray-500';}
function starsHTML(r,size='text-[11px]'){let h=`<span class="flex items-center gap-[2px] ${size} text-sunDark">`;for(let i=1;i<=5;i++){h+=`<i class="fa-${i<=Math.round(r)?'solid':'regular'} fa-star"></i>`;}return h+'</span>';}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
const saveList=()=>save(K.list,listings),saveCart=()=>save(K.cart,cart),saveUser=()=>save(K.user,user),saveUsers=()=>save(K.users,users),saveWish=()=>save(K.wish,wishlist),saveOrders=()=>save(K.orders,orders),saveRecent=()=>save(K.recent,recent);
function load(){try{listings=JSON.parse(localStorage.getItem(K.list))||[];cart=JSON.parse(localStorage.getItem(K.cart))||[];user=JSON.parse(localStorage.getItem(K.user))||null;users=JSON.parse(localStorage.getItem(K.users))||[];wishlist=JSON.parse(localStorage.getItem(K.wish))||[];orders=JSON.parse(localStorage.getItem(K.orders))||[];recent=JSON.parse(localStorage.getItem(K.recent))||[];}catch(e){listings=[];}if(!listings||!listings.length){listings=JSON.parse(JSON.stringify(MOCK_BOOKS));saveList();}}

/* ---------- TOAST ---------- */
function showToast(msg,type='success'){
 const icons={success:'fa-circle-check',error:'fa-circle-exclamation',info:'fa-circle-info',warning:'fa-triangle-exclamation'};
 const colors={success:'border-green-500',error:'border-red-500',info:'border-blue-500',warning:'border-amber-500'};
 const ic={success:'text-green-500',error:'text-red-500',info:'text-blue-500',warning:'text-amber-500'};
 const d=document.createElement('div');d.className=`toast bg-white rounded-2xl shadow-2xl border-l-4 ${colors[type]} p-3.5 flex items-start gap-3 border border-ink/10`;
 d.innerHTML=`<i class="fa-solid ${icons[type]} ${ic[type]} text-lg mt-0.5"></i><div class="flex-1 text-sm font-bold leading-snug">${esc(msg)}</div><button onclick="this.parentElement.remove()" class="text-ink/30 hover:text-ink"><i class="fa-solid fa-xmark text-xs"></i></button>`;
 $('toast-root').appendChild(d);setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),300);},3200);
}
function copyPromo(c){try{navigator.clipboard.writeText(c);}catch(e){}showToast(`Code ${c} copied! Apply at cart.`,'info');}

/* ---------- CONFETTI ---------- */
let confettiParts=[];
function fireConfetti(n=140){const c=$('confetti-canvas'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const cols=['#FFCE32','#23E5DB','#002F34','#FF6B6B','#4ECDC4','#A78BFA'];confettiParts=[];for(let i=0;i<n;i++)confettiParts.push({x:innerWidth/2+(Math.random()-.5)*300,y:innerHeight*0.3,vx:(Math.random()-.5)*12,vy:Math.random()*-9-3,g:.32,s:Math.random()*8+4,c:cols[i%cols.length],r:Math.random()*Math.PI,vr:(Math.random()-.5)*.3,l:1});(function anim(){x.clearRect(0,0,c.width,c.height);confettiParts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;p.l-=.008;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.globalAlpha=Math.max(p.l,0);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore();});confettiParts=confettiParts.filter(p=>p.l>0&&p.y<c.height+20);if(confettiParts.length)requestAnimationFrame(anim);else x.clearRect(0,0,c.width,c.height);})();}

/* ---------- NAVIGATION ---------- */
function navigate(view){
 if(view==='sell'){openSell();return;}
 if((view==='checkout')&&!cart.length){showToast('Your cart is empty','warning');view='cart';}
 currentView=view;
 document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));
 $('view-'+view).classList.remove('hidden');
 try{location.hash=view;}catch(e){}
 document.querySelectorAll('[data-mnav]').forEach(b=>{const on=b.dataset.mnav===view||(view==='details'&&b.dataset.mnav==='browse')||(view==='cart'&&b.dataset.mnav==='browse')||(view==='checkout'&&b.dataset.mnav==='browse');b.classList.toggle('text-ink',on);b.classList.toggle('text-ink/40',!on);});
 $('mobile-menu').classList.add('hidden');
 hideSuggestions();window.scrollTo({top:0,behavior:'smooth'});
 if(view==='home'){renderHome();}
 if(view==='browse'){renderBrowse();}
 if(view==='details'){renderDetails();}
 if(view==='cart'){renderCartPage();}
 if(view==='checkout'){renderCheckout();}
 if(view==='profile'){renderProfile();}
 if(view==='wishlist'){renderWishlist();}
 if(view==='success'){renderSuccess();}
}
function toggleMobileMenu(){$('mobile-menu').classList.toggle('hidden');}
function toggleUserDropdown(){const d=$('user-dropdown');if(d)d.classList.toggle('hidden');}
document.addEventListener('click',e=>{const d=$('user-dropdown');if(d&&!d.classList.contains('hidden')&&!e.target.closest('#auth-area'))d.classList.add('hidden');});

/* ---------- AUTH ---------- */
function openAuth(mode='login'){if(user){navigate('profile');return;}$('auth-modal').classList.remove('hidden');document.body.style.overflow='hidden';switchAuthTab(mode);}
function closeAuth(){$('auth-modal').classList.add('hidden');document.body.style.overflow='';}
function switchAuthTab(mode){const L=mode==='login';$('auth-login').classList.toggle('hidden',!L);$('auth-signup').classList.toggle('hidden',L);$('auth-tab-login').className=`px-6 py-2 rounded-full text-sm font-extrabold transition ${L?'bg-ink text-white':'text-ink/50'}`;$('auth-tab-signup').className=`px-6 py-2 rounded-full text-sm font-extrabold transition ${!L?'bg-ink text-white':'text-ink/50'}`;}
function handleLogin(e){e.preventDefault();const em=$('login-email').value.trim().toLowerCase(),pw=$('login-password').value;const f=users.find(u=>u.email.toLowerCase()===em);if(!f){showToast('No account found with this email. Please sign up.','error');switchAuthTab('signup');$('su-email').value=em;return;}user=f;saveUser();updateAuthUI();closeAuth();showToast(`Welcome back, ${esc(f.name.split(' ')[0])}! 📚`);if(currentView==='profile')renderProfile();if(checkoutState.pending){checkoutState.pending=false;navigate('checkout');}}
function handleSignup(e){e.preventDefault();const name=$('su-name').value.trim(),phone=$('su-phone').value.trim(),email=$('su-email').value.trim(),pass=$('su-pass').value,city=$('su-city').value;if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())){showToast('Account already exists. Please login.','error');switchAuthTab('login');return;}const nu={id:uid(),name,email,phone,location:city+', IN',avatar:`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=002F34&color=FFCE32&bold=true&size=100`,bio:'Avid reader • Buy & sell pre-loved books',joined:new Date().toLocaleDateString('en-IN',{month:'short',year:'numeric'}),pass};users.push(nu);saveUsers();user=nu;saveUser();updateAuthUI();closeAuth();fireConfetti(80);showToast(`Welcome to BookOLX, ${esc(name.split(' ')[0])}! ₹100 coupon unlocked 🎉`);navigate('profile');}
function demoLogin(){let d=users.find(u=>u.email==='demo@bookolx.in');if(!d){d={id:'demo1',name:'Demo Reader',email:'demo@bookolx.in',phone:'9876543210',location:'Mumbai, MH',avatar:'https://i.pravatar.cc/100?img=8',bio:'Demo account • Loves Sci-Fi & Self-Help',joined:'Jan 2026',pass:'demo'};users.push(d);saveUsers();}user=d;saveUser();updateAuthUI();closeAuth();showToast('Logged in as Demo Reader ⚡');if(currentView==='profile')renderProfile();}
function logout(){user=null;saveUser();updateAuthUI();navigate('home');showToast('Logged out. Happy reading!','info');}
function updateAuthUI(){
 const a=$('auth-area');
 if(!user){a.innerHTML=`<button onclick="openAuth('login')" class="bg-ink text-white font-extrabold px-4 sm:px-5 py-2.5 rounded-xl text-sm hover:bg-inkLight transition whitespace-nowrap">Login</button>`;return;}
 a.innerHTML=`<button onclick="toggleUserDropdown()" class="flex items-center gap-2 hover:bg-paper rounded-xl p-1 pr-2 transition"><img src="${esc(user.avatar)}" class="w-9 h-9 rounded-xl object-cover border-2 border-ink/10" alt="avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=002F34&color=FFCE32'"><i class="fa-solid fa-chevron-down text-[10px] text-ink/40 hidden sm:block"></i></button>
 <div id="user-dropdown" class="hidden absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-ink/10 overflow-hidden z-50 pop-in">
  <div class="bg-ink text-white p-4"><div class="font-extrabold text-sm truncate">${esc(user.name)}</div><div class="text-xs text-white/60 truncate">${esc(user.email)}</div></div>
  <div class="p-2 text-sm font-bold">
   <button onclick="navigate('profile')" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3"><i class="fa-regular fa-user text-ink/40 w-4"></i> My Profile</button>
   <button onclick="profileTab='listings';navigate('profile')" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3"><i class="fa-solid fa-book text-ink/40 w-4"></i> My Listings</button>
   <button onclick="profileTab='orders';navigate('profile')" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3"><i class="fa-solid fa-box text-ink/40 w-4"></i> My Orders</button>
   <button onclick="navigate('wishlist')" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3"><i class="fa-regular fa-heart text-ink/40 w-4"></i> Wishlist</button>
   <div class="border-t my-1"></div>
   <button onclick="logout()" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 flex items-center gap-3"><i class="fa-solid fa-right-from-bracket w-4"></i> Logout</button>
  </div></div>`;
}

/* ---------- SEARCH ---------- */
function setSearch(v){filters.search=v;const b=$('browse-search');if(b&&b.value!==v)b.value=v;const n=$('nav-search');if(n&&n.value!==v)n.value=v;if(currentView==='browse')renderBrowse();}
function handleSearchInput(e){const v=e.target.value;filters.search=v;showSuggestions(v);if(currentView==='browse'){clearTimeout(window._st);window._st=setTimeout(renderBrowse,250);}}
function handleSearchSubmit(e){e.preventDefault&&e.preventDefault();hideSuggestions();navigate('browse');}
function heroSearch(){filters.search=$('hero-search').value;syncSearchInputs();navigate('browse');}
function quickSearch(t){filters.search=t;syncSearchInputs();navigate('browse');}
function syncSearchInputs(){['nav-search','mobile-search','browse-search','hero-search'].forEach(id=>{const el=$(id);if(el)el.value=filters.search;});}
function showSuggestions(v){
 const box=$('search-suggestions');if(!box)return;v=(v||'').trim().toLowerCase();
 if(!v){box.classList.add('hidden');return;}
 const m=listings.filter(b=>(b.title+' '+b.author+' '+b.category).toLowerCase().includes(v)).slice(0,6);
 if(!m.length){box.innerHTML=`<div class="p-4 text-sm font-semibold text-ink/50">No matches for "${esc(v)}" — try "Dune"</div>`;box.classList.remove('hidden');return;}
 box.innerHTML=m.map(b=>`<button onmousedown="openBook('${b.id}')" class="w-full flex items-center gap-3 p-3 hover:bg-paper text-left transition border-b last:border-0 border-ink/5"><img src="${esc(b.image)}" class="w-10 h-12 rounded-lg object-cover" onerror="this.src='https://picsum.photos/seed/${b.id}/100/120'"><span class="flex-1 min-w-0"><span class="block font-extrabold text-sm truncate">${esc(b.title)}</span><span class="block text-xs text-ink/50 font-medium">${esc(b.author)} • ${fmt(b.price)}</span></span><i class="fa-solid fa-arrow-up-right text-ink/20 text-xs"></i></button>`).join('');
 box.classList.remove('hidden');
}
function hideSuggestions(){const b=$('search-suggestions');if(b)b.classList.add('hidden');}
function setLocation(v){filters.location=v;['nav-location','mobile-location'].forEach(id=>{const el=$(id);if(el)el.value=v;});syncFilterUI();if(currentView==='browse')renderBrowse();else showToast(v==='All Locations'?'Showing books from all cities':`Showing books near ${v}`,'info');}

/* ---------- FILTERS ---------- */
function setSort(v){filters.sort=v;const s=$('browse-sort');if(s)s.value=v;renderBrowse();}
function setType(t){filters.type=t;syncFilterUI();renderBrowse();}
function toggleCategory(c){const i=filters.categories.indexOf(c);if(i>=0)filters.categories.splice(i,1);else filters.categories.push(c);syncFilterUI();renderBrowse();}
function toggleCondition(c){const i=filters.conditions.indexOf(c);if(i>=0)filters.conditions.splice(i,1);else filters.conditions.push(c);syncFilterUI();renderBrowse();}
function setMaxPrice(v){filters.maxPrice=+v;syncFilterUI();clearTimeout(window._pt);window._pt=setTimeout(renderBrowse,200);}
function setMinPrice(v){filters.minPrice=+v||0;clearTimeout(window._pt2);window._pt2=setTimeout(()=>{syncFilterUI();renderBrowse();},400);}
function setPricePreset(a,b){filters.minPrice=a;filters.maxPrice=b;syncFilterUI();renderBrowse();}
function setRating(v){filters.minRating=filters.minRating===v?0:v;syncFilterUI();renderBrowse();}
function setCategoryAndBrowse(c){filters.categories=[c];filters.type='all';syncSearchInputs();navigate('browse');}
function clearFilters(){filters={search:'',categories:[],minPrice:0,maxPrice:1500,conditions:[],type:'all',location:'All Locations',minRating:0,sort:'featured'};syncSearchInputs();syncFilterUI();renderBrowse();showToast('All filters cleared','info');}
function removeChip(type,val){
 if(type==='cat')filters.categories=filters.categories.filter(c=>c!==val);
 if(type==='cond')filters.conditions=filters.conditions.filter(c=>c!==val);
 if(type==='type')filters.type='all';if(type==='loc')filters.location='All Locations';
 if(type==='price'){filters.minPrice=0;filters.maxPrice=1500;}if(type==='search'){filters.search='';syncSearchInputs();}
 if(type==='rating')filters.minRating=0;syncFilterUI();renderBrowse();
}
function activeFilterCount(){let n=filters.categories.length+filters.conditions.length;if(filters.type!=='all')n++;if(filters.location!=='All Locations')n++;if(filters.minPrice>0||filters.maxPrice<1500)n++;if(filters.minRating>0)n++;if(filters.search)n++;return n;}
function filterHTML(p){
 return `
 <div>
  <div class="flex items-center justify-between"><h4 class="font-extrabold text-sm">Condition type</h4><button onclick="clearFilters()" class="text-[11px] font-extrabold text-red-500 hover:underline">Reset</button></div>
  <div class="grid grid-cols-3 gap-1.5 mt-2.5 bg-paper rounded-2xl p-1.5" id="${p}-type-seg">
   <button onclick="setType('all')" data-t="all" class="py-2 rounded-xl text-xs font-extrabold transition">All</button>
   <button onclick="setType('new')" data-t="new" class="py-2 rounded-xl text-xs font-extrabold transition">✨ New</button>
   <button onclick="setType('used')" data-t="used" class="py-2 rounded-xl text-xs font-extrabold transition">📚 Used</button>
  </div>
 </div>
 <div><h4 class="font-extrabold text-sm mb-2.5">Categories</h4><div id="${p}-cats" class="space-y-1.5 max-h-52 overflow-y-auto pr-1"></div></div>
 <div><h4 class="font-extrabold text-sm mb-2.5">Price range</h4>
  <div class="flex gap-2"><div class="flex-1 bg-paper rounded-xl px-3 py-2 flex items-center gap-1"><span class="text-xs font-bold text-ink/40">₹</span><input id="${p}-min" type="number" min="0" oninput="setMinPrice(this.value)" class="w-full bg-transparent outline-none text-sm font-extrabold min-w-0"></div><div class="flex-1 bg-paper rounded-xl px-3 py-2 flex items-center gap-1"><span class="text-xs font-bold text-ink/40">₹</span><input id="${p}-max" type="number" oninput="filters.maxPrice=+this.value||1500;syncFilterUI();clearTimeout(window._pt3);window._pt3=setTimeout(renderBrowse,400)" class="w-full bg-transparent outline-none text-sm font-extrabold min-w-0"></div></div>
  <input id="${p}-range" type="range" min="0" max="1500" step="50" oninput="setMaxPrice(this.value)" class="mt-3">
  <div class="flex justify-between text-[11px] font-bold text-ink/40 mt-1"><span>₹0</span><span id="${p}-range-val" class="text-ink">Up to ₹1,500</span></div>
  <div class="flex flex-wrap gap-1.5 mt-2.5"><button onclick="setPricePreset(0,250)" class="text-[11px] font-extrabold border rounded-full px-3 py-1.5 hover:bg-ink hover:text-white transition">Under ₹250</button><button onclick="setPricePreset(250,500)" class="text-[11px] font-extrabold border rounded-full px-3 py-1.5 hover:bg-ink hover:text-white transition">₹250–500</button><button onclick="setPricePreset(500,1500)" class="text-[11px] font-extrabold border rounded-full px-3 py-1.5 hover:bg-ink hover:text-white transition">₹500+</button></div>
 </div>
 <div><h4 class="font-extrabold text-sm mb-2.5">Book condition</h4><div id="${p}-conds" class="space-y-1.5"></div></div>
 <div><h4 class="font-extrabold text-sm mb-2.5">City</h4><select id="${p}-loc" onchange="setLocation(this.value)" class="w-full bg-paper rounded-xl px-3 py-2.5 text-sm font-bold outline-none cursor-pointer border-2 border-transparent focus:border-ink"><option>All Locations</option>${LOCATIONS.map(l=>`<option>${l}</option>`).join('')}</select></div>
 <div><h4 class="font-extrabold text-sm mb-2.5">Rating</h4><label class="flex items-center gap-2.5 cursor-pointer bg-paper rounded-xl px-3 py-2.5 hover:bg-cream transition"><input type="checkbox" id="${p}-rate" onchange="setRating(4)" class="hidden"><span class="checkbox-custom"><i class="fa-solid fa-check text-[10px]"></i></span><span class="text-sm font-bold flex items-center gap-1.5">4 <i class="fa-solid fa-star text-sunDark text-xs"></i> & above</span></label></div>
 <div class="bg-green-50 border border-green-200 rounded-2xl p-3.5 text-xs font-semibold text-green-900 leading-relaxed"><i class="fa-solid fa-leaf mr-1"></i> Buying used saves <strong>2.7kg CO₂</strong> per book. You've browsed <strong>${listings.length} listings</strong> today. 🌱</div>`;
}
function syncFilterUI(){
 ['d','m'].forEach(p=>{
  const seg=$(p+'-type-seg');if(seg){seg.querySelectorAll('button').forEach(b=>{const on=b.dataset.t===filters.type;b.className=`py-2 rounded-xl text-xs font-extrabold transition ${on?'bg-ink text-white shadow':'text-ink/50 hover:text-ink'}`;});}
  const cats=$(p+'-cats');if(cats){cats.innerHTML=CATEGORIES.map(c=>{const n=listings.filter(b=>b.category===c.name).length;const on=filters.categories.includes(c.name);return `<label class="flex items-center gap-2.5 cursor-pointer hover:bg-paper rounded-xl px-2 py-1.5 transition"><input type="checkbox" ${on?'checked':''} onchange="toggleCategory('${c.name}')" class="hidden"><span class="checkbox-custom"><i class="fa-solid fa-check text-[10px]"></i></span><span class="w-7 h-7 ${c.color} rounded-lg flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${c.icon}"></i></span><span class="flex-1 text-[13px] font-bold">${c.name}</span><span class="text-[11px] font-extrabold text-ink/30 bg-paper px-2 py-0.5 rounded-full">${n}</span></label>`;}).join('');}
  const cds=$(p+'-conds');if(cds){cds.innerHTML=CONDITIONS.map(c=>{const n=listings.filter(b=>b.condition===c).length;const on=filters.conditions.includes(c);return `<label class="flex items-center gap-2.5 cursor-pointer hover:bg-paper rounded-xl px-2 py-1.5 transition"><input type="checkbox" ${on?'checked':''} onchange="toggleCondition('${c}')" class="hidden"><span class="checkbox-custom"><i class="fa-solid fa-check text-[10px]"></i></span><span class="w-2.5 h-2.5 ${condStyle(c)} rounded-full shrink-0"></span><span class="flex-1 text-[13px] font-bold">${c}</span><span class="text-[11px] font-extrabold text-ink/30">${n}</span></label>`;}).join('');}
  const mn=$(p+'-min'),mx=$(p+'-max'),rg=$(p+'-range'),rv=$(p+'-range-val');if(mn)mn.value=filters.minPrice;if(mx)mx.value=filters.maxPrice;if(rg){rg.value=filters.maxPrice;rg.style.setProperty('--fill',(filters.maxPrice/1500*100)+'%');}if(rv)rv.textContent='Up to '+fmt(filters.maxPrice);
  const lc=$(p+'-loc');if(lc)lc.value=filters.location;const rt=$(p+'-rate');if(rt)rt.checked=filters.minRating===4;
 });
 const nl=$('nav-location');if(nl)nl.value=filters.location;const ml=$('mobile-location');if(ml)ml.value=filters.location;
 const s=$('browse-sort');if(s)s.value=filters.sort;
 const bs=$('browse-search');if(bs&&bs.value!==filters.search)bs.value=filters.search;
 renderChips();
 const c=activeFilterCount(),mc=$('mobile-filter-count');if(mc){mc.textContent=c;mc.classList.toggle('hidden',c===0);mc.classList.toggle('flex',c>0);}
}
function renderChips(){
 const box=$('active-chips');if(!box)return;let h='';
 if(filters.search)h+=`<span class="chip flex items-center gap-2 bg-ink text-white text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">🔍 ${esc(filters.search)} <button onclick="removeChip('search')" class="w-5 h-5 bg-white/20 rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`;
 filters.categories.forEach(c=>h+=`<span class="chip flex items-center gap-2 bg-white border text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">${esc(c)} <button onclick="removeChip('cat','${c}')" class="w-5 h-5 bg-paper rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`);
 filters.conditions.forEach(c=>h+=`<span class="chip flex items-center gap-2 bg-white border text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">${esc(c)} <button onclick="removeChip('cond','${c}')" class="w-5 h-5 bg-paper rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`);
 if(filters.type!=='all')h+=`<span class="chip flex items-center gap-2 bg-sun border border-ink text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">${filters.type==='new'?'✨ New':'📚 Pre-loved'} <button onclick="removeChip('type')" class="w-5 h-5 bg-ink text-white rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`;
 if(filters.minPrice>0||filters.maxPrice<1500)h+=`<span class="chip flex items-center gap-2 bg-white border text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">${fmt(filters.minPrice)}–${fmt(filters.maxPrice)} <button onclick="removeChip('price')" class="w-5 h-5 bg-paper rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`;
 if(filters.location!=='All Locations')h+=`<span class="chip flex items-center gap-2 bg-white border text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">📍 ${esc(filters.location)} <button onclick="removeChip('loc')" class="w-5 h-5 bg-paper rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`;
 if(filters.minRating>0)h+=`<span class="chip flex items-center gap-2 bg-white border text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full">★ 4+ rated <button onclick="removeChip('rating')" class="w-5 h-5 bg-paper rounded-full text-[10px]"><i class="fa-solid fa-xmark"></i></button></span>`;
 box.innerHTML=h;
}
function getFiltered(){
 let r=[...listings];const q=filters.search.trim().toLowerCase();
 if(q)r=r.filter(b=>(b.title+' '+b.author+' '+b.category+' '+b.isbn+' '+b.description+' '+b.seller+' '+b.location).toLowerCase().includes(q));
 if(filters.categories.length)r=r.filter(b=>filters.categories.includes(b.category));
 r=r.filter(b=>b.price>=filters.minPrice&&b.price<=filters.maxPrice);
 if(filters.conditions.length)r=r.filter(b=>filters.conditions.includes(b.condition));
 if(filters.type!=='all')r=r.filter(b=>b.type===filters.type);
 if(filters.location!=='All Locations')r=r.filter(b=>b.location.includes(filters.location));
 if(filters.minRating)r=r.filter(b=>b.rating>=filters.minRating);
 const s=filters.sort;
 if(s==='price-low')r.sort((a,b)=>a.price-b.price);else if(s==='price-high')r.sort((a,b)=>b.price-a.price);
 else if(s==='newest')r.sort((a,b)=>a.postedDays-b.postedDays);else if(s==='rating')r.sort((a,b)=>b.rating-a.rating);
 else if(s==='discount')r.sort((a,b)=>discount(b)-discount(a));else r.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||b.rating-a.rating);
 return r;
}
function openMobileFilters(){$('mobile-filter-wrap').classList.remove('hidden');document.body.style.overflow='hidden';}
function closeMobileFilters(){$('mobile-filter-wrap').classList.add('hidden');document.body.style.overflow='';}

/* ---------- BOOK CARD ---------- */
function bookCard(b){
 const w=wishlist.includes(b.id),d=discount(b),mine=user&&b.mine&&b.sellerId===user.email;
 return `<div class="book-card group bg-white rounded-2xl overflow-hidden border border-ink/10 hover:border-ink/25 hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col" onclick="openBook('${b.id}')">
  <div class="relative overflow-hidden shrink-0">
   <img src="${esc(b.image)}" loading="lazy" class="w-full h-40 sm:h-52 object-cover group-hover:scale-105 transition duration-500" alt="${esc(b.title)}" onerror="this.onerror=null;this.src='https://picsum.photos/seed/${b.id}/600/500'">
   <div class="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
    <span class="text-white text-[10px] font-extrabold px-2 py-1 rounded-lg ${condStyle(b.condition)} shadow">${esc(b.condition).toUpperCase()}</span>
    ${b.type==='new'?'<span class="bg-sun text-ink border border-ink text-[10px] font-extrabold px-2 py-1 rounded-lg">✨ NEW</span>':'<span class="bg-ink/90 backdrop-blur text-tealx text-[10px] font-extrabold px-2 py-1 rounded-lg">PRE-LOVED</span>'}
   </div>
   <button data-wish="${b.id}" onclick="toggleWishlist(event,'${b.id}')" class="absolute top-2 right-2 w-8 h-8 ${w?'bg-red-500 text-white':'bg-white/95 text-ink'} rounded-full flex items-center justify-center shadow hover:scale-110 transition"><i class="fa-${w?'solid':'regular'} fa-heart text-sm"></i></button>
   ${d>0?`<span class="absolute bottom-2 left-2 bg-green-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg">-${d}% OFF</span>`:''}
   ${mine?'<span class="absolute bottom-2 right-2 bg-sun text-ink border border-ink text-[10px] font-extrabold px-2 py-1 rounded-lg">YOUR LISTING</span>':''}
  </div>
  <div class="p-3 sm:p-4 flex flex-col flex-1">
   <div class="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-ink/40 uppercase">${esc(b.category)} • ${esc(b.location.split(',')[0])}</div>
   <h3 class="font-extrabold text-sm sm:text-[15px] leading-snug line-clamp-1 mt-0.5 group-hover:text-inkLight">${esc(b.title)}</h3>
   <p class="text-xs text-ink/50 font-medium truncate">by ${esc(b.author)}</p>
   <div class="flex items-center gap-1.5 mt-1.5">${starsHTML(b.rating)}<span class="text-[11px] font-bold text-ink/40">(${b.reviews})</span></div>
   <div class="flex items-end justify-between mt-2 gap-2">
    <div class="min-w-0"><span class="font-black text-base sm:text-lg">${fmt(b.price)}</span>${b.mrp>b.price?`<span class="text-[11px] line-through text-ink/35 font-bold ml-1.5">${fmt(b.mrp)}</span>`:''}<div class="text-[10px] font-bold text-ink/40 flex items-center gap-1 mt-0.5"><i class="fa-regular fa-clock"></i>${esc(b.postedAt)}</div></div>
    <button onclick="addToCart(event,'${b.id}')" class="shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-ink text-sun rounded-xl flex items-center justify-center hover:bg-sun hover:text-ink hover:border-ink border-2 border-ink transition shadow-popSm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]" title="Add to cart"><i class="fa-solid fa-cart-plus text-sm"></i></button>
   </div>
  </div></div>`;
}

/* ---------- HOME ---------- */
function setHomeTab(t){homeTab=t;document.querySelectorAll('[data-htab]').forEach(b=>{const on=b.dataset.htab===t;b.className=`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition ${on?'tab-active':'text-ink/60 hover:text-ink'}`;});renderHomeGrid();}
function renderHome(){
 const hc=$('home-categories');
 hc.innerHTML=`<button onclick="clearFilters();navigate('browse')" class="shrink-0 w-28 sm:w-32 bg-ink text-white rounded-2xl p-3.5 text-left hover:-translate-y-1 transition shadow-card"><span class="w-10 h-10 bg-sun rounded-xl flex items-center justify-center"><i class="fa-solid fa-layer-group text-ink"></i></span><div class="font-extrabold text-sm mt-2.5">All Books</div><div class="text-[11px] text-white/50 font-bold">${listings.length} listings</div></button>`+
 CATEGORIES.map(c=>{const n=listings.filter(b=>b.category===c.name).length;return `<button onclick="setCategoryAndBrowse('${c.name}')" class="shrink-0 w-28 sm:w-32 bg-white border border-ink/10 rounded-2xl p-3.5 text-left hover:border-ink hover:shadow-card hover:-translate-y-1 transition"><span class="w-10 h-10 ${c.color} rounded-xl flex items-center justify-center"><i class="fa-solid ${c.icon}"></i></span><div class="font-extrabold text-sm mt-2.5 truncate">${c.name}</div><div class="text-[11px] text-ink/40 font-bold">${n} books</div></button>`;}).join('');
 renderHomeGrid();renderTestimonials();animateCounters();
}
function renderHomeGrid(){
 let r=[...listings];
 if(homeTab==='new')r=r.filter(b=>b.type==='new');else if(homeTab==='used')r=r.filter(b=>b.type==='used');else if(homeTab==='under250')r=r.filter(b=>b.price<250);
 r.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));r=r.slice(0,8);
 $('home-grid').innerHTML=r.length?r.map(bookCard).join(''):`<div class="col-span-full text-center py-10 text-sm font-bold text-ink/40">No books in this tab yet.</div>`;
}
function renderTestimonials(){
 const T=[{n:'Ritika Malhotra',c:'Delhi',img:36,t:'Bought 6 books for the price of 2 new ones. The condition grading was spot-on — "Like New" genuinely looked untouched!',b:'Atomic Habits + 5 more'},{n:'Farhan Sheikh',c:'Bangalore',img:14,t:'Sold my entire engineering shelf in 3 days. Doorstep pickup, instant UPI payment. This is how OLX should feel for books.',b:'Sold 22 books • ₹6,400 earned'},{n:'Lakshmi Venkat',c:'Chennai',img:25,t:'The chat with sellers is so smooth. Negotiated politely, met at a café, got a first-edition classic. My weekend ritual now!',b:'Pride & Prejudice • ₹159'}];
 $('testimonials').innerHTML=T.map(x=>`<div class="bg-white border border-ink/10 rounded-3xl p-5 hover:shadow-card hover:-translate-y-1 transition-all"><div class="flex text-sunDark text-xs"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div><p class="text-sm font-medium text-ink/70 mt-3 leading-relaxed">"${x.t}"</p><div class="flex items-center gap-3 mt-4 pt-4 border-t"><img src="https://i.pravatar.cc/60?img=${x.img}" class="w-10 h-10 rounded-full" alt="${x.n}"><div class="flex-1"><div class="font-extrabold text-sm">${x.n}</div><div class="text-[11px] font-bold text-ink/40">${x.c} • Verified Buyer</div></div></div><div class="mt-3 bg-paper rounded-xl px-3 py-2 text-[11px] font-extrabold text-ink/60">📦 ${x.b}</div></div>`).join('');
}
function animateCounters(){document.querySelectorAll('[data-count]').forEach(el=>{const t=+el.dataset.count;let c=0;const iv=setInterval(()=>{c+=1;el.textContent=c;if(c>=t)clearInterval(iv);},30);});}

/* ---------- BROWSE ---------- */
function renderBrowse(){syncFilterUI();const r=getFiltered();$('browse-count').textContent=r.length;$('mobile-filter-results').textContent=r.length;$('browse-empty').classList.toggle('hidden',r.length>0);$('browse-grid').innerHTML=r.map(bookCard).join('');}

/* ---------- DETAILS ---------- */
function openBook(id){currentBookId=id;detailQty=1;detailsTab='desc';const b=getBook(id);if(!b)return;recent=[id,...recent.filter(x=>x!==id)].slice(0,8);saveRecent();b.views=(b.views||0)+1;saveList();hideSuggestions();if(currentView==='details')renderDetails();else navigate('details');}
function changeQty(d){const b=getBook(currentBookId);detailQty=Math.min(Math.max(1,detailQty+d),b?b.stock:1);const el=$('detail-qty');if(el)el.textContent=detailQty;}
function changeMainImage(src,el){$('detail-main-img').src=src;document.querySelectorAll('.detail-thumb').forEach(t=>t.classList.remove('ring-2','ring-ink'));if(el)el.classList.add('ring-2','ring-ink');}
function setDetailsTab(t){detailsTab=t;renderDetails();}
function renderDetails(){
 const b=getBook(currentBookId);
 if(!b){navigate('browse');return;}
 const w=wishlist.includes(b.id),d=discount(b),cm=catMeta(b.category),mine=user&&b.mine&&b.sellerId===user.email;
 const related=listings.filter(x=>x.category===b.category&&x.id!==b.id).slice(0,4);
 const recentBooks=recent.filter(id=>id!==b.id).map(getBook).filter(Boolean).slice(0,4);
 const thumbs=[b.image,U('1512820790803-83ca734da794'),U('1481627834876-b7833e8f5570')];
 $('details-content').innerHTML=`
 <div class="flex items-center gap-2 text-xs font-bold text-ink/40 flex-wrap"><button onclick="navigate('home')" class="hover:text-ink">Home</button><i class="fa-solid fa-chevron-right text-[10px]"></i><button onclick="navigate('browse')" class="hover:text-ink">Browse</button><i class="fa-solid fa-chevron-right text-[10px]"></i><button onclick="setCategoryAndBrowse('${esc(b.category)}')" class="hover:text-ink">${esc(b.category)}</button><i class="fa-solid fa-chevron-right text-[10px]"></i><span class="text-ink truncate max-w-[180px]">${esc(b.title)}</span></div>
 <button onclick="history.length>1?navigate('browse'):navigate('home')" class="mt-3 flex items-center gap-2 text-sm font-extrabold hover:gap-3 transition-all"><i class="fa-solid fa-arrow-left"></i> Back to results</button>
 <div class="grid lg:grid-cols-[1fr_1fr] gap-6 mt-4 items-start">
  <div class="space-y-3">
   <div class="bg-white rounded-3xl border border-ink/10 overflow-hidden shadow-sm relative group">
    <img id="detail-main-img" src="${esc(b.image)}" onclick="openLightbox('${esc(b.image)}')" class="w-full h-72 sm:h-[420px] object-cover cursor-zoom-in" alt="${esc(b.title)}" onerror="this.onerror=null;this.src='https://picsum.photos/seed/${b.id}/700/600'">
    <div class="absolute top-4 left-4 flex gap-2"><span class="text-white text-xs font-extrabold px-3 py-1.5 rounded-xl ${condStyle(b.condition)} shadow">${esc(b.condition).toUpperCase()}</span>${b.type==='new'?'<span class="bg-sun text-ink border-2 border-ink text-xs font-extrabold px-3 py-1.5 rounded-xl">✨ BRAND NEW</span>':'<span class="bg-ink text-tealx text-xs font-extrabold px-3 py-1.5 rounded-xl">📚 PRE-LOVED</span>'}</div>
    ${d>0?`<span class="absolute top-4 right-4 bg-green-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl">SAVE ${d}%</span>`:''}
    <button onclick="openLightbox('${esc(b.image)}')" class="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-xs font-extrabold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition"><i class="fa-solid fa-expand mr-1"></i> Zoom</button>
   </div>
   <div class="grid grid-cols-3 gap-3">${thumbs.map((t,i)=>`<img src="${esc(t)}" onclick="changeMainImage('${esc(t)}',this)" class="detail-thumb ${i===0?'ring-2 ring-ink':''} w-full h-20 sm:h-24 object-cover rounded-2xl border cursor-pointer hover:opacity-80 transition" onerror="this.src='https://picsum.photos/seed/dt${i}/300/200'">`).join('')}</div>
   <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3 text-xs font-medium text-blue-900 leading-relaxed"><i class="fa-solid fa-shield-halved text-blue-500 text-lg shrink-0"></i><span><strong>Buyer Protection enabled.</strong> Pay securely — money releases to seller only after you confirm the book matches this listing. 7-day returns.</span></div>
  </div>
  <div>
   <div class="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
    <div class="flex items-center gap-2 flex-wrap"><span class="flex items-center gap-1.5 ${cm.color} text-xs font-extrabold px-3 py-1.5 rounded-full"><i class="fa-solid ${cm.icon}"></i>${esc(b.category)}</span><span class="text-xs font-bold text-ink/40 flex items-center gap-1"><i class="fa-regular fa-eye"></i> ${b.views||0} views</span><span class="text-xs font-bold text-ink/40">• ${esc(b.postedAt)}</span></div>
    <h1 class="font-display font-black text-2xl sm:text-3xl mt-3 leading-tight">${esc(b.title)}</h1>
    <p class="font-semibold text-ink/55 mt-1">by <span class="text-ink font-extrabold">${esc(b.author)}</span></p>
    <div class="flex items-center gap-2 mt-2 flex-wrap">${starsHTML(b.rating,'text-sm')}<strong class="text-sm">${b.rating}</strong><span class="text-xs font-bold text-ink/40">(${b.reviews} ratings)</span><span class="text-green-700 bg-green-100 text-[11px] font-extrabold px-2 py-0.5 rounded-full">✓ ${(b.sellerSales||0)+120}+ sold</span></div>
    <div class="flex items-end gap-3 mt-4 flex-wrap"><span class="font-display font-black text-4xl">${fmt(b.price)}</span>${b.mrp>b.price?`<span class="text-lg line-through text-ink/30 font-bold mb-1">${fmt(b.mrp)}</span><span class="bg-green-100 text-green-700 text-xs font-extrabold px-2.5 py-1 rounded-full mb-1.5">${d}% off MRP</span>`:''}</div>
    <p class="text-[11px] font-bold text-ink/40 mt-1">Inclusive of all taxes • EMI from ${fmt(Math.round(b.price/6))}/mo</p>
    <div class="grid grid-cols-2 gap-2.5 mt-4 text-xs font-bold"><div class="bg-paper rounded-xl px-3 py-2.5 flex items-center gap-2"><i class="fa-solid fa-location-dot text-red-400"></i> ${esc(b.location)}</div><div class="bg-paper rounded-xl px-3 py-2.5 flex items-center gap-2"><i class="fa-solid fa-box text-ink/40"></i> ${b.stock<=1?'Only 1 left in stock!':b.stock+' copies available'}</div></div>
    ${mine?`<div class="mt-4 bg-sun/30 border-2 border-dashed border-ink/30 rounded-2xl p-3.5 flex items-center gap-3"><i class="fa-solid fa-crown text-sunDark"></i><span class="text-sm font-bold flex-1">This is your listing</span><button onclick="editListing('${b.id}')" class="bg-ink text-white text-xs font-extrabold px-4 py-2 rounded-xl">Edit</button></div>`:`
    <div class="flex items-center gap-3 mt-5">
     <div class="flex items-center bg-paper rounded-xl border-2 border-ink/10"><button onclick="changeQty(-1)" class="w-10 h-11 font-black hover:bg-white rounded-l-xl">−</button><span id="detail-qty" class="w-8 text-center font-black">1</span><button onclick="changeQty(1)" class="w-10 h-11 font-black hover:bg-white rounded-r-xl">+</button></div>
     <button onclick="toggleWishlist(event,'${b.id}')" class="h-11 px-4 rounded-xl border-2 ${w?'border-red-500 text-red-500 bg-red-50':'border-ink/15 hover:border-ink'} font-extrabold text-sm transition flex items-center gap-2"><i class="fa-${w?'solid':'regular'} fa-heart"></i><span class="hidden sm:inline">${w?'Saved':'Save'}</span></button>
     <button onclick="shareBook('${b.id}')" class="h-11 w-11 rounded-xl border-2 border-ink/15 hover:border-ink transition shrink-0"><i class="fa-solid fa-share-nodes"></i></button>
    </div>
    <div class="grid grid-cols-2 gap-3 mt-3">
     <button onclick="addToCart(event,'${b.id}',detailQtySafe())" class="bg-white border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm shadow-popSm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
     <button onclick="buyNow('${b.id}')" class="bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition flex items-center justify-center gap-2"><i class="fa-solid fa-bolt text-sun"></i> Buy Now</button>
    </div>
    <button onclick="openChat('${b.id}')" class="w-full mt-3 bg-tealx/20 border-2 border-ink/10 hover:border-ink font-extrabold py-3 rounded-2xl text-sm transition flex items-center justify-center gap-2"><i class="fa-solid fa-comments"></i> Chat with Seller</button>`}
   </div>
   <div class="bg-white rounded-3xl border border-ink/10 p-5 mt-4 shadow-sm">
    <div class="flex items-center gap-3"><img src="${esc(b.sellerAvatar)}" class="w-12 h-12 rounded-2xl object-cover" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(b.seller)}&background=002F34&color=FFCE32'"><div class="flex-1 min-w-0"><div class="font-extrabold flex items-center gap-1.5 truncate">${esc(b.seller)} <i class="fa-solid fa-circle-check text-blue-500 text-sm"></i></div><div class="text-xs font-bold text-ink/50">★ ${b.sellerRating} • ${b.sellerSales} sales • ${esc(b.location.split(',')[0])}</div></div><button onclick="quickSearch('${esc(b.seller).replace(/'/g,"")}')" class="text-xs font-extrabold border rounded-xl px-3 py-2 hover:bg-ink hover:text-white transition whitespace-nowrap">All books</button></div>
    <div class="grid grid-cols-3 gap-2 mt-3 text-center text-[11px] font-extrabold"><div class="bg-paper rounded-xl py-2"><div class="text-ink">~5 min</div><div class="text-ink/40 font-bold">Response</div></div><div class="bg-paper rounded-xl py-2"><div class="text-ink">98%</div><div class="text-ink/40 font-bold">Ship on time</div></div><div class="bg-paper rounded-xl py-2"><div class="text-ink">${b.sellerSales}+</div><div class="text-ink/40 font-bold">Reviews</div></div></div>
   </div>
  </div>
 </div>
 <div class="bg-white rounded-3xl border border-ink/10 mt-6 overflow-hidden shadow-sm">
  <div class="flex border-b overflow-x-auto no-scrollbar">${['desc','specs','ship'].map(t=>`<button onclick="setDetailsTab('${t}')" class="px-6 py-4 text-sm font-extrabold whitespace-nowrap border-b-[3px] transition ${detailsTab===t?'border-ink text-ink':'border-transparent text-ink/40 hover:text-ink'}">${t==='desc'?'📖 Description':t==='specs'?'📋 Specifications':'🚚 Shipping & Returns'}</button>`).join('')}</div>
  <div class="p-5 sm:p-7 text-sm leading-relaxed font-medium text-ink/70">
   ${detailsTab==='desc'?`<p>${esc(b.description)}</p><div class="grid sm:grid-cols-3 gap-3 mt-5">${[['fa-spray-can-sparkles','Condition',b.condition],['fa-book','Pages',b.pages+' pages'],['fa-language','Language',b.language]].map(x=>`<div class="bg-paper rounded-2xl p-3.5 text-center"><i class="fa-solid ${x[0]} text-ink/30 text-lg"></i><div class="text-[11px] font-bold text-ink/40 uppercase tracking-wider mt-1">${x[1]}</div><div class="font-extrabold text-ink mt-0.5">${esc(String(x[2]))}</div></div>`).join('')}</div>`:''}
   ${detailsTab==='specs'?`<div class="grid sm:grid-cols-2 gap-3">${[['Title',b.title],['Author',b.author],['Category',b.category],['ISBN',b.isbn],['Pages',b.pages],['Language',b.language],['Condition',b.condition],['Type',b.type==='new'?'Brand New':'Pre-loved (Used)'],['Seller',b.seller],['Location',b.location]].map(x=>`<div class="flex justify-between bg-paper rounded-xl px-4 py-3"><span class="font-bold text-ink/45 text-[13px]">${x[0]}</span><span class="font-extrabold text-[13px] text-right">${esc(String(x[1]))}</span></div>`).join('')}</div>`:''}
   ${detailsTab==='ship'?`<div class="space-y-3"><div class="flex gap-3 bg-green-50 border border-green-200 rounded-2xl p-4"><i class="fa-solid fa-truck-fast text-green-600 mt-0.5"></i><span><strong>Free shipping</strong> on orders over ${fmt(FREE_SHIP)} (else ${fmt(SHIP_COST)}). Dispatched in 24h, delivered in 2–4 days with tracking.</span></div><div class="flex gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4"><i class="fa-solid fa-rotate-left text-blue-600 mt-0.5"></i><span><strong>7-day easy returns.</strong> Full refund if the book doesn't match the listed condition. No questions asked.</span></div><div class="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4"><i class="fa-solid fa-handshake text-amber-600 mt-0.5"></i><span><strong>Local pickup available</strong> in ${esc(b.location.split(',')[0])}. Chat with the seller to arrange a safe public meetup.</span></div></div>`:''}
  </div>
 </div>
 <div class="flex items-center justify-between mt-6"><button onclick="reportListing('${b.id}')" class="text-xs font-bold text-ink/35 hover:text-red-500 flex items-center gap-1.5"><i class="fa-regular fa-flag"></i> Report this listing</button><span class="text-xs font-bold text-ink/35">Listing ID: ${b.id.toUpperCase()} • ${esc(b.isbn)}</span></div>
 ${related.length?`<div class="mt-8"><div class="flex items-end justify-between mb-4"><h2 class="font-display font-black text-2xl">You may also like</h2><button onclick="setCategoryAndBrowse('${esc(b.category)}')" class="text-sm font-extrabold flex items-center gap-1.5">More ${esc(b.category)} <i class="fa-solid fa-arrow-right"></i></button></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">${related.map(bookCard).join('')}</div></div>`:''}
 ${recentBooks.length?`<div class="mt-8"><h2 class="font-display font-black text-2xl mb-4">Recently viewed</h2><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">${recentBooks.map(bookCard).join('')}</div></div>`:''}`;
}
function DetailQtySafe(){return detailQty||1;}
function shareBook(id){const b=getBook(id);const txt=`${b.title} by ${b.author} — ${fmt(b.price)} on BookOLX`;try{navigator.clipboard.writeText(txt+' #BookOLX');}catch(e){}showToast('Book link copied! Share the story 📤','info');}
function reportListing(id){showToast('Thanks! Our team will review this listing within 24h.','info');}

/* ---------- WISHLIST ---------- */
function toggleWishlist(e,id){if(e){e.stopPropagation();e.preventDefault();}const i=wishlist.indexOf(id);if(i>=0){wishlist.splice(i,1);showToast('Removed from wishlist','info');}else{wishlist.push(id);showToast('Saved to wishlist ❤️');}saveWish();updateBadges();
 document.querySelectorAll(`[data-wish="${id}"]`).forEach(btn=>{const on=wishlist.includes(id);btn.className=`absolute top-2 right-2 w-8 h-8 ${on?'bg-red-500 text-white':'bg-white/95 text-ink'} rounded-full flex items-center justify-center shadow hover:scale-110 transition`;btn.innerHTML=`<i class="fa-${on?'solid':'regular'} fa-heart text-sm"></i>`;});
 if(currentView==='home')renderHomeGrid();if(currentView==='browse')renderBrowse();if(currentView==='details')renderDetails();if(currentView==='wishlist')renderWishlist();if(currentView==='profile'&&profileTab==='wishlist')renderProfile();}
function renderWishlist(){
 const items=wishlist.map(getBook).filter(Boolean);
 $('wishlist-content').innerHTML=`
 <div class="flex items-center gap-2 text-xs font-bold text-ink/40"><button onclick="navigate('home')" class="hover:text-ink">Home</button><i class="fa-solid fa-chevron-right text-[10px]"></i><span class="text-ink">Wishlist</span></div>
 <div class="mt-3 flex items-end justify-between"><div><h1 class="font-display font-black text-3xl sm:text-4xl">Your wishlist ❤️</h1><p class="text-sm font-semibold text-ink/50 mt-1">${items.length} saved ${items.length===1?'book':'books'}</p></div>${items.length?`<button onclick="wishlist=[];saveWish();updateBadges();renderWishlist()" class="text-xs font-extrabold text-red-500 hover:underline">Clear all</button>`:''}</div>
 ${items.length?`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">${items.map(bookCard).join('')}</div>`:
 `<div class="text-center py-16 bg-white rounded-3xl border border-dashed border-ink/20 mt-6"><div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto"><i class="fa-regular fa-heart text-3xl text-red-300"></i></div><h3 class="font-display font-black text-xl mt-4">Nothing saved yet</h3><p class="text-sm text-ink/50 mt-1">Tap the ♥ on any book to save it here.</p><button onclick="navigate('browse')" class="mt-5 bg-ink text-white font-extrabold text-sm px-7 py-3 rounded-2xl">Discover books</button></div>`}`;
}

/* ---------- CART ---------- */
function cartDetailed(){return cart.map(c=>({...c,book:getBook(c.id)})).filter(x=>x.book);}
function cartTotals(){
 const items=cartDetailed();const sub=items.reduce((s,x)=>s+x.book.price*x.qty,0);
 const mrpTotal=items.reduce((s,x)=>s+x.book.mrp*x.qty,0);
 const disc=pct=>Math.round(sub*pct/100);
 const promoDisc=promoApplied?disc(PROMOS[promoApplied]):0;
 const ship=sub===0?0:(sub-promoDisc>=FREE_SHIP?0:SHIP_COST);
 return {items,sub,mrpTotal,saved:mrpTotal-sub,promoDisc,ship,total:sub-promoDisc+ship,count:items.reduce((s,x)=>s+x.qty,0)};
}
function addToCart(e,id,qty=1){if(e){e.stopPropagation();e.preventDefault();}const b=getBook(id);if(!b)return;const ex=cart.find(c=>c.id===id);const cur=ex?ex.qty:0;
 if(cur+qty>b.stock){showToast(`Only ${b.stock} ${b.stock===1?'copy':'copies'} available`,'warning');return;}
 if(ex)ex.qty+=qty;else cart.push({id,qty});saveCart();updateBadges();renderCartDrawer();
 const dr=$('cart-drawer-wrap');if(dr.classList.contains('hidden'))openCartDrawer();else showToast(`"${b.title}" added to cart 🛒`);
 if(currentView==='cart')renderCartPage();}
function buyNow(id){const b=getBook(id);if(!b)return;const ex=cart.find(c=>c.id===id);if(!ex)cart.push({id,qty:detailQty||1});saveCart();updateBadges();closeCartDrawer();navigate('checkout');}
function updateCartQty(id,d){const it=cart.find(c=>c.id===id);const b=getBook(id);if(!it)return;it.qty+=d;if(it.qty<=0)cart=cart.filter(c=>c.id!==id);if(it&&b&&it.qty>b.stock){it.qty=b.stock;showToast(`Only ${b.stock} available`,'warning');}saveCart();updateBadges();renderCartDrawer();if(currentView==='cart')renderCartPage();if(currentView==='checkout')renderCheckout();}
function removeFromCart(id){cart=cart.filter(c=>c.id!==id);saveCart();updateBadges();renderCartDrawer();if(currentView==='cart')renderCartPage();if(currentView==='checkout')renderCheckout();showToast('Removed from cart','info');}
function clearCart(){cart=[];promoApplied=null;saveCart();updateBadges();renderCartDrawer();if(currentView==='cart')renderCartPage();}
function updateBadges(){
 const c=cart.reduce((s,x)=>s+x.qty,0),w=wishlist.length;
 [['badge-cart',c],['badge-wishlist',w]].forEach(([id,n])=>{const el=$(id);if(el){el.textContent=n;el.classList.toggle('hidden',n===0);}});
 const m=$('badge-wishlist-m');if(m){m.textContent=w;m.classList.toggle('hidden',w===0);m.classList.toggle('flex',w>0);}
 const dc=$('drawer-cart-count');if(dc)dc.textContent=c;
}
function openCartDrawer(){renderCartDrawer();$('cart-drawer-wrap').classList.remove('hidden');document.body.style.overflow='hidden';requestAnimationFrame(()=>$('cart-drawer').classList.remove('translate-x-full'));}
function closeCartDrawer(){const d=$('cart-drawer');if(!d)return;d.classList.add('translate-x-full');setTimeout(()=>{$('cart-drawer-wrap').classList.add('hidden');document.body.style.overflow='';},320);}
function renderCartDrawer(){
 const t=cartTotals();
 $('cart-drawer-body').innerHTML=t.items.length?t.items.map(({book:b,qty})=>`
  <div class="bg-white rounded-2xl border p-3 flex gap-3 pop-in">
   <img src="${esc(b.image)}" onclick="closeCartDrawer();openBook('${b.id}')" class="w-16 h-20 rounded-xl object-cover cursor-pointer shrink-0" onerror="this.src='https://picsum.photos/seed/${b.id}/200/240'">
   <div class="flex-1 min-w-0"><div class="font-extrabold text-sm truncate">${esc(b.title)}</div><div class="text-[11px] font-bold text-ink/40">${esc(b.author)} • ${esc(b.condition)}</div>
   <div class="flex items-center justify-between mt-2"><div class="flex items-center bg-paper rounded-lg"><button onclick="updateCartQty('${b.id}',-1)" class="w-7 h-7 font-black text-sm">−</button><span class="w-6 text-center text-sm font-black">${qty}</span><button onclick="updateCartQty('${b.id}',1)" class="w-7 h-7 font-black text-sm">+</button></div><span class="font-black text-sm">${fmt(b.price*qty)}</span></div></div>
   <button onclick="removeFromCart('${b.id}')" class="self-start text-ink/25 hover:text-red-500 text-sm"><i class="fa-solid fa-trash-can"></i></button>
  </div>`).join(''):
 `<div class="text-center py-14"><div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm"><i class="fa-solid fa-cart-shopping text-3xl text-ink/15"></i></div><h3 class="font-extrabold mt-4">Your cart is empty</h3><p class="text-xs font-semibold text-ink/40 mt-1">Great stories await. Go find yours!</p><button onclick="closeCartDrawer();navigate('browse')" class="mt-4 bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl">Browse books</button></div>`;
 $('cart-drawer-footer').innerHTML=t.items.length?`
  <div class="flex justify-between text-sm font-bold"><span class="text-ink/50">Subtotal (${t.count} items)</span><span class="font-black">${fmt(t.sub)}</span></div>
  <div class="text-[11px] font-bold text-green-700 mt-1">${t.sub>=FREE_SHIP?'🎉 You unlocked FREE shipping!':`Add ${fmt(FREE_SHIP-t.sub)} more for FREE shipping`}</div>
  <div class="grid grid-cols-2 gap-2 mt-3"><button onclick="closeCartDrawer();navigate('cart')" class="border-2 border-ink font-extrabold py-3 rounded-2xl text-sm">View Cart</button><button onclick="closeCartDrawer();navigate('checkout')" class="bg-ink text-white font-extrabold py-3 rounded-2xl text-sm">Checkout →</button></div>`:
  `<button onclick="closeCartDrawer()" class="w-full border-2 border-ink/15 font-extrabold py-3 rounded-2xl text-sm">Continue browsing</button>`;
}
function renderCartPage(){
 const t=cartTotals();
 $('cart-content').innerHTML=`
 <div class="flex items-center gap-2 text-xs font-bold text-ink/40"><button onclick="navigate('home')" class="hover:text-ink">Home</button><i class="fa-solid fa-chevron-right text-[10px]"></i><span class="text-ink">Shopping Cart</span></div>
 <div class="mt-3 flex items-end justify-between flex-wrap gap-2"><div><h1 class="font-display font-black text-3xl sm:text-4xl">Your cart 🛒</h1><p class="text-sm font-semibold text-ink/50 mt-1">${t.count} ${t.count===1?'item':'items'} • Buyer protection included</p></div>${t.items.length?`<button onclick="clearCart()" class="text-xs font-extrabold text-red-500 hover:underline">Clear cart</button>`:''}</div>
 ${!t.items.length?`<div class="text-center py-16 bg-white rounded-3xl border border-dashed border-ink/20 mt-6 max-w-2xl mx-auto"><div class="w-24 h-24 bg-paper rounded-full flex items-center justify-center mx-auto"><i class="fa-solid fa-book-open text-4xl text-ink/15"></i></div><h3 class="font-display font-black text-2xl mt-5">An empty shelf is a sad shelf</h3><p class="text-sm text-ink/50 mt-2">Fill it with pre-loved treasures at up to 70% off.</p><div class="flex justify-center gap-3 mt-6 flex-wrap"><button onclick="navigate('browse')" class="bg-ink text-white font-extrabold text-sm px-7 py-3 rounded-2xl">Browse books</button><button onclick="navigate('wishlist')" class="border-2 border-ink/15 font-extrabold text-sm px-6 py-3 rounded-2xl">View wishlist</button></div></div>`:`
 <div class="grid lg:grid-cols-[1fr_360px] gap-6 mt-6 items-start">
  <div class="space-y-3">${t.items.map(({book:b,qty})=>`
   <div class="bg-white rounded-3xl border border-ink/10 p-4 flex gap-4 hover:shadow-card transition fade-up">
    <img src="${esc(b.image)}" onclick="openBook('${b.id}')" class="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl object-cover cursor-pointer shrink-0" onerror="this.src='https://picsum.photos/seed/${b.id}/300/360'">
    <div class="flex-1 min-w-0">
     <div class="flex items-start justify-between gap-2"><div class="min-w-0"><span class="text-[10px] font-extrabold ${b.type==='new'?'bg-green-100 text-green-700':'bg-ink text-tealx'} px-2 py-0.5 rounded-full">${b.type==='new'?'✨ NEW':'📚 PRE-LOVED'} • ${esc(b.condition).toUpperCase()}</span><h3 onclick="openBook('${b.id}')" class="font-extrabold text-base sm:text-lg mt-1.5 cursor-pointer hover:underline truncate">${esc(b.title)}</h3><p class="text-xs font-semibold text-ink/45">by ${esc(b.author)} • Sold by ${esc(b.seller)}</p></div><button onclick="removeFromCart('${b.id}')" class="text-ink/25 hover:text-red-500 shrink-0"><i class="fa-solid fa-trash-can"></i></button></div>
     <div class="flex items-end justify-between mt-3 gap-2 flex-wrap"><div class="flex items-center bg-paper rounded-xl border"><button onclick="updateCartQty('${b.id}',-1)" class="w-9 h-9 font-black hover:bg-white rounded-l-xl">−</button><span class="w-8 text-center font-black text-sm">${qty}</span><button onclick="updateCartQty('${b.id}',1)" class="w-9 h-9 font-black hover:bg-white rounded-r-xl">+</button></div>
     <div class="text-right"><span class="font-black text-lg">${fmt(b.price*qty)}</span>${b.mrp>b.price?`<span class="text-xs line-through text-ink/35 font-bold ml-2">${fmt(b.mrp*qty)}</span>`:''}<div class="text-[11px] font-bold text-green-700">${fmt(b.price)} each • ${discount(b)}% off</div></div></div>
    </div></div>`).join('')}
   <button onclick="navigate('browse')" class="flex items-center gap-2 text-sm font-extrabold hover:gap-3 transition-all mt-1"><i class="fa-solid fa-arrow-left"></i> Continue shopping</button>
  </div>
  <div class="lg:sticky lg:top-32 space-y-4">
   <div class="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm">
    <h3 class="font-extrabold flex items-center gap-2"><i class="fa-solid fa-ticket text-sunDark"></i> Have a coupon?</h3>
    ${promoApplied?`<div class="mt-3 bg-green-50 border border-green-300 rounded-2xl p-3 flex items-center gap-2"><i class="fa-solid fa-circle-check text-green-600"></i><span class="flex-1 text-sm font-extrabold text-green-800">${promoApplied} • ${PROMOS[promoApplied]}% off applied</span><button onclick="removePromo()" class="text-red-500 text-sm"><i class="fa-solid fa-xmark"></i></button></div>`:`<div class="flex gap-2 mt-3"><input id="promo-input" placeholder="Try BOOK10" class="flex-1 bg-paper rounded-xl px-4 py-2.5 text-sm font-extrabold outline-none uppercase min-w-0 border-2 border-transparent focus:border-ink"><button onclick="applyPromo()" class="bg-ink text-white font-extrabold text-sm px-5 rounded-xl">Apply</button></div><div class="flex flex-wrap gap-1.5 mt-2.5">${Object.keys(PROMOS).map(p=>`<button onclick="document.getElementById('promo-input').value='${p}';applyPromo()" class="text-[11px] font-extrabold border border-dashed border-ink/30 rounded-full px-3 py-1 hover:bg-sun hover:border-ink transition">${p}</button>`).join('')}</div>`}
   </div>
   <div class="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm">
    <h3 class="font-extrabold">Order summary</h3>
    <div class="mt-4 space-y-2.5 text-sm font-semibold"><div class="flex justify-between"><span class="text-ink/50">Subtotal</span><span class="font-extrabold">${fmt(t.sub)}</span></div><div class="flex justify-between text-green-700"><span>You save vs MRP</span><span class="font-extrabold">− ${fmt(t.saved)}</span></div>${t.promoDisc?`<div class="flex justify-between text-green-700"><span>Coupon (${promoApplied})</span><span class="font-extrabold">− ${fmt(t.promoDisc)}</span></div>`:''}<div class="flex justify-between"><span class="text-ink/50">Shipping</span><span class="font-extrabold ${t.ship===0?'text-green-600':''}">${t.ship===0?'FREE':fmt(t.ship)}</span></div></div>
    ${t.ship>0?`<div class="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] font-bold text-amber-800">Add ${fmt(FREE_SHIP-(t.sub-t.promoDisc))} more for FREE shipping 🚚</div>`:''}
    <div class="border-t border-dashed mt-4 pt-4 flex justify-between items-end"><span class="font-extrabold">Total</span><span class="font-display font-black text-3xl">${fmt(t.total)}</span></div>
    <button onclick="navigate('checkout')" class="w-full mt-4 bg-ink text-white font-extrabold py-4 rounded-2xl text-sm hover:bg-inkLight transition flex items-center justify-center gap-2">Proceed to Checkout <i class="fa-solid fa-arrow-right"></i></button>
    <div class="flex items-center justify-center gap-4 mt-3 text-[11px] font-bold text-ink/40"><span><i class="fa-solid fa-lock mr-1"></i>Secure</span><span><i class="fa-solid fa-rotate-left mr-1"></i>7-day returns</span><span><i class="fa-solid fa-shield-halved mr-1"></i>Protected</span></div>
   </div>
  </div></div>`}`;
}
function applyPromo(){const v=($('promo-input').value||'').trim().toUpperCase();if(PROMOS[v]){promoApplied=v;showToast(`Coupon ${v} applied — ${PROMOS[v]}% off! 🎉`);}else{showToast('Invalid coupon code','error');return;}renderCartPage();}
function removePromo(){promoApplied=null;renderCartPage();showToast('Coupon removed','info');}

/* ---------- CHECKOUT ---------- */
function setCheckoutStep(s){checkoutState.step=s;renderCheckout();window.scrollTo({top:0,behavior:'smooth'});}
function setPaymentMethod(m){checkoutState.payment.method=m;renderCheckout();}
function renderCheckout(){
 const t=cartTotals();
 if(!t.items.length){navigate('cart');return;}
 const s=checkoutState.step,sh=checkoutState.shipping,pm=checkoutState.payment;
 const steps=[['fa-truck','Shipping'],['fa-credit-card','Payment'],['fa-clipboard-check','Review']];
 $('checkout-content').innerHTML=`
 <div class="flex items-center gap-2 text-xs font-bold text-ink/40"><button onclick="navigate('home')" class="hover:text-ink">Home</button><i class="fa-solid fa-chevron-right text-[10px]"></i><button onclick="navigate('cart')" class="hover:text-ink">Cart</button><i class="fa-solid fa-chevron-right text-[10px]"></i><span class="text-ink">Checkout</span></div>
 <h1 class="font-display font-black text-3xl sm:text-4xl mt-3">Secure checkout 🔒</h1>
 ${!user?`<div class="mt-4 bg-sun/40 border-2 border-dashed border-ink/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 text-sm font-bold"><span class="flex-1">Checking out as guest. <span class="text-ink/60">Login to track orders & earn rewards.</span></span><button onclick="openAuth('login');checkoutState.pending=true" class="bg-ink text-white text-xs font-extrabold px-5 py-2.5 rounded-xl whitespace-nowrap">Login / Sign Up</button></div>`:''}
 <div class="flex mt-6 mb-6 max-w-xl">${steps.map((x,i)=>{const n=i+1,on=n===s,done=n<s;return `<div class="flex-1 flex flex-col items-center relative step-line"><div class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${done?'bg-green-500 text-white':on?'bg-ink text-sun shadow-popSm':'bg-white border-2 border-ink/15 text-ink/30'}">${done?'<i class="fa-solid fa-check"></i>':`<i class="fa-solid ${x[0]}"></i>`}</div><span class="text-[11px] font-extrabold mt-1.5 ${on?'text-ink':'text-ink/35'}">${n}. ${x[1]}</span></div>`;}).join('')}</div>
 <div class="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
  <div class="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
  ${s===1?`
   <h3 class="font-extrabold text-lg">Where should we deliver?</h3>
   <form onsubmit="handleShippingSubmit(event)" class="grid sm:grid-cols-2 gap-3.5 mt-4">
    <div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Full name *</label><input id="co-name" required value="${esc(sh.name||(user?user.name:''))}" placeholder="Aarav Patel" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div>
    <div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Phone (10 digits) *</label><input id="co-phone" required pattern="[0-9]{10}" maxlength="10" value="${esc(sh.phone||(user?user.phone:''))}" placeholder="9876543210" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div>
    <div class="sm:col-span-2"><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Address *</label><input id="co-addr" required value="${esc(sh.address)}" placeholder="Flat 402, Sea Breeze Apartments, MG Road" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div>
    <div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">City *</label><input id="co-city" required value="${esc(sh.city)}" placeholder="Mumbai" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div>
    <div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Pincode (6 digits) *</label><input id="co-pin" required pattern="[0-9]{6}" maxlength="6" value="${esc(sh.pincode)}" placeholder="400001" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div>
    <div class="sm:col-span-2 flex gap-3 mt-1"><button type="button" onclick="navigate('cart')" class="border-2 border-ink/15 font-extrabold px-6 py-3.5 rounded-2xl text-sm">← Cart</button><button class="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm">Continue to Payment →</button></div>
   </form>`:''}
  ${s===2?`
   <h3 class="font-extrabold text-lg">How would you like to pay?</h3>
   <div class="grid grid-cols-3 gap-2.5 mt-4">${[['upi','fa-mobile-screen','UPI'],['card','fa-credit-card','Card'],['cod','fa-money-bill-wave','COD']].map(m=>`<button onclick="setPaymentMethod('${m[0]}')" class="border-2 ${pm.method===m[0]?'border-ink bg-cream shadow-card':'border-ink/10'} rounded-2xl p-4 text-center transition"><i class="fa-solid ${m[1]} text-xl ${pm.method===m[0]?'text-ink':'text-ink/30'}"></i><div class="font-extrabold text-sm mt-1.5">${m[2]}</div></button>`).join('')}</div>
   <form onsubmit="handlePaymentSubmit(event)" class="mt-4">
   ${pm.method==='upi'?`<label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">UPI ID *</label><input id="co-upi" required value="${esc(pm.upi)}" placeholder="name@okhdfcbank" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"><div class="flex gap-2 mt-3">${['GPay','PhonePe','Paytm'].map(a=>`<span class="bg-paper text-xs font-extrabold px-3 py-1.5 rounded-lg">${a}</span>`).join('')}</div>`:''}
   ${pm.method==='card'?`<div class="bg-gradient-to-br from-ink to-inkLight text-white rounded-2xl p-5 relative overflow-hidden"><div class="dot-grid absolute inset-0 opacity-20"></div><div class="relative"><div class="flex justify-between items-center"><i class="fa-solid fa-microchip text-sun text-xl"></i><i class="fa-brands fa-cc-visa text-2xl"></i></div><div class="font-mono tracking-[.2em] mt-4 text-sm" id="card-preview">${esc(pm.cardNumber||'•••• •••• •••• ••••')}</div></div></div><div class="grid sm:grid-cols-2 gap-3.5 mt-4"><div class="sm:col-span-2"><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Card number *</label><input id="co-card" required pattern="[0-9 ]{16,19}" maxlength="19" value="${esc(pm.cardNumber)}" oninput="document.getElementById('card-preview').textContent=this.value||'•••• •••• •••• ••••'" placeholder="4111 1111 1111 1111" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div><div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Expiry *</label><input id="co-exp" required placeholder="MM/YY" value="${esc(pm.expiry)}" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div><div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">CVV *</label><input id="co-cvv" required type="password" maxlength="4" placeholder="•••" value="${esc(pm.cvv)}" class="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none"></div></div>`:''}
   ${pm.method==='cod'?`<div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm font-semibold text-amber-900 flex gap-3"><i class="fa-solid fa-circle-info mt-0.5"></i><span>Pay <strong>${fmt(t.total)}</strong> in cash/UPI when your books arrive. Please keep exact change ready. COD fee: FREE.</span></div>`:''}
   <div class="flex gap-3 mt-5"><button type="button" onclick="setCheckoutStep(1)" class="border-2 border-ink/15 font-extrabold px-6 py-3.5 rounded-2xl text-sm">← Back</button><button class="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm">Review Order →</button></div></form>
   <p class="text-[11px] font-bold text-ink/35 text-center mt-3"><i class="fa-solid fa-lock mr-1"></i>256-bit encrypted • This is a mock checkout — no real charge.</p>`:''}
  ${s===3?`
   <h3 class="font-extrabold text-lg">Review & place order</h3>
   <div class="grid sm:grid-cols-2 gap-3 mt-4">
    <div class="bg-paper rounded-2xl p-4"><div class="flex justify-between items-center"><span class="text-xs font-extrabold uppercase tracking-wider text-ink/45">📍 Deliver to</span><button onclick="setCheckoutStep(1)" class="text-xs font-extrabold text-blue-600">Edit</button></div><div class="font-extrabold text-sm mt-1.5">${esc(sh.name)} • ${esc(sh.phone)}</div><div class="text-xs font-medium text-ink/55 mt-0.5">${esc(sh.address)}, ${esc(sh.city)} — ${esc(sh.pincode)}</div></div>
    <div class="bg-paper rounded-2xl p-4"><div class="flex justify-between items-center"><span class="text-xs font-extrabold uppercase tracking-wider text-ink/45">💳 Payment</span><button onclick="setCheckoutStep(2)" class="text-xs font-extrabold text-blue-600">Edit</button></div><div class="font-extrabold text-sm mt-1.5">${pm.method==='upi'?'UPI • '+esc(pm.upi||'—'):pm.method==='card'?'Card •••• '+esc((pm.cardNumber||'').replace(/\s/g,'').slice(-4)):'Cash on Delivery'}</div><div class="text-xs font-medium text-ink/55 mt-0.5">${pm.method==='cod'?'Pay on arrival':'Charged securely on order'}</div></div>
   </div>
   <div class="mt-4 space-y-2.5">${t.items.map(({book:b,qty})=>`<div class="flex items-center gap-3 bg-paper/60 rounded-2xl p-2.5"><img src="${esc(b.image)}" class="w-11 h-14 rounded-lg object-cover" onerror="this.src='https://picsum.photos/seed/${b.id}/100/120'"><span class="flex-1 min-w-0"><span class="block font-extrabold text-sm truncate">${esc(b.title)}</span><span class="text-[11px] font-bold text-ink/45">Qty ${qty} • ${esc(b.seller)}</span></span><span class="font-black text-sm">${fmt(b.price*qty)}</span></div>`).join('')}</div>
   <label class="flex items-start gap-2.5 mt-4 text-xs font-semibold text-ink/55 cursor-pointer"><input type="checkbox" required checked class="mt-0.5 accent-[#002F34] w-4 h-4"> I agree to the Terms, and understand this is a demo marketplace with mock payments.</label>
   <div class="flex gap-3 mt-4"><button onclick="setCheckoutStep(2)" class="border-2 border-ink/15 font-extrabold px-6 py-4 rounded-2xl text-sm">← Back</button><button onclick="placeOrder()" id="place-order-btn" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 rounded-2xl text-sm transition flex items-center justify-center gap-2"><i class="fa-solid fa-check-double"></i> Place Order • ${fmt(t.total)}</button></div>`:''}
  </div>
  <div class="lg:sticky lg:top-32 bg-ink text-white rounded-3xl p-5 sm:p-6 relative overflow-hidden"><div class="dot-grid absolute inset-0 opacity-15"></div>
   <div class="relative"><h3 class="font-extrabold">Order summary</h3>
   <div class="mt-4 space-y-2.5 text-sm font-semibold"><div class="flex justify-between text-white/60"><span>Subtotal (${t.count})</span><span class="text-white font-extrabold">${fmt(t.sub)}</span></div>${t.promoDisc?`<div class="flex justify-between text-green-300"><span>Coupon ${promoApplied}</span><span>− ${fmt(t.promoDisc)}</span></div>`:''}<div class="flex justify-between text-white/60"><span>Shipping</span><span class="${t.ship===0?'text-green-300':'text-white'} font-extrabold">${t.ship===0?'FREE':fmt(t.ship)}</span></div><div class="flex justify-between text-white/60"><span>You save</span><span class="text-sun font-extrabold">${fmt(t.saved+t.promoDisc)}</span></div></div>
   <div class="border-t border-white/15 mt-4 pt-4 flex justify-between items-end"><span class="font-extrabold text-white/60">Total</span><span class="font-display font-black text-3xl text-sun">${fmt(t.total)}</span></div>
   <div class="mt-4 space-y-2 text-[11px] font-bold text-white/50"><div class="flex items-center gap-2"><i class="fa-solid fa-truck-fast text-tealx"></i> Delivery by ${new Date(Date.now()+4*864e5).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})}</div><div class="flex items-center gap-2"><i class="fa-solid fa-shield-halved text-tealx"></i> Buyer protection + 7-day returns</div><div class="flex items-center gap-2"><i class="fa-solid fa-leaf text-tealx"></i> You're saving ~${(t.count*2.7).toFixed(1)}kg CO₂ 🌱</div></div>
   </div></div>
 </div>`;
}
function handleShippingSubmit(e){e.preventDefault();checkoutState.shipping={name:$('co-name').value.trim(),phone:$('co-phone').value.trim(),address:$('co-addr').value.trim(),city:$('co-city').value.trim(),pincode:$('co-pin').value.trim()};setCheckoutStep(2);showToast('Shipping details saved ✓','info');}
function handlePaymentSubmit(e){e.preventDefault();const m=checkoutState.payment.method;if(m==='upi')checkoutState.payment.upi=$('co-upi').value.trim();if(m==='card'){checkoutState.payment.cardNumber=$('co-card').value.trim();checkoutState.payment.expiry=$('co-exp').value.trim();checkoutState.payment.cvv=$('co-cvv').value.trim();}setCheckoutStep(3);}
function placeOrder(){
 const btn=$('place-order-btn');btn.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Placing order…';btn.disabled=true;
 setTimeout(()=>{
  const t=cartTotals();
  const order={id:'ORD-'+Math.random().toString(36).slice(2,8).toUpperCase(),items:t.items.map(x=>({id:x.book.id,title:x.book.title,author:x.book.author,price:x.book.price,qty:x.qty,image:x.book.image,seller:x.book.seller})),sub:t.sub,promoDisc:t.promoDisc,ship:t.ship,total:t.total,promo:promoApplied,date:new Date().toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}),delivery:new Date(Date.now()+4*864e5).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'}),status:'Confirmed',address:{...checkoutState.shipping},payment:checkoutState.payment.method,userEmail:user?user.email:'guest'};
  orders.unshift(order);saveOrders();
  t.items.forEach(({book:b,qty})=>{b.stock=Math.max(0,(b.stock||1)-qty);b.sellerSales=(b.sellerSales||0)+qty;});saveList();
  cart=[];promoApplied=null;checkoutState.step=1;saveCart();updateBadges();
  window._lastOrder=order;fireConfetti(180);navigate('success');
 },1400);
}
function renderSuccess(){
 const o=window._lastOrder||orders[0];
 if(!o){navigate('home');return;}
 $('success-content').innerHTML=`
 <div class="text-center">
  <div class="check-pop w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"><i class="fa-solid fa-check text-white text-4xl"></i></div>
  <h1 class="font-display font-black text-3xl sm:text-4xl mt-6">Order placed! 🎉</h1>
  <p class="font-semibold text-ink/50 mt-2">Thanks${user?' '+esc(user.name.split(' ')[0]):''}! Your books are being packed with love.</p>
  <div class="inline-flex items-center gap-2 bg-white border-2 border-dashed border-ink/20 rounded-2xl px-5 py-2.5 mt-4 font-mono font-extrabold">${o.id} <button onclick="try{navigator.clipboard.writeText('${o.id}')}catch(e){};showToast('Order ID copied','info')" class="text-ink/30 hover:text-ink"><i class="fa-regular fa-copy text-sm"></i></button></div>
 </div>
 <div class="bg-white rounded-3xl border border-ink/10 p-5 sm:p-6 mt-6 shadow-sm">
  <div class="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-3.5 text-sm font-bold text-green-900"><i class="fa-solid fa-truck-fast text-green-600 text-lg"></i> Arriving by <span class="font-black">${esc(o.delivery)}</span><span class="ml-auto bg-green-500 text-white text-[11px] px-2.5 py-1 rounded-full">${esc(o.status).toUpperCase()}</span></div>
  <div class="mt-4 space-y-2.5">${o.items.map(i=>`<div class="flex items-center gap-3"><img src="${esc(i.image)}" class="w-12 h-16 rounded-xl object-cover" onerror="this.src='https://picsum.photos/seed/${i.id}/100/120'"><div class="flex-1 min-w-0"><div class="font-extrabold text-sm truncate">${esc(i.title)}</div><div class="text-[11px] font-bold text-ink/45">Qty ${i.qty} • ${esc(i.seller)}</div></div><span class="font-black text-sm">${fmt(i.price*i.qty)}</span></div>`).join('')}</div>
  <div class="border-t border-dashed mt-4 pt-4 space-y-1.5 text-sm font-semibold"><div class="flex justify-between text-ink/55"><span>Subtotal</span><span>${fmt(o.sub)}</span></div>${o.promoDisc?`<div class="flex justify-between text-green-700"><span>Coupon savings</span><span>− ${fmt(o.promoDisc)}</span></div>`:''}<div class="flex justify-between text-ink/55"><span>Shipping</span><span>${o.ship===0?'FREE':fmt(o.ship)}</span></div><div class="flex justify-between font-black text-lg pt-1"><span>Paid ${o.payment==='cod'?'(on delivery)':''}</span><span>${fmt(o.total)}</span></div></div>
  <div class="grid sm:grid-cols-2 gap-2.5 mt-4 text-xs font-bold"><div class="bg-paper rounded-xl p-3">📍 ${esc(o.address.address||'')}, ${esc(o.address.city||'')} — ${esc(o.address.pincode||'')}</div><div class="bg-paper rounded-xl p-3">💳 ${o.payment==='upi'?'UPI Payment':o.payment==='card'?'Card Payment':'Cash on Delivery'} • Mock — no real charge</div></div>
 </div>
 <div class="grid sm:grid-cols-3 gap-3 mt-5">
  <button onclick="profileTab='orders';navigate('profile')" class="bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm">Track Order</button>
  <button onclick="navigate('browse')" class="bg-white border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm">Keep Shopping</button>
  <button onclick="openSell()" class="bg-sun border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm">Sell a Book</button>
 </div>`;
}

/* ---------- PROFILE ---------- */
function setProfileTab(t){profileTab=t;renderProfile();}
function myListings(){if(!user)return[];return listings.filter(b=>b.mine&&b.sellerId===user.email);}
function myOrders(){if(!user)return orders.filter(o=>o.userEmail==='guest');return orders.filter(o=>o.userEmail===user.email);}
function renderProfile(){
 const box=$('profile-content');
 if(!user){
  box.innerHTML=`<div class="max-w-2xl mx-auto text-center py-10">
   <div class="bg-white rounded-3xl border p-8 sm:p-12 shadow-sm relative overflow-hidden"><div class="hero-pattern absolute inset-0"></div><div class="relative"><div class="w-20 h-20 bg-ink rounded-3xl flex items-center justify-center mx-auto rotate-3 shadow-pop"><i class="fa-solid fa-user-astronaut text-sun text-3xl"></i></div>
   <h1 class="font-display font-black text-3xl mt-5">Your shelf awaits 📚</h1><p class="text-sm font-semibold text-ink/50 mt-2">Login to manage listings, track orders, sync wishlist & earn seller badges.</p>
   <div class="grid grid-cols-3 gap-2 mt-6 text-center">${[['fa-book','Listings'],['fa-box','Orders'],['fa-heart','Wishlist']].map(x=>`<div class="bg-paper rounded-2xl p-3"><i class="fa-solid ${x[0]} text-ink/30"></i><div class="text-[11px] font-extrabold mt-1">${x[1]}</div></div>`).join('')}</div>
   <div class="flex flex-col sm:flex-row gap-3 mt-6"><button onclick="openAuth('login')" class="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm">Login</button><button onclick="openAuth('signup')" class="flex-1 bg-sun border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm">Create Account</button></div>
   <button onclick="demoLogin()" class="mt-3 text-xs font-extrabold text-ink/50 hover:text-ink underline">or continue with one-click demo →</button></div></div></div>`;return;
 }
 const ml=myListings(),mo=myOrders(),wl=wishlist.map(getBook).filter(Boolean);
 const spent=mo.reduce((s,o)=>s+o.total,0);
 const tabs=[['listings','fa-book',`My Listings (${ml.length})`],['orders','fa-box',`Orders (${mo.length})`],['wishlist','fa-heart',`Wishlist (${wl.length})`],['settings','fa-gear','Settings']];
 let content='';
 if(profileTab==='listings'){
  const q=profileListingQuery.toLowerCase();
  const shown=ml.filter(b=>!q||(b.title+b.author).toLowerCase().includes(q));
  content=`<div class="flex flex-col sm:flex-row gap-3 justify-between sm:items-center mb-4"><div class="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 flex-1 sm:max-w-xs"><i class="fa-solid fa-magnifying-glass text-ink/30 text-sm"></i><input value="${esc(profileListingQuery)}" oninput="profileListingQuery=this.value;renderProfile()" placeholder="Search your listings…" class="flex-1 outline-none text-sm font-semibold bg-transparent min-w-0"></div><button onclick="openSell()" class="bg-sun border-2 border-ink font-extrabold px-5 py-2.5 rounded-xl text-sm shadow-popSm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"><i class="fa-solid fa-plus mr-1"></i> Add New Listing</button></div>
  ${shown.length?`<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">${shown.map(b=>`<div class="bg-white rounded-3xl border overflow-hidden hover:shadow-card transition group"><div class="relative"><img src="${esc(b.image)}" onclick="openBook('${b.id}')" class="w-full h-40 object-cover cursor-pointer" onerror="this.src='https://picsum.photos/seed/${b.id}/400/300'"><span class="absolute top-2.5 left-2.5 bg-green-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg">● LIVE</span><span class="absolute top-2.5 right-2.5 bg-white/95 text-[10px] font-extrabold px-2 py-1 rounded-lg">${b.views||0} views</span></div><div class="p-4"><div class="font-extrabold truncate">${esc(b.title)}</div><div class="flex items-center justify-between mt-1"><span class="font-black">${fmt(b.price)}</span><span class="text-[11px] font-bold text-ink/40">${esc(b.postedAt)}</span></div><div class="grid grid-cols-3 gap-2 mt-3"><button onclick="openBook('${b.id}')" class="border text-xs font-extrabold py-2 rounded-xl hover:bg-paper">View</button><button onclick="editListing('${b.id}')" class="bg-ink text-white text-xs font-extrabold py-2 rounded-xl"><i class="fa-solid fa-pen mr-1"></i>Edit</button><button onclick="askDeleteListing('${b.id}')" class="bg-red-50 text-red-600 text-xs font-extrabold py-2 rounded-xl hover:bg-red-500 hover:text-white transition"><i class="fa-solid fa-trash"></i></button></div></div></div>`).join('')}</div>`:`<div class="text-center py-14 bg-white rounded-3xl border border-dashed"><div class="w-16 h-16 bg-paper rounded-full flex items-center justify-center mx-auto"><i class="fa-solid fa-book-open text-2xl text-ink/20"></i></div><h3 class="font-extrabold mt-3">${ml.length?'No matches':'No listings yet'}</h3><p class="text-xs font-semibold text-ink/45 mt-1">${ml.length?'Try a different search.':'List your first book in 60 seconds — it\'s free!'}</p><button onclick="openSell()" class="mt-4 bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl">+ Create listing</button></div>`}`;
 }else if(profileTab==='orders'){
  content=mo.length?`<div class="space-y-4">${mo.map(o=>`<div class="bg-white rounded-3xl border p-5"><div class="flex flex-wrap items-center gap-2 justify-between"><div><span class="font-mono font-extrabold text-sm">${o.id}</span><span class="text-[11px] font-bold text-ink/40 ml-2">${esc(o.date)}</span></div><span class="text-[11px] font-extrabold px-3 py-1 rounded-full ${o.status==='Cancelled'?'bg-red-100 text-red-700':'bg-green-100 text-green-700'}">${esc(o.status).toUpperCase()}</span></div>
  <div class="flex gap-2 mt-3 overflow-x-auto no-scrollbar">${o.items.map(i=>`<img src="${esc(i.image)}" title="${esc(i.title)}" class="w-12 h-16 rounded-xl object-cover shrink-0 border" onerror="this.src='https://picsum.photos/seed/${i.id}/100/120'">`).join('')}</div>
  <div class="flex items-center gap-1.5 mt-3 text-[11px] font-extrabold"><span class="flex items-center gap-1 text-green-700"><i class="fa-solid fa-circle-check"></i> Placed</span><span class="flex-1 h-0.5 bg-green-200 rounded"></span><span class="flex items-center gap-1 ${o.status==='Cancelled'?'text-ink/25':'text-green-700'}"><i class="fa-solid fa-box"></i> Packed</span><span class="flex-1 h-0.5 ${o.status==='Cancelled'?'bg-ink/10':'bg-green-200'} rounded"></span><span class="flex items-center gap-1 text-ink/30"><i class="fa-solid fa-truck"></i> Shipped</span><span class="flex-1 h-0.5 bg-ink/10 rounded"></span><span class="flex items-center gap-1 text-ink/30"><i class="fa-solid fa-house"></i> Delivered</span></div>
  <div class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t"><span class="font-black">${fmt(o.total)} • ${o.items.reduce((s,i)=>s+i.qty,0)} items</span><span class="text-[11px] font-bold text-ink/40">ETA ${esc(o.delivery)}</span><span class="flex-1"></span>${o.status!=='Cancelled'?`<button onclick="cancelOrder('${o.id}')" class="text-xs font-extrabold text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50">Cancel</button>`:''}<button onclick="reorder('${o.id}')" class="text-xs font-extrabold bg-ink text-white px-4 py-2 rounded-xl">Buy Again</button></div></div>`).join('')}</div>`
  :`<div class="text-center py-14 bg-white rounded-3xl border border-dashed"><div class="w-16 h-16 bg-paper rounded-full flex items-center justify-center mx-auto"><i class="fa-solid fa-box-open text-2xl text-ink/20"></i></div><h3 class="font-extrabold mt-3">No orders yet</h3><p class="text-xs font-semibold text-ink/45 mt-1">Your order history & tracking will appear here.</p><button onclick="navigate('browse')" class="mt-4 bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl">Start shopping</button></div>`;
 }else if(profileTab==='wishlist'){
  content=wl.length?`<div class="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">${wl.map(bookCard).join('')}</div>`:`<div class="text-center py-14 bg-white rounded-3xl border border-dashed"><p class="font-extrabold">Wishlist is empty</p><button onclick="navigate('browse')" class="mt-3 bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl">Discover books</button></div>`;
 }else{
  content=`<div class="grid lg:grid-cols-2 gap-4">
   <form onsubmit="handleProfileUpdate(event)" class="bg-white rounded-3xl border p-5 sm:p-6"><h3 class="font-extrabold">Profile details</h3><div class="flex items-center gap-4 mt-4"><div class="relative"><img id="settings-avatar" src="${esc(user.avatar)}" class="w-20 h-20 rounded-3xl object-cover border-2 border-ink/10"><label class="absolute -bottom-2 -right-2 w-8 h-8 bg-ink text-sun rounded-full flex items-center justify-center cursor-pointer text-xs"><i class="fa-solid fa-camera"></i><input type="file" accept="image/*" class="hidden" onchange="handleAvatarChange(event)"></label></div><div class="text-xs font-bold text-ink/45">Click camera to change photo<br>Joined ${esc(user.joined)}</div></div>
   <div class="grid sm:grid-cols-2 gap-3 mt-4"><div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Name</label><input id="pf-name" value="${esc(user.name)}" class="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-bold outline-none border-2 border-transparent focus:border-ink"></div><div><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Phone</label><input id="pf-phone" value="${esc(user.phone||'')}" class="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-bold outline-none border-2 border-transparent focus:border-ink"></div></div>
   <div class="mt-3"><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Email (login ID)</label><input value="${esc(user.email)}" disabled class="mt-1.5 w-full bg-ink/5 rounded-xl px-4 py-2.5 text-sm font-bold outline-none text-ink/40"></div>
   <div class="mt-3"><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">City</label><input id="pf-city" value="${esc(user.location)}" class="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-bold outline-none border-2 border-transparent focus:border-ink"></div>
   <div class="mt-3"><label class="text-xs font-extrabold uppercase tracking-wider text-ink/50">Bio</label><textarea id="pf-bio" rows="2" class="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-medium outline-none border-2 border-transparent focus:border-ink resize-none">${esc(user.bio||'')}</textarea></div>
   <button class="w-full mt-4 bg-ink text-white font-extrabold py-3 rounded-2xl text-sm">Save Changes</button></form>
   <div class="space-y-4"><div class="bg-white rounded-3xl border p-5 sm:p-6"><h3 class="font-extrabold">Preferences</h3>${[['Order updates','SMS + Email'],['Price-drop alerts','Wishlist books'],['New arrivals','Weekly digest']].map((p,i)=>`<label class="flex items-center justify-between py-2.5 border-b last:border-0 cursor-pointer"><span><span class="block text-sm font-extrabold">${p[0]}</span><span class="text-[11px] font-bold text-ink/40">${p[1]}</span></span><input type="checkbox" ${i<2?'checked':''} class="w-5 h-5 accent-[#002F34]"></label>`).join('')}</div>
   <div class="bg-white rounded-3xl border p-5 sm:p-6"><h3 class="font-extrabold">Account</h3><div class="space-y-2 mt-3"><button onclick="logout()" class="w-full border-2 border-ink/15 font-extrabold py-3 rounded-2xl text-sm hover:border-ink transition">Logout</button><button onclick="resetDemoData()" class="w-full bg-red-50 text-red-600 font-extrabold py-3 rounded-2xl text-sm hover:bg-red-500 hover:text-white transition">Reset demo data</button></div><p class="text-[11px] font-semibold text-ink/35 mt-3">All data (listings, cart, user) lives in your browser's localStorage. Reset restores the original 20 mock books.</p></div></div></div>`;
 }
 box.innerHTML=`
 <div class="bg-ink text-white rounded-3xl overflow-hidden relative">
  <div class="dot-grid absolute inset-0 opacity-15"></div><div class="absolute -right-16 -top-16 w-64 h-64 bg-sun/20 rounded-full blur-3xl"></div>
  <div class="relative p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
   <img src="${esc(user.avatar)}" class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-sun object-cover shadow-2xl" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FFCE32&color=002F34'">
   <div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap"><h1 class="font-display font-black text-2xl sm:text-3xl truncate">${esc(user.name)}</h1><span class="bg-sun text-ink text-[10px] font-extrabold px-2.5 py-1 rounded-full">★ VERIFIED READER</span></div><p class="text-sm text-white/55 font-medium mt-1 truncate">${esc(user.bio||'Avid reader')}</p><p class="text-xs font-bold text-white/40 mt-1">📍 ${esc(user.location||'India')} • Joined ${esc(user.joined||'2026')}</p></div>
   <button onclick="openSell()" class="bg-sun text-ink font-extrabold px-6 py-3 rounded-2xl text-sm shrink-0 hover:bg-white transition"><i class="fa-solid fa-plus mr-1"></i> Sell a Book</button>
  </div>
  <div class="relative grid grid-cols-4 border-t border-white/10 text-center">${[[ml.length,'Listings'],[mo.length,'Orders'],[wl.length,'Wishlist'],[fmt(spent),'Spent']].map(s=>`<div class="py-3.5 border-r last:border-0 border-white/10"><div class="font-black text-base sm:text-xl text-sun">${s[0]}</div><div class="text-[10px] font-extrabold tracking-widest uppercase text-white/40">${s[1]}</div></div>`).join('')}</div>
 </div>
 <div class="flex gap-2 mt-5 overflow-x-auto no-scrollbar pb-1">${tabs.map(t=>`<button onclick="setProfileTab('${t[0]}')" class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold whitespace-nowrap transition ${profileTab===t[0]?'bg-ink text-white shadow-card':'bg-white border text-ink/55 hover:text-ink'}"><i class="fa-solid ${t[1]} text-xs"></i>${t[2]}</button>`).join('')}</div>
 <div class="mt-4">${content}</div>`;
}
function handleProfileUpdate(e){e.preventDefault();user.name=$('pf-name').value.trim();user.phone=$('pf-phone').value.trim();user.location=$('pf-city').value.trim();user.bio=$('pf-bio').value.trim();const i=users.findIndex(u=>u.id===user.id);if(i>=0)users[i]=user;saveUser();saveUsers();updateAuthUI();renderProfile();showToast('Profile updated ✓');}
function handleAvatarChange(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{user.avatar=ev.target.result;const i=users.findIndex(u=>u.id===user.id);if(i>=0)users[i]=user;saveUser();saveUsers();updateAuthUI();$('settings-avatar').src=user.avatar;showToast('Profile photo updated 📸');};r.readAsDataURL(f);}
function reorder(oid){const o=orders.find(x=>x.id===oid);if(!o)return;o.items.forEach(i=>{const b=getBook(i.id);if(!b)return;const ex=cart.find(c=>c.id===i.id);if(ex)ex.qty=Math.min(ex.qty+i.qty,b.stock||99);else if((b.stock||1)>0)cart.push({id:i.id,qty:Math.min(i.qty,b.stock||1)});});saveCart();updateBadges();navigate('cart');showToast('Items added back to cart 🛒');}
function cancelOrder(oid){const o=orders.find(x=>x.id===oid);if(!o)return;o.status='Cancelled';saveOrders();renderProfile();showToast('Order cancelled. Refund in 3–5 days.','info');}
function resetDemoData(){if(!confirm('Reset all demo data? This restores the original 20 books and clears cart/user.'))return;Object.values(K).forEach(k=>localStorage.removeItem(k));location.reload();}

/* ---------- SELL ---------- */
function openSell(){
 if(!user){showToast('Please login to sell your books','warning');openAuth('signup');return;}
 sellEditId=null;sellImageData='';
 ['sell-book-title','sell-author','sell-description','sell-pages','sell-isbn','sell-price','sell-mrp','sell-image-url'].forEach(id=>{const el=$(id);if(el)el.value='';});
 const st=document.querySelector('input[name="sell-type"][value="used"]');if(st)st.checked=true;
 const sc=$('sell-category');if(sc)sc.value='Fiction';const sd=$('sell-condition');if(sd)sd.value='Like New';const sk=$('sell-stock');if(sk)sk.value=1;
 $('sell-title').textContent='List your book';$('sell-crumb').textContent='Sell a Book';$('sell-submit-btn').innerHTML='<i class="fa-solid fa-rocket"></i> Publish Listing — Go Live';
 updateSellImageUI();updateSellPreview();
 if(currentView!=='sell')navigate('sell');else window.scrollTo({top:0,behavior:'smooth'});
}
function cancelSell(){if(sellEditId){sellEditId=null;}if(user&&myListings().length){profileTab='listings';navigate('profile');}else navigate('home');}
function editListing(id){const b=getBook(id);if(!b)return;if(!user||b.sellerId!==user.email){showToast('You can only edit your own listings','error');return;}sellEditId=id;sellImageData=b.image||'';
 $('sell-book-title').value=b.title;$('sell-author').value=b.author;$('sell-category').value=b.category;$('sell-description').value=b.description;$('sell-pages').value=b.pages||'';$('sell-isbn').value=b.isbn||'';$('sell-language').value=b.language||'English';$('sell-stock').value=b.stock||1;$('sell-condition').value=b.condition;$('sell-price').value=b.price;$('sell-mrp').value=b.mrp||'';$('sell-location').value=b.location;$('sell-image-url').value=(b.image||'').startsWith('data:')?'':(b.image||'');
 const rt=document.querySelector(`input[name="sell-type"][value="${b.type}"]`);if(rt)rt.checked=true;
 $('sell-title').textContent='Edit listing';$('sell-crumb').textContent='Edit Listing';$('sell-submit-btn').innerHTML='<i class="fa-solid fa-check"></i> Save Changes';
 updateSellImageUI();updateSellPreview();navigate('sell');showToast('Editing mode — update & save','info');}
function handleSellImageFile(e){const f=e.target.files[0];if(!f)return;if(f.size>5*1024*1024){showToast('Image must be under 5MB','error');return;}const r=new FileReader();r.onload=ev=>{sellImageData=ev.target.result;$('sell-image-url').value='';updateSellImageUI();updateSellPreview();};r.readAsDataURL(f);}
function handleSellImageUrl(v){if(v.trim())sellImageData=v.trim();updateSellImageUI();updateSellPreview();}
function removeSellImage(){sellImageData='';$('sell-image-url').value='';updateSellImageUI();updateSellPreview();}
function updateSellImageUI(){const img=$('sell-image-preview'),empty=$('sell-image-empty'),rm=$('sell-image-remove');if(!img)return;if(sellImageData){img.src=sellImageData;img.classList.remove('hidden');empty.classList.add('hidden');rm.classList.remove('hidden');}else{img.classList.add('hidden');empty.classList.remove('hidden');rm.classList.add('hidden');}}
function updateSellPreview(){
 const dc=$('sell-desc-count');if(dc)dc.textContent=($('sell-description').value||'').length;
 const price=+($('sell-price').value||0),mrp=+($('sell-mrp').value||0);
 const hint=$('sell-price-hint');
 if(hint){if(price>0&&mrp>price){const d=Math.round((1-price/mrp)*100);hint.className='mt-3 text-xs font-bold bg-green-50 border border-green-200 text-green-800 rounded-xl px-3 py-2';hint.innerHTML=`🎯 Great pricing! <strong>${d}% off MRP</strong> — listings at 40–60% off sell 3× faster.`;}else if(price>0){hint.className='mt-3 text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-3 py-2';hint.innerHTML=`💡 Tip: add MRP to show discount % and attract more buyers.`;}else{hint.className='mt-3 text-xs font-bold bg-paper border rounded-xl px-3 py-2 text-ink/45';hint.innerHTML=`Enter your price — similar books sell around <strong>₹250–₹400</strong>.`;}}
 const title=$('sell-book-title').value||'Your Book Title',author=$('sell-author').value||'Author Name',cat=$('sell-category').value||'Fiction',cond=$('sell-condition').value||'Like New';
 const type=(document.querySelector('input[name="sell-type"]:checked')||{}).value||'used';
 $('sell-preview-card').innerHTML=`<div class="bg-paper rounded-2xl overflow-hidden border"><div class="relative">${sellImageData?`<img src="${sellImageData}" class="w-full h-52 object-cover" onerror="this.style.display='none'">`:`<div class="w-full h-52 flex flex-col items-center justify-center text-ink/25 bg-gradient-to-br from-cream to-paper"><i class="fa-solid fa-book-open text-4xl"></i><span class="text-xs font-bold mt-2">Cover preview</span></div>`}<span class="absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg ${condStyle(cond)}">${esc(cond).toUpperCase()}</span></div><div class="p-4 bg-white"><div class="text-[10px] font-extrabold tracking-wider text-ink/40 uppercase">${esc(cat)} • ${type==='new'?'NEW':'PRE-LOVED'}</div><div class="font-extrabold truncate">${esc(title)}</div><div class="text-xs text-ink/50 font-medium">by ${esc(author)}</div><div class="flex items-baseline gap-2 mt-1.5"><span class="font-black text-xl">${price?fmt(price):'₹ —'}</span>${mrp>price&&price?`<span class="text-xs line-through text-ink/35 font-bold">${fmt(mrp)}</span>`:''}</div><div class="text-[11px] font-bold text-ink/40 mt-1">📍 ${esc($('sell-location').value.split(',')[0])} • Just now</div></div></div>`;
}
function handleSellSubmit(e){
 e.preventDefault();
 const title=$('sell-book-title').value.trim(),author=$('sell-author').value.trim(),desc=$('sell-description').value.trim(),price=+($('sell-price').value||0);
 if(title.length<3){showToast('Please enter a proper book title','error');return;}
 if(author.length<2){showToast('Please enter the author name','error');return;}
 if(desc.length<20){showToast('Description needs at least 20 characters','error');return;}
 if(!(price>0)){showToast('Please enter a valid price','error');return;}
 const type=(document.querySelector('input[name="sell-type"]:checked')||{}).value||'used';
 const data={title,author,category:$('sell-category').value,price,mrp:+($('sell-mrp').value||0)||Math.round(price*1.6),condition:$('sell-condition').value,type,location:$('sell-location').value,description:desc,pages:+($('sell-pages').value||0)||250,isbn:$('sell-isbn').value.trim()||'978-'+Math.floor(Math.random()*1e10),language:$('sell-language').value,stock:+($('sell-stock').value||1)||1,image:sellImageData||`https://picsum.photos/seed/${encodeURIComponent(title)}/600/500`};
 if(sellEditId){const b=getBook(sellEditId);Object.assign(b,data);b.postedAt='Just now';b.postedDays=0;saveList();showToast('Listing updated ✓');fireConfetti(60);}
 else{const nb={id:uid(),...data,seller:user.name,sellerId:user.email,sellerAvatar:user.avatar,sellerRating:5.0,sellerSales:0,postedAt:'Just now',postedDays:0,featured:false,rating:5.0,reviews:0,views:1,mine:true};listings.unshift(nb);saveList();showToast('🎉 Your book is LIVE! Buyers can now find it.');fireConfetti(120);}
 sellEditId=null;profileTab='listings';syncFilterUI();navigate('profile');
}
function askDeleteListing(id){const b=getBook(id);if(!b)return;deleteId=id;$('delete-book-name').textContent=b.title;$('delete-modal').classList.remove('hidden');}
function cancelDelete(){deleteId=null;$('delete-modal').classList.add('hidden');}
function confirmDelete(){if(!deleteId)return;listings=listings.filter(b=>b.id!==deleteId);cart=cart.filter(c=>c.id!==deleteId);wishlist=wishlist.filter(w=>w!==deleteId);saveList();saveCart();saveWish();updateBadges();cancelDelete();renderProfile();if(currentView==='browse')renderBrowse();showToast('Listing deleted','info');}

/* ---------- CHAT ---------- */
function openChat(bookId){const b=getBook(bookId);if(!b)return;chatBookId=bookId;
 $('chat-avatar').src=b.sellerAvatar;$('chat-name').textContent=b.seller;
 $('chat-book-strip').innerHTML=`<img src="${esc(b.image)}" class="w-9 h-11 rounded-lg object-cover" onerror="this.src='https://picsum.photos/seed/${b.id}/100/120'"><div class="flex-1 min-w-0"><div class="text-xs font-extrabold truncate">${esc(b.title)}</div><div class="text-[11px] font-bold text-ink/50">${fmt(b.price)} • ${esc(b.condition)}</div></div><button onclick="openBook('${b.id}');closeChat()" class="text-[11px] font-extrabold text-blue-600">View</button>`;
 chatMsgs=[{me:false,t:`Hi! Thanks for your interest in "${b.title}" 📚 It's ${b.condition.toLowerCase()} and available. Feel free to ask anything!`}];
 renderChat();$('chat-modal').classList.remove('hidden');}
function closeChat(){$('chat-modal').classList.add('hidden');}
function renderChat(typing=false){const box=$('chat-messages');box.innerHTML=chatMsgs.map(m=>m.me?`<div class="flex justify-end"><div class="bg-ink text-white text-[13px] font-medium px-3.5 py-2.5 rounded-2xl rounded-br-md max-w-[80%]">${esc(m.t)}</div></div>`:`<div class="flex justify-start"><div class="bg-white border text-[13px] font-medium px-3.5 py-2.5 rounded-2xl rounded-bl-md max-w-[80%] shadow-sm">${esc(m.t)}</div></div>`).join('')+(typing?`<div class="flex justify-start"><div class="bg-white border px-4 py-3 rounded-2xl rounded-bl-md flex gap-1"><span class="typing-dot w-1.5 h-1.5 bg-ink/40 rounded-full"></span><span class="typing-dot w-1.5 h-1.5 bg-ink/40 rounded-full"></span><span class="typing-dot w-1.5 h-1.5 bg-ink/40 rounded-full"></span></div></div>`:'');box.scrollTop=box.scrollHeight;}
function sellerReply(q){q=q.toLowerCase();const b=getBook(chatBookId);const p=b?b.price:0;
 if(/avail|stock|left/.test(q))return `Yes, it's available! ${b.stock<=1?'Only 1 copy left though — several people asked today.':b.stock+' copies in stock.'} Want me to hold one for you?`;
 if(/price|negot|discount|best|less|final/.test(q))return `The listed price is ${fmt(p)}. I can do ${fmt(Math.max(49,Math.round(p*0.92)))} for a quick pickup today. Fair? 🤝`;
 if(/meet|pickup|location|deliver|ship|address/.test(q))return `I'm in ${b.location}. I can ship in 24h (free over ₹500) or meet near the station this evening. What suits you?`;
 if(/condition|mark|highlight|tear|damage/.test(q))return `Honestly graded as "${b.condition}" — ${b.condition==='New'||b.condition==='Like New'?'no markings at all, spine perfect. I can share a video too!':'light wear as described, all pages intact. Happy to send close-up photos!'}`;
 if(/hi|hello|hey/.test(q))return `Hello! 👋 Great choice — "${b.title}" is one of my favourites. Ask me anything about condition, price or pickup!`;
 if(/thank/.test(q))return `You're most welcome! 😊 Let me know if you'd like to proceed — I can keep it reserved till tonight.`;
 if(/upi|pay|payment/.test(q))return `We can do secure payment via the app (recommended — buyer protection included) or UPI on pickup. Totally your choice!`;
 return ["Got it! Anything else you'd like to know?","Sure — happy to help! Would you like extra photos?","Sounds good! Let me know when you'd like to proceed 👍"][Math.floor(Math.random()*3)];}
function pushChat(text,me){chatMsgs.push({me,t:text});renderChat();}
function sendChatMessage(e){e.preventDefault();const inp=$('chat-input'),v=inp.value.trim();if(!v)return;inp.value='';pushChat(v,true);renderChat(true);setTimeout(()=>pushChat(sellerReply(v),false),1100);}
function sendChatQuick(t){pushChat(t,true);renderChat(true);setTimeout(()=>pushChat(sellerReply(t),false),1100);}

/* ---------- MISC ---------- */
function openLightbox(src){$('lightbox-img').src=src;$('lightbox').classList.remove('hidden');}
function closeLightbox(){$('lightbox').classList.add('hidden');}
function subscribeNewsletter(e){e.preventDefault();e.target.reset();fireConfetti(70);showToast('Welcome aboard! ₹100 coupon sent to your email 🎁');}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAuth();closeChat();closeLightbox();cancelDelete();closeCartDrawer();closeMobileFilters();hideSuggestions();}});

/* ---------- INIT ---------- */
function init(){
 load();
 $('desktop-filters').innerHTML=filterHTML('d');
 $('mobile-filters').innerHTML=filterHTML('m');
 const items=['♻️ SAVE PAPER','UP TO 70% OFF MRP','🚚 FREE SHIPPING OVER ₹500','✓ VERIFIED SELLERS','7-DAY RETURNS','48,000+ HAPPY READERS'];
 const mHTML=items.map(t=>`<span class="whitespace-nowrap">${t}</span><span class="text-white/30">•</span>`).join('');
 $('marquee-a').innerHTML=mHTML;$('marquee-b').innerHTML=mHTML;
 updateAuthUI();updateBadges();syncFilterUI();syncSearchInputs();
 renderHome();renderCartDrawer();
 let bar=10;const bi=setInterval(()=>{bar=Math.min(95,bar+Math.random()*25);$('loader-bar').style.width=bar+'%';},150);
 const hash=(location.hash||'').replace('#','');
 const valid=['home','browse','details','cart','checkout','profile','wishlist','sell','success'];
 setTimeout(()=>{clearInterval(bi);$('loader-bar').style.width='100%';setTimeout(()=>{$('loader').classList.add('hide');if(valid.includes(hash)&&(hash!=='details'||currentBookId))navigate(hash);else navigate('home');},250);},900);
 window.addEventListener('hashchange',()=>{const h=(location.hash||'').replace('#','');if(valid.includes(h)&&h!==currentView&&!(h==='details'&&!currentBookId))navigate(h);});
 if(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App){
   window.Capacitor.Plugins.App.addListener('backButton',()=>{
     const lb=$('lightbox');if(lb&&!lb.classList.contains('hidden')){closeLightbox();return;}
     const cart=$('cart-drawer');if(cart&&!cart.classList.contains('translate-x-full')){closeCartDrawer();return;}
     const mfilt=$('mobile-filter-wrap');if(mfilt&&!mfilt.classList.contains('hidden')){closeMobileFilters();return;}
     const mmenu=$('mobile-menu');if(mmenu&&!mmenu.classList.contains('hidden')){toggleMobileMenu();return;}
     const chat=$('chat-drawer');if(chat&&!chat.classList.contains('translate-y-full')){closeChat();return;}
     const auth=$('auth-modal');if(auth&&!auth.classList.contains('hidden')){closeAuth();return;}
     if(typeof currentView!=='undefined'&&currentView!=='home'){navigate('home');return;}
     window.Capacitor.Plugins.App.exitApp();
   });
 }
}
init();