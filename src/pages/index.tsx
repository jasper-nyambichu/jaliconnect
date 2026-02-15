import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Lock, MessageSquare, Calendar, Video, Heart, Users, AlertTriangle, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import heroFilmPoster from "@/assets/6 Ways to Escape Boredom.jpeg";
import crisisLifeline from "@/assets/crisis-lifeline.png";
import crisisTextLine from "@/assets/crisis-text-line.png";
import caYouthCrisis from "@/assets/ca-youth-crisis.png";
import boardPhoto1 from "@/assets/board-photo-1.jpeg";
import boardPhoto2 from "@/assets/board-photo-2.jpeg";
import boardPhoto3 from "@/assets/board-photo-3.jpeg";
import campusPhoto from "@/assets/download (2).jpeg";
import communityPhoto from "@/assets/Machari, Ian.jpeg";
import connectionPhoto from "@/assets/connection-photo.jpeg";
import getInvolvedImg from "@/assets/Youth Day South Africa 2020.jpeg";
import gallery1 from "@/assets/World Mental Health Day_ Why it Matters and How to Get Involved.jpeg";
import gallery2 from "@/assets/download (3).jpeg";
import gallery3 from "@/assets/logo template.jpeg";
import gallery4 from "@/assets/gallery-4.jpeg";
import gallery5 from "@/assets/gallery-5.jpeg";
import gallery6 from "@/assets/gallery-6.jpeg";
import logo from "@/assets/ChatGPT_Image_Feb_15__2026__09_08_45_AM-removebg-preview.png";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── HERO ─── */
const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroFilmPoster} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-dark-overlay" />
    </div>

    <div className="container relative mx-auto px-6 py-20 text-center">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider mb-4 uppercase"
      >
        Jali<span className="text-gradient-teal">Connect</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-white/70 font-display italic mb-2"
      >
        Caring Minds, Connecting Lives
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
      >
        Anonymous, confidential mental wellness support for young people. No judgment. No stigma. Just care.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link to="/auth">
          <Button size="lg" className=" text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-10 gap-2 text-lg">
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <Link to="/book">
          <Button size="lg" variant="outline" className="rounded-full border-primary bg-primary hover:bg-primary/10 hover:text-primary-foreground px-8">
            <Calendar className="w-5 h-5" /> Book a Session
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─── KEY FEATURES ─── */
const features = [
  { icon: Lock, title: "Complete Anonymity", description: "No real names required. Your identity stays protected with anonymous usernames and encrypted data.", color: "bg-primary/10 text-primary" },
  { icon: Video, title: "1-on-1 Counseling", description: "Connect with licensed counselors through video, audio, or text chat—whatever feels comfortable.", color: "bg-accent/10 text-accent" },
  { icon: Calendar, title: "Easy Booking", description: "Schedule sessions at your convenience with a simple 3-step booking wizard.", color: "bg-orange/10 text-orange" },
  { icon: MessageSquare, title: "Safe Messaging", description: "End-to-end encrypted messaging between you and your counselor. Private and secure.", color: "bg-teal/10 text-teal" },
  { icon: Users, title: "Counselor Dashboard", description: "Counselors manage availability, sessions, and follow-ups all in one place.", color: "bg-green/10 text-green" },
  { icon: AlertTriangle, title: "Crisis Support", description: "Immediate access to crisis hotlines and emergency referral prompts when you need help now.", color: "bg-destructive/10 text-destructive" },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 md:py-28">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Key Features</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Built for Safety, Designed for You
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every feature is crafted to remove barriers to help-seeking through anonymity and a youth-friendly interface.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── HOW IT WORKS ─── */
const steps = [
  { step: "01", title: "Create Anonymous Account", desc: "Sign up with just an email and anonymous username. No real names needed." },
  { step: "02", title: "Choose Your Counselor", desc: "Browse verified counselors by specialty. Read reviews and pick who feels right." },
  { step: "03", title: "Book & Connect", desc: "Select a time, choose video/audio/chat, and start your healing journey." },
];

const HowItWorksSection = () => (
  <section className="py-20 md:py-28 bg-secondary/50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">How It Works</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Three Simple Steps</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-glow-teal">
              {s.step}
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── CRISIS RESOURCES ─── */
const ResourcesSection = () => (
  <section id="resources" className="py-16 md:py-24 bg-card">
    <div className="container mx-auto px-6">
      <p className="text-center text-sm font-semibold text-accent uppercase tracking-widest mb-12">
        Mental health resources
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
        {[
          { img: crisisLifeline, title: "Suicide and Crisis Lifeline", desc: "Text or call 988", link: "http://www.988california.org/", linkText: "www.988california.org" },
          { img: crisisTextLine, title: "Crisis Text Line", desc: "Text HOME to", link: "sms:741741", linkText: "741741" },
          { img: caYouthCrisis, title: "California Youth Crisis Line", desc: "", link: "tel:18008435200", linkText: "1-800-843-5200 — ages 12-24" },
        ].map((r, i) => (
          <div key={i} className="glass-card rounded-2xl p-8 shadow-soft text-center flex flex-col items-center">
            <img src={r.img} alt={r.title} className="w-24 h-24 object-contain mb-6" />
            <h3 className="font-display text-lg font-bold text-foreground mb-3">{r.title}</h3>
            <p className="text-muted-foreground text-sm mb-1">{r.desc}</p>
            <a href={r.link} className="text-primary font-semibold text-sm hover:underline">{r.linkText}</a>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-2">
        <p className="text-sm text-muted-foreground italic">
          Resources are <strong>NOT</strong> only for crisis situations. Support is available for all levels of mental health support.
        </p>
        <p className="text-sm text-muted-foreground italic">
          In the case of an emergency, please dial 911.
        </p>
      </div>
    </div>
  </section>
);

/* ─── MISSION ─── */
const MissionSection = () => (
  <section id="about" className="py-20 md:py-28">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          JaliConnect is a youth-driven mental health platform dedicated to empowering teens and young adults to seek help without fear. Through anonymous counseling, peer support, and creative wellness programs, we provide free, confidential resources that promote well-being, resilience, and self-care.
        </p>
        <Link to="/auth">
          <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
            Join JaliConnect
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

/* ─── TAGLINE BANNER ─── */
const TaglineBanner = () => (
  <section className="py-16 bg-gradient-teal text-center">
    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground tracking-wide">
      Caring Minds, Connecting Lives
    </h2>
    <p className="text-primary-foreground/70 text-lg mt-3 font-display">— JaliConnect —</p>
  </section>
);

/* ─── PROGRAMS ─── */
const programsData = [
  {
    img: campusPhoto,
    title: "Campus",
    text: "JaliConnect brings real conversations about mental health to campuses. We share stories, lead workshops, and create spaces where it's okay to talk about what you're going through.",
  },
  {
    img: communityPhoto,
    title: "Community",
    text: "We partner with communities to create spaces where young people and families can come together, listen, and support one another through youth-led workshops and honest conversations.",
  },
  {
    img: connectionPhoto,
    title: "Connection",
    text: "Our youth leaders build communities rooted in compassion—sharing stories, creating spaces of belonging, and reaching out to peers who may feel isolated or unseen.",
  },
];

const ProgramsSection = () => (
  <section id="programs" className="py-16 md:py-24">
    <div className="container mx-auto px-6">
      <div className="space-y-20">
        {programsData.map((p, i) => (
          <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center max-w-5xl mx-auto`}>
            <div className="md:w-1/2">
              <img src={p.img} alt={p.title} className="w-full h-80 object-cover rounded-2xl shadow-elevated" />
            </div>
            <div className="md:w-1/2">
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── GALLERY ─── */
const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const GallerySection = () => (
  <section id="stories" className="py-16 md:py-24">
    <div className="container mx-auto px-6">
      <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-center">What We're Up To</h2>
      <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
        At JaliConnect, we're always expanding our reach to meet the needs of our community.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {galleryImages.map((img, i) => (
          <img key={i} src={img} alt={`JaliConnect activity ${i + 1}`} className="w-full h-52 md:h-64 object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300" />
        ))}
      </div>
    </div>
  </section>
);

/* ─── GET INVOLVED ─── */
const GetInvolvedSection = () => (
  <section id="donate" className="py-16 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">Get Involved</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Are you passionate about mental health advocacy? Join our Youth Action Board and help shape programs that make a real impact on youth mental wellness.
          </p>
          <Link to="/auth">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 mb-8">
              Join Us
            </Button>
          </Link>

          <h3 className="font-display text-lg font-semibold text-foreground mb-3">Support Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Your support ensures JaliConnect remains a trusted, youth-led resource offering free mental health programs.
          </p>
          <Button className="bg-gradient-teal text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-10">
            Donate
          </Button>
        </div>
        <div>
          <img src={getInvolvedImg} alt="Get involved with JaliConnect" className="w-full h-auto rounded-2xl shadow-elevated" />
        </div>
      </div>
    </div>
  </section>
);

/* ─── NEWSLETTER ─── */
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Stay in the Know</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Sign up for updates on events, resources, and mental wellness tips.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full" />
            <Button type="submit" className="bg-gradient-teal text-accent-foreground rounded-full px-8 font-semibold hover:bg-accent/90">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ─── PAGE ─── */
export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ResourcesSection />
      <MissionSection />
      <TaglineBanner />
      <ProgramsSection />
      <GallerySection />
      <GetInvolvedSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
