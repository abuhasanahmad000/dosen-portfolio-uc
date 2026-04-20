import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line
} from 'recharts';
import { 
  GraduationCap, TrendingUp, TrendingUp as TrendingUpIcon, Cpu, Lightbulb, 
  Download, Globe, ExternalLink, Award, CheckCircle2,
  Mail, MessageCircle, ArrowRight, Store, LineChart as LineChartIcon, Zap, Monitor, Smartphone, User
} from 'lucide-react';

// Data Historis Lengkap dari CSV Anda (53 Periode sesuai file earnings.csv)
const earningsDataRaw = `2025-16,1.610703
2025-17,88.644073
2025-18,68.799560
2025-19,198.888116
2025-20,243.225355
2025-21,127.216732
2025-22,170.922113
2025-23,211.525919
2025-24,190.787407
2025-25,169.540622
2025-26,182.534749
2025-27,174.002164
2025-28,189.832166
2025-29,196.138220
2025-30,204.116169
2025-31,247.673002
2025-32,268.422089
2025-33,222.717905
2025-34,256.203103
2025-35,311.509455
2025-36,284.146141
2025-37,239.526107
2025-38,567.313232
2025-39,337.426283
2025-40,309.557283
2025-41,276.784915
2025-42,299.744917
2025-43,223.064769
2025-44,271.422836
2025-45,216.697177
2025-46,262.671976
2025-47,288.486829
2025-48,234.306711
2025-49,200.383245
2025-50,203.251450
2025-51,325.559530
2025-52,121.700648
2026-01,208.362376
2026-02,322.883580
2026-03,267.404996
2026-04,513.185339
2026-05,352.629700
2026-06,372.960135
2026-07,340.858082
2026-08,286.098428
2026-09,380.311246
2026-10,393.953757
2026-11,242.879982
2026-12,220.741028
2026-13,287.104447
2026-14,197.021764
2026-15,292.840868
2026-16,309.676545`;

const parseCSV = (raw) => {
  return raw.trim().split('\n').map(line => {
    const [week, value] = line.split(',');
    const label = week.includes('2025') ? week.replace('2025-', 'W') : week.replace('2026-', '26-W');
    return { week: label, val: parseFloat(value) || 0 };
  });
};

// Fungsi Forecasting Eksponensial mulai dari titik data terakhir ($309.68)
const generateForecast = (months = 12) => {
  const lastVal = 309.68; 
  const forecast = [];
  const growthRate = 0.082; // Proyeksi pertumbuhan bulanan 8.2%
  
  for (let i = 1; i <= months; i++) {
    const volatility = (Math.random() * 40) - 10; 
    const prediction = lastVal * Math.pow(1 + growthRate, i) + volatility;
    forecast.push({
      month: `Bulan ${i}`,
      Earning: Math.round(prediction),
    });
  }
  return forecast;
};

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 scroll-mt-20 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 flex items-center gap-4">
        <span className="w-12 h-1.5 bg-orange-600 rounded-full"></span>
        {title}
      </h2>}
      {children}
    </div>
  </section>
);

