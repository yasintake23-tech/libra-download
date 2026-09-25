import React,{useState}from"react";
import{createRoot}from"react-dom/client";
import"./style.css";
import{auth,db}from"./firebase";
import{signInWithEmailAndPassword,signOut}from"firebase/auth";
import{doc,getDoc,setDoc,serverTimestamp}from"firebase/firestore";

const initial={
 version:"1.0.6",
 downloadUrl:"",
 notes:[
  "Hikâye akışı ve paylaşım altyapısı",
  "DM'de içerik ön izlemeleri",
  "Gönderi, kitap ve hikâye paylaşımı"
 ]
};

const Icon=({children})=><span className="icon">{children}</span>;

function App(){
 const[cfg,setCfg]=useState(initial);
 const[open,setOpen]=useState(false),[admin,setAdmin]=useState(false),[email,setEmail]=useState(""),[pw,setPw]=useState(""),[err,setErr]=useState(""),[saving,setSaving]=useState(false);
 const[form,setForm]=useState(initial);

 const login=async()=>{
  setErr("");
  try{await signInWithEmailAndPassword(auth,email.trim(),pw);setAdmin(true);setForm(cfg)}
  catch(e){setErr("E-posta veya şifre hatalı.")}
};
const save=async()=>{
  setSaving(true);setErr("");
  try{
   await setDoc(doc(db,"website","config"),{version:form.version.trim(),downloadUrl:form.downloadUrl.trim(),notes:form.notes.filter(Boolean),updatedAt:serverTimestamp()});
   setCfg(form);await signOut(auth);setAdmin(false);setOpen(false);setPw("");setEmail("");
  }catch(e){setErr("Kaydedilemedi. Firebase yetkilerini kontrol et.")}finally{setSaving(false)}
};
React.useEffect(()=>{(async()=>{try{const s=await getDoc(doc(db,"website","config"));if(s.exists()){const d=s.data();const n={version:d.version||initial.version,downloadUrl:d.downloadUrl||"",notes:Array.isArray(d.notes)?d.notes:initial.notes};setCfg(n);setForm(n)}}catch(e){console.error(e)}})()},[]);

 const download=()=>{
  if(cfg.downloadUrl)window.location.href=cfg.downloadUrl;
  else alert("İndirme bağlantısı henüz ayarlanmadı.");
 };

 return <div className="site">
  <nav className="nav">
   <a className="brand" href="#">
    <span className="brand-mark">L</span><span>Libra</span>
   </a>
   <div className="nav-links">
    <a href="#neden-libra">Neden Libra</a>
    <a href="#ozellikler">Özellikler</a>
    <a href="#surum">Sürüm</a>
   </div>
   <button className="nav-download" onClick={download}>İndir <span>↗</span></button>
  </nav>

  <main>
   <section className="hero">
    <div className="hero-copy">
     <div className="eyebrow"><span className="pulse"></span> ANDROID UYGULAMASI</div>
     <h1>Okuduğun şeyler.<br/><em>Yazdığın hikâyeler.</em><br/>Senin dünyan.</h1>
     <p className="hero-text">Libra, kitap keşfini, okumayı, yazmayı ve insanlarla paylaşmayı tek bir sade deneyimde buluşturuyor.</p>
     <div className="hero-actions">
      <button className="primary" onClick={download}>Libra'yı indir <span>↓</span></button>
      <a className="ghost" href="#neden-libra">Keşfet <span>⌄</span></a>
     </div>
     <div className="trust"><span>●</span> Android 7.0 ve üzeri <i></i><span>●</span> Ücretsiz</div>
    </div>
    <div className="hero-visual" aria-hidden="true">
     <div className="glow"></div>
     <div className="phone phone-back"></div>
     <div className="phone phone-front">
      <div className="phone-top"><span>9:41</span><b>Libra</b><span>•••</span></div>
      <div className="mini-avatar">L</div>
      <div className="phone-title">Bugün ne<br/><strong>keşfedeceksin?</strong></div>
      <div className="mini-card"><span className="cover"></span><div><small>ÖNERİLEN</small><b>Yeni bir hikâyeye<br/>başla.</b></div></div>
      <div className="mini-lines"><i></i><i></i><i></i></div>
      <div className="mini-nav"><span>⌂</span><span>⌕</span><span className="mini-plus">+</span><span>♡</span><span>◉</span></div>
     </div>
     <div className="float-card"><span className="float-icon">✦</span><div><small>LIBRA</small><b>Birlikte keşfet.</b></div></div>
    </div>
   </section>

   <section className="statement" id="neden-libra">
    <div className="section-kicker">NEDEN LIBRA?</div>
    <h2>Bir uygulamadan<br/><span>daha fazlası.</span></h2>
    <p>Kitaplarla başlayan yolculuk; kendi hikâyelerini yazdığın, insanları takip ettiğin ve keşfettiklerini paylaştığın canlı bir dünyaya dönüşür.</p>
   </section>

   <section className="feature-grid" id="ozellikler">
    <article className="feature feature-wide">
     <div className="feature-icon">⌕</div>
     <div><span>KEŞFET</span><h3>Yeni dünyalar,<br/>tek akışta.</h3><p>Kitapları, insanları ve topluluğu keşfet. İlham geldiğinde kaydet, takip et ve konuşmaya katıl.</p></div>
     <div className="orb orb-one"></div>
    </article>
    <article className="feature">
     <div className="feature-icon">✎</div><span>YAZ</span><h3>Hikâyeni<br/>sen anlat.</h3><p>Kendi kitabını oluştur, bölümlerini düzenle ve yayınla.</p>
     <div className="paper-lines"><i></i><i></i><i></i><i></i></div>
    </article>
    <article className="feature">
     <div className="feature-icon">♡</div><span>PAYLAŞ</span><h3>Okumak<br/>sosyal.</h3><p>Gönderiler, hikâyeler, yorumlar ve mesajlarla bağlantıda kal.</p>
     <div className="orbit">♡</div>
    </article>
    <article className="feature feature-wide dark-feature">
     <div className="dark-copy"><span>BAĞLAN</span><h3>İnsanların olduğu<br/>bir kütüphane.</h3><p>Arkadaşlarını bul, takip et, topluluklara katıl ve doğrudan mesajlaş.</p></div>
     <div className="chat-stack"><div>Bugün ne okuyorsun?</div><div>Yeni bölüm yayınladım.</div><div>Hemen bakıyorum ✦</div></div>
    </article>
   </section>

   <section className="experience">
    <div className="experience-copy">
     <div className="section-kicker">SADECE BİR BAŞLANGIÇ</div>
     <h2>Her şey<br/><span>yerli yerinde.</span></h2>
     <p>Libra'yı kalabalıklaştırmak yerine doğru şeyleri bir araya getirdik. Temiz bir arayüz, hızlı geçişler ve içeriklerin ön planda olduğu bir deneyim.</p>
     <div className="checks"><div><b>01</b><span>Kitaplarını keşfet ve kütüphaneni oluştur.</span></div><div><b>02</b><span>Kendi hikâyeni yaz ve yayınla.</span></div><div><b>03</b><span>İnsanlarla paylaş, konuş ve bağlantıda kal.</span></div></div>
    </div>
    <div className="experience-art"><div className="ring r1"></div><div className="ring r2"></div><div className="ring r3"></div><div className="art-core">L</div><span className="art-word">LIBRA</span></div>
   </section>

   <section className="release" id="surum">
    <div>
     <div className="section-kicker">EN GÜNCEL SÜRÜM</div>
     <div className="release-title"><h2>{cfg.version}</h2><span>Android</span></div>
     <p>Libra'nın en yeni sürümünü indir ve yeni özellikleri keşfet.</p>
    </div>
    <button className="primary release-btn" onClick={download}>İndirmeye başla <span>↓</span></button>
   </section>

   <section className="notes-section">
    <div className="section-kicker">YENİLİKLER</div>
    <h2>Bu sürümde.</h2>
    <div className="release-notes">{cfg.notes.map((n,i)=><div key={i}><b>{String(i+1).padStart(2,"0")}</b><span>{n}</span><i>↗</i></div>)}</div>
   </section>

   <section className="cta">
    <div className="cta-glow"></div>
    <div className="section-kicker">SENİN SIRAN</div>
    <h2>Bir hikâye var.<br/><span>Belki de seninki.</span></h2>
    <p>Libra'yı indir. Keşfetmeye, okumaya ve yazmaya başla.</p>
    <button className="primary light" onClick={download}>Libra'yı indir <span>↓</span></button>
   </section>
  </main>

  <footer>
   <div className="footer-brand"><span className="brand-mark">L</span><div><b>Libra</b><small>Oku. Yaz. Paylaş.</small></div></div>
   <div className="footer-meta"><span>© 2026 Libra</span><span>Android uygulaması</span><span>v{cfg.version}</span></div>
   <button className="admin-trigger" onClick={()=>{setOpen(true);setAdmin(false);setErr("")}}>•••</button>
  </footer>

  {open&&<div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}>
   <div className="modal">
    <button className="modal-close" onClick={()=>setOpen(false)}>×</button>
    {!admin?<><div className="modal-icon">⌁</div><div className="section-kicker">YÖNETİCİ</div><h3>Libra ayarları</h3><p>Yayın bilgilerini değiştirmek için Firebase yönetici hesabınla giriş yap.</p><label>E-posta</label><input autoFocus type="email" placeholder="admin@libra.app" value={email} onChange={e=>setEmail(e.target.value)}/><label>Şifre</label><input type="password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/>{err&&<div className="err">{err}</div>}<button className="modal-primary" onClick={login}>Giriş yap</button></>:<><div className="section-kicker">YAYIN YÖNETİMİ</div><h3>Sürümü güncelle</h3><label>İndirme bağlantısı</label><input value={form.downloadUrl} onChange={e=>setForm({...form,downloadUrl:e.target.value})} placeholder="APK / Google Drive bağlantısı"/><label>Sürüm</label><input value={form.version} onChange={e=>setForm({...form,version:e.target.value})} placeholder="1.0.7"/><label>Sürüm notları</label><textarea rows="7" value={form.notes.join("\n")} onChange={e=>setForm({...form,notes:e.target.value.split("\n")})} placeholder="Her satıra bir yenilik"/><button className="modal-primary" onClick={save} disabled={saving}>{saving?"Kaydediliyor…":"Değişiklikleri kaydet"}</button></>}<button className="modal-secondary" onClick={()=>setOpen(false)}>Kapat</button>
   </div>
  </div>}
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);