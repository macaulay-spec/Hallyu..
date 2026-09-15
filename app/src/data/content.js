// Hallyu content bible — fictional universe, internally consistent (ported + expanded
// from design/src/content.js). All dramas/actors/people are invented (no real IP).

const asset = (p) => `/assets/${p}`;

export const dramas = [
  { id:'snow', title:'The Weight of Snow', genres:['Melodrama','Romance'], episodeCount:16, aired:10, airing:true,
    nextLabel:'Fri 9:30 PM', nextIn:'in 2d 14h', poster:asset('poster-weight-of-snow.png'), rating:9.1,
    cast:['jiwon','doyun','sera'], roles:{jiwon:'Kang Seo-yeon',doyun:'Baek Jun-ho',sera:'Dr. Oh Hyemi'},
    synopsis:'A grief counselor who has stopped feeling and a funeral director who feels too much inherit the same failing practice in a snowbound mountain town. Over one winter, they learn whether mourning is a debt or a craft.',
    credits:'Director Lee Seo-jin · Writer Park Ha-eun',
    community:'c1' },
  { id:'seongsu', title:'Midnight in Seongsu', genres:['Romance','Drama'], episodeCount:12, aired:8, airing:true,
    nextLabel:'Sat 10:40 PM', nextIn:'in 3d 6h', poster:asset('poster-midnight-seongsu.png'), rating:8.7,
    cast:['chaewon','sungjae'], roles:{chaewon:'Choi Min-ah',sungjae:'Jung Ha-joon'},
    synopsis:'Two night-shift workers keep meeting in the alley cafés of Seongsu-dong — a part-time restorer of lost film and a delivery rider who photographs the city at 2 a.m.',
    credits:'Director Nam Ki-woo · Writer Song Da-eun',
    community:'c5' },
  { id:'signal', title:'Signal Fire', genres:['Thriller','Crime'], episodeCount:12, aired:12, airing:false, nextLabel:null, nextIn:null,
    poster:asset('poster-signal-fire.png'), rating:9.4, cast:['taeoh','doyun'], roles:{taeoh:'Detective Goh',doyun:'The Lighthouse Keeper'},
    synopsis:'A frozen detective and the last keeper of a decommissioned signal station trade clues across a twenty-year gap in arson cases. The flare was never literal.',
    credits:'Director Baek In-ho · Writer Yoo Jae-won',
    community:'c2' },
  { id:'court', title:'The Third Court of Hanyang', genres:['Historical','Political'], episodeCount:20, aired:6, airing:true,
    nextLabel:'Sun 9:10 PM', nextIn:'in 4d 2h', poster:asset('poster-third-court.png'), rating:8.9,
    cast:['taeoh','sera'], roles:{taeoh:'Inspector Park',sera:'Lady Consort Seo'},
    synopsis:'A disgraced magistrate is given the kingdom\u2019s unloved third court — where the cases no noble wants judged end up at midnight.',
    credits:'Director Han Seol · Writer Im Gu',
    community:'c7' },
  { id:'clinic', title:'Blue Hour Clinic', genres:['Medical','Melodrama'], episodeCount:16, aired:16, airing:false, nextLabel:null, nextIn:null,
    poster:asset('poster-blue-hour.png'), rating:8.5, cast:['jiwon','sungjae'], roles:{jiwon:'Dr. Noh',sungjae:'Nurse Kim'},
    synopsis:'In the hour between night shift and sunrise, a city hospital\u2019s quietest doctors keep the kinds of promises medicine cannot write down.',
    credits:'Director Jung Mi-so · Writer Choi Han',
    community:'c8' },
  { id:'summer', title:'Our Last Summer', genres:['Youth','Romance'], episodeCount:10, aired:10, airing:false, nextLabel:null, nextIn:null,
    poster:asset('poster-last-summer.png'), rating:8.8, cast:['chaewon','sungjae'], roles:{chaewon:'Yoon Saet-byeol',sungjae:'Lee Ha-roo'},
    synopsis:'Two exes who broke up pretending to be fine agree to spend one final seaside summer sharing the house they can no longer afford separately.',
    credits:'Director Shim Na-ra · Writer Kwon Ji-ho',
    community:'c9' },
];

export const actors = [
  { id:'jiwon', name:'Seo Ji-won', photo:asset('actor-seo-jiwon.png'), dramaIds:['snow','clinic'], fans:412000,
    about:'Seo Ji-won leads some of the most quietly devastating performances on television, from grief counselors to overworked residents. First lead role in Blue Hour Clinic (2023).', channel:'ch1' },
  { id:'doyun', name:'Han Do-yun', photo:asset('actor-han-doyun.png'), dramaIds:['snow','signal'], fans:388000, about:null, channel:null },
  { id:'chaewon', name:'Lee Chaewon', photo:asset('actor-lee-chaewon.png'), dramaIds:['seongsu','summer'], fans:296000, about:null, channel:null },
  { id:'sungjae', name:'Park Sung-jae', photo:asset('actor-park-sungjae.png'), dramaIds:['seongsu','clinic','summer'], fans:251000, about:null, channel:null },
  { id:'sera', name:'Yoon Se-ra', photo:asset('actor-yoon-sera.png'), dramaIds:['snow','court'], fans:204000, about:null, channel:null },
  { id:'taeoh', name:'Kim Tae-oh', photo:asset('actor-kim-taeoh.png'), dramaIds:['signal','court'], fans:337000, about:null, channel:null },
];

export const users = [
  { id:'u1', handle:'seoul_nights',   name:'Miso', initials:'MI', bio:'rewatching ep 15 again. no regrets.', verified:false, followers:3200, following:180 },
  { id:'u2', handle:'ep15',           name:'Dae',  initials:'DA', bio:'here for the OSTs', verified:false, followers:940, following:260 },
  { id:'u3', handle:'kdrama_diarist', name:'Hana', initials:'HA', bio:'weekly episode essays \u270D', verified:false, followers:12400, following:312 },
  { id:'u4', handle:'hanriver',       name:'Jun',  initials:'JU', bio:'thriller & noir only', verified:false, followers:5800, following:201 },
  { id:'u5', handle:'monday_episode', name:'Rin',  initials:'RI', bio:'sageuk enjoyer', verified:false, followers:1700, following:140 },
  { id:'me', handle:'you',            name:'You',  initials:'YO', bio:'Here for the OSTs and the ep 10 hallway scenes.', verified:false, followers:96, following:128, me:true },
];

export const genres = ['Romance','Melodrama','Thriller','Historical','Comedy','Medical','Fantasy','Crime','Youth','Noir','Legal','Sci-Fi'];

export const communities = [
  { id:'c1', name:'The Weight of Snow', type:'drama', members:48200, linkedDrama:'snow' },
  { id:'c2', name:'Signal Fire',        type:'drama', members:31700, linkedDrama:'signal' },
  { id:'c3', name:'OST Appreciation',   type:'topic', members:12400, linkedDrama:null },
  { id:'c4', name:'Sageuk Historians',  type:'topic', members:9800,  linkedDrama:null },
  { id:'c5', name:'Midnight in Seongsu',type:'drama', members:22900, linkedDrama:'seongsu' },
  { id:'c6', name:'Subtle Foreshadowing',type:'topic', members:7300, linkedDrama:null },
  { id:'c7', name:'The Third Court of Hanyang', type:'drama', members:11200, linkedDrama:'court' },
  { id:'c8', name:'Blue Hour Clinic', type:'drama', members:8400, linkedDrama:'clinic' },
  { id:'c9', name:'Our Last Summer', type:'drama', members:15300, linkedDrama:'summer' },
];

export const channels = [
  { id:'ch1', name:'Seo Ji-won Official', subs:412000, initials:'S', verified:true, ownerActor:'jiwon' },
  { id:'ch2', name:'Signal Fire Writers Room', subs:98000, initials:'S', verified:false },
  { id:'ch3', name:'Hallyu Editors', subs:24000, initials:'H', verified:true },
];

export const broadcasts = {
  ch1: [
    { id:'b1', time:'2h', type:'image', media:asset('actor-seo-jiwon.png'),
      text:'Script read for episode 11 today. It\u2019s the quietest script we\u2019ve had \u2014 which means it\u2019s the loudest episode. See you Friday.',
      reactions:[{label:'\u2764', count:12400, mine:false},{label:'\u{1F622}', count:4812, mine:false},{label:'\u{1F525}', count:9120, mine:false}] },
    { id:'b2', time:'1d', type:'text', media:null, text:'Thank you for 400K. I read every reply you send \u2014 yes, really.',
      reactions:[{label:'\u2764', count:31000, mine:false},{label:'\u{1F525}', count:8204, mine:false}] },
  ],
  ch2: [
    { id:'b3', time:'3d', type:'text', media:null, text:'One week since the finale. Thank you for watching the light.',
      reactions:[{label:'\u2764', count:18900, mine:false}] },
  ],
  ch3: [
    { id:'b4', time:'5h', type:'text', media:null, text:'This week\u2019s airing calendar is live. Two season premieres, one finale thread. Don\u2019t sleep on The Third Court.',
      reactions:[{label:'\u2764', count:2100, mine:false}] },
  ],
};

export const posts = [
  { id:'p1', userId:'u3', time:'12m', agoMin:12, text:'The hallway scene in ep 10 was blocked like a duel. Two people saying goodbye and the camera treats it like warfare. I\u2019m not okay.',
    media:'/assets/poster-weight-of-snow.png', mediaH:250, dramaId:'snow', communityId:'c1', actorId:null,
    likes:1200, comments:148, liked:true, saved:false, spoiler:false, duration:null },
  { id:'p2', userId:'u4', time:'48m', agoMin:48, text:'Hot take: Signal Fire\u2019s ending only works if you accept that the flare was never literal. It\u2019s the one signal he never sent.',
    media:null, dramaId:'signal', communityId:'c2', actorId:null, likes:864, comments:203, liked:false, saved:false, spoiler:false, duration:null },
  { id:'p3', userId:'u4', time:'26m', agoMin:26, text:'Rewatched the ep 12 rooftop scene. The flare is reflected in the glass BEFORE he lights it. The edit has been telling us since ep 3.',
    media:null, dramaId:'signal', communityId:'c2', actorId:null, likes:980, comments:164, liked:false, saved:false, spoiler:true, duration:null },
  { id:'p4', userId:'u2', time:'2h', agoMin:120, text:'Weekly rewatch thread: episodes 1\u20134, spoiler tags on. Be kind to first-timers.',
    media:null, dramaId:'signal', communityId:'c2', actorId:null, likes:312, comments:58, liked:false, saved:false, spoiler:false, duration:null },
  { id:'p5', userId:'u1', time:'3h', agoMin:180, text:'that alley scene lives in my head rent free. midnight runs never hit like this',
    media:'/assets/poster-midnight-seongsu.png', mediaH:230, dramaId:'seongsu', communityId:'c5', actorId:null,
    likes:48200, comments:1204, liked:false, saved:false, spoiler:false, duration:null },
  { id:'p6', userId:'me', time:'3h', agoMin:180, text:'First time finishing a drama before it finished airing. Who am I now?',
    media:null, dramaId:null, communityId:null, actorId:null, likes:42, comments:9, liked:false, saved:false, spoiler:false, duration:null },
  { id:'p7', userId:'u5', time:'5h', agoMin:300, text:'The Third Court ep 6: the way the verdict is delivered off-screen while we watch the brush write the record. Television!!!',
    media:null, dramaId:'court', communityId:'c7', actorId:null, likes:733, comments:91, liked:false, saved:true, spoiler:false, duration:null },
  { id:'p8', userId:'u3', time:'7h', agoMin:420, text:'Blue Hour rewatch. The blue hour is the only shift that never bills anyone. That\u2019s the whole show.',
    media:'/assets/poster-blue-hour.png', mediaH:210, dramaId:'clinic', communityId:'c8', actorId:null, likes:1502, comments:117, liked:false, saved:false, spoiler:false, duration:null },
  { id:'p9', userId:'u2', time:'1d', agoMin:1440, text:'unpopular opinion: the OST does more exposition than any line of dialogue and I will not be taking questions',
    media:null, dramaId:null, communityId:'c3', actorId:null, likes:2210, comments:340, liked:true, saved:false, spoiler:false, duration:null },
];

export const episodeThreads = {};
(function buildEpisodes(){
  const snow = dramas.find(d=>d.id==='snow');
  const dates = ['Jan 30','Jan 31','Feb 6','Feb 7','Feb 13','Feb 14','Feb 20','Feb 21'];
  const counts = [3100,2600,1800,2200,1600,1800,1900,2400,2200,2400];
  snow.episodes = Array.from({length: snow.aired}, (_,i)=>{
    const n = i+1;
    return { number:n, airDate: i<8 ? dates[i] : (i===8?'Feb 27':'Feb 28'), discussCount: counts[i] };
  });
  // canonical Ep 10 thread (matches screen 24)
  episodeThreads['snow:10'] = [
    { id:'t1', userId:'u3', time:'2h', text:'The hallway scene was blocked like a duel. Saying goodbye staged as warfare. I\u2019m not okay.', likes:1200, liked:false },
    { id:'t2', userId:'u1', time:'2h', text:'all footsteps no score. the SOUND DESIGN', likes:212, liked:false },
    { id:'t3', userId:'u4', time:'1h', text:'and the door close lands exactly on the cut to snowfall. eleven rewrites and I still cry', likes:184, liked:true },
    { id:'t4', userId:'u2', time:'44m', text:'prediction: ep 11 opens with the same hallway, empty. calling it', likes:96, liked:false },
    { id:'t5', userId:'u5', time:'20m', text:'no because the empty hallway callback would destroy me, stop', likes:61, liked:false },
  ];
})();

export const postComments = {
  p1: [
    { id:'cm1', userId:'u1', time:'9m', text:'The sound design there \u2014 all footsteps, no score. Devastating.', likes:212, liked:false },
    { id:'cm2', userId:'u2', time:'6m', text:'rewatching right now, the door close is perfectly on the beat cut', likes:84, liked:false },
    { id:'cm3', userId:'u5', time:'4m', text:'I had to pause and just stare at the wall for a minute after.', likes:57, liked:false },
  ],
};

export const conversations = [
  { id:'dm1', userId:'u1', unread:true, last:'that OST drop at the door close…', lastMin:2,
    messages:[
      { id:'m1', from:'them', text:'ok so I finished ep 10 at 2am' },
      { id:'m2', from:'them', text:'the hallway. THE HALLWAY.' },
      { id:'m3', from:'me', text:'I TOLD YOU. the blocking is a duel', time:'9:41 PM' },
      { id:'m4', from:'me', text:'and the sound design — footsteps only, no score', time:'9:41 PM' },
      { id:'m5', from:'them', text:'rewatching tonight, you free at 9?' },
      { id:'m6', from:'me', text:'obviously. bring the good snacks', time:'9:41 PM' },
    ] },
  { id:'dm2', userId:'u3', unread:true, last:'sending you the recap draft, be brutal', lastMin:41, messages:[
    { id:'m1', from:'them', text:'ep 10 essay is going up Friday, want first eyes?' },
  ] },
  { id:'dm3', userId:'u2', unread:false, last:'ep 15. tonight. you in?', lastMin:180, messages:[
    { id:'m1', from:'them', text:'ep 15. tonight. you in?' },
  ] },
  { id:'dm4', userId:'u4', unread:false, last:'no spoilers I\u2019m only on ep 6!!', lastMin:1440, messages:[
    { id:'m1', from:'them', text:'no spoilers I\u2019m only on ep 6!!' },
  ] },
  { id:'dm5', userId:'u5', unread:false, last:'the sageuk rec list you asked for', lastMin:2880, messages:[
    { id:'m1', from:'them', text:'the sageuk rec list you asked for' },
  ] },
];

export const notificationsSeed = [
  { id:'n1', kind:'episode', title:'The Weight of Snow · Ep 11', body:'Airs tonight 9:30 PM — tap for the live thread', time:'2h', poster:'/assets/poster-weight-of-snow.png', read:false, target:{screen:'drama', params:{id:'snow'}} },
  { id:'n2', kind:'episode', title:'Midnight in Seongsu · Ep 9', body:'Now streaming · discuss with 1.2K watching', time:'1d', poster:'/assets/poster-midnight-seongsu.png', read:true, target:{screen:'drama', params:{id:'seongsu'}} },
  { id:'n3', kind:'reply', title:'@hanriver replied', body:'“the empty hallway callback would destroy me”', time:'3h', read:false, target:{screen:'post', params:{id:'p1'}} },
  { id:'n4', kind:'mention', title:'@ep15 mentioned you', body:'“@you called this in the thread, receipts”', time:'8h', read:false, target:{screen:'post', params:{id:'p3'}} },
  { id:'n5', kind:'channel', title:'Seo Ji-won Official', body:'“Script read for episode 11 today…”', time:'2h', read:false, target:{screen:'channel', params:{id:'ch1'}} },
  { id:'n6', kind:'channel', title:'Signal Fire Writers Room', body:'“One week since the finale. Thank you.”', time:'3d', read:true, target:{screen:'channel', params:{id:'ch2'}} },
];

export const clips = [
  { id:'v1', userId:'u1', poster:'/assets/poster-midnight-seongsu.png', dramaId:'seongsu',
    caption:'that alley scene lives in my head rent free. midnight runs never hit like this',
    duration:'0:42', music:'OST · Seongsu Nights — The Blue Hour', likes:48200, comments:1204, shares:8912, liked:false, saved:false },
  { id:'v2', userId:'u3', poster:'/assets/poster-weight-of-snow.png', dramaId:'snow',
    caption:'footsteps only. no score. the loudest silence on television this year',
    duration:'0:58', music:'OST · Snowfall Theme — Han Ji-min', likes:91200, comments:3400, shares:15200, liked:true, saved:false },
  { id:'v3', userId:'u4', poster:'/assets/poster-signal-fire.png', dramaId:'signal',
    caption:'the flare reflected in the glass before he lights it. ep 3 told us everything',
    duration:'0:47', music:'OST · Signal Fire Suite', likes:73800, comments:2210, shares:11900, liked:false, saved:true },
  { id:'v4', userId:'u5', poster:'/assets/poster-third-court.png', dramaId:'court',
    caption:'the verdict delivered off screen while the brush writes the record. CINEMA',
    duration:'0:39', music:'OST · Court of Hanyang — Geomungo theme', likes:24100, comments:640, shares:3100, liked:false, saved:false },
];

// ---------- lookups / formatters ----------
export const drama = id => dramas.find(d=>d.id===id);
export const actor = id => actors.find(a=>a.id===id);
export const user  = id => users.find(u=>u.id===id);
export const community = id => communities.find(c=>c.id===id);
export const channel = id => channels.find(c=>c.id===id);

export function compact(n) {
  if (n == null) return '';
  if (n >= 1000) return (n/1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/,'') + 'K';
  return String(n);
}
export function dramaLabel(d){
  if (!d) return '';
  return `${d.genres.join(' · ')} · ${d.episodeCount} ep`;
}
