import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, MessageCircle, Users, Star, Clock, CheckCircle, AlertTriangle, ArrowRight, Video } from 'lucide-react';

const todaySessions = [
  { id: 1, user: 'Anon #2847', time: '10:00 AM', type: 'Video', status: 'completed', mood: '😊' },
  { id: 2, user: 'Anon #1923', time: '11:30 AM', type: 'Chat', status: 'completed', mood: '😐' },
  { id: 3, user: 'Anon #4102', time: '2:00 PM', type: 'Video', status: 'upcoming', mood: null },
  { id: 4, user: 'Anon #3561', time: '3:30 PM', type: 'Audio', status: 'upcoming', mood: null },
];

export default function CounselorDashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Counselor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Sarah. Here's your overview for today.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Today's Sessions", value: '6', icon: Calendar, color: 'bg-primary/10 text-primary' },
            { label: 'Active Clients', value: '24', icon: Users, color: 'bg-accent/10 text-accent' },
            { label: 'Messages', value: '12', icon: MessageCircle, color: 'bg-warm/10 text-warm' },
            { label: 'Avg Rating', value: '4.9', icon: Star, color: 'bg-lavender/10 text-lavender' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-semibold text-foreground">Today's Schedule</h3>
            <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="space-y-3">
            {todaySessions.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    {s.mood || <Clock className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{s.user}</p>
                    <p className="text-xs text-muted-foreground">{s.type} Session</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-foreground font-medium">{s.time}</span>
                  {s.status === 'completed' ? (
                    <span className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Done</span>
                  ) : (
                    <button className="flex items-center gap-1 text-xs text-primary-foreground bg-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/90 transition-colors">
                      <Video className="w-3 h-3" /> Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6 border border-warm/20 bg-warm/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-warm/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-warm" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">2 clients flagged for follow-up</h3>
              <p className="text-sm text-muted-foreground">Based on recent session notes, these clients may need additional support or referral.</p>
              <button className="mt-3 text-sm text-primary font-medium hover:underline flex items-center gap-1">
                Review Now <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
