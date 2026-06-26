import { useState, useEffect } from 'react'

import Logo from "./assets/logo.png"   // ← Replace with your Coginx Studio logo
import StudioImage from './assets/studio-image.jpg';   // Change filename if needed

// ── CSS Variables injected globally
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    :root {
      --bg: #0A0A0A; --surface: #141414; --surface2: #1A1A1A;
      --border: #222; --text: #F0F0F0; --text2: #A3A3A3;
      --accent: #00D4FF; --accent2: #7B61FF;
      --accent-glow: rgba(0,212,255,0.15);
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }
    [data-theme="light"] {
      --bg: #F8F9FA; --surface: #FFFFFF; --surface2: #F0F1F3;
      --border: #E0E0E0; --text: #171717; --text2: #525252;
      --accent: #00A8CC; --accent2: #5F3DC4;
      --accent-glow: rgba(0,168,204,0.12);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; transition: background 0.3s, color 0.3s; }
    ::selection { background: var(--accent); color: #000; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
    a { color: var(--accent); text-decoration: none; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
    @keyframes gradientShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
    @keyframes pulseGlow { 0%,100% { box-shadow:0 0 10px var(--accent-glow); } 50% { box-shadow:0 0 30px var(--accent-glow); } }
    .fadeUp { animation: fadeUp 0.8s ease both; }
    @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: block !important; } }
  `}</style>
)

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'var(--accent)', fontSize:'11px', fontWeight:700, letterSpacing:'0.15em', marginBottom:'14px', fontFamily:'var(--font-display)' }}>
      <span style={{ width:'24px', height:'1px', background:'var(--accent)', display:'block' }} />
      {children.toUpperCase()}
    </div>
  )
}

function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Services','About','Projects','Contact']

  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none', transition:'all 0.4s', padding:'0 clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'68px' }}>
        <a href="#home" style={{ display:'flex', alignItems:'center', gap:'10px', color:'var(--text)' }}>
          <img 
            src={Logo} 
            alt="Coginx Studio" 
            style={{ width:'34px', height:'34px', borderRadius:'8px', objectFit:'cover' }} 
          />
          <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'15px' }}>Coginx Studio</span>
        </a>
        
        {/* rest of your navbar remains same */}
        <div className="desktop-nav" style={{ display:'flex', alignItems:'center', gap:'28px' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color:'var(--text2)', fontSize:'14px', transition:'color 0.3s' }}
              onMouseEnter={e=>e.target.style.color='var(--accent)'}
              onMouseLeave={e=>e.target.style.color='var(--text2)'}
            >{l}</a>
          ))}
          <button onClick={toggleTheme} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'50px', padding:'7px 14px', cursor:'pointer', color:'var(--text)', fontFamily:'var(--font-body)', fontSize:'12px' }}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none', background:'none', border:'none', color:'var(--text)', fontSize:'22px', cursor:'pointer' }}>☰</button>
      </div>
      {/* mobile menu remains same */}
      {menuOpen && (
        <div style={{ background:'var(--surface)', borderTop:'1px solid var(--border)', padding:'20px', display:'flex', flexDirection:'column', gap:'16px' }}>
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{ color:'var(--text2)', fontSize:'15px' }}>{l}</a>)}
          <button onClick={toggleTheme} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'10px', cursor:'pointer', color:'var(--text)', fontFamily:'var(--font-body)', width:'fit-content' }}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [typed, setTyped] = useState('')
  const phrases = ['Premium Websites','AI Chatbots','Digital Experiences','Intelligent Solutions']
  const [pi, setPi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = phrases[pi]
    let t
    if (!del && typed.length < cur.length) t = setTimeout(() => setTyped(cur.slice(0,typed.length+1)), 80)
    else if (!del && typed.length === cur.length) t = setTimeout(() => setDel(true), 2000)
    else if (del && typed.length > 0) t = setTimeout(() => setTyped(typed.slice(0,-1)), 40)
    else { setDel(false); setPi((pi+1)%phrases.length) }
    return () => clearTimeout(t)
  }, [typed, del, pi])

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'100px clamp(20px,5vw,80px) 60px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize:'60px 60px', opacity:0.25, maskImage:'radial-gradient(ellipse at center,black 20%,transparent 75%)', zIndex:0 }} />
      <div style={{ position:'absolute', top:'15%', right:'8%', width:'350px', height:'350px', background:'radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)', borderRadius:'50%', animation:'float 7s ease-in-out infinite', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'15%', left:'5%', width:'280px', height:'280px', background:'radial-gradient(circle,rgba(123,97,255,0.07) 0%,transparent 70%)', borderRadius:'50%', animation:'float 9s ease-in-out infinite reverse', zIndex:0 }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1, width:'100%' }} className="fadeUp">
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(0,212,255,0.08)', border:'1px solid rgba(0,212,255,0.25)', borderRadius:'50px', padding:'6px 16px', marginBottom:'24px' }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', display:'block', animation:'pulseGlow 2s infinite' }} />
          <span style={{ color:'var(--accent)', fontSize:'12px', fontWeight:600 }}>Crafting Intelligent Digital Experiences</span>
        </div>

        <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(38px,7vw,78px)', lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'16px' }}>
          Coginx<br />
          <span style={{ background:'linear-gradient(135deg,var(--accent),var(--accent2))', backgroundSize:'200%', animation:'gradientShift 4s ease infinite', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Studio</span>
        </h1>

        <div style={{ display:'flex', alignItems:'center', gap:'4px', marginBottom:'24px', height:'38px' }}>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(16px,2.5vw,24px)', color:'var(--text2)', fontWeight:500 }}>{typed}</span>
          <span style={{ width:'2px', height:'26px', background:'var(--accent)', borderRadius:'1px', animation:'blink 1s infinite' }} />
        </div>

        <p style={{ color:'var(--text2)', fontSize:'clamp(14px,1.8vw,17px)', maxWidth:'520px', marginBottom:'40px', fontWeight:300, lineHeight:1.75 }}>
          We design and build high-performance websites and intelligent AI chatbots that help businesses stand out and scale.
        </p>

        <div style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'48px' }}>
          <a href="#services" style={{ background:'var(--accent)', color:'#000', padding:'13px 30px', borderRadius:'8px', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'14px', boxShadow:'0 0 20px var(--accent-glow)', transition:'all 0.3s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 0 40px var(--accent-glow)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 0 20px var(--accent-glow)'}}>
            Explore Our Services
          </a>
          <a href="#contact" style={{ background:'transparent', color:'var(--text)', padding:'13px 30px', borderRadius:'8px', fontFamily:'var(--font-display)', fontWeight:600, fontSize:'14px', border:'1px solid var(--border)', transition:'all 0.3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text)'}}>
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" style={{ padding:'100px clamp(20px,5vw,80px)', background:'var(--surface)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <SectionLabel>About Us</SectionLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'60px', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, lineHeight:1.2, marginBottom:'24px' }}>
              Turning ideas into<br/><span style={{ color:'var(--accent)' }}>intelligent digital realities.</span>
            </h2>
            <p style={{ color:'var(--text2)', lineHeight:1.85, marginBottom:'32px', fontSize:'15px' }}>
              Coginx Studio is a creative technology studio specializing in modern websites and AI-powered chatbots. We help businesses establish a strong online presence with beautiful, fast, and intelligent digital solutions.
            </p>
            <div style={{ display:'flex', gap:'28px', flexWrap:'wrap' }}>
              {[['50+','Projects Delivered'],['100%','Client Satisfaction'],['24/7','AI Support Ready'],['Modern','Tech Stack']].map(([num,label])=>(
                <div key={label} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:800, color:'var(--accent)' }}>{num}</div>
                  <div style={{ color:'var(--text2)', fontSize:'11px', letterSpacing:'0.1em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:'relative' }}>
  <div style={{ position:'absolute', inset:'-2px', borderRadius:'16px', background:'linear-gradient(135deg,var(--accent),var(--accent2))', opacity:0.6, zIndex:0 }} />
  
  <img 
    src={StudioImage} 
    alt="Coginx Studio" 
    style={{ 
      width: '100%', 
      borderRadius: '14px', 
      objectFit: 'cover', 
      maxHeight: '380px', 
      position: 'relative', 
      zIndex: 1, 
      display: 'block' 
    }} 
  />
  
  <div style={{ 
    position: 'absolute', 
    bottom: '16px', 
    left: '16px', 
    zIndex: 2, 
    background: 'rgba(0,0,0,0.8)', 
    backdropFilter: 'blur(10px)', 
    border: '1px solid rgba(0,212,255,0.3)', 
    borderRadius: '8px', 
    padding: '8px 14px' 
  }}>
    <span style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 600 }}>
      Coginx Studio — Karachi, PK
    </span>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}

// Service Packages
const websitePackages = [
  { name: "Starter Website", price: "100$", desc: "A Static Website, great for your new start-up or bussiness. Includes 30 days free maintenance." },
  { name: "Professional Website", price: "150$", desc: "AdvanceMulti page site with Great animations and theme of client's choice. Includes 30 days free maintenance." },
  { name: "Enterprise Website", price: "300$", desc: "Fully Advanced site for you e-commerce store or bussiness. A Multi page website with ordering system and admin page with autherization and user login. Includes 30 days free maintenance." }
]

const chatbotPackages = [
  { name: "Basic AI Chatbot", price: "80$", desc: "Simple AI chatbot with basic Q&A integrated into your website or WhatsApp. Answers common customers questions. Includes 30 days free maintenance." },
  { name: "Advanced AI Chatbot", price: "150$", desc: "Full AI Chatbot with conversation memory custom personality, and system prompt, Ready to deploy. Includes 30 days free maintenance." },
  { name: "Custom AI Agent", price: "250$", desc: "Complete AI chatbot with RAG (Reads your documents and PDFs), conversation memory, custom design and hundred days free maintenance. " }
]

function Services() {
  return (
    <section id="services" style={{ padding:'100px clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <SectionLabel>Our Services</SectionLabel>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,40px)', fontWeight:800, marginBottom:'48px' }}>
          Choose Your <span style={{ color:'var(--accent)' }}>Perfect Package</span>
        </h2>

        {/* Websites */}
        <div style={{ marginBottom: '80px' }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'28px', marginBottom:'32px', color:'var(--accent)' }}>Website Development</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'24px' }}>
            {websitePackages.map((pkg, i) => (
              <ServiceCard key={i} title={pkg.name} price={pkg.price} desc={pkg.desc} />
            ))}
          </div>
        </div>

        {/* AI Chatbots */}
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'28px', marginBottom:'32px', color:'var(--accent)' }}>AI Chatbots</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'24px' }}>
            {chatbotPackages.map((pkg, i) => (
              <ServiceCard key={i} title={pkg.name} price={pkg.price} desc={pkg.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// New Neon Service Card Component
function ServiceCard({ title, price, desc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '16px',
        padding: '32px',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,212,255,0.12)' : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Optional Accent Tag */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        background: 'rgba(0,212,255,0.1)', 
        border: '1px solid rgba(0,212,255,0.3)', 
        borderRadius: '50px', 
        padding: '3px 12px',
        fontSize: '10px',
        fontWeight: 700,
        color: 'var(--accent)',
        letterSpacing: '0.08em'
      }}>
        POPULAR
      </div>

      <h4 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '21px', 
        marginBottom: '12px',
        color: hovered ? 'var(--accent)' : 'var(--text)'
      }}>
        {title}
      </h4>

      <div style={{ 
        fontSize: '32px', 
        fontWeight: 700, 
        color: 'var(--accent)', 
        marginBottom: '20px',
        transition: 'all 0.3s'
      }}>
        {price || "Custom Pricing"}
      </div>

      <p style={{ 
        color: 'var(--text2)', 
        lineHeight: 1.75, 
        minHeight: '100px',
        marginBottom: '28px'
      }}>
        {desc || "Please fill description..."}
      </p>

      <a 
        href="#contact" 
        style={{
          display: 'inline-block',
          background: hovered ? 'var(--accent)' : 'transparent',
          color: hovered ? '#000' : 'var(--accent)',
          padding: '12px 28px',
          borderRadius: '8px',
          fontWeight: 600,
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--accent)'}`,
          transition: 'all 0.3s',
          width: '100%',
          textAlign: 'center'
        }}
      >
        Get This Package
      </a>
    </div>
  )
}

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    const subject = `New Project Inquiry from ${name} - Coginx Studio`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    // Opens user's default email client with pre-filled details
    window.location.href = `mailto:coginxstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    form.reset();
    alert("✅ Message ready! Opening your email client...");
  };

  return (
    <section id="contact" style={{ padding: '100px clamp(20px,5vw,80px)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionLabel>Contact Us</SectionLabel>
        
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(26px,4vw,40px)', 
          fontWeight: 800, 
          marginBottom: '24px',
          lineHeight: 1.1
        }}>
          Let's build something<br /> 
          <span style={{ color: 'var(--accent)' }}>extraordinary together</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px' }}>
          
          {/* Contact Info */}
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '20px', 
              marginBottom: '24px',
              color: 'var(--accent)'
            }}>
              Get in touch
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <a href="mailto:coginxstudio@gmail.com" style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text2)', textDecoration: 'none', fontSize: '15px'
              }}>
                ✉️ coginxstudio@gmail.com
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text2)', fontSize: '15px' }}>
                📍 Karachi, Pakistan
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '40px',
            height: 'fit-content'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                required
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px 16px', color: 'var(--text)', fontSize: '15px' }}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Business Email" 
                required
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px 16px', color: 'var(--text)', fontSize: '15px' }}
              />
              <textarea 
                name="message"
                placeholder="Tell us about your project..." 
                rows="5"
                required
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px 16px', color: 'var(--text)', fontSize: '15px', resize: 'vertical' }}
              />
              <button 
                type="submit"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'all 0.3s'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])
  const toggleTheme = () => setTheme(t => t==='dark'?'light':'dark')

  return (
    <>
      <GlobalStyles />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Services />
      {/* You can add Projects / Portfolio section later if needed */}
      <Contact />
    </>
  )
}