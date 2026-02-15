import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Calendar, Clock, Video, MessageCircle, Mic, Star, ArrowRight, Filter, Search } from 'lucide-react';

const counselors = [
  { id: 1, name: 'Dr. Sarah M.', specialty: 'Anxiety & Depression', rating: 4.9, sessions: 230, avatar: 'SM', available: true, types: ['video', 'chat', 'audio'] },
  { id: 2, name: 'Dr. James K.', specialty: 'Trauma & PTSD', rating: 4.8, sessions: 185, avatar: 'JK', available: true, types: ['video', 'chat'] },
  { id: 3, name: 'Dr. Amina R.', specialty: 'Youth Counseling', rating: 4.9, sessions: 312, avatar: 'AR', available: false, types: ['video', 'chat', 'audio'] },
  { id: 4, name: 'Dr. Peter O.', specialty: 'Family & Relationships', rating: 4.7, sessions: 156, avatar: 'PO', available: true, types: ['chat', 'audio'] },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export default function BookSession() {
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState<'video' | 'chat' | 'audio'>('video');
  const [step, setStep] = useState(1);

  const sessionTypeIcons = { video: Video, chat: MessageCircle, audio: Mic };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Book a Session</h1>
          <p className="text-muted-foreground">Choose a counselor and schedule a session that works for you.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2">
          {['Choose Counselor', 'Select Time', 'Confirm'].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step > i + 1 ? 'bg-primary text-primary-foreground' : step === i + 1 ? 'bg-primary text-primary-foreground shadow-glow-sage' : 'bg-secondary text-muted-foreground'}`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
              {i < 2 && <div className="w-8 md:w-16 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input placeholder="Search counselors..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <button className="p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {counselors.map(c => (
                <button key={c.id} onClick={() => setSelectedCounselor(c.id)} className={`text-left p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${selectedCounselor === c.id ? 'border-primary glass-card shadow-glow-sage' : 'border-border glass-card hover:shadow-elevated'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{c.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-foreground">{c.name}</h3>
                        <p className="text-xs text-muted-foreground">{c.specialty}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.available ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {c.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warm fill-warm" /> {c.rating}</span>
                    <span>{c.sessions} sessions</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {c.types.map(t => {
                      const Icon = sessionTypeIcons[t as keyof typeof sessionTypeIcons];
                      return <div key={t} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><Icon className="w-4 h-4 text-muted-foreground" /></div>;
                    })}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button onClick={() => selectedCounselor && setStep(2)} disabled={!selectedCounselor} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow-sage hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Select Date</h3>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Select Time</h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedTime === time ? 'bg-primary text-primary-foreground shadow-glow-sage' : 'bg-secondary text-foreground hover:bg-muted border border-border'}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Session Type</h3>
              <div className="grid grid-cols-3 gap-3">
                {(['video', 'chat', 'audio'] as const).map(type => {
                  const Icon = sessionTypeIcons[type];
                  return (
                    <button key={type} onClick={() => setSessionType(type)} className={`p-4 rounded-xl border text-center transition-all ${sessionType === type ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:bg-muted'}`}>
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${sessionType === type ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium capitalize ${sessionType === type ? 'text-primary' : 'text-foreground'}`}>{type === 'chat' ? 'Text Chat' : type === 'video' ? 'Video Call' : 'Audio Call'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-all">Back</button>
              <button onClick={() => selectedDate && selectedTime && setStep(3)} disabled={!selectedDate || !selectedTime} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow-sage hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <div className="glass-card rounded-2xl p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Confirm Booking</h2>
              <div className="space-y-3 text-left">
                {[
                  ['Counselor', counselors.find(c => c.id === selectedCounselor)?.name || ''],
                  ['Date', selectedDate],
                  ['Time', selectedTime],
                  ['Type', sessionType === 'chat' ? 'Text Chat' : sessionType === 'video' ? 'Video Call' : 'Audio Call'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground text-sm">{label}</span>
                    <span className="font-medium text-foreground text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-all">Back</button>
                <button className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow-sage hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
