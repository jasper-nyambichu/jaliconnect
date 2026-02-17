import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, MessageCircle, Users, Star, Clock, CheckCircle, AlertTriangle, ArrowRight, Video, TrendingUp, Activity, ChevronRight, Mic, BarChart3, Heart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const todaySessions = [
  { id: 1, user: 'Anon #2847', time: '10:00 AM', duration: '45 min', type: 'Video', status: 'completed', mood: '😊', moodLabel: 'Positive', notes: 'Good progress on anxiety coping' },
  { id: 2, user: 'Anon #1923', time: '11:30 AM', duration: '30 min', type: 'Chat', status: 'completed', mood: '😐', moodLabel: 'Neutral', notes: 'Introduced CBT techniques' },
  { id: 3, user: 'Anon #4102', time: '2:00 PM', duration: '45 min', type: 'Video', status: 'in-progress', mood: null, moodLabel: null, notes: 'Follow-up: stress management' },
  { id: 4, user: 'Anon #3561', time: '3:30 PM', duration: '60 min', type: 'Audio', status: 'upcoming', mood: null, moodLabel: null, notes: 'Initial assessment session' },
  { id: 5, user: 'Anon #7829', time: '5:00 PM', duration: '45 min', type: 'Video', status: 'upcoming', mood: null, moodLabel: null, notes: 'Bi-weekly check-in' },
];

const weeklyMoods = [
  { day: 'Mon', positive: 5, neutral: 2, concern: 1 },
  { day: 'Tue', positive: 3, neutral: 3, concern: 2 },
  { day: 'Wed', positive: 6, neutral: 1, concern: 0 },
  { day: 'Thu', positive: 4, neutral: 2, concern: 1 },
  { day: 'Fri', positive: 3, neutral: 1, concern: 0 },
];

const flaggedClients = [
  { id: 'Anon #1923', reason: 'Declining mood trend over 3 sessions', urgency: 'medium' },
  { id: 'Anon #5541', reason: 'Missed last 2 scheduled sessions', urgency: 'high' },
];

const recentMessages = [
  { from: 'Anon #2847', preview: 'Thank you for the breathing exercises...', time: '9:42 AM', unread: true },
  { from: 'Anon #7829', preview: 'Can we reschedule to Thursday?', time: 'Yesterday', unread: true },
  { from: 'Anon #4102', preview: 'The journal prompts have been helpful', time: 'Yesterday', unread: false },
];

