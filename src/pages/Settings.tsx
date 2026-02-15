import DashboardLayout from '@/components/DashboardLayout';
import { Bell, Globe, Lock, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your experience and privacy preferences.</p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</h3>
          {[
            { label: 'Session reminders', desc: 'Get notified before your sessions', enabled: true },
            { label: 'New messages', desc: 'Notifications for counselor messages', enabled: true },
            { label: 'Wellness tips', desc: 'Daily mental wellness reminders', enabled: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div><p className="font-medium text-foreground text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
              <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${item.enabled ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2"><Globe className="w-5 h-5 text-accent" /> Preferences</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Language</label>
              <select className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary transition-all appearance-none">
                <option>English</option>
                <option>Swahili</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Timezone</label>
              <select className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:ring-2 focus:ring-primary transition-all appearance-none">
                <option>Africa/Nairobi (EAT)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Security</h3>
          <button className="w-full text-left px-4 py-3 rounded-xl bg-secondary border border-border hover:bg-muted transition-colors text-sm">
            <span className="font-medium text-foreground">Change Password</span>
            <p className="text-xs text-muted-foreground mt-0.5">Update your account password</p>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl bg-secondary border border-border hover:bg-muted transition-colors text-sm">
            <span className="font-medium text-foreground">Download My Data</span>
            <p className="text-xs text-muted-foreground mt-0.5">Export all your session data</p>
          </button>
        </div>

        <div className="rounded-2xl p-8 border border-destructive/20 bg-destructive/5 space-y-4">
          <h3 className="font-display text-lg font-semibold text-destructive flex items-center gap-2"><Trash2 className="w-5 h-5" /> Danger Zone</h3>
          <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button className="px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold hover:opacity-90 transition-opacity text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
