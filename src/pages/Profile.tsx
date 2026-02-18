import DashboardLayout from '@/components/DashboardLayout';
import { User, Mail, Phone, Shield, Camera, Save } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
const baseUrl = 'https://jaliconnect-backend.onrender.com';
  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const decoded = jwtDecode<any>(token);
      const userId = decoded.userInfo.user_id;

      const res = await axios.get(`${baseUrl}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      console.log("Fetched user:", res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchUser();
}, []);


  useEffect(() => {
  console.log("Updated user:", user);
}, [user]);


  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and privacy.</p>
        </div>

        <div className="glass-card rounded-2xl p-8 flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center text-primary font-bold text-2xl">
              A
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Anonymous User</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><Shield className="w-3 h-3" /> Your identity is protected</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6">
          <h3 className="font-display text-lg font-semibold text-foreground">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={user?.username || "anon_user_2847"} className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={user?.email || "user@example.com"} className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Phone (optional)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input placeholder="+254 7XX XXX XXX" className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Age Range</label>
              <select value={user?.age_group || ""} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary transition-all appearance-none">
                <option>13-17</option>
                <option>18-24</option>
                <option>25-30</option>
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow-sage hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Privacy & Security</h3>
          {[
            { label: 'Anonymous mode', desc: 'Hide your real identity from counselors', enabled: true },
            { label: 'End-to-end encryption', desc: 'All messages are encrypted', enabled: true },
            { label: 'Two-factor auth', desc: 'Add extra security to your account', enabled: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${item.enabled ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
