import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, PageHeader } from '../components/SharedUI';
import { ViewState, UserProfile, StoreInfo } from '../types';
import { Store, Image as ImageIcon, MapPin, Phone, CheckCircle2, UploadCloud, AlertTriangle, X, Loader2, Plus, Trash2, Zap, Shield, Palette, Mail, Send } from 'lucide-react';

interface AuthProps {
  onNavigate: (view: ViewState) => void;
  onLogin: (user: UserProfile) => void;
}

export const LandingView: React.FC<AuthProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-white">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Lorem ipsum dolor sit amet <span className="text-primary-600">consectetur.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Choose a template, add your store details once, and generate professional marketing materials for all your social channels instantly.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Button size="lg" onClick={() => onNavigate('login')} className="w-full sm:w-auto px-8">
              Choose a Template
            </Button>
            <button 
              onClick={() => onNavigate('register')} 
              className="text-primary-600 font-medium hover:text-primary-700 hover:underline text-sm"
            >
              Create Account
            </button>
          </div>
        </div>
      </main>

      {/* About the Platform */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Platform</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform is designed specifically for small and medium businesses to effortlessly create high-quality, branded promotional content. We bridge the gap between complex design tools and the fast-paced needs of retail marketing, allowing you to focus on what you do best: running your business.
          </p>
        </div>
      </section>

      {/* Key Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Key Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Generate campaigns in seconds. No more waiting for designers or struggling with complex software.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">On-Brand Always</h3>
              <p className="text-gray-600">Your logo, your address, your contact info—automatically applied to every template perfectly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliable & Secure</h3>
              <p className="text-gray-600">Your data and assets are stored securely, ensuring your business information is always protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900">How do I get started?</h3>
              <p className="text-gray-600 mt-2">Simply click on "Choose a Template" or "Create Account" to begin your journey.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900">Is it free to use?</h3>
              <p className="text-gray-600 mt-2">Yes, our basic templates are completely free to use for your business.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900">Can I add multiple stores?</h3>
              <p className="text-gray-600 mt-2">Absolutely! You can manage multiple store locations and generate creatives for all of them at once.</p>
            </div>
          </div>
          <Button variant="outline" className="mt-10" onClick={() => onNavigate('faq')}>
            View All FAQs
          </Button>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-10">Have questions or need custom templates? We're here to help.</p>
          
          <form className="space-y-4 text-left bg-white p-8 rounded-2xl border border-gray-100 shadow-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="Your email address" />
            </div>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 focus:outline-none sm:text-sm transition-colors min-h-[120px]"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export const RegisterView: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stores, setStores] = useState<StoreInfo[]>([
    { id: 's1', name: '', address: '', contactNumber: '' }
  ]);
  const [gstNumber, setGstNumber] = useState('');

  const handleAddStore = () => {
    setStores([...stores, { id: `s${Date.now()}`, name: '', address: '', contactNumber: '' }]);
  };

  const handleRemoveStore = (idToRemove: string) => {
    if (stores.length > 1) {
      setStores(stores.filter(s => s.id !== idToRemove));
    }
  };

  const handleStoreChange = (id: string, field: keyof StoreInfo, value: string) => {
    setStores(stores.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleContinue = () => {
    const hasEmptyStore = stores.some(s => !s.name || !s.address || !s.contactNumber);
    if (!email || !password || hasEmptyStore) return;
    onNavigate('otp');
  };

  const isFormValid = email && password && !stores.some(s => !s.name || !s.address || !s.contactNumber);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white sm:bg-gray-50">
      <div className="max-w-md w-full space-y-8 sm:bg-white p-4 sm:p-10 sm:rounded-3xl sm:shadow-sm sm:border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <span className="text-white font-bold text-2xl leading-none">P</span>
          </div>
          <h2 className="text-center text-2xl font-medium text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            to continue to Platform
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="space-y-4">
            <Input 
              label="Email or phone" 
              type="text" 
              placeholder="Enter your email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              label="Password or OTP" 
              type="password" 
              placeholder="Enter password or OTP"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="border-t border-gray-200 pt-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Store Details</h3>
              </div>
              
              <div className="space-y-6">
                {stores.map((store, index) => (
                  <div key={store.id} className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative">
                    {stores.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => handleRemoveStore(store.id)}
                        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Store {index + 1}</h4>
                    <Input 
                      label="Store Name" 
                      placeholder="e.g. Sharma Electronics"
                      value={store.name}
                      onChange={(e) => handleStoreChange(store.id, 'name', e.target.value)}
                      required
                    />
                    <Input 
                      label="Store Address" 
                      placeholder="e.g. 123 Main St, City"
                      value={store.address}
                      onChange={(e) => handleStoreChange(store.id, 'address', e.target.value)}
                      required
                    />
                    <Input 
                      label="Store Contact Number" 
                      placeholder="e.g. 98765 43210"
                      value={store.contactNumber}
                      onChange={(e) => handleStoreChange(store.id, 'contactNumber', e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>
              
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="mt-4 text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                onClick={handleAddStore}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Another Store
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-4">
              <Input 
                label="GST Number (Optional)" 
                placeholder="e.g. 22AAAAA0000A1Z5"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Terms</a> and <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
            </label>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto px-8" disabled={!isFormValid}>
              Next
            </Button>
            <button type="button" onClick={() => onNavigate('login')} className="text-primary-600 font-medium hover:text-primary-700 text-sm">
              Sign in instead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const LoginView: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) return;
    onNavigate('otp');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white sm:bg-gray-50">
      <div className="max-w-md w-full space-y-8 sm:bg-white p-4 sm:p-10 sm:rounded-3xl sm:shadow-sm sm:border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <span className="text-white font-bold text-2xl leading-none">P</span>
          </div>
          <h2 className="text-center text-2xl font-medium text-gray-900">Sign in</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            to continue to Platform
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="space-y-5">
            <Input 
              label="Email or phone" 
              type="text" 
              placeholder="Enter your email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              label="Password or OTP" 
              type="password" 
              placeholder="Enter password or OTP"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto px-8" disabled={!email || !password}>
              Next
            </Button>
            <button type="button" onClick={() => onNavigate('register')} className="text-primary-600 font-medium hover:text-primary-700 text-sm">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const OTPView: React.FC<AuthProps> = ({ onNavigate }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    
    // Focus next input
    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('profile_setup');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white sm:bg-gray-50">
      <div className="max-w-md w-full space-y-8 sm:bg-white p-4 sm:p-10 sm:rounded-3xl sm:shadow-sm sm:border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <span className="text-white font-bold text-2xl leading-none">P</span>
          </div>
          <h2 className="text-center text-2xl font-medium text-gray-900">Verify it's you</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 4-digit code to your number.
          </p>
        </div>
        
        <div className="mt-8 space-y-8">
          <div className="flex justify-center space-x-4">
            {otp.map((data, index) => (
              <input
                className="w-14 h-14 text-center text-2xl font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                type="text"
                name="otp"
                maxLength={1}
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>

          <div className="text-center text-sm">
            {timer > 0 ? (
              <span className="text-gray-500">Resend code in 00:{timer.toString().padStart(2, '0')}</span>
            ) : (
              <button className="text-primary-600 font-medium hover:text-primary-700">Resend OTP</button>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8"
              onClick={handleVerify} 
              disabled={otp.join('').length !== 4 || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
            <button type="button" onClick={() => onNavigate('register')} className="text-primary-600 font-medium hover:text-primary-700 text-sm">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSetupView: React.FC<AuthProps> = ({ onNavigate, onLogin }) => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: 'John Doe',
    mobile: '9876543210',
    email: 'john@example.com',
    businessName: '',
    logoUrl: ''
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [profanityResult, setProfanityResult] = useState<'idle' | 'passed' | 'failed'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const GRAY_LOGO_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Cpath d='M50 40a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-20 30l15-20 10 10 20-25 15 35H30z' fill='%239ca3af'/%3E%3C/svg%3E";

  const handleSave = () => {
    const fullProfile: UserProfile = {
      name: profile.name || 'John Doe',
      userId: 'john123',
      mobile: profile.mobile || '9876543210',
      email: profile.email || 'john@example.com',
      gst: '',
      businessName: profile.businessName || 'My Store',
      storeDetails: 'Retail store',
      stores: [
        { id: 's1', name: 'Store 1', address: '123 Main St, Mumbai', contactNumber: '98765 43210' },
        { id: 's2', name: 'Store 2', address: '456 High St, Delhi', contactNumber: '91234 56789' },
        { id: 's3', name: 'Store 3', address: '789 Park Ave, Bangalore', contactNumber: '99887 77665' }
      ],
      logoUrl: profile.logoUrl || GRAY_LOGO_PLACEHOLDER
    };
    onLogin(fullProfile);
    onNavigate('dashboard');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempImage(url);
      setProfanityResult('idle');
      setIsChecking(true);
      
      // Simulate AI Profanity / Content Check
      setTimeout(() => {
        setIsChecking(false);
        // Mock logic: fail if filename contains 'bad' or 'nsfw', otherwise pass
        if (file.name.toLowerCase().includes('bad') || file.name.toLowerCase().includes('nsfw')) {
          setProfanityResult('failed');
        } else {
          setProfanityResult('passed');
        }
      }, 2000);
    }
  };

  const confirmUpload = () => {
    if (profanityResult === 'passed' && tempImage) {
      setProfile({ ...profile, logoUrl: tempImage });
      setIsModalOpen(false);
      setTempImage(null);
      setProfanityResult('idle');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTempImage(null);
    setProfanityResult('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 relative">
      <PageHeader title="My Account" />
      <p className="text-gray-600 mb-8">Manage your personal and business details.</p>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Details</h3>
          <Input 
            label="Full Name" 
            placeholder="e.g. John Doe"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
          <Input 
            label="Email Address" 
            type="email"
            placeholder="e.g. john@example.com"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
          />
          <Input 
            label="Mobile Number" 
            type="tel"
            placeholder="e.g. 9876543210"
            value={profile.mobile}
            onChange={(e) => setProfile({...profile, mobile: e.target.value})}
          />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Business Details</h3>
          {/* Logo Upload Trigger */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
            <div 
              onClick={() => setIsModalOpen(true)}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden"
            >
              {profile.logoUrl ? (
                <div className="flex flex-col items-center">
                  <img src={profile.logoUrl} alt="Store Logo" className="h-20 w-20 object-cover rounded-full shadow-sm mb-2" />
                  <span className="text-sm text-primary-600 font-medium">Change Logo</span>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                      Upload a file
                    </span>
                    <p className="pl-1">or select from gallery</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          <Input 
            label="Business / Store Name" 
            placeholder="e.g. Sharma Electronics"
            value={profile.businessName}
            onChange={(e) => setProfile({...profile, businessName: e.target.value})}
          />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="ghost" onClick={() => handleSave()}>Skip for now</Button>
          <Button onClick={handleSave}>Save & Continue</Button>
        </div>
      </div>

      {/* Upload & Profanity Check Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Upload Store Logo</h3>
              <button onClick={closeModal} className="p-1 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col items-center">
              {!tempImage ? (
                <>
                  <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <p className="text-center text-gray-600 mb-6">Select an image from your device gallery to use as your store logo.</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Button onClick={() => fileInputRef.current?.click()} fullWidth>
                    Choose from Gallery
                  </Button>
                </>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-6">
                    <img src={tempImage} alt="Preview" className="w-full h-full object-cover rounded-full shadow-md border-4 border-white" />
                    {isChecking && (
                      <div className="absolute inset-0 bg-white/70 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Status Area */}
                  <div className="w-full min-h-[80px] flex flex-col items-center justify-center text-center mb-4">
                    {isChecking && (
                      <div className="text-primary-600 flex flex-col items-center">
                        <p className="font-medium">Analyzing image...</p>
                        <p className="text-xs text-primary-400 mt-1">Checking for inappropriate content</p>
                      </div>
                    )}
                    
                    {profanityResult === 'passed' && (
                      <div className="text-green-600 flex flex-col items-center bg-green-50 w-full p-3 rounded-lg border border-green-100">
                        <CheckCircle2 className="w-6 h-6 mb-1" />
                        <p className="font-medium text-sm">Image approved!</p>
                        <p className="text-xs text-green-700 mt-0.5">Looks great and meets our guidelines.</p>
                      </div>
                    )}

                    {profanityResult === 'failed' && (
                      <div className="text-red-600 flex flex-col items-center bg-red-50 w-full p-3 rounded-lg border border-red-100">
                        <AlertTriangle className="w-6 h-6 mb-1" />
                        <p className="font-medium text-sm">Image rejected</p>
                        <p className="text-xs text-red-700 mt-0.5">This image violates our content guidelines. Please choose another.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 w-full mt-2">
                    <Button variant="outline" className="flex-1" onClick={() => {
                      setTempImage(null);
                      setProfanityResult('idle');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}>
                      Try Another
                    </Button>
                    <Button 
                      className="flex-1" 
                      disabled={profanityResult !== 'passed'}
                      onClick={confirmUpload}
                    >
                      Use Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