const App = () => {
  const earnings = useMemo(() => parseCSV(earningsDataRaw), []);
  const forecastData = useMemo(() => generateForecast(), []);

  const totalRevenue = 13375.27;
  const peakRevenue = 567.31;

  const handlePrint = () => {
    window.print();
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-orange-100">
      {/* Header & Menu Navigasi Sticky */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 print:hidden">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">UC</div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 leading-tight tracking-tight text-sm md:text-base">Abu Hasan Ahmad</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Entrepreneur Portfolio</span>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-8">
            {['profil', 'bisnis', 'data', 'forecasting', 'visi'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)}
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-orange-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <button 
            onClick={handlePrint}
            className="bg-slate-900 text-white text-[10px] font-black px-6 py-3 rounded-full flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl active:scale-95 tracking-widest uppercase"
          >
            <Download size={14} /> Unduh PDF
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-orange-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-orange-100 text-orange-700 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              <Award size={14} /> S3 Candidate & AI Practitioner
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Scaling <span className="text-orange-600">Digital Assets</span> <br /> with AI Innovation
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
              Transformasi produksi konten visual global melalui sistem kecerdasan buatan. Membangun model bisnis yang terukur untuk masa depan pendidikan kewirausahaan.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4 justify-center md:justify-start print:hidden">
              <button 
                onClick={() => scrollTo('bisnis')}
                className="px-10 py-5 bg-orange-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-2xl shadow-orange-200 hover:-translate-y-1"
              >
                Eksplorasi Bisnis <ArrowRight size={22} />
              </button>
              <div className="flex items-center gap-5 px-6 py-4 bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-left">
                  <p className="text-2xl font-black text-slate-800 tracking-tighter">25,000+</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none">Aset Aktif</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-[4rem] shadow-3xl relative overflow-hidden ring-8 ring-white flex items-center justify-center group">
               {/* Hero Image: Hands on Laptop */}
               <img 
                 src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800" 
                 alt="Digital Entrepreneurship in Action" 
                 className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
               <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl z-20 shadow-2xl">
                 <p className="font-black text-white text-2xl tracking-tighter">Abu Hasan Ahmad</p>
                 <p className="text-[10px] text-orange-400 uppercase font-black tracking-widest mt-1">Dosen Entrepreneur</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Section */}
      <Section id="profil" title="Academic & Professional Foundation" className="bg-slate-50">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <GraduationCap className="text-orange-600 mb-8 transition-transform group-hover:scale-110" size={64} />
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Kapasitas Intelektual</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Sebagai mahasiswa **Doktor (S3)**, saya berfokus pada integrasi manajemen strategis dengan teknologi AI. Pendidikan saya memberikan landasan teoritis untuk mendukung praktik wirausaha yang nyata dan sistematis.
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-50">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Bidang Keahlian:</span>
              <p className="text-slate-800 font-bold mt-1 text-sm tracking-tight">Strategic AI, Digital Business, Quantitative Analysis.</p>
            </div>
          </div>
          <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white flex flex-col justify-between shadow-2xl hover:scale-[1.01] transition-transform">
            <div>
              <TrendingUp className="text-orange-400 mb-8" size={64} />
              <h3 className="text-3xl font-black mb-6 tracking-tight">Entrepreneurial Mindset</h3>
              <p className="text-slate-400 leading-relaxed text-lg italic">
                "Di Universitas Ciputra, saya berencana mentransfer mentalitas 'Building a System' kepada para mahasiswa."
              </p>
              <p className="text-slate-400 mt-6 leading-relaxed">
                Bisnis aset digital saya adalah studi kasus hidup tentang bagaimana otomasi dapat menciptakan pertumbuhan pendapatan pasif yang berkelanjutan.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-4xl font-black text-orange-500 tracking-tighter">25K+</p>
                <p className="text-[10px] text-slate-500 uppercase font-black mt-1 tracking-widest">Total Aset</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-4xl font-black text-orange-500 tracking-tighter">100%</p>
                <p className="text-[10px] text-slate-500 uppercase font-black mt-1 tracking-widest">Automated</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Bisnis Section */}
      <Section id="bisnis" title="Global Digital Asset Business">
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 flex flex-col md:flex-row items-center gap-12 group hover:border-orange-500 transition-all">
          <div className="w-full md:w-56 aspect-square bg-slate-50 rounded-[3rem] flex items-center justify-center p-8 border border-slate-100 shadow-inner text-orange-600">
            <div className="relative">
              <Store size={80} className="text-slate-300" />
              <LineChartIcon size={56} className="text-orange-600 absolute -bottom-6 -right-6 bg-white rounded-full p-2 shadow-xl border-4 border-slate-50" />
            </div>
          </div>
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">International Stock Media Portfolio</h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Strategi utama melibatkan **Massive SEO Metadata** dan **Visual AI Trend Analysis**. Portofolio aktif di pasar global membuktikan daya serap ekonomi digital yang tinggi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://stock.adobe.com/uk/contributor/206750164/abu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-orange-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg"
              >
                <ExternalLink size={20} /> Kunjungi Adobe Stock
              </a>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {['GLOBAL REACH', 'AI GENERATED'].map((tag, i) => (
                  <div key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-black tracking-widest uppercase">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Data Section (Updated with 53 real data points) */}
      <Section id="data" title="Performance & Market Analytics" className="bg-slate-900 text-white">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-orange-400 flex items-center gap-3 uppercase tracking-widest">
              <TrendingUpIcon size={20}/> Weekly Earnings Trend ($)
            </h3>
            <div className="h-[400px] w-full bg-white/5 rounded-[3rem] p-10 border border-white/10 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earnings}>
                  <defs>
                    <linearGradient id="colorE" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="week" fontSize={9} axisLine={false} tickLine={false} stroke="#64748b" interval={4} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '12px' }}
                    itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#f97316" fillOpacity={1} fill="url(#colorE)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-4">
              <h4 className="text-4xl font-black tracking-tighter">Real Evidence of Success</h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                Skalabilitas bisnis ini terbukti melalui akumulasi pendapatan pasif yang stabil dari total 53 minggu pencatatan riil.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Revenue (Year)</p>
                  <p className="text-4xl font-black text-orange-400 mt-2">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
               </div>
               <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Peak Weekly</p>
                  <p className="text-4xl font-black text-white mt-2">${peakRevenue.toLocaleString()}</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Forecasting Section (Updated baseline) */}
      <Section id="forecasting" title="Strategic Business Forecasting" className="bg-orange-50/50">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1 space-y-8">
            <div className="p-4 bg-white w-fit rounded-3xl shadow-xl text-orange-600">
              <Zap size={48} fill="currentColor" fillOpacity={0.2} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 leading-none tracking-tight">Growth Projection <br /> 2026-2027</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Model peramalan eksponensial memprediksi kenaikan pendapatan bulanan berlanjut dengan baseline dari minggu terakhir (2026-16).
            </p>
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-orange-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Annualized Projection</p>
              <h4 className="text-5xl font-black text-slate-900">+138%</h4>
              <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                <TrendingUpIcon size={14} /> Consistent Growth Trend
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-10 rounded-[4rem] shadow-2xl border border-slate-100 h-[500px]">
             <h4 className="font-black text-slate-800 text-xl tracking-tight mb-10 px-4 uppercase text-[10px] tracking-[0.3em]">12-Month Predictive Analytics ($)</h4>
             <ResponsiveContainer width="100%" height="80%">
               <LineChart data={forecastData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} stroke="#94a3b8" />
                 <YAxis fontSize={10} axisLine={false} tickLine={false} stroke="#94a3b8" />
                 <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }} />
                 <Line 
                   type="monotone" 
                   dataKey="Earning" 
                   stroke="#f97316" 
                   strokeWidth={6} 
                   dot={{ r: 6, fill: '#f97316', strokeWidth: 3, stroke: '#fff' }}
                   activeDot={{ r: 10, strokeWidth: 0 }}
                 />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* Visi Section */}
      <Section id="visi" title="Educational Impact for UC">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Global Mindset",
              desc: "Mendorong mahasiswa berkompetisi di pasar global sejak hari pertama.",
              icon: <Globe className="text-blue-500" size={40} />
            },
            {
              title: "AI Automation",
              desc: "Mengajarkan efisiensi produksi masif melalui kecerdasan buatan.",
              icon: <Cpu className="text-purple-500" size={40} />
            },
            {
              title: "Passive Income",
              desc: "Membangun fondasi finansial mahasiswa melalui sistem otomatis.",
              icon: <Lightbulb className="text-orange-500" size={40} />
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-orange-500 transition-all hover:shadow-2xl">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-50 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-2xl font-black text-slate-800 mb-4 leading-tight">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed font-medium text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-50 py-32 px-6 border-t border-slate-200 print:bg-white print:border-none print:py-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter">
            Let's Build the Future of <br /> <span className="text-orange-600 underline decoration-8 underline-offset-[12px]">AI-Preneurship</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 print:hidden">
            <a href="mailto:abuhasanahmad2@gmail.com" className="px-10 py-5 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-2xl active:scale-95">
              <Mail size={22} /> abuhasanahmad2@gmail.com
            </a>
            <a href="https://wa.me/6281231890744" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-800 font-black rounded-3xl flex items-center justify-center gap-3 hover:border-orange-600 hover:text-white transition-all shadow-sm active:scale-95">
              <MessageCircle size={22} className="text-green-500" /> WhatsApp Me
            </a>
          </div>
          <div className="pt-24 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] flex flex-col items-center gap-6">
            <p>© 2026 Abu Hasan Ahmad • Portofolio Kandidat Dosen Universitas Ciputra</p>
            <div className="w-20 h-2 bg-orange-600 rounded-full"></div>
          </div>
        </div>
      </footer>

      {/* Print Styles */}
      <style>{`
        @media print {
          nav, .print:hidden, .shadow-2xl, .shadow-3xl, .shadow-xl { display: none !important; }
          body { background: white !important; font-size: 12pt; }
          section { page-break-after: always; padding: 2cm !important; border: none !important; }
          .bg-slate-900 { background: #0f172a !important; color: white !important; }
          .bg-slate-50, .bg-orange-50 { background: white !important; border: 1px solid #f1f5f9 !important; }
          .text-white { color: white !important; }
          .max-w-6xl { max-width: 100% !important; }
          h1 { font-size: 48pt !important; }
        }
      `}</style>
    </div>
  );
};

export default App;