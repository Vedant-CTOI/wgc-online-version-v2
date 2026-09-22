import React, { useState, useRef } from 'react';
import { Button, PageHeader, Input } from '../components/SharedUI';
import { ViewState, UserProfile, StoreInfo } from '../types';
import { Plus, Image as ImageIcon, Clock, MoreVertical, Download, Heart, Trash2, Edit2, UploadCloud, AlertTriangle, CheckCircle2, X, Loader2, Check, Eye } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onNavigate: (view: ViewState) => void;
  onEditCampaign: (campaign: any) => void;
}

const GRAY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e5e7eb'/%3E%3Cpath d='M200 220a20 20 0 1 0 0-40 20 20 0 0 0 0 40zm-40 60l30-40 20 20 40-50 30 70H160z' fill='%239ca3af'/%3E%3C/svg%3E";

export const DashboardView: React.FC<DashboardProps> = ({ user, onNavigate, onEditCampaign }) => {
  // Mock saved campaigns with dummy data and categories
  const [savedCampaigns, setSavedCampaigns] = useState([
    { id: 'c1', name: 'Diwali Special', date: 'Oct 24, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Diwali', templateId: 't1', ratioClass: 'aspect-[610/794]' },
    { id: 'c2', name: 'Wedding Collection', date: 'Oct 22, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Wedding', templateId: 't2', ratioClass: 'aspect-[936/709]' },
    { id: 'c3', name: 'Concert Tickets', date: 'Oct 15, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Concert', templateId: 't3', ratioClass: 'aspect-square' },
    { id: 'c4', name: 'Office Supplies', date: 'Oct 10, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Office', templateId: 't4', ratioClass: 'aspect-[610/794]' },
    { id: 'c5', name: 'Diwali Gifts', date: 'Oct 05, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Diwali', templateId: 't5', ratioClass: 'aspect-square' },
    { id: 'c6', name: 'Wedding Decor', date: 'Oct 01, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Wedding', templateId: 't6', ratioClass: 'aspect-[936/709]' },
    { id: 'c7', name: 'Music Festival', date: 'Sep 28, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Concert', templateId: 't7', ratioClass: 'aspect-[610/794]' },
    { id: 'c8', name: 'Corporate Event', date: 'Sep 25, 2023', thumbnail: GRAY_PLACEHOLDER, category: 'Office', templateId: 't8', ratioClass: 'aspect-[936/709]' },
  ]);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Multi-select state
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'digital' | 'print'>('digital');
  const [previewCampaign, setPreviewCampaign] = useState<any | null>(null);

  const toggleFilter = (category: string) => {
    setActiveFilter(prev => prev === category ? null : category);
  };

  const filteredCampaigns = activeFilter 
    ? savedCampaigns.filter(c => c.category === activeFilter)
    : savedCampaigns;

  const handleDownload = (e: React.MouseEvent, campaignName: string) => {
    e.stopPropagation();
    alert(`Downloading ${campaignName} as a ZIP file...`);
  };

  const handleDelete = (id: string) => {
    setSavedCampaigns(prev => prev.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  const handleFavorite = (name: string) => {
    alert(`${name} added to favourites!`);
    setOpenMenuId(null);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedCampaignIds([]);
    setOpenMenuId(null);
  };

  const handleCardClick = (campaign: any) => {
    if (isSelectMode) {
      setSelectedCampaignIds(prev => 
        prev.includes(campaign.id) 
          ? prev.filter(id => id !== campaign.id)
          : [...prev, campaign.id]
      );
    } else {
      setPreviewCampaign(campaign);
    }
  };

  const confirmBulkDownload = () => {
    alert(`Downloading ${selectedCampaignIds.length} campaigns as a ${downloadFormat.toUpperCase()} ZIP file...`);
    setShowDownloadModal(false);
    setIsSelectMode(false);
    setSelectedCampaignIds([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onClick={() => setOpenMenuId(null)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user.businessName}</h1>
          <p className="text-gray-600 mt-1">Ready to create your next promotion?</p>
        </div>
        <Button size="lg" onClick={() => onNavigate('gallery')} className="w-full sm:w-auto shadow-md">
          <Plus className="w-5 h-5 mr-2" /> Create New Campaign
        </Button>
      </div>

      {/* Quick Stats / Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {['Wedding', 'Diwali', 'Concert', 'Office'].map((cat) => (
          <div 
            key={cat} 
            onClick={() => toggleFilter(cat)} 
            className={`p-4 rounded-xl border shadow-sm transition-all cursor-pointer flex flex-col items-center justify-center text-center group
              ${activeFilter === cat ? 'bg-primary-50 border-primary-300 shadow-md' : 'bg-white border-gray-200 hover:shadow-md hover:border-primary-300'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
              ${activeFilter === cat ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100'}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className={`font-medium text-sm ${activeFilter === cat ? 'text-primary-700' : 'text-gray-800'}`}>{cat}</span>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Your Recent campaigns {activeFilter && <span className="text-primary-600 font-medium text-lg ml-2">({activeFilter})</span>}
          </h2>
          <div className="flex items-center gap-3">
            {activeFilter && (
              <button onClick={() => setActiveFilter(null)} className="text-sm text-gray-500 hover:text-gray-900">
                Clear filter
              </button>
            )}
            {filteredCampaigns.length > 0 && (
              <Button variant={isSelectMode ? "secondary" : "outline"} size="sm" onClick={toggleSelectMode}>
                {isSelectMode ? 'Cancel Selection' : 'Select'}
              </Button>
            )}
          </div>
        </div>
        
        {filteredCampaigns.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
            {filteredCampaigns.map((campaign) => {
              const isSelected = selectedCampaignIds.includes(campaign.id);
              return (
                <div 
                  key={campaign.id} 
                  className={`break-inside-avoid mb-6 bg-white rounded-xl border shadow-sm overflow-hidden group transition-all cursor-pointer flex flex-col ${isSelectMode && isSelected ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-200 hover:shadow-md'}`}
                  onClick={() => handleCardClick(campaign)}
                >
                  <div className={`${campaign.ratioClass} bg-gray-100 relative overflow-hidden flex items-center justify-center`}>
                    <img src={campaign.thumbnail} alt={campaign.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Selection Checkmark */}
                    {isSelectMode && (
                      <div className="absolute top-3 left-3 z-20">
                        {isSelected ? (
                          <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-sm">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-white/80 border-2 border-gray-300 rounded-full shadow-sm backdrop-blur-sm" />
                        )}
                      </div>
                    )}

                    {/* Hover Actions - Only show if NOT in select mode */}
                    {!isSelectMode && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                          className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors" 
                          title="Preview"
                          onClick={(e) => { e.stopPropagation(); setPreviewCampaign(campaign); }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors" 
                          title="Download"
                          onClick={(e) => handleDownload(e, campaign.name)}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {/* Inset circle on the right bottom */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 z-10"></div>
                  </div>
                  <div className="p-4 flex justify-between items-center relative mt-auto border-t border-gray-100 bg-white">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{campaign.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{campaign.date}</p>
                      <p className="text-xs text-gray-400 mt-0.5">By {user.name || 'User'}</p>
                    </div>
                    
                    {!isSelectMode && (
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === campaign.id ? null : campaign.id);
                        }}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    )}

                    {/* Dropdown Menu */}
                    {openMenuId === campaign.id && !isSelectMode && (
                      <div className="absolute right-4 bottom-12 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10" onClick={e => e.stopPropagation()}>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          onClick={() => handleFavorite(campaign.name)}
                        >
                          <Heart className="w-4 h-4 mr-2 text-gray-400" /> Add to favourites
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                          onClick={() => handleDelete(campaign.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete campaign
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              {activeFilter ? `You haven't created any ${activeFilter} campaigns yet.` : "You haven't created any promotional materials yet."}
            </p>
            <Button onClick={() => onNavigate('gallery')}>Browse Templates</Button>
          </div>
        )}
      </div>

      {/* Floating Action Bar for Bulk Download */}
      {isSelectMode && selectedCampaignIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 z-50">
          <span className="font-medium text-sm whitespace-nowrap">{selectedCampaignIds.length} selected</span>
          <Button size="sm" onClick={() => setShowDownloadModal(true)} className="bg-white text-gray-900 hover:bg-gray-100 border-none whitespace-nowrap">
            <Download className="w-4 h-4 mr-2" /> Download Selected
          </Button>
        </div>
      )}

      {/* Bulk Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Download Campaigns</h3>
              <button onClick={() => setShowDownloadModal(false)} className="p-1 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-sm">Choose your preferred format for the {selectedCampaignIds.length} selected campaigns.</p>
              
              <div className="space-y-3 mb-8">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${downloadFormat === 'digital' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="bulkFormat" checked={downloadFormat === 'digital'} onChange={() => setDownloadFormat('digital')} className="text-primary-600 focus:ring-primary-500 h-4 w-4" />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-gray-900">Digital Use (PNG)</span>
                    <span className="block text-xs text-gray-500 mt-0.5">Best for social media and web</span>
                  </div>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${downloadFormat === 'print' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="bulkFormat" checked={downloadFormat === 'print'} onChange={() => setDownloadFormat('print')} className="text-primary-600 focus:ring-primary-500 h-4 w-4" />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-gray-900">Print Ready (PDF)</span>
                    <span className="block text-xs text-gray-500 mt-0.5">High resolution for physical printing</span>
                  </div>
                </label>
              </div>
              
              <Button fullWidth size="lg" onClick={confirmBulkDownload}>
                <Download className="w-4 h-4 mr-2" /> Download ZIP
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewCampaign && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreviewCampaign(null)}>
          <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreviewCampaign(null)} className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-2xl">
              <div className={`${previewCampaign.ratioClass} relative`}>
                <img src={previewCampaign.thumbnail} alt={previewCampaign.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Button variant="secondary" onClick={() => setPreviewCampaign(null)}>Close</Button>
              <Button onClick={(e) => { handleDownload(e, previewCampaign.name); setPreviewCampaign(null); }}><Download className="w-4 h-4 mr-2" /> Download</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StoreManagementProps {
  user: UserProfile;
  onNavigate: (view: ViewState) => void;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

export const StoreManagementView: React.FC<StoreManagementProps> = ({ user, onNavigate, onUpdateUser }) => {
  const [stores, setStores] = useState<StoreInfo[]>(user.stores || []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [profanityResult, setProfanityResult] = useState<'idle' | 'passed' | 'failed'>('idle');
  const [activeLogoStoreId, setActiveLogoStoreId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddStore = () => {
    setStores([...stores, { id: `s${Date.now()}`, name: '', address: '', contactNumber: '', logoUrl: '' }]);
  };

  const handleRemoveStore = (idToRemove: string) => {
    if (stores.length > 1) {
      setStores(stores.filter(s => s.id !== idToRemove));
    }
  };

  const handleStoreChange = (id: string, field: keyof StoreInfo, value: string) => {
    setStores(stores.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = () => {
    onUpdateUser({ stores });
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
    if (profanityResult === 'passed' && tempImage && activeLogoStoreId) {
      handleStoreChange(activeLogoStoreId, 'logoUrl', tempImage);
      setIsModalOpen(false);
      setTempImage(null);
      setProfanityResult('idle');
      setActiveLogoStoreId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTempImage(null);
    setProfanityResult('idle');
    setActiveLogoStoreId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title="Store Management" onBack={() => onNavigate('dashboard')} />
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <p className="text-gray-600 mb-6">Manage the store details that will be available to auto-fill in your campaigns.</p>
        
        <div className="space-y-6">
          {stores.map((store, index) => (
            <div key={store.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
              {stores.length > 1 && (
                <button 
                  type="button"
                  onClick={() => handleRemoveStore(store.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Store {index + 1}</h4>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                <div className="flex items-center gap-4">
                  {store.logoUrl ? (
                    <img src={store.logoUrl} alt="Store Logo" className="h-16 w-16 object-cover rounded-full shadow-sm border border-gray-200" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <Button variant="outline" size="sm" onClick={() => { setActiveLogoStoreId(store.id); setIsModalOpen(true); }}>
                    {store.logoUrl ? 'Change Logo' : 'Upload Logo'}
                  </Button>
                </div>
              </div>

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
          variant="outline" 
          fullWidth 
          className="mt-6 border-dashed"
          onClick={handleAddStore}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Another Store
        </Button>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
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
