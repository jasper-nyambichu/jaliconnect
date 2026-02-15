import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle, Shield, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/ChatGPT_Image_Feb_15__2026__09_08_45_AM-removebg-preview.png';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false, hasUpperCase: false, hasLowerCase: false, hasNumber: false, hasSpecialChar: false,
  });
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', firstName: '', lastName: '', phone: '', username: '',
  });

  const validatePassword = (password: string) => {
    const strength = {
      hasMinLength: password.length >= 8, hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password), hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordStrength(strength);
    return Object.values(strength).every(Boolean);
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    validatePassword(password);
    if (!isLogin) setPasswordMatch(password === formData.confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setFormData({ ...formData, confirmPassword });
    setPasswordMatch(formData.password === confirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);

    if (!isLogin) {
      if (!formData.username.trim()) { setLocalError('Anonymous username is required'); setIsSubmitting(false); return; }
      if (!validatePassword(formData.password)) { setLocalError('Please ensure your password meets all requirements'); setIsSubmitting(false); return; }
      if (formData.password !== formData.confirmPassword) { setLocalError('Passwords do not match'); setPasswordMatch(false); setIsSubmitting(false); return; }
      if (!agreedToTerms) { setLocalError('Please agree to the Terms & Conditions'); setIsSubmitting(false); return; }
    }
    if (!formData.email.trim()) { setLocalError('Email is required'); setIsSubmitting(false); return; }
    if (!formData.password) { setLocalError('Password is required'); setIsSubmitting(false); return; }

    try {
      console.log('Auth submit:', { isLogin, ...formData });
    } catch (error: any) {
      setLocalError(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-primary' : 'text-muted-foreground'}`}>
      {met ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground" />}
      {text}
    </div>
  );

  const inputClasses = "w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-slate">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="JaliConnect" className="h-30 w-35 object-contain justify-center align-middle" />
          </Link>

          <div className="space-y-6">
            <h2 className="font-display text-4xl xl:text-5xl font-bold text-white leading-[1.15]">
              Your Safe Place{' '}
              <span className="text-gradient-teal">to Connect</span>
            </h2>
            <p className="text-white/70 max-w-md leading-relaxed">
              Anonymous, confidential mental wellness support designed for young people.
              No judgment. No stigma. Just care.
            </p>

          </div>

          {/* <div className="glass-card rounded-2xl p-6 bg-white/5 border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold text-white text-sm">Your Privacy is Our Priority</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              All conversations are end-to-end encrypted. No personal data is shared without your consent.
            </p>
          </div> */}
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src={logo} alt="JaliConnect" className="h-10 w-10 object-contain" />
            <span className="font-display text-xl font-bold text-foreground">JaliConnect</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? (
                <>Don't have an account? <button onClick={() => { setIsLogin(false); setLocalError(''); }} className="text-primary hover:underline font-semibold">Sign Up</button></>
              ) : (
                <>Already have an account? <button onClick={() => { setIsLogin(true); setLocalError(''); }} className="text-primary hover:underline font-semibold">Sign In</button></>
              )}
            </p>
          </div>

          {/* Social Auth */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-all text-foreground font-medium text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-all text-foreground font-medium text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase">Or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <AnimatePresence>
            {localError && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {localError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div key="signup-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Anonymous Username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} className={inputClasses} disabled={isSubmitting} />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="tel" placeholder="Phone Number (optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClasses} disabled={isSubmitting} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClasses} required disabled={isSubmitting} />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={formData.password} onChange={e => handlePasswordChange(e.target.value)} className="w-full pl-10 pr-12 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" required disabled={isSubmitting} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div key="confirm" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={formData.confirmPassword} onChange={e => handleConfirmPasswordChange(e.target.value)} className={`w-full pl-10 pr-12 py-3 rounded-xl bg-secondary border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all text-sm ${!passwordMatch && formData.confirmPassword ? 'border-destructive' : 'border-border'}`} disabled={isSubmitting} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {!passwordMatch && formData.confirmPassword && (
                    <p className="text-destructive text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Passwords do not match</p>
                  )}

                  <div className="grid grid-cols-2 gap-1.5 p-3 rounded-xl bg-secondary/50 border border-border">
                    <PasswordRequirement met={passwordStrength.hasMinLength} text="8+ characters" />
                    <PasswordRequirement met={passwordStrength.hasUpperCase} text="Uppercase" />
                    <PasswordRequirement met={passwordStrength.hasLowerCase} text="Lowercase" />
                    <PasswordRequirement met={passwordStrength.hasNumber} text="Number" />
                    <PasswordRequirement met={passwordStrength.hasSpecialChar} text="Special char" />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary" />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow-teal hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
