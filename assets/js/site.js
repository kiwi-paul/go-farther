/* ============================================================
   Go Farther site config. Two things to fill in.
   ============================================================ */

// 1. GoHighLevel inbound webhook URL for the mailing list.
//    GHL > Automation > Workflows > new workflow > trigger "Inbound Webhook" > copy the URL.
//    Leave empty and the form politely says it is not connected yet.
var GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/dN6vdJv4v6Amw5S3e5Vs/webhook-trigger/ea2c1618-34b0-47ad-8f32-14c47545c5de";

// 2. The live video, once it is in R2.
//    Leave empty and the poster stays a still image.
var VIDEO_URL = "https://pub-ceb708839e654762834a70efa034f829.r2.dev/Never%20Say%20Never%20%26%20What%20I%20See%20In%20You.mp4";

(function(){
  var pick=function(k){return document.querySelector('[data-k='+k+'] img').src;};
  var A={
    no_place:{id:"7tzsElKVx09cEjMDrLW0uu",hf:"https://distrokid.com/hyperfollow/gofarther/no-place-to-hide",t:"No Place to Hide",m:"Single \u00b7 2026",e:"Out now",
      b:"False smiles, low blows and a snitch picking at the stitches. A song about seeing straight through people, with a chorus that offers nowhere to go."},
    never_say:{id:"4skVxSDE38Jw6bx4qjlawW",hf:"https://distrokid.com/hyperfollow/gofarther/never-say-never",t:"Never Say Never",m:"Single \u00b7 2026",e:"From the catalogue",
      b:"Never, forever and better, each one turned over until it gives. Three verses of arguing with yourself and deciding to keep going anyway."},
    shes_looking:{id:"4lG6CVZQc4wcGX0NvFtdrZ",hf:"https://distrokid.com/hyperfollow/gofarther/shes-looking-at-you",t:"She\u2019s Looking at You",m:"Single \u00b7 2026",e:"From the catalogue",
      b:"Late nights, long runs and wondering if you really got through."}
  };
  // one HyperFollow link per release, so it swaps with the featured track
  function setHyperfollow(url){
    var a=document.getElementById('relAll');
    if(url){
      a.href=url; a.target="_blank"; a.rel="noopener";
      a.removeAttribute('aria-disabled'); a.classList.remove('is-pending');
      a.innerHTML='Listen everywhere';
    } else {
      a.href="#"; a.setAttribute('aria-disabled','true'); a.classList.add('is-pending');
      a.innerHTML='Listen everywhere <small>needs the DistroKid link</small>';
    }
  }
  var grid=document.getElementById('catGrid');
  grid.addEventListener('click',function(ev){
    var btn=ev.target.closest('button.cat'); if(!btn) return;
    var d=A[btn.dataset.k]; if(!d) return;
    document.getElementById('relTitle').textContent=d.t;
    document.getElementById('relMeta').innerHTML=d.m;
    document.getElementById('relEyebrow').textContent=d.e;
    document.getElementById('relBlurb').textContent=d.b;
    var art=document.getElementById('relArt');
    art.src=pick(btn.dataset.k); art.alt=d.t+" cover";
    var fr=document.getElementById('relFrame');
    if(fr) fr.src="https://open.spotify.com/embed/track/"+d.id+"?utm_source=generator&theme=0";
    document.getElementById('relSave').href="https://open.spotify.com/track/"+d.id;
    setHyperfollow(d.hf);
    Array.prototype.forEach.call(document.querySelectorAll('button.cat'),function(b){
      b.setAttribute('aria-current', b===btn?'true':'false');
    });
    document.getElementById('music').scrollIntoView({behavior:'smooth',block:'start'});
  });
  document.querySelector('[data-k=no_place]').setAttribute('aria-current','true');
  setHyperfollow(A.no_place.hf);
})();

/* ---- mailing list -> GoHighLevel ---------------------------------------- */
(function(){
  var form = document.getElementById('signupForm');
  if(!form) return;
  var note = document.getElementById('signupNote');
  var input = document.getElementById('signupEmail');

  function say(msg, ok){
    note.textContent = msg;
    note.className = 'formnote' + (ok ? ' is-ok' : ' is-err');
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var email = (input.value || '').trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){
      say('That email does not look right. Try again.', false);
      input.focus();
      return;
    }
    if(!GHL_WEBHOOK){
      say('The list is not connected yet. Email gofartherband@gmail.com and we will add you.', false);
      return;
    }

    var btn = form.querySelector('button');
    btn.disabled = true;
    say('Signing you up...', true);

    var payload = JSON.stringify({
      email: email,
      source: 'gofarther.com.au',
      tag: 'gofarther-list',
      page: location.pathname
    });
    var opts = { method:'POST', headers:{'Content-Type':'application/json'}, body:payload };

    fetch(GHL_WEBHOOK, opts)
      .then(function(r){ if(!r.ok) throw new Error(r.status); return r; })
      .catch(function(){
        // GHL webhooks often refuse the CORS preflight. The POST still lands,
        // we just cannot read the response, so retry opaquely and trust it.
        return fetch(GHL_WEBHOOK, { method:'POST', mode:'no-cors', body:payload });
      })
      .then(function(){
        form.style.display = 'none';
        say('You are on the list. We will only email you when there is something worth saying.', true);
      })
      .catch(function(){
        btn.disabled = false;
        say('That did not go through. Try again, or email gofartherband@gmail.com.', false);
      });
  });
})();

/* ---- click to play the live video -------------------------------------- */
(function(){
  var wrap = document.getElementById('videoWrap');
  var btn  = document.getElementById('vidPlay');
  if(!wrap || !btn) return;

  if(!VIDEO_URL){
    wrap.style.cursor = 'default';
    btn.setAttribute('aria-disabled','true');
    btn.title = 'Video coming soon';
    return;
  }

  var started = false;

  function onBtnClick(e){ e.stopPropagation(); play(); }
  function onWrapClick(e){ if(e.target !== btn) play(); }

  function play(){
    // Once the <video> is in, the poster listeners must go, or taps on the
    // native controls (fullscreen especially) rebuild the element and restart it.
    if(started) return;
    started = true;
    wrap.removeEventListener('click', onWrapClick);
    btn.removeEventListener('click', onBtnClick);

    var v = document.createElement('video');
    v.className = 'vid';
    v.controls = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.poster = '/assets/img/video-poster-wallaby.jpg';
    v.src = VIDEO_URL;
    wrap.innerHTML = '';
    wrap.appendChild(v);
    wrap.style.cursor = 'default';

    // Mobile only honours autoplay when play() is called synchronously inside the
    // gesture that started it. The autoplay attribute alone is evaluated too late,
    // so iOS and Android fall back to showing their own play button.
    var p = v.play();
    if(p && p.catch) p.catch(function(){ /* browser refused; native control stands */ });
  }

  btn.addEventListener('click', onBtnClick);
  wrap.addEventListener('click', onWrapClick);
})();

/* ---- gig list, from /gigs.json ----------------------------------------- */
(function(){
  var sign = document.getElementById('gigSign');
  if(!sign) return;

  var FOLLOW = 'https://www.instagram.com/gofartherofficial/'; // where dates get announced first

  var DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MONS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function fmt(d){
    // built by hand rather than toLocaleDateString, which gives "Sat, 12 Sept"
    return DAYS[d.getDay()] + ' ' + ('0' + d.getDate()).slice(-2) + ' ' + MONS[d.getMonth()];
  }

  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c];
    });
  }

  function empty(msg){
    sign.innerHTML = '<div class="gig gig-empty"><span class="town">' + msg + '</span>' +
      '<span class="meta"><a class="tix" href="' + FOLLOW + '" target="_blank" rel="noopener">Follow on Instagram</a></span></div>';
  }

  function render(gigs){
    if(!gigs.length){ empty('No dates announced'); return; }
    sign.innerHTML = gigs.map(function(g){
      var d = new Date(g.date + 'T00:00:00');
      var tix = g.tickets
        ? '<a class="tix" href="' + esc(g.tickets) + '" target="_blank" rel="noopener">Tickets</a>'
        : '';
      return '<div class="gig">' +
        '<span class="town">' + esc(g.city) + '</span>' +
        '<span class="meta"><span class="date">' + fmt(d) + '</span>' +
        '<span>' + esc(g.venue) + '</span></span>' + tix +
      '</div>';
    }).join('');
    schema(gigs);
  }

  // Google shows rich results for events, so emit the schema from the same data.
  function schema(gigs){
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(gigs.map(function(g){
      return {
        '@context':'https://schema.org', '@type':'MusicEvent',
        name: 'Go Farther at ' + g.venue,
        startDate: g.date,
        eventStatus: 'https://schema.org/EventScheduled',
        location: { '@type':'Place', name: g.venue,
          address: { '@type':'PostalAddress', addressLocality: g.city, addressCountry:'AU' } },
        performer: { '@type':'MusicGroup', name:'Go Farther' }
      };
    }));
    document.head.appendChild(s);
  }

  fetch('/gigs.json', { cache:'no-cache' })
    .then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); })
    .then(function(data){
      // today at midnight, so a gig happening tonight still shows
      var today = new Date(); today.setHours(0,0,0,0);
      var upcoming = (data.gigs || [])
        .filter(function(g){ return new Date(g.date + 'T00:00:00') >= today; })
        .sort(function(a,b){ return a.date < b.date ? -1 : 1; });
      render(upcoming);
    })
    .catch(function(){ empty('Dates coming soon'); });
})();
