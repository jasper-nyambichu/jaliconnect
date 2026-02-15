import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, MessageCircle, Clock, TrendingUp, ArrowRight, Heart, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickActions = [
  { title: 'Book Session', description: 'Schedule a new counseling session', icon: Calendar, path: '/book', color: 'bg-primary/10 text-primary' },
  { title: 'Messages', description: 'Chat with your counselor', icon: MessageCircle, path: '/messages', color: 'bg-accent/10 text-accent' },
];

const upcomingSessions = [
  { counselor: 'Dr. Sarah M.', type: 'Video Call', date: 'Today, 3:00 PM', status: 'upcoming' },
  { counselor: 'Dr. James K.', type: 'Text Chat', date: 'Tomorrow, 10:00 AM', status: 'upcoming' },
];

const moodOptions = ['😊', '🙂', '😐', '😔', '😢'];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome back 👋</h1>
          <p className="text-muted-foreground">How are you feeling today? Your journey matters.</p>
        </div>

        {/* Mood Check */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">How are you feeling right now?</h3>
          <div className="flex items-center gap-4">
            {moodOptions.map((mood, i) => (
              <button key={i} className="text-3xl hover:scale-125 transition-transform duration-200 p-2 rounded-xl hover:bg-secondary">
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions + Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.path} className="glass-card rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 group">
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
              <ArrowRight className="w-4 h-4 text-muted-foreground mt-3 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}

          <div className="glass-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-warm/10 text-warm flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Sessions</h3>
            <p className="font-display text-3xl font-bold text-gradient-sage">12</p>
            <p className="text-xs text-muted-foreground mt-1">Total completed</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-lavender/10 text-lavender flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Streak</h3>
            <p className="font-display text-3xl font-bold text-gradient-lavender">7 days</p>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-semibold text-foreground">Upcoming Sessions</h3>
            <Link to="/book" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{session.counselor}</p>
                    <p className="text-xs text-muted-foreground">{session.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{session.date}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Upcoming</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Tip */}
        <div className="rounded-2xl p-6 bg-gradient-sage shadow-glow-sage">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">Daily Wellness Tip</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                "Take 5 minutes today to practice deep breathing. Inhale for 4 counts, hold for 4, exhale for 4. 
                It's a simple way to calm your nervous system."
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
