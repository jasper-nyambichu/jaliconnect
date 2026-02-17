import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Users, UserCheck, Activity, TrendingUp, Search, Shield, Link2,
  MoreHorizontal, Eye, Ban, CheckCircle2, Clock, ArrowUpRight,
  UserPlus, AlertTriangle, BarChart3, Zap, Heart, MessageSquare
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

// Mock data
const mockUsers = [
  { id: 'U-4821', alias: 'SereneMind', joined: '2026-01-15', status: 'active', sessions: 12, lastActive: '2h ago', mood: 'stable' },
  { id: 'U-7293', alias: 'QuietStream', joined: '2026-01-22', status: 'active', sessions: 8, lastActive: '1d ago', mood: 'improving' },
  { id: 'U-1058', alias: 'BraveSoul', joined: '2026-02-01', status: 'flagged', sessions: 3, lastActive: '30m ago', mood: 'concern' },
  { id: 'U-3390', alias: 'CalmBreeze', joined: '2026-02-05', status: 'active', sessions: 5, lastActive: '4h ago', mood: 'stable' },
  { id: 'U-6641', alias: 'HopefulHeart', joined: '2025-12-10', status: 'inactive', sessions: 20, lastActive: '2w ago', mood: 'stable' },
  { id: 'U-9102', alias: 'GentleWave', joined: '2026-02-10', status: 'active', sessions: 1, lastActive: '6h ago', mood: 'new' },
  { id: 'U-5577', alias: 'WarmLight', joined: '2026-01-28', status: 'active', sessions: 7, lastActive: '3h ago', mood: 'improving' },
];

const mockCounselors = [
  { id: 'C-101', name: 'Dr. Amara K.', specialty: 'Anxiety & Depression', status: 'online', clients: 14, rating: 4.9, availability: 'Full' },
  { id: 'C-102', name: 'Dr. Brian M.', specialty: 'Trauma & PTSD', status: 'online', clients: 11, rating: 4.8, availability: 'Limited' },
  { id: 'C-103', name: 'Sarah N.', specialty: 'Youth Counseling', status: 'offline', clients: 9, rating: 4.7, availability: 'Full' },
  { id: 'C-104', name: 'James O.', specialty: 'Substance Abuse', status: 'online', clients: 7, rating: 4.6, availability: 'Full' },
  { id: 'C-105', name: 'Dr. Fatima A.', specialty: 'Grief & Loss', status: 'busy', clients: 15, rating: 4.9, availability: 'Waitlist' },
];

const pendingAssignments = [
  { id: 'REQ-901', user: 'BraveSoul', type: 'Video', urgency: 'high', requested: '30m ago', preference: 'Anxiety & Depression' },
  { id: 'REQ-902', user: 'GentleWave', type: 'Chat', urgency: 'normal', requested: '2h ago', preference: 'Youth Counseling' },
  { id: 'REQ-903', user: 'WarmLight', type: 'Audio', urgency: 'normal', requested: '4h ago', preference: 'No preference' },
];

const weeklyData = [
  { day: 'Mon', sessions: 24, users: 18 },
  { day: 'Tue', sessions: 31, users: 22 },
  { day: 'Wed', sessions: 28, users: 20 },
  { day: 'Thu', sessions: 35, users: 27 },
  { day: 'Fri', sessions: 42, users: 31 },
  { day: 'Sat', sessions: 19, users: 14 },
  { day: 'Sun', sessions: 15, users: 11 },
];

const statusColor = (s: string) => {
  switch (s) {
    case 'active': case 'online': return 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30';
    case 'flagged': return 'bg-destructive/15 text-destructive border-destructive/30';
    case 'inactive': case 'offline': return 'bg-muted text-muted-foreground border-border';
    case 'busy': return 'bg-amber-500/15 text-amber-700 border-amber-500/30';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const moodIndicator = (mood: string) => {
  switch (mood) {
    case 'stable': return '🟢';
    case 'improving': return '📈';
    case 'concern': return '🔴';
    case 'new': return '🔵';
    default: return '⚪';
  }
};

const maxSessions = Math.max(...weeklyData.map(d => d.sessions));

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof pendingAssignments[0] | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState('');

  const filteredUsers = mockUsers.filter(u =>
    u.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAssign = (req: typeof pendingAssignments[0]) => {
    setSelectedRequest(req);
    setAssignDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Admin Control Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Platform Overview</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-xl border-primary/30 text-primary hover:bg-primary/5">
              <BarChart3 className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* Stat Cards — asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '1,247', change: '+12%', icon: Users, accent: 'text-primary bg-primary/10' },
            { label: 'Active Counselors', value: '23', change: '+3', icon: UserCheck, accent: 'text-accent bg-accent/10' },
            { label: 'Sessions This Week', value: '194', change: '+18%', icon: Activity, accent: 'text-emerald-600 bg-emerald-500/10' },
            { label: 'Avg. Satisfaction', value: '4.8/5', change: '+0.2', icon: Heart, accent: 'text-pink-600 bg-pink-500/10' },
          ].map(stat => (
            <Card key={stat.label} className="border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${stat.accent}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />{stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content: two-column on large screens */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Tabs for Users & Counselors — takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="users">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <TabsList className="bg-secondary/60 rounded-xl p-1">
                  <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm text-sm gap-1.5">
                    <Users className="w-4 h-4" /> Users
                  </TabsTrigger>
                  <TabsTrigger value="counselors" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm text-sm gap-1.5">
                    <UserCheck className="w-4 h-4" /> Counselors
                  </TabsTrigger>
                </TabsList>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by alias or ID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 rounded-xl bg-secondary/40 border-border/50 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Users Table */}
              <TabsContent value="users">
                <Card className="border-border/60 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Mood</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Sessions</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Last Active</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(user => (
                        <TableRow key={user.id} className="group">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                                {user.alias.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{user.alias}</p>
                                <p className="text-xs text-muted-foreground">{user.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`rounded-lg text-xs capitalize ${statusColor(user.status)}`}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm">{moodIndicator(user.mood)} {user.mood}</span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="font-semibold text-sm text-foreground">{user.sessions}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{user.lastActive}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-xl">
                                <DropdownMenuItem className="gap-2 text-sm"><Eye className="w-4 h-4" /> View Profile</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-sm"><Link2 className="w-4 h-4" /> Assign Counselor</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-sm"><MessageSquare className="w-4 h-4" /> Send Message</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-sm text-destructive"><Ban className="w-4 h-4" /> Suspend</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Counselors Table */}
              <TabsContent value="counselors">
                <Card className="border-border/60 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Counselor</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Specialty</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Clients</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Rating</TableHead>
                        <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Availability</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCounselors.map(c => (
                        <TableRow key={c.id} className="group">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center text-accent text-sm font-bold shrink-0">
                                {c.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{c.name}</p>
                                <p className="text-xs text-muted-foreground">{c.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{c.specialty}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`rounded-lg text-xs capitalize ${statusColor(c.status)}`}>
                              {c.status === 'online' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 inline-block" />}
                              {c.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-semibold text-sm">{c.clients}</TableCell>
                          <TableCell className="hidden lg:table-cell text-sm">⭐ {c.rating}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant="outline" className={`rounded-lg text-xs ${c.availability === 'Full' ? 'text-emerald-700 border-emerald-500/30' : c.availability === 'Limited' ? 'text-amber-700 border-amber-500/30' : 'text-destructive border-destructive/30'}`}>
                              {c.availability}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-lg">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-xl">
                                <DropdownMenuItem className="gap-2 text-sm"><Eye className="w-4 h-4" /> View Details</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-sm"><UserPlus className="w-4 h-4" /> Assign Clients</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-sm text-destructive"><Ban className="w-4 h-4" /> Deactivate</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar: Assignments & Analytics */}
          <div className="space-y-6">
            {/* Pending Assignments */}
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" /> Pending Assignments
                  </CardTitle>
                  <Badge className="bg-accent/15 text-accent border-accent/30 rounded-lg text-xs">{pendingAssignments.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingAssignments.map(req => (
                  <div key={req.id} className="p-3 rounded-xl bg-secondary/40 border border-border/40 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">{req.user}</span>
                          {req.urgency === 'high' && (
                            <Badge variant="outline" className="rounded-md text-[10px] px-1.5 py-0 bg-destructive/10 text-destructive border-destructive/30">
                              <AlertTriangle className="w-3 h-3 mr-0.5" /> Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{req.type} session · {req.preference}</p>
                      </div>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{req.requested}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full rounded-lg text-xs border-primary/30 text-primary hover:bg-primary/5 gap-1.5" onClick={() => openAssign(req)}>
                      <Link2 className="w-3.5 h-3.5" /> Assign Counselor
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Activity Chart (custom CSS bars) */}
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-36">
                  {weeklyData.map(d => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full flex flex-col items-center gap-0.5">
                        <span className="text-[10px] font-semibold text-foreground">{d.sessions}</span>
                        <div className="w-full rounded-t-md bg-primary/80 transition-all" style={{ height: `${(d.sessions / maxSessions) * 100}px` }} />
                        <div className="w-full rounded-b-md bg-accent/60 transition-all" style={{ height: `${(d.users / maxSessions) * 60}px` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">{d.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 justify-center">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className="w-2.5 h-2.5 rounded-sm bg-primary/80" /> Sessions</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className="w-2.5 h-2.5 rounded-sm bg-accent/60" /> Active Users</div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Health */}
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Server Uptime', value: '99.9%', pct: 99.9 },
                  { label: 'Avg Response Time', value: '1.2s', pct: 88 },
                  { label: 'User Retention', value: '82%', pct: 82 },
                  { label: 'Counselor Utilization', value: '74%', pct: 74 },
                ].map(m => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-semibold text-foreground">{m.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Assign Counselor Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Assign Counselor</DialogTitle>
            <DialogDescription>
              Connect <span className="font-semibold text-foreground">{selectedRequest?.user}</span> with an available counselor for a <span className="font-semibold text-foreground">{selectedRequest?.type}</span> session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="text-xs text-muted-foreground">Preference: <span className="text-foreground font-medium">{selectedRequest?.preference}</span></div>
            <Select value={selectedCounselor} onValueChange={setSelectedCounselor}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select a counselor..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {mockCounselors.filter(c => c.status === 'online').map(c => (
                  <SelectItem key={c.id} value={c.id} className="rounded-lg">
                    <span className="font-medium">{c.name}</span> · <span className="text-muted-foreground text-xs">{c.specialty}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)} className="rounded-xl">Cancel</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl gap-1.5" onClick={() => setAssignDialogOpen(false)}>
              <Link2 className="w-4 h-4" /> Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}