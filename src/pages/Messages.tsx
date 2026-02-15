import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Send, Paperclip, Phone, Video, MoreVertical, Search, Shield } from 'lucide-react';

const conversations = [
  { id: 1, name: 'Dr. Sarah M.', lastMessage: "I'm glad you're feeling better!", time: '2 min ago', unread: 2, avatar: 'SM', online: true },
  { id: 2, name: 'Dr. James K.', lastMessage: "Let's continue this in our next session.", time: '1 hr ago', unread: 0, avatar: 'JK', online: false },
  { id: 3, name: 'Dr. Amina R.', lastMessage: 'Remember the breathing exercises we discussed.', time: 'Yesterday', unread: 1, avatar: 'AR', online: true },
];

const messages = [
  { id: 1, sender: 'counselor', text: "Hi there! How have you been feeling since our last session?", time: '2:30 PM' },
  { id: 2, sender: 'user', text: "I've been practicing the breathing techniques you suggested. They really help!", time: '2:32 PM' },
  { id: 3, sender: 'counselor', text: "That's wonderful to hear! Consistency is key. Have you noticed any patterns with your anxiety?", time: '2:33 PM' },
  { id: 4, sender: 'user', text: "Yes, I noticed it's usually worse in the mornings. But the exercises calm me down.", time: '2:35 PM' },
  { id: 5, sender: 'counselor', text: "I'm glad you're feeling better! Let's work on morning routines in our next session. 😊", time: '2:36 PM' },
];

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground flex items-center gap-2"><Shield className="w-4 h-4" /> All messages are end-to-end encrypted</p>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden border border-border" style={{ height: 'calc(100vh - 250px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-80 border-r border-border flex flex-col shrink-0 ${!showSidebar ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map(c => (
                  <button key={c.id} onClick={() => { setActiveConvo(c.id); setShowSidebar(false); }} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeConvo === c.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-secondary/50 border-l-2 border-l-transparent'}`}>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-xs">{c.avatar}</div>
                      {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground text-sm truncate">{c.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                    </div>
                    {c.unread > 0 && <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-semibold">{c.unread}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowSidebar(true)} className="md:hidden p-1 text-muted-foreground">←</button>
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-xs">SM</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Dr. Sarah M.</h3>
                    <p className="text-xs text-primary">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Phone className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Video className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(m => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-secondary text-foreground rounded-bl-md'}`}>
                      <p>{m.text}</p>
                      <p className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Paperclip className="w-5 h-5" /></button>
                  <input
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all"
                    onKeyDown={e => e.key === 'Enter' && messageInput.trim() && setMessageInput('')}
                  />
                  <button className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-transform shadow-glow-sage">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