export default function CounselorDashboard() {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const maxBar = Math.max(...weeklyMoods.map(d => d.positive + d.neutral + d.concern));

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Greeting strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Good morning, Dr.&nbsp;Sarah</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-green/15 text-green border border-green/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-soft" /> Available
            </span>
            <button className="text-xs font-medium px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:bg-secondary transition-colors">
              Set Away
            </button>
          </div>
        </div>

        {/* Stat cards – asymmetric widths for visual interest */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Sessions Today', value: '5', sub: '3 remaining', icon: Calendar, accent: 'bg-primary/8 text-primary border-primary/12' },
            { label: 'Active Clients', value: '24', sub: '+2 this week', icon: Users, accent: 'bg-accent/8 text-accent border-accent/12' },
            { label: 'Unread Messages', value: '4', sub: '2 urgent', icon: MessageCircle, accent: 'bg-teal-light/15 text-teal-dark border-teal-light/20' },
            { label: 'Client Satisfaction', value: '4.9', sub: 'from 18 reviews', icon: Star, accent: 'bg-orange-light/15 text-orange border-orange-light/20' },
          ].map((stat, i) => (
            <div key={i} className="group relative rounded-2xl border border-border bg-card p-5 hover:shadow-soft transition-all duration-300 overflow-hidden">
              {/* Subtle corner accent */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-primary/[0.04] group-hover:bg-primary/[0.07] transition-colors" />
              <div className={cn("w-9 h-9 rounded-xl border flex items-center justify-center mb-3", stat.accent)}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-[11px] text-muted-foreground">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main content grid: 2-column on desktop */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-5">
          {/* Left column */}
          <div className="space-y-5">
            {/* Schedule card */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-base font-semibold text-foreground">Schedule</h2>
                  <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                    <button onClick={() => setActiveTab('today')} className={cn("px-3 py-1 font-medium transition-colors", activeTab === 'today' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary')}>Today</button>
                    <button onClick={() => setActiveTab('week')} className={cn("px-3 py-1 font-medium transition-colors", activeTab === 'week' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary')}>This Week</button>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block">{todaySessions.filter(s => s.status === 'completed').length}/{todaySessions.length} completed</span>
              </div>

              {/* Timeline-style sessions */}
              <div className="px-5 pb-5">
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />

                  <div className="space-y-1">
                    {todaySessions.map((s, idx) => (
                      <div key={s.id} className={cn(
                        "relative flex items-center gap-4 py-3 px-3 rounded-xl transition-all duration-200",
                        s.status === 'in-progress' && "bg-primary/[0.05] border border-primary/15",
                        s.status !== 'in-progress' && "hover:bg-secondary/60"
                      )}>
                        {/* Timeline dot */}
                        <div className={cn(
                          "relative z-10 w-[10px] h-[10px] rounded-full border-2 shrink-0",
                          s.status === 'completed' && "bg-primary border-primary",
                          s.status === 'in-progress' && "bg-accent border-accent animate-pulse-soft",
                          s.status === 'upcoming' && "bg-card border-muted-foreground/30",
                        )} />

                        <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{s.user}</span>
                              {s.mood && <span className="text-sm">{s.mood}</span>}
                              {s.status === 'in-progress' && (
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded">Live</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.notes}</p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right hidden sm:block">
                              <p className="text-sm font-medium text-foreground">{s.time}</p>
                              <p className="text-[11px] text-muted-foreground">{s.duration} · {s.type}</p>
                            </div>
                            {s.status === 'completed' ? (
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-primary" />
                              </div>
                            ) : s.status === 'in-progress' ? (
                              <button className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground bg-accent px-3 py-2 rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
                                <Video className="w-3.5 h-3.5" /> Rejoin
                              </button>
                            ) : (
                              <button className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground bg-primary px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                {s.type === 'Audio' ? <Mic className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />} Join
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mood analytics */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <h2 className="font-display text-base font-semibold text-foreground">Client Mood Trends</h2>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Positive</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/40" /> Neutral</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> Concern</span>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyMoods.map((d, i) => {
                  const total = d.positive + d.neutral + d.concern;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full max-w-[40px] flex flex-col gap-[2px] rounded-lg overflow-hidden" style={{ height: `${(total / maxBar) * 100}%`, minHeight: 12 }}>
                        <div className="bg-primary rounded-t" style={{ flex: d.positive }} />
                        <div className="bg-muted-foreground/25" style={{ flex: d.neutral }} />
                        {d.concern > 0 && <div className="bg-accent rounded-b" style={{ flex: d.concern }} />}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-medium">{d.day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green" />
                  <span className="text-xs text-muted-foreground">Overall mood trending <span className="font-semibold text-green">positive</span> this week</span>
                </div>
                <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  Full Report <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar column */}
          <div className="space-y-5">
            {/* Flagged clients – prominent alert styling */}
            <div className="rounded-2xl border border-accent/25 bg-accent/[0.04] overflow-hidden">
              <div className="px-5 pt-5 pb-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-accent" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground">Needs Attention</h3>
                <span className="ml-auto text-[10px] font-semibold bg-accent/15 text-accent px-2 py-0.5 rounded-full">{flaggedClients.length}</span>
              </div>
              <div className="px-5 pb-5 space-y-2.5">
                {flaggedClients.map((c, i) => (
                  <div key={i} className={cn(
                    "p-3 rounded-xl border transition-colors cursor-pointer hover:shadow-sm",
                    c.urgency === 'high' ? 'border-destructive/20 bg-destructive/[0.04] hover:bg-destructive/[0.07]' : 'border-accent/15 bg-card hover:bg-secondary/50'
                  )}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{c.id}</span>
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded",
                        c.urgency === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'
                      )}>{c.urgency}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.reason}</p>
                  </div>
                ))}
                <button className="w-full text-xs text-primary font-medium py-2 hover:underline flex items-center justify-center gap-1">
                  Review All <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Recent messages */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-foreground">Recent Messages</h3>
                <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{recentMessages.filter(m => m.unread).length} new</span>
              </div>
              <div className="px-5 pb-5 space-y-1">
                {recentMessages.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5",
                      m.unread ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                    )}>
                      {m.from.slice(-4)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={cn("text-sm", m.unread ? "font-semibold text-foreground" : "font-medium text-muted-foreground")}>{m.from}</span>
                        <span className="text-[11px] text-muted-foreground">{m.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{m.preview}</p>
                    </div>
                    {m.unread && <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="border-t border-border">
                <button className="w-full text-xs text-primary font-medium py-3 hover:bg-secondary/30 transition-colors flex items-center justify-center gap-1">
                  View All Messages <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick performance snapshot */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h3 className="font-display text-sm font-semibold text-foreground">Weekly Performance</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Session Completion', value: 92, color: 'bg-primary' },
                  { label: 'Client Retention', value: 88, color: 'bg-teal-light' },
                  { label: 'Response Time', value: 95, color: 'bg-green' },
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className="text-xs font-semibold text-foreground">{metric.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-700", metric.color)} style={{ width: `${metric.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ethics reminder */}
            <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-4 flex items-start gap-3">
              <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Privacy Reminder</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">All sessions are end-to-end encrypted. Client identities remain anonymous per JaliConnect protocol.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
