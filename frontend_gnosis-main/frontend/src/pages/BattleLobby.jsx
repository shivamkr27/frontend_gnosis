import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function BattleLobby() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1v1');

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 selection:bg-primary-container selection:text-on-primary-container font-body-md text-on-surface">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 flex flex-col gap-10">
          <section>
            <h1 className="font-headline-xl text-[48px] leading-[1.2] font-bold mb-2 font-headline-xl">Arena</h1>
            <p className="text-on-surface-variant text-[18px] mb-8">Test your engineering prowess in real-time mental combat.</p>

            <div className="flex border-b border-outline-variant/20 mb-8">
              <button
                onClick={() => setActiveTab('1v1')}
                className={`px-8 py-4 font-label-md text-label-md tracking-wider transition-all ${activeTab === '1v1' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary'}`}
              >
                1V1 CHALLENGE
              </button>
              <button
                onClick={() => setActiveTab('group')}
                className={`px-8 py-4 font-label-md text-label-md tracking-wider transition-all ${activeTab === 'group' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary'}`}
              >
                GROUP QUIZ
              </button>
            </div>

            {activeTab === '1v1' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-6 bg-surface-container border-l-4 border-primary hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" alt="Arya Sharma" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3900Fg6CwuvUlIL9MkbmLZkLvUNWBRwlLXnawim6PPeu7bvINo6IUq_IAzx9gyNvFNviTT8zOJSFvGUKL6u4ZQj3J7gL_ImP2eFgFSTCxaEO9x0xA1-E_EigJfaNNzKptrPGjWBuQaI_IMLXKR9c0Bds_6yL4Auuh3N1-rcb7udN7OuufdkH_SYgBIYcX4h3AcyDJlNcSVRU6wUkHKlsiy9VEXHfjLb48--AMTsmFU5y1JUsBNFAxSzmKs9sqRS096rXyPX68Hd4"/>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary border-2 border-surface-container rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-label-md text-on-surface">Arya Sharma</h3>
                      <span className="text-[12px] text-secondary uppercase font-bold tracking-widest">Online</span>
                    </div>
                  </div>
                  <button onClick={() => navigate('/battle/waiting/f1')} className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-md transition-all active:scale-95">CHALLENGE</button>
                </div>

                <div className="flex items-center justify-between p-6 bg-surface-container border-l-4 border-outline-variant hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" alt="Kartik Varma" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN2TjrEREOJojPRC52t05JA7yi9CgAD3VLsaVBcfdkge6MTE6X1_GbCUB6Xvd1EZf4UsiccX-rH_vlgflkG5roFdtOuBJdbiiIZ2WJVM49XStloiw9hMWt5MJxw8zPPE9nE9dlKkUmM7e4FDOPOYXPUkzI3PCd-qaBXmudZ3mdpWiIwGKH6W--cgqrzEYA8uUexKkEPAcI9ZYt35-4ReQYyhGxSkIihNXLltpDW4hG38JKnTWvAjt_IKFaeEWys0pHPLaRoA-wOx0"/>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary border-2 border-surface-container rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-label-md text-on-surface">Kartik Varma</h3>
                      <span className="text-[12px] text-secondary uppercase font-bold tracking-widest">Online</span>
                    </div>
                  </div>
                  <button onClick={() => navigate('/battle/waiting/f2')} className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-md transition-all active:scale-95">CHALLENGE</button>
                </div>

                <div className="flex items-center justify-between p-6 bg-surface-container/50 border-l-4 border-transparent opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" alt="Meera Lal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVh-Cwqlo1deJxLgX_aLPJVXN4jBOg1g_4qCa_ozLKFh7wPnm6d6byYTruVsSsx1Xqp3O2C_SUZdiAtKuDRqouXwAlnmEenZMwKHzQq7DOxkGYwwe7GKZTP8qAdmnABamcZ1EScMhUVOm5Ijn1Lr5xtUc0Tn8Wd2Rc4N76ov1KmF15QPSb-P9LUsWRSGQHBMlWIF-l5bqF40etHAjt-BUVIHzPzMWugZJiV0wXYDkbWWj4xXEWMMGW7JNSTbujCEXdrRv-XzV8VtU"/>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-outline-variant border-2 border-surface-container rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-label-md text-on-surface">Meera Lal</h3>
                      <span className="text-[12px] text-on-surface-variant uppercase font-bold tracking-widest">Offline</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 border border-outline-variant text-outline-variant cursor-not-allowed font-label-md">CHALLENGE</button>
                </div>
              </div>
            )}

            {activeTab === 'group' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="p-8 bg-surface-container-high border border-outline-variant/30 flex flex-col items-center text-center gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full">
                    <span className="material-symbols-outlined text-primary text-[32px]">groups</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md mb-2">Create Room</h3>
                    <p className="text-label-sm text-on-surface-variant">Host a custom quiz for your study group.</p>
                  </div>
                  <button onClick={() => navigate('/battle/host')} className="w-full py-4 bg-primary text-on-primary font-label-md active:scale-95 transition-all">START HOSTING</button>
                </div>
                <div className="p-8 bg-surface-container-high border border-outline-variant/30 flex flex-col items-center text-center gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-secondary/10 rounded-full">
                    <span className="material-symbols-outlined text-secondary text-[32px]">key</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md mb-2">Join with Code</h3>
                    <p className="text-label-sm text-on-surface-variant">Enter a private lobby code to join a session.</p>
                  </div>
                  <button onClick={() => navigate('/battle/join/enter-code')} className="w-full py-4 border border-secondary text-secondary hover:bg-secondary/10 font-label-md active:scale-95 transition-all">ENTER CODE</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
