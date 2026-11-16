// Time-driven demos for the {{< motion >}} shortcode. Each demo is a function of the clock T (seconds).
// Ported from the motion catalog; CSS-only demos need no code here.
(function () {
  var cl = function (x) { return Math.max(0, Math.min(1, x)); };
  var eo = function (x) { return 1 - Math.pow(1 - cl(x), 3); };
  var eio = function (x) { x = cl(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var sp = function (x) { x = cl(x); return 1 - Math.exp(-6 * x) * Math.cos(14 * x); };
  var seg = function (t, a, b) { return cl((t - a) / (b - a)); };
  var NS = 'http://www.w3.org/2000/svg';
  var D = {};

  D.count = function (r) {
    var el = r.querySelector('#cnt');
    return function (T) { var p = cl((T % 2.8) / 1.4); el.textContent = Math.round(1 + 249 * eo(p)); };
  };

  D.scene = function (r) {
    var $ = function (i) { return r.querySelector('#' + i); };
    var g = '';
    for (var i = 0; i < 32; i++) { var a = i * Math.PI / 16, rr = (i % 4 < 2) ? 21 : 15; g += (i ? 'L' : 'M') + (150 + rr * Math.cos(a)).toFixed(1) + ' ' + (100 + rr * Math.sin(a)).toFixed(1); }
    $('gr').setAttribute('d', g + 'Z');
    var pk = $('pk');
    for (i = 0; i < 4; i++) { var c = document.createElementNS(NS, 'circle'); c.setAttribute('r', '4'); c.style.fill = 'var(--fill-warning)'; pk.appendChild(c); }
    var bz = function (t) { var x0 = 75, y0 = 88, x1 = 150, y1 = 20, x2 = 225, y2 = 45, u = 1 - t; return [u * u * x0 + 2 * u * t * x1 + t * t * x2, u * u * y0 + 2 * u * t * y1 + t * t * y2]; };
    return function (T) {
      $('cl').setAttribute('transform', 'translate(' + (40 + ((T * 14) % 260)) + ',24)');
      [1, 2, 3].forEach(function (k) { $('l' + k).style.fill = Math.sin(T * 3 + k * 2) > 0 ? 'var(--fill-success)' : 'var(--text-muted)'; });
      $('gr').setAttribute('transform', 'rotate(' + (T * 50) + ' 150 100)');
      for (var i = 0; i < 4; i++) { var u = ((T * .35) + i / 4) % 1, q = bz(u), c = pk.children[i]; c.setAttribute('cx', q[0]); c.setAttribute('cy', q[1]); c.style.opacity = Math.sin(u * Math.PI); }
    };
  };

  D.shapes = function (r) {
    var N = 24;
    var shape = function (k) {
      var o = [];
      for (var i = 0; i < N; i++) {
        var a = i / N * 2 * Math.PI - Math.PI / 2, x, y;
        if (k == 0) { x = Math.cos(a); y = Math.sin(a); }
        else if (k == 1) { var m = Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a))); x = Math.cos(a) / m * .85; y = Math.sin(a) / m * .85; }
        else if (k == 2) { var p = i / N * 3, s = Math.floor(p), f = p - s, V = [[0, -1], [.95, .7], [-.95, .7]], A = V[s % 3], B = V[(s + 1) % 3]; x = A[0] + (B[0] - A[0]) * f; y = A[1] + (B[1] - A[1]) * f; }
        else { var rr = (i % 2 == 0) ? 1 : .45; x = rr * Math.cos(a); y = rr * Math.sin(a); }
        o.push([x, y]);
      }
      return o;
    };
    var SH = [shape(0), shape(1), shape(2), shape(3)], NM = ['circle', 'square', 'triangle', 'star'];
    var mp = r.querySelector('#mp'), mt = r.querySelector('#mt');
    return function (T) {
      var tp = (T % 8) / 8 * 4, k = Math.floor(tp), f = eio((tp - k) * 1.6), A = SH[k % 4], B = SH[(k + 1) % 4], pts = '';
      for (var i = 0; i < N; i++) pts += (150 + (A[i][0] + (B[i][0] - A[i][0]) * f) * 48).toFixed(1) + ',' + (66 + (A[i][1] + (B[i][1] - A[i][1]) * f) * 48).toFixed(1) + ' ';
      mp.setAttribute('points', pts); mt.textContent = NM[k % 4] + ' → ' + NM[(k + 1) % 4];
    };
  };

  D.spotlight = function (r) {
    var mc = r.querySelector('#mc'), sx = [55, 150, 245];
    return function (T) {
      var sc = (T % 9) / 9 * 3, si = Math.floor(sc), sf = eio((sc - si) * 2.2);
      mc.setAttribute('cx', sx[si % 3] + (sx[(si + 1) % 3] - sx[si % 3]) * sf); mc.setAttribute('cy', 75);
    };
  };

  D.easing = function (r) {
    var e = [1, 2, 3].map(function (k) { return r.querySelector('#e' + k); });
    return function (T) {
      var m = cl(((T % 4) / 4) / .75);
      e[0].setAttribute('cx', 70 + 210 * m * .97); e[1].setAttribute('cx', 70 + 210 * eo(m) * .97); e[2].setAttribute('cx', 70 + 210 * sp(m) * .97);
    };
  };

  D.parallax = function (r) {
    var p = [1, 2, 3].map(function (k) { return r.querySelector('#p' + k); }), f = [-14, -34, -70];
    return function (T) { var cam = Math.sin(T * .6); p.forEach(function (n, i) { n.setAttribute('transform', 'translate(' + (cam * f[i]) + ',0)'); }); };
  };

  D.focus = function (r) {
    var bg = r.querySelector('#bg'), bf = r.querySelector('#bf');
    return function (T) {
      var tb = (T % 5) / 5, b = eo(seg(tb, .05, .4)), out = seg(tb, .85, 1);
      bg.setAttribute('stdDeviation', (8 * (1 - b) + 4 * out).toFixed(2)); bf.style.opacity = (b * (1 - out)).toFixed(2);
    };
  };

  D.resort = function (r) {
    var rows = [['Alpha', 40], ['Beta', 90], ['Gamma', 65], ['Delta', 25]], ls = r.querySelector('#ls'), RW = [];
    rows.forEach(function (row) { var G = document.createElementNS(NS, 'g'); G.innerHTML = '<rect x="70" y="0" height="24" rx="4" width="10" style="fill:var(--fill-accent)"/><text x="10" y="16" class="lb">' + row[0] + '</text>'; ls.appendChild(G); RW.push(G); });
    var ord = function (sorted) { var idx = [0, 1, 2, 3]; if (sorted) idx.sort(function (a, b) { return rows[b][1] - rows[a][1]; }); var pos = []; idx.forEach(function (v, p) { pos[v] = p; }); return pos; };
    var p0 = ord(false), p1 = ord(true);
    return function (T) {
      var tl = (T % 6) / 6, mv = eio(seg(tl, .3, .55)) - eio(seg(tl, .8, 1));
      RW.forEach(function (G, i) { var y = 14 + (p0[i] + (p1[i] - p0[i]) * mv) * 31; G.setAttribute('transform', 'translate(0,' + y.toFixed(1) + ')'); G.firstChild.setAttribute('width', (rows[i][1] * 2.1 * eo(seg(tl, 0, .2))).toFixed(1)); });
    };
  };

  D.line = function (r) {
    var lc = r.querySelector('#lc'), ld = r.querySelector('#ld'), lv = r.querySelector('#lv');
    return function (T) {
      var d = eo(seg((T % 5) / 5, .05, .7));
      lc.style.strokeDashoffset = (1 - d).toFixed(3);
      var dp = lc.getPointAtLength(d * lc.getTotalLength());
      ld.setAttribute('cx', dp.x); ld.setAttribute('cy', dp.y); ld.style.opacity = d > 0 ? 1 : 0;
      lv.setAttribute('x', dp.x); lv.setAttribute('y', dp.y - 10); lv.textContent = Math.round(10 + d * 90) + '%';
    };
  };

  D.code = function (r) {
    var cd = r.querySelector('#cd');
    var code = ['def total(items):', '    s = 0', '    for i in items: s += i.price', '    return s'];
    var fix = '    for i in items: s += i.price * i.qty';
    return function (T) {
      var tk = (T % 9) / 9, cnt = Math.floor(seg(tk, 0, .5) * code.join('\n').length), used = 0;
      var lines = code.map(function (L) { var n = Math.max(0, Math.min(L.length, cnt - used)); used += L.length + 1; return L.slice(0, n); });
      var strike = seg(tk, .6, .7), fixv = seg(tk, .72, .9);
      if (lines[2].length == code[2].length && strike > 0) lines[2] = '<s style="color:var(--text-danger);opacity:' + (1 - strike * .4) + '">' + code[2] + '</s>';
      var o = lines.map(function (L) { return '<div>' + (L || '&nbsp;') + '</div>'; }).join('');
      if (fixv > 0) o += '<div style="color:var(--text-success)">+ ' + fix.slice(0, Math.round(fix.length * fixv)) + '</div>';
      cd.innerHTML = o;
    };
  };

  D.follow = function (r) {
    var pa = r.querySelector('#fp'), fa = r.querySelector('#fa'), PL = pa.getTotalLength();
    return function (T) {
      var u = eio((T % 5) / 5), pt = pa.getPointAtLength(u * PL), q2 = pa.getPointAtLength(Math.min(PL, u * PL + 2)), q1 = pa.getPointAtLength(Math.max(0, u * PL - 2));
      fa.setAttribute('transform', 'translate(' + pt.x + ',' + pt.y + ') rotate(' + (Math.atan2(q2.y - q1.y, q2.x - q1.x) * 180 / Math.PI) + ')');
    };
  };

  // Each tile has data-m="name". Only tiles on screen are animated.
  var active = [];
  document.querySelectorAll('.mg [data-m]').forEach(function (tile) {
    var init = D[tile.getAttribute('data-m')];
    if (!init) return;
    var item = { run: init(tile), on: false };
    new IntersectionObserver(function (e) { item.on = e[0].isIntersecting; }).observe(tile);
    active.push(item);
  });
  if (!active.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  (function frame(now) {
    active.forEach(function (a) { if (a.on) a.run(now / 1000); });
    requestAnimationFrame(frame);
  })(0);
})();
