import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function HostLobby() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 mb-20 font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

        {/* Room Identity Section */}
        <section className="md:col-span-12 lg:col-span-5 flex flex-col justify-center">
          <div className="mb-8">
            <span className="font-label-md text-[14px] font-semibold text-tertiary uppercase tracking-widest mb-4 block">Session Active</span>
            <h2 className="font-headline-xl text-[48px] font-bold text-on-surface mb-4">Engineering Ethics &amp; Fluid Dynamics</h2>
            <p className="font-body-lg text-[18px] text-on-surface-variant max-w-md">
              A collaborative environment designed for rigorous academic inquiry. Ensure all participants have entered the room code to proceed.
            </p>
          </div>

          <div className="bg-surface-container border border-outline-variant/30 p-8 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 0" }}>qr_code_2</span>
            </div>
            <p className="font-label-md text-[14px] font-semibold text-outline mb-2">ACCESS CODE</p>
            <div className="flex items-center gap-4">
              <span className="font-headline-xl text-[48px] font-bold text-primary tracking-[0.2em]">GX-8802</span>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors active:scale-90">content_copy</button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="font-label-sm text-[12px] font-medium uppercase">Encrypted Session Host</span>
            </div>
          </div>

          <div className="mt-12">
            <p className="font-headline-md text-[24px] font-semibold text-on-surface italic mb-8 opacity-80">"Ready to Engage."</p>
            <button
              onClick={() => navigate(`/battle/room/${roomId}`)}
              className="bg-primary text-on-primary px-12 py-4 font-label-md text-[14px] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              START EVALUATION
              <span className="material-symbols-outlined">play_arrow</span>
            </button>
          </div>
        </section>

        {/* Players Grid Section */}
        <section className="md:col-span-12 lg:col-span-7 mt-12 lg:mt-0">
          <div className="flex justify-between items-end mb-6 border-b border-outline-variant/20 pb-4">
            <div>
              <h3 className="font-headline-md text-[24px] font-semibold text-on-surface">Joined Participants</h3>
              <p className="font-label-sm text-[12px] font-medium text-outline">LIVE SYNC ENABLED</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-[24px] font-semibold text-secondary">4</span>
              <span className="font-label-md text-[14px] font-semibold text-on-surface-variant">/ 40</span>
            </div>
          </div>

          {/* Bento Style Grid for Players */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Player Card 1 */}
            <div className="bg-surface-container-low border border-outline-variant/30 p-4 relative group hover:bg-surface-container-high transition-colors rounded-lg">
              <img alt="Avatar" className="w-12 h-12 rounded mb-4 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJQ03GCBBd9Ky0bYDYk-eJkJkxvaHWeoYnLRfKiHPcNSn43C87Gjk4LQH2TgLEM-85kCudU1ko0rELEwoVhe3G89v6z6nQZJIjevfXHQzr7TZ2xJkGdLOyhWk1DkooEHpNdlo_hm_cUGxVeeOYIR18tJuYTQyf-njz94tBGgX8NgujNjpXcBhPV5AJJ6iKYgWJEC5iZzSfqXoNvVH70sTa2aqnHF17TpjKI9RTJTfgFCYG3Oa-6PXND6F6v9hCaBVQKvLsK25bLJo"/>
              <p className="font-label-md text-[14px] font-semibold text-on-surface truncate">Aryan Sharma</p>
              <div className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            </div>

            {/* Player Card 2 */}
            <div className="bg-surface-container-low border border-outline-variant/30 p-4 relative group hover:bg-surface-container-high transition-colors rounded-lg">
              <img alt="Avatar" className="w-12 h-12 rounded mb-4 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDanfFS2fiFMoDCwGZMjpJVIwqR2pthTagdVHit9Pv52KQUYaMtpi4GkAXf29vX3FYhDDWfGZyN9T4_esL74TZVfST9KI_rFzuT-QZ5scYaKocmut_w6HRWB9SnII9B1AEtlce-334hkJE5sDpD6OrjE1aqw1VXxYJA_0KH-2OYmNVy4q6J1ECe1bqPKZ6uFHy7ardjni-DwjVTzBfsY104m9_sJ-y9GgHapV0Tb6ItAxLtwLcm5kRLZhbSHDTgA_S4fDh9KWOTP18"/>
              <p className="font-label-md text-[14px] font-semibold text-on-surface truncate">Priya Verma</p>
            </div>

            {/* Player Card 3 */}
            <div className="bg-surface-container-low border border-outline-variant/30 p-4 relative group hover:bg-surface-container-high transition-colors rounded-lg">
              <img alt="Avatar" className="w-12 h-12 rounded mb-4 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG6d0yi_wVwrfJCsmXuI8Dvox_pKVweZ9yDXvpNwGWTWds_Z9IRZgms_C3w1jBlu34apNXQO3wZqejcI6hQj2TSdfBy1qa_GFKaWjS2ZLKOaoVoNBFOwD42Rhn25XkQcQIp8375aoepKKRAf_W_GGuV2W39tQSBDleNxIleKAlerTi-Stdd2jneSflF1DEMHYsEbdCGLWmymRR6V1kAsaKgq3aqRyPpa-IxZWmsOAv6yIK5b3hAndCXzKYdoAiR1ZJTV7jhdO6xGM"/>
              <p className="font-label-md text-[14px] font-semibold text-on-surface truncate">Ishan Kapur</p>
            </div>

            {/* Player Card 4 */}
            <div className="bg-surface-container-low border border-outline-variant/30 p-4 relative group hover:bg-surface-container-high transition-colors rounded-lg">
              <img alt="Avatar" className="w-12 h-12 rounded mb-4 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJKTql3ShnxxbYivZSKergDx-XNiVYsJitcn1aI_0O7a3teIHuCbPA2b1NjuhheCM0cnwUUfcLhHuezm8PtTW01P_JSHtFDH6BGH9WYEQyNgEgnG5tr63SQ1vgC-L7czJrq37SpS7dieCvCSrTIgLh3Qd5nGRapreRwnXlA6WQJCbNG86ERibiOG0MItsKbdJv8On5nUTfvKedNEBsEN9hUlpWTivz6zPdC-upuzqeBLFkOfEyqRmuq94J3rVIOLU88zct7CllDks"/>
              <p className="font-label-md text-[14px] font-semibold text-on-surface truncate">Rohan Mehra</p>
            </div>

            {/* Empty State / Waiting Card */}
            <div className="bg-surface-container-lowest border border-dashed border-outline-variant/40 p-4 flex flex-col items-center justify-center text-outline group hover:border-primary transition-colors rounded-lg min-h-[120px]">
              <span className="material-symbols-outlined text-3xl mb-2 animate-bounce">hourglass_empty</span>
              <p className="font-label-sm text-[12px] font-medium">WAITING...</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}