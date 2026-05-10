import React, { useState } from 'react';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container bg-background min-h-screen">

      {/* Header Section */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="font-headline-xl text-[48px] font-bold text-on-background mb-4">Academic Vanguard</h1>
          <p className="text-on-surface-variant font-body-lg text-[18px] max-w-2xl">The hall of fame for the university's most consistent scholars. Precision, persistence, and pursuit of Gnosis.</p>
        </div>
        <div className="text-right">
            <p className="font-label-md text-[14px] font-semibold text-secondary uppercase tracking-widest">Next Reset In</p>
            <p className="font-headline-md text-[24px] font-semibold text-on-surface">3d 14h</p>
        </div>
      </div>

      {/* Toggle & Top 3 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

        {/* Podium / Highlights Section */}
        <div className="lg:col-span-5 flex flex-col space-y-8 order-2 lg:order-1">
          {/* Toggle Tab */}
          <div className="flex p-1 bg-surface-container-high rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-8 py-2 font-label-md text-[14px] font-semibold rounded shadow-sm transition-colors ${activeTab === 'global' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Global
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-8 py-2 font-label-md text-[14px] font-semibold transition-colors rounded ${activeTab === 'friends' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Friends
            </button>
          </div>

          {/* Top 3 Podium (Visual Representation) */}
          <div className="relative flex items-end justify-center gap-4 pt-20 h-80">
            {/* Rank 2 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-4 group">
                <div className="w-20 h-20 rounded-full border-4 border-slate-400 overflow-hidden">
                  <img alt="Silver Medalist" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2NGAs6lTLJ0hdJqQzgLBkM2HDYRa34Z5TD6PUgyV8eyARiIVtZfmhrpPS7gX_tmtlaNQjZssJwNNzqDwgRs5XRX8rMl5-JZHfz4RIvUPN7FLG5Hn9MfEf_c3-qIItTmcTuyHruLxrUhB9_FPNhuzmlDMnXuJeyZS4JvQFdsiYDKLR6B9qB5ZSQrdi2c3cjFxBXRzZEHmD-6aL8yTtLWSG9h6N4fJhmtn26sN_kx0erc4P75KnI20WVVC5BKq5_6KmkaBLcCVCIUc"/>
                </div>
                <div className="absolute -top-3 -right-3 bg-slate-400 text-on-primary px-2 py-1 rounded text-[10px] font-bold">#2</div>
              </div>
              <div className="bg-surface-container-high border-t border-slate-400/50 w-full pt-4 pb-8 flex flex-col items-center rounded-t-lg">
                <span className="font-label-md text-[14px] font-semibold text-on-surface">Arjun K.</span>
                <span className="text-secondary font-label-sm text-[12px] font-medium">4,820 XP</span>
              </div>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="flex flex-col items-center flex-1 -mb-4">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-primary overflow-hidden shadow-[0_0_20px_rgba(244,162,97,0.3)]">
                  <img alt="Gold Medalist" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUXnZQUIrPKB5AIrBp3z_c2Hcw1T8P5kx7DePbku2rvn8SXSEUiLdFvGIcpWHXbGExQvOtEXdxAuE-PRw9Xuwi5iGPi6EABSqxne2eCd-36aF399K_mPafZ0EiLsolZMxrypw84kLAxivmf4mngP1E47WFIMMoHpwr0pSFgDg3XqxOWkYLhyEjX8GzWClLNl1Nn6vqAuTwDoeTz7LvMaPdd9oa4qHIaqZTeB32ntF9liMHbmkOJcgLXKG53XID0k_Fny-ttKIAqrY"/>
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-3 py-1 rounded text-xs font-bold ring-2 ring-background">#1</div>
              </div>
              <div className="bg-surface-container-highest border-t border-primary/50 w-full pt-6 pb-12 flex flex-col items-center rounded-t-lg shadow-xl">
                <span className="font-headline-md text-[24px] font-semibold text-on-surface">Priya S.</span>
                <span className="text-primary font-label-md text-[14px] font-semibold mt-1">5,100 XP</span>
                <div className="mt-2 flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  <span className="text-label-sm text-[12px] font-medium">42 Day Streak</span>
                </div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full border-4 border-[#cd7f32] overflow-hidden">
                  <img alt="Bronze Medalist" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBti_F3PY4e2dUoUghjItNhpw5OA7VVXi2rW-1R8PDAazZPGrPBTU2uh1uAbtYHBLRrtDFrC6RxP3ChaE8QSliwSU8qIDxbm2guBqzid4-5bfbrZUiXENl3CAJlysjSl-i4WIgo3aBNwKaeFi-aQ6myQR450NcPyRxgtNwsudupC66P5DLscORIG1nwr3yJw6G-Hzgv2DKxlia0UFxohjj1rS95QmDSi0HpzQI8Ae5sO7RE-4Go396B3eDYgEsAD9RsruTlfvBX1o8"/>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#cd7f32] text-white px-2 py-1 rounded text-[10px] font-bold">#3</div>
              </div>
              <div className="bg-surface-container-high border-t border-[#cd7f32]/50 w-full pt-4 pb-6 flex flex-col items-center rounded-t-lg">
                <span className="font-label-md text-[14px] font-semibold text-on-surface">Rohan M.</span>
                <span className="text-secondary font-label-sm text-[12px] font-medium">4,650 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/20 flex justify-between items-center">
              <h3 className="font-label-md text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest">Global Standings</h3>
              <span className="text-label-sm text-[12px] font-medium text-outline">Updated 2m ago</span>
            </div>
            <div className="custom-scrollbar overflow-y-auto max-h-[600px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-on-surface-variant border-b border-outline-variant/10">
                    <th className="px-6 py-4 font-label-sm text-[12px] font-medium">RANK</th>
                    <th className="px-6 py-4 font-label-sm text-[12px] font-medium">SCHOLAR</th>
                    <th className="px-6 py-4 font-label-sm text-[12px] font-medium text-right">STREAK</th>
                    <th className="px-6 py-4 font-label-sm text-[12px] font-medium text-right">TOTAL XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <tr className="hover:bg-surface-variant/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-on-surface-variant">#4</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="User" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxw37xyAsA-lI9K4RUn5sLNPJEO0J0rqdnQM3w3BDfRCWJoYpZjqei1iKknNXo1LuJaF2cy2W4_QJPZCcSDyfkGlQ7l1tkfWRq6tII4dfDBx1mWe3A46anXSia9dAoPFZ6obYbqR443Dr5CGAybOKaABM0CFjY1-Zw3lgoMF1O8y8BnWM9KXN856-GY62dkT7-tv3KA46SoY6acQRVaJgeYGZxVU-lLuTT1JPs2sY3a2XWMFFiFBo_O5nOB2jPsPYevefSMeDz8z0"/>
                        <span className="font-label-md text-[14px] font-semibold text-on-surface">Siddharth V.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-tertiary">15</td>
                    <td className="px-6 py-4 text-right font-bold text-secondary">4,420</td>
                  </tr>

                  {/* Current User Row */}
                  <tr className="bg-primary/10 border-l-4 border-primary">
                    <td className="px-6 py-4 font-bold text-primary">#5</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">YOU</div>
                        <span className="font-label-md text-[14px] font-semibold text-primary">Ishan Sharma</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-tertiary font-bold">28</td>
                    <td className="px-6 py-4 text-right font-bold text-secondary">4,250</td>
                  </tr>

                  <tr className="hover:bg-surface-variant/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-on-surface-variant">#6</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="User" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnwMCABeNGEdVjCTVL9kLQ_8jW-KhuSwu08NunBOlHiGPySMSf_QOnrX3k4mvD--z5nbDKaaHW1ABMnNpsfGam8EVUhcojJf2WWR-D7fIpuZnZSfCOraYYhvSqswPPHsbz1kaQVGVqovQwBiKl1GF1ch__EsHwIQ3E1YY0JcKn6PWuRSToCBy_3O-oUr1i2m9jvc6HuSh_JHDwktCnPpFCtUN6Mjb0SI9ImJKWiG2EMxQ8aJAH9jfcVh3rI3Ve6ZQotzDj7qhDQUc"/>
                        <span className="font-label-md text-[14px] font-semibold text-on-surface">Ananya D.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-tertiary">31</td>
                    <td className="px-6 py-4 text-right font-bold text-secondary">4,110</td>
                  </tr>

                  <tr className="hover:bg-surface-variant/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-on-surface-variant">#7</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="User" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALf3s7xEDur962joFdtJ464jQ7MYDFD0veKshJcGY_dhXfGNGowP08GmNcv-Iy_OH9KuhmtjgWQdYky_0erqFYUA6roLVj88iqX-TWM9hR5IDwEFAYWs1anHi5JjdOUY509Xe9ODhaxN1TX_29HnZpOiDTq5y98sMwle24aZ2R0WomrhzJdpKEC3JTaDKm4nn7GTy2iOjQq0akyReGOTJ8xhwo1Q-OrtSTf9BCR6zzriQAxX7z6zcTYHfyUMW3qfoZ8GHAjY3KcDc"/>
                        <span className="font-label-md text-[14px] font-semibold text-on-surface">Vikram R.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-tertiary">12</td>
                    <td className="px-6 py-4 text-right font-bold text-secondary">3,980</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}