// Hallyu content bible — fictional universe so every screen is internally consistent.
// All dramas/actors/users are invented (no real IP).

const A = p => '../assets/' + p;

const dramas = [
  { id:'snow',    title:'The Weight of Snow',        genres:['Melodrama','Romance'], eps:16, aired:10, airing:true,  next:'Fri 9:30 PM', poster:A('poster-weight-of-snow.png'),  rating:9.1, cast:['jiwon','doyun','sera'] },
  { id:'seongsu', title:'Midnight in Seongsu',       genres:['Romance','Drama'],     eps:12, aired:8,  airing:true,  next:'Sat 10:40 PM', poster:A('poster-midnight-seongsu.png'), rating:8.7, cast:['chaewon','sungjae'] },
  { id:'signal',  title:'Signal Fire',               genres:['Thriller','Crime'],    eps:12, aired:12, airing:false, next:null, poster:A('poster-signal-fire.png'),   rating:9.4, cast:['taeoh','doyun'] },
  { id:'court',   title:'The Third Court of Hanyang',genres:['Historical','Political'], eps:20, aired:6, airing:true, next:'Sun 9:10 PM', poster:A('poster-third-court.png'), rating:8.9, cast:['taeoh','sera'] },
  { id:'clinic',  title:'Blue Hour Clinic',          genres:['Medical','Melodrama'], eps:16, aired:16, airing:false, next:null, poster:A('poster-blue-hour.png'),    rating:8.5, cast:['jiwon','sungjae'] },
  { id:'summer',  title:'Our Last Summer',           genres:['Youth','Romance'],     eps:10, aired:10, airing:false, next:null, poster:A('poster-last-summer.png'),  rating:8.8, cast:['chaewon','sungjae'] },
];

const actors = [
  { id:'jiwon',   name:'Seo Ji-won',    photo:A('actor-seo-jiwon.png'),   dramas:['snow','clinic'], fans:'412K' },
  { id:'doyun',   name:'Han Do-yun',    photo:A('actor-han-doyun.png'),   dramas:['snow','signal'], fans:'388K' },
  { id:'chaewon', name:'Lee Chaewon',   photo:A('actor-lee-chaewon.png'), dramas:['seongsu','summer'], fans:'296K' },
  { id:'sungjae', name:'Park Sung-jae', photo:A('actor-park-sungjae.png'),dramas:['seongsu','clinic','summer'], fans:'251K' },
  { id:'sera',    name:'Yoon Se-ra',    photo:A('actor-yoon-sera.png'),   dramas:['snow','court'], fans:'204K' },
  { id:'taeoh',   name:'Kim Tae-oh',    photo:A('actor-kim-taeoh.png'),   dramas:['signal','court'], fans:'337K' },
];

const users = [
  { id:'u1', handle:'seoul_nights',    name:'Miso',   initials:'MI', bio:'rewatching ep 15 again. no regrets.' },
  { id:'u2', handle:'ep15',            name:'Dae',    initials:'DA', bio:'here for the OSTs' },
  { id:'u3', handle:'kdrama_diarist',  name:'Hana',   initials:'HA', bio:'weekly episode essays ✍' },
  { id:'u4', handle:'hanriver',        name:'Jun',    initials:'JU', bio:'thriller & noir only' },
  { id:'u5', handle:'monday_episode',  name:'Rin',    initials:'RI', bio:'sageuk enjoyer' },
  { id:'me', handle:'you',             name:'You',    initials:'YO', bio:'' },
];

const genres = ['Romance','Melodrama','Thriller','Historical','Comedy','Medical','Fantasy','Crime','Youth','Noir','Legal','Sci-Fi'];

const communities = [
  { id:'c1', name:'The Weight of Snow', type:'drama',  members:'48.2K', linked:'snow' },
  { id:'c2', name:'Signal Fire',        type:'drama',  members:'31.7K', linked:'signal' },
  { id:'c3', name:'OST Appreciation',   type:'topic',  members:'12.4K' },
  { id:'c4', name:'Sageuk Historians',  type:'topic',  members:'9.8K' },
  { id:'c5', name:'Midnight in Seongsu',type:'drama',  members:'22.9K', linked:'seongsu' },
  { id:'c6', name:'Subtle Foreshadowing',type:'topic', members:'7.3K' },
];

const channels = [
  { id:'ch1', name:'Seo Ji-won Official', subs:'412K', owner:'jiwon' },
  { id:'ch2', name:'Signal Fire Writers Room', subs:'98K', owner:'staff' },
  { id:'ch3', name:'Hallyu Editors', subs:'24K', owner:'staff' },
];

const d = id => dramas.find(x=>x.id===id);
const a = id => actors.find(x=>x.id===id);
const u = id => users.find(x=>x.id===id);

module.exports = { dramas, actors, users, genres, communities, channels, d, a, u };
