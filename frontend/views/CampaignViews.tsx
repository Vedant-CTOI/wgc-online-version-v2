import React, { useState, useEffect, useRef } from 'react';
import { Button, PageHeader, Input } from '../components/SharedUI';
import { ViewState, Template, CampaignDraft, UserProfile, StoreInfo } from '../types';
import { MOCK_TEMPLATES, CATEGORIES, ASPECT_RATIOS } from '../constants';
import { Search, Filter, Download, Share2, Copy, Check, Loader2, Image as ImageIcon, MapPin, Phone, X, ChevronLeft, ChevronRight, UploadCloud, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';

interface FlowProps {
  onNavigate: (view: ViewState) => void;
  onSelectTemplate?: (t: Template) => void;
  selectedTemplate?: Template | null;
  draft?: CampaignDraft | null;
  updateDraft?: (updates: Partial<CampaignDraft>) => void;
  user?: UserProfile | null;
}

const GRAY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Cpath d='M50 40a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-20 30l15-20 10 10 20-25 15 35H30z' fill='%239ca3af'/%3E%3C/svg%3E";

// --- Shared Canvas Preview Component ---
const CanvasPreview: React.FC<{ draft: CampaignDraft, template: Template, store: StoreInfo, ratioClass?: string, isMini?: boolean }> = ({ draft, template, store, ratioClass = 'aspect-[4/5]', isMini = false }) => {
  
  // Adjust scale based on aspect ratio to keep text balanced within the available vertical space
  let scale = 1;
  if (ratioClass === 'aspect-video') scale = 0.65; // 16:9 (Wide) - needs smaller text relative to width
  if (ratioClass === 'aspect-[9/16]') scale = 1.3; // 9:16 (Tall) - needs larger text relative to width
  if (ratioClass === 'aspect-[4/5]') scale = 1.1;  // 4:5 (Portrait)
  if (ratioClass === 'aspect-[610/794]') scale = 1.15; // Full Page
  if (ratioClass === 'aspect-[936/709]') scale = 0.8; // Half Page

  const displayLogo = store?.logoUrl || draft.logoUrl;

  return (
    <div 
      className={`w-full ${ratioClass} ${isMini ? 'rounded-md' : 'rounded-lg sm:rounded-xl'} shadow-lg overflow-hidden relative flex flex-col ${template.colorScheme.bg} ${draft.colorMode === 'bw' ? 'grayscale' : ''}`}
      style={{ containerType: 'inline-size' }}
    >
      {/* Header / Logo area */}
      <div className="flex justify-between items-start shrink-0" style={{ padding: `${4 * scale}cqi` }}>
        {displayLogo ? (
          <img src={displayLogo} alt="Logo" className="rounded-full bg-white object-cover shadow-sm" style={{ width: `${12 * scale}cqi`, height: `${12 * scale}cqi` }} />
        ) : (
          <div className="rounded-full bg-white/50 flex items-center justify-center shadow-sm" style={{ width: `${12 * scale}cqi`, height: `${12 * scale}cqi` }}>
            <ImageIcon className="text-gray-500" style={{ width: `${5 * scale}cqi`, height: `${5 * scale}cqi` }} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center min-h-0 overflow-hidden" style={{ padding: `${4 * scale}cqi` }}>
        <h2 className={`font-black uppercase tracking-tight ${template.colorScheme.text} leading-tight line-clamp-3`} style={{ fontSize: `${8 * scale}cqi`, marginBottom: `${2 * scale}cqi` }}>
          {template.defaultText.headline}
        </h2>
        <p className={`font-medium ${template.colorScheme.text} opacity-90 leading-snug line-clamp-2`} style={{ fontSize: `${4 * scale}cqi`, marginBottom: `${4 * scale}cqi` }}>
          {template.defaultText.subheadline}
        </p>
        <div className={`rounded-full font-bold text-white shadow-md ${template.colorScheme.accent} truncate max-w-full shrink-0`} style={{ fontSize: `${3.5 * scale}cqi`, padding: `${1.5 * scale}cqi ${4 * scale}cqi` }}>
          {template.defaultText.offer}
        </div>
      </div>

      {/* Inset Circle for Jewelry */}
      <div 
        className="absolute bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 z-10 flex items-center justify-center overflow-hidden"
        style={{ 
          bottom: `${12 * scale}cqi`, 
          right: `${4 * scale}cqi`, 
          width: `${14 * scale}cqi`, 
          height: `${14 * scale}cqi` 
        }}
      >
        {draft.jewelryImageUrl ? (
          <img src={draft.jewelryImageUrl} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="text-gray-400" style={{ width: `${6 * scale}cqi`, height: `${6 * scale}cqi` }} />
        )}
      </div>

      {/* Footer / Contact area */}
      <div className={`flex flex-col sm:flex-row justify-center items-center font-medium ${template.colorScheme.text} bg-black/5 backdrop-blur-sm shrink-0`} style={{ padding: `${3 * scale}cqi`, gap: `${2 * scale}cqi`, fontSize: `${2.5 * scale}cqi` }}>
        {store?.address && (
          <div className="flex items-center truncate max-w-full">
            <MapPin className="mr-1 flex-shrink-0" style={{ width: `${3 * scale}cqi`, height: `${3 * scale}cqi` }} /> 
            <span className="truncate">{store.address}</span>
          </div>
        )}
        {store?.contactNumber && (
          <div className="flex items-center flex-shrink-0">
            <Phone className="mr-1" style={{ width: `${3 * scale}cqi`, height: `${3 * scale}cqi` }} /> 
            {store.contactNumber}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 1. Gallery View ---
export const GalleryView: React.FC<FlowProps> = ({ onNavigate, onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRatioFilter, setActiveRatioFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = MOCK_TEMPLATES.filter(t => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRatio = activeRatioFilter === 'All' || t.ratioClass === activeRatioFilter;
    return matchesCat && matchesSearch && matchesRatio;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title="Choose a Template" onBack={() => onNavigate('dashboard')} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex overflow-x-auto no-scrollbar space-x-2 w-full sm:w-auto pb-2 sm:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                activeCategory === cat 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={activeRatioFilter}
            onChange={(e) => setActiveRatioFilter(e.target.value)}
            className="pl-3 pr-8 py-2.5 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white"
          >
            <option value="All">All Sizes</option>
            <option value="aspect-[610/794]">Full Page</option>
            <option value="aspect-[936/709]">Half Page</option>
            <option value="aspect-square">Social Media</option>
          </select>
          <div className="relative w-full sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full pl-10 pr-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Masonry Layout for dynamic aspect ratios */}
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
        {filteredTemplates.map(template => (
          <div key={template.id} className="break-inside-avoid mb-6 group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div 
              className={`relative ${template.ratioClass} bg-gray-100 overflow-hidden cursor-pointer flex items-center justify-center`}
              onClick={() => setPreviewTemplate(template)}
            >
              <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 sm:group-hover:opacity-100">
                <Button className="hidden sm:inline-flex" onClick={(e) => { e.stopPropagation(); setPreviewTemplate(template); }}>
                  Preview
                </Button>
              </div>
              {/* Inset circle on the right bottom - Increased size to w-7 h-7 */}
              <div className="absolute bottom-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 z-10"></div>
            </div>
            <div className="p-4 flex flex-col flex-grow border-t border-gray-100 bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{template.category}</span>
                  <h3 className="font-bold text-gray-900 mt-1">{template.name}</h3>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setPreviewTemplate(template); }}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors flex-shrink-0 -mt-1 -mr-2"
                  title="Preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <Button 
                variant="outline" 
                className="mt-auto sm:hidden w-full"
                onClick={() => {
                  if (onSelectTemplate) onSelectTemplate(template);
                  onNavigate('preview');
                }}
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick-View Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/2 bg-gray-100 p-6 sm:p-8 flex items-center justify-center">
              <div className={`w-full ${previewTemplate.ratioClass} relative`}>
                <img src={previewTemplate.thumbnail} alt={previewTemplate.name} className="absolute inset-0 w-full h-full object-cover shadow-md rounded-lg" />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{previewTemplate.category}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">{previewTemplate.name}</h2>
                </div>
                <button onClick={() => setPreviewTemplate(null)} className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-8">This template is perfect for {previewTemplate.category.toLowerCase()} promotions. It includes placeholders for your store logo, address, and contact details.</p>
              
              <div className="mt-auto space-y-3">
                <Button size="lg" fullWidth onClick={() => {
                  if (onSelectTemplate) onSelectTemplate(previewTemplate);
                  onNavigate('preview');
                }}>
                  Customize this Template
                </Button>
                <Button variant="outline" size="lg" fullWidth onClick={() => setPreviewTemplate(null)}>
                  Back to Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 2. Preview & Output Options View (Now Aspect Ratio Selection) ---
export const PreviewView: React.FC<FlowProps> = ({ onNavigate, selectedTemplate, draft, updateDraft, user }) => {
  const [sizeIndex, setSizeIndex] = useState(0);

  if (!selectedTemplate || !draft || !updateDraft || !user) return null;

  // Ensure indices are valid
  useEffect(() => {
    if (sizeIndex >= draft.selectedSizes.length) {
      setSizeIndex(Math.max(0, draft.selectedSizes.length - 1));
    }
  }, [draft.selectedSizes, sizeIndex]);

  const toggleSize = (sizeId: string) => {
    const current = draft.selectedSizes;
    const updated = current.includes(sizeId) 
      ? current.filter(id => id !== sizeId)
      : [...current, sizeId];
    
    if (updated.length > 0) {
      updateDraft({ selectedSizes: updated });
    }
  };

  const nextSize = () => {
    setSizeIndex((prev) => (prev + 1) % draft.selectedSizes.length);
  };

  const prevSize = () => {
    setSizeIndex((prev) => (prev - 1 + draft.selectedSizes.length) % draft.selectedSizes.length);
  };

  const activeSizeId = draft.selectedSizes[sizeIndex] || draft.selectedSizes[0];
  const activeRatio = ASPECT_RATIOS.find(r => r.id === activeSizeId);
  const activeRatioClass = activeRatio?.class || 'aspect-square';
  
  // Dummy data for layout preview
  const dummyStore: StoreInfo = { id: 'dummy', name: 'Your Store Name', address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', contactNumber: '000000000' };
  const dummyDraft = { ...draft, logoUrl: GRAY_PLACEHOLDER };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="px-2 sm:px-0">
        <PageHeader title="Select Aspect Ratio" onBack={() => onNavigate('gallery')} />
      </div>

      {/* Forced Side-by-Side Layout for both Mobile and Desktop */}
      <div className="flex-grow flex flex-row gap-2 sm:gap-8 pb-16 sm:pb-0 overflow-hidden">
        
        {/* Left: Live Preview Stage */}
        <div className="w-1/2 bg-gray-100 rounded-xl sm:rounded-2xl p-2 sm:p-8 flex flex-col items-center justify-center overflow-hidden relative">
          
          {/* Carousel Controls for Aspect Ratios */}
          {draft.selectedSizes.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-1 sm:px-4 z-10 pointer-events-none">
              <button onClick={prevSize} className="pointer-events-auto p-1 sm:p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all">
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button onClick={nextSize} className="pointer-events-auto p-1 sm:p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all">
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}

          <div className="w-full max-w-md transition-all duration-500 flex items-center justify-center">
            <CanvasPreview draft={dummyDraft} template={selectedTemplate} store={dummyStore} ratioClass={activeRatioClass} />
          </div>
          
          <div className="mt-3 sm:mt-6 flex flex-col items-center">
            <p className="text-xs sm:text-sm text-gray-500 font-medium text-center">Previewing: {activeRatio?.name}</p>
            {draft.selectedSizes.length > 1 && (
              <div className="flex gap-1.5 mt-2">
                {draft.selectedSizes.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === sizeIndex ? 'w-4 bg-primary-600' : 'w-1.5 bg-gray-300'}`} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Options Panel */}
        <div className="w-1/2 flex flex-col space-y-3 sm:space-y-8 overflow-y-auto pb-20 sm:pb-0">
          
          {/* Size Selection */}
          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Select Sizes</h3>
            <div className="space-y-2 sm:space-y-3">
              {ASPECT_RATIOS.map(ratio => (
                <label key={ratio.id} className={`flex items-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors min-h-[36px] sm:min-h-[44px] ${draft.selectedSizes.includes(ratio.id) ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={draft.selectedSizes.includes(ratio.id)}
                    onChange={() => toggleSize(ratio.id)}
                  />
                  <span className="ml-2 sm:ml-3 font-medium text-gray-900 text-xs sm:text-sm truncate">{ratio.name}</span>
                  <span className="ml-auto text-[10px] sm:text-xs text-gray-500 hidden sm:inline-block">{ratio.id}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fixed Bottom Bar on Mobile */}
          <div className="absolute sm:static bottom-0 left-0 right-0 p-2 sm:p-4 border-t border-gray-200 bg-white z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:shadow-none sm:mt-auto sm:pt-4 sm:border-t-0 sm:bg-transparent">
            <Button size="sm" className="w-full sm:h-12 sm:text-base" onClick={() => onNavigate('editor')}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Editor View (Now Edit Content) ---
export const EditorView: React.FC<FlowProps> = ({ onNavigate, selectedTemplate, draft, updateDraft, user }) => {
  const [storeEntryMode, setStoreEntryMode] = useState<'saved' | 'manual'>('saved');
  const [manualStore, setManualStore] = useState<StoreInfo>({ id: `manual-${Date.now()}`, name: '', address: '', contactNumber: '', logoUrl: '' });
  
  const [isCheckingJewelry, setIsCheckingJewelry] = useState(false);
  const [showProfanityError, setShowProfanityError] = useState(false);
  const hasFailedJewelry = useRef(false);
  const fileInputRefJewelry = useRef<HTMLInputElement>(null);

  const [previewIndex, setPreviewIndex] = useState(0);

  if (!selectedTemplate || !draft || !updateDraft || !user) return null;

  // Create combinations of selected stores and selected sizes
  const safeStores = draft.selectedStores.length > 0 ? draft.selectedStores : [user.stores[0]];
  const safeSizes = draft.selectedSizes.length > 0 ? draft.selectedSizes : ['1:1'];
  
  const previewCombinations = safeStores.flatMap(store => 
    safeSizes.map(size => ({ store, size }))
  );

  // Ensure previewIndex is valid
  useEffect(() => {
    if (previewIndex >= previewCombinations.length) {
      setPreviewIndex(Math.max(0, previewCombinations.length - 1));
    }
  }, [previewCombinations.length, previewIndex]);

  const handleJewelryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCheckingJewelry(true);
      setTimeout(() => {
        setIsCheckingJewelry(false);
        if (!hasFailedJewelry.current) {
          hasFailedJewelry.current = true;
          setShowProfanityError(true);
        } else {
          const url = URL.createObjectURL(file);
          updateDraft({ jewelryImageUrl: url });
        }
        if (fileInputRefJewelry.current) fileInputRefJewelry.current.value = '';
      }, 1500);
    }
  };

  const toggleStore = (store: StoreInfo) => {
    const current = draft.selectedStores;
    const exists = current.find(s => s.id === store.id);
    let updated;
    if (exists) {
      updated = current.filter(s => s.id !== store.id);
    } else {
      updated = [...current, store];
    }
    
    if (updated.length > 0) {
      updateDraft({ selectedStores: updated });
    }
  };

  const nextPreview = () => {
    setPreviewIndex((prev) => (prev + 1) % previewCombinations.length);
  };

  const prevPreview = () => {
    setPreviewIndex((prev) => (prev - 1 + previewCombinations.length) % previewCombinations.length);
  };

  const activeCombo = previewCombinations[previewIndex] || previewCombinations[0];
  const activeRatio = ASPECT_RATIOS.find(r => r.id === activeCombo.size);
  const activeRatioClass = activeRatio?.class || 'aspect-square';

  // Dummy addresses for saved stores
  const dummyAddresses = [
    { id: 'd1', name: 'Main Branch', address: '123 High Street, Downtown', contactNumber: '98765 43210' },
    { id: 'd2', name: 'Mall Outlet', address: 'Shop 42, City Mall, Westside', contactNumber: '91234 56789' },
    { id: 'd3', name: 'Airport Kiosk', address: 'Terminal 2, International Airport', contactNumber: '99887 77665' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="px-2 sm:px-0">
        <PageHeader title="Edit Content" onBack={() => onNavigate('preview')} />
      </div>

      {/* Side-by-side layout forced on both mobile and desktop */}
      <div className="flex-grow flex flex-row gap-2 sm:gap-8 overflow-hidden pb-16 sm:pb-0">
        
        {/* Left: Canvas Preview */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 rounded-xl sm:rounded-2xl p-2 sm:p-8 overflow-y-auto relative">
          
          {/* Carousel Controls */}
          {previewCombinations.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-1 sm:px-4 z-10 pointer-events-none">
              <button onClick={prevPreview} className="pointer-events-auto p-1 sm:p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all">
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button onClick={nextPreview} className="pointer-events-auto p-1 sm:p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md backdrop-blur-sm transition-all">
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}

          <div className="w-full max-w-md transition-all duration-500 flex items-center justify-center">
            <CanvasPreview draft={draft} template={selectedTemplate} store={activeCombo.store} ratioClass={activeRatioClass} />
          </div>

          <div className="mt-3 sm:mt-6 flex flex-col items-center">
            <p className="text-xs sm:text-sm text-gray-500 font-medium text-center">Previewing: {activeCombo.store.name} ({activeRatio?.name})</p>
            {previewCombinations.length > 1 && (
              <div className="flex gap-1.5 mt-2 flex-wrap justify-center max-w-[80%]">
                {previewCombinations.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === previewIndex ? 'w-4 bg-primary-600' : 'w-1.5 bg-gray-300'}`} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Editing Controls */}
        <div className="w-1/2 flex flex-col bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
          <div className="p-2 sm:p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">Store Details</h3>
          </div>
          
          <div className="p-2 sm:p-6 overflow-y-auto flex-grow space-y-4 sm:space-y-6 pb-20 sm:pb-6">
            
            {/* Jewelry Upload */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Jewelry Piece for Insert</h4>
              <p className="text-xs text-gray-500 mb-3">Best Practices: Use a high-resolution image with a clean, solid background (preferably white or transparent) for best results.</p>
              <div className="flex items-center gap-3">
                {draft.jewelryImageUrl ? (
                  <img src={draft.jewelryImageUrl} className="w-12 h-12 rounded-md object-cover border border-gray-200" />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => fileInputRefJewelry.current?.click()} disabled={isCheckingJewelry}>
                  {isCheckingJewelry ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                  {isCheckingJewelry ? 'Checking...' : 'Upload Image'}
                </Button>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRefJewelry} onChange={handleJewelryUpload} />
              </div>
            </div>

            {/* Store Details */}
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Select Store Addresses</h4>
              
              <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
                <button 
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${storeEntryMode === 'saved' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => setStoreEntryMode('saved')}
                >
                  Select Saved Stores
                </button>
                <button 
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${storeEntryMode === 'manual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => setStoreEntryMode('manual')}
                >
                  Add Manually
                </button>
              </div>

              {storeEntryMode === 'saved' && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 mb-3">Choose one or more stores. We'll generate a separate image for each selected store.</p>
                  {dummyAddresses.map(store => {
                    const isSelected = draft.selectedStores.some(s => s.id === store.id);
                    return (
                      <label key={store.id} className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input 
                          type="checkbox" 
                          className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={isSelected}
                          onChange={() => toggleStore(store)}
                        />
                        <div className="ml-3 flex flex-col">
                          <span className="font-medium text-gray-900 text-sm">{store.name}</span>
                          <span className="text-xs text-gray-500 mt-0.5">{store.address}</span>
                          <span className="text-xs text-gray-500">{store.contactNumber}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {storeEntryMode === 'manual' && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <Input 
                    label="Store Name" 
                    placeholder="e.g. Sharma Electronics"
                    value={manualStore.name}
                    onChange={(e) => setManualStore({...manualStore, name: e.target.value})}
                    maxLength={50}
                  />
                  <Input 
                    label="Store Address" 
                    placeholder="e.g. 123 Main St, City"
                    value={manualStore.address}
                    onChange={(e) => setManualStore({...manualStore, address: e.target.value})}
                    maxLength={100}
                  />
                  <Input 
                    label="Contact Number" 
                    placeholder="e.g. 98765 43210"
                    value={manualStore.contactNumber}
                    onChange={(e) => setManualStore({...manualStore, contactNumber: e.target.value})}
                    maxLength={15}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Fixed Bottom Bar inside the right panel for desktop, or global for mobile */}
          <div className="absolute sm:static bottom-0 left-0 right-0 p-2 sm:p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-2 z-40">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto" onClick={() => onNavigate('preview')}>Back</Button>
            <Button size="sm" className="w-full sm:w-auto" onClick={() => onNavigate('generating')}>
              Generate {draft.selectedSizes.length * draft.selectedStores.length} Images
            </Button>
          </div>
        </div>
      </div>

      {/* Profanity Error Modal */}
      {showProfanityError && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-red-50">
              <h3 className="font-bold text-red-900 flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-red-600" /> Upload Failed</h3>
              <button onClick={() => setShowProfanityError(false)} className="p-1 text-red-400 hover:text-red-900 rounded-full hover:bg-red-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <p className="text-gray-700 mb-6">Image does not match the profanity check so please upload another one.</p>
              <Button fullWidth onClick={() => setShowProfanityError(false)}>Try Again</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 4. Generating Loading View ---
export const GeneratingView: React.FC<FlowProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Simulate generation time
    const timer = setTimeout(() => {
      onNavigate('download');
    }, 3000);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-primary-600 animate-pulse" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Crafting your campaign...</h2>
      <p className="text-gray-500 max-w-md">Applying your brand details and generating high-quality images in all selected sizes.</p>
      
      {/* Skeleton mockups */}
      <div className="mt-12 flex space-x-4 opacity-50">
        <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-12 h-20 bg-gray-200 rounded animate-pulse delay-75"></div>
        <div className="w-24 h-12 bg-gray-200 rounded animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

// --- 5. Download / Success View ---
export const DownloadView: React.FC<FlowProps> = ({ onNavigate, draft, selectedTemplate, user }) => {
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'digital' | 'print'>('digital');
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewItem, setPreviewItem] = useState<{sizeId: string, store: StoreInfo} | null>(null);

  if (!draft || !selectedTemplate || !user) return null;

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const generatedFiles = draft.selectedSizes.flatMap(sizeId => 
    (draft.selectedStores.length > 0 ? draft.selectedStores : [user.stores[0]]).map(store => ({ sizeId, store }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center z-50 transition-all duration-300 transform translate-y-0 opacity-100">
          <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
          <span className="font-medium">Campaign image downloaded successfully!</span>
        </div>
      )}

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Ready!</h1>
        <p className="text-gray-600">Your designs have been generated successfully.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Generated Files</h2>
            <div className="flex items-center mt-3 space-x-4">
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="format" checked={downloadFormat === 'digital'} onChange={() => setDownloadFormat('digital')} className="text-primary-600 focus:ring-primary-500 h-4 w-4" />
                <span className="ml-2 text-sm text-gray-700 font-medium">Digital Use (PNG)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" name="format" checked={downloadFormat === 'print'} onChange={() => setDownloadFormat('print')} className="text-primary-600 focus:ring-primary-500 h-4 w-4" />
                <span className="ml-2 text-sm text-gray-700 font-medium">Print Ready (PDF)</span>
              </label>
            </div>
          </div>
          <Button variant="primary" className="w-full sm:w-auto" onClick={handleDownload}><Download className="w-4 h-4 mr-2" /> Download All (ZIP)</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedFiles.map((file, idx) => {
            const ratio = ASPECT_RATIOS.find(r => r.id === file.sizeId);
            return (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 flex flex-col items-center group hover:border-primary-300 transition-colors">
                <div className="w-full bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                   <CanvasPreview draft={draft} template={selectedTemplate} store={file.store} ratioClass={ratio?.class} isMini={true} />
                </div>
                <div className="w-full flex justify-between items-center mt-auto">
                  <div className="overflow-hidden pr-2">
                    <p className="font-medium text-gray-900 text-sm truncate">{file.store.name}</p>
                    <p className="text-xs text-gray-500">{ratio?.name} • {downloadFormat === 'digital' ? 'PNG' : 'PDF'}</p>
                  </div>
                  <div className="flex space-x-1 flex-shrink-0">
                    <button onClick={() => setPreviewItem(file)} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors flex items-center justify-center" title="Preview">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button onClick={handleDownload} className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors flex items-center justify-center" title="Download">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline" onClick={() => onNavigate('dashboard')}>Back to Dashboard</Button>
        <Button variant="outline" onClick={() => onNavigate('gallery')}>Create Another</Button>
        <Button variant="secondary" onClick={handleCopyLink}>
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
          {copied ? 'Link Copied!' : 'Share Link'}
        </Button>
      </div>

      {/* Full Size Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreviewItem(null)}>
          <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreviewItem(null)} className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-2xl">
              <CanvasPreview 
                draft={draft} 
                template={selectedTemplate} 
                store={previewItem.store} 
                ratioClass={ASPECT_RATIOS.find(r => r.id === previewItem.sizeId)?.class} 
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <Button variant="secondary" onClick={() => setPreviewItem(null)}>Close</Button>
              <Button onClick={() => { handleDownload(); setPreviewItem(null); }}><Download className="w-4 h-4 mr-2" /> Download</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
