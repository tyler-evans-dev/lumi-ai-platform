'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/providers';
import { useDualAI } from '@/components/providers';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import DetailView from '@/components/DetailView';
import { HorizontalData, VerticalAnalysis } from '@/types/supabase';
import { 
  User, 
  LogOut, 
  Settings, 
  Plus, 
  Search, 
  Database, 
  Brain, 
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Maximize,
  Minimize,
  AlertCircle,
  X
} from 'lucide-react';

// Dynamically import the 3D orb component with SSR disabled to avoid hydration issues
const Lumi3DOrb = dynamic(() => import('@/components/Lumi3DOrb'), {
  ssr: false,
  loading: () => (
    <div className="relative w-40 h-40 md:w-60 md:h-60">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse" />
      <div className="absolute inset-2 rounded-full bg-black/10 backdrop-blur-md" />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        LUMI AI
      </div>
    </div>
  )
});

// Main page component
export default function Home() {
  const router = useRouter();
  const { user, isLoading, signOut, useMockData } = useAuth();
  const { 
    horizontalData, 
    verticalAnalysis,
    isHorizontalLoading,
    isVerticalLoading,
    selectedHorizontalItem,
    selectedVerticalItem,
    setSelectedHorizontalItem,
    setSelectedVerticalItem,
    refreshHorizontalData,
    refreshVerticalData
  } = useDualAI();
  
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [detailViewType, setDetailViewType] = useState<'horizontal' | 'vertical' | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  // Redirect to login if not authenticated and not using mock data
  useEffect(() => {
    if (!isLoading && !user && !useMockData) {
      router.push('/login');
    }
  }, [isLoading, user, router, useMockData]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated and not using mock data, return null (will redirect to login)
  if (!user && !useMockData) {
    return null;
  }

  // Toggle panel collapse states
  const toggleLeftPanel = () => setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  const toggleRightPanel = () => setIsRightPanelCollapsed(!isRightPanelCollapsed);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  // Handle item selection
  const handleHorizontalItemClick = (item: HorizontalData) => {
    setSelectedHorizontalItem(item);
    setDetailViewType('horizontal');
    setIsDetailViewOpen(true);
  };

  const handleVerticalItemClick = (item: VerticalAnalysis) => {
    setSelectedVerticalItem(item);
    setDetailViewType('vertical');
    setIsDetailViewOpen(true);
  };

  // Close detail view
  const closeDetailView = () => {
    setIsDetailViewOpen(false);
    // Keep the selected item but close the view
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Demo Mode Banner */}
      {useMockData && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-2 px-4 font-medium"
        >
          <div className="flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            <span>Demo Mode: Using sample data. No authentication required.</span>
          </div>
        </motion.div>
      )}
      
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Lumi AI" 
              width={32} 
              height={32}
              className="rounded-md"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Lumi AI Platform
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors">
                <User size={20} />
                <span className="hidden md:inline-block">
                  {useMockData ? 'Demo User' : user?.email}
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/80 backdrop-blur-xl border border-white/10 invisible group-hover:visible transition-all">
                <div className="py-1">
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-2"
                    onClick={() => router.push('/settings')}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-2 text-red-400"
                    onClick={signOut}
                  >
                    <LogOut size={16} />
                    <span>{useMockData ? 'Exit Demo' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Dual AI Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Horizontal AI - Left Panel */}
        <aside 
          className={`${
            isLeftPanelCollapsed ? 'w-16' : 'w-80'
          } bg-black/40 backdrop-blur-md border-r border-white/10 transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className={`${isLeftPanelCollapsed ? 'hidden' : 'block'} font-semibold text-blue-400`}>
              Horizontal AI
            </h2>
            <button 
              onClick={toggleLeftPanel}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              {isLeftPanelCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
          
          <div className={`${isLeftPanelCollapsed ? 'hidden' : 'flex'} p-4 gap-2`}>
            <input 
              type="text" 
              placeholder="Search data..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors">
              <Search size={16} />
            </button>
          </div>
          
          <div className={`${isLeftPanelCollapsed ? 'hidden' : 'flex'} p-4 justify-between items-center`}>
            <h3 className="text-sm text-gray-400">Data Enrichment</h3>
            <div className="flex gap-2">
              <button 
                onClick={refreshHorizontalData}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                disabled={isHorizontalLoading}
              >
                <RefreshCw size={16} className={isHorizontalLoading ? 'animate-spin' : ''} />
              </button>
              <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLeftPanelCollapsed ? (
              <div className="p-2 flex flex-col items-center gap-2">
                <Database size={20} className="text-blue-400" />
                <Brain size={20} className="text-purple-400" />
              </div>
            ) : horizontalData && horizontalData.length > 0 ? (
              <div className="p-2 space-y-2">
                {horizontalData.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedHorizontalItem?.id === item.id
                        ? 'bg-blue-500/20 border border-blue-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => handleHorizontalItemClick(item)}
                  >
                    <div className="flex items-center gap-2">
                      {item.entity_type === 'company' ? (
                        <Database size={16} className="text-blue-400" />
                      ) : (
                        <User size={16} className="text-green-400" />
                      )}
                      <h4 className="font-medium truncate">{item.name}</h4>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {item.description || 'No description'}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-400">
                <Database size={24} className="mb-2" />
                <p className="text-sm">No data available</p>
                <button 
                  className="mt-2 text-xs text-blue-400 hover:underline"
                  onClick={refreshHorizontalData}
                >
                  {useMockData ? 'Load sample data' : 'Add your first data point'}
                </button>
              </div>
            )}
          </div>
        </aside>
        
        {/* Center Content with 3D Orb */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          <Lumi3DOrb />
          
          <div className="mt-8 text-center max-w-md px-4">
            <h2 className="text-2xl font-bold mb-2">Dual AI Architecture</h2>
            <p className="text-gray-300 text-sm">
              Horizontal AI enriches your data across sources, while Vertical AI provides deep insights through specialized agents.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                className="bg-blue-500/20 backdrop-blur-md border border-blue-500/50 rounded-lg p-3 hover:bg-blue-500/30 transition-colors"
                onClick={() => refreshHorizontalData()}
              >
                <Database size={20} className="mx-auto mb-2" />
                <span className="text-sm">Enrich Data</span>
              </button>
              <button 
                className="bg-purple-500/20 backdrop-blur-md border border-purple-500/50 rounded-lg p-3 hover:bg-purple-500/30 transition-colors"
                onClick={() => refreshVerticalData()}
              >
                <Brain size={20} className="mx-auto mb-2" />
                <span className="text-sm">Analyze Insights</span>
              </button>
            </div>
            
            {useMockData && (
              <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm text-amber-200">
                  <span className="font-bold">Demo Mode Active:</span> Explore the interface with sample data. 
                  {!horizontalData?.length && (
                    <span> Click the buttons above to load sample data.</span>
                  )}
                </p>
              </div>
            )}
          </div>
          
          {/* Background gradient effects */}
          <div className="absolute -z-10 top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute -z-10 bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>
        
        {/* Vertical AI - Right Panel */}
        <aside 
          className={`${
            isRightPanelCollapsed ? 'w-16' : 'w-80'
          } bg-black/40 backdrop-blur-md border-l border-white/10 transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <button 
              onClick={toggleRightPanel}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              {isRightPanelCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
            <h2 className={`${isRightPanelCollapsed ? 'hidden' : 'block'} font-semibold text-purple-400`}>
              Vertical AI
            </h2>
          </div>
          
          <div className={`${isRightPanelCollapsed ? 'hidden' : 'flex'} p-4 justify-between items-center`}>
            <h3 className="text-sm text-gray-400">Deep Analysis</h3>
            <div className="flex gap-2">
              <button 
                onClick={refreshVerticalData}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                disabled={isVerticalLoading}
              >
                <RefreshCw size={16} className={isVerticalLoading ? 'animate-spin' : ''} />
              </button>
              <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isRightPanelCollapsed ? (
              <div className="p-2 flex flex-col items-center gap-2">
                <Brain size={20} className="text-purple-400" />
              </div>
            ) : verticalAnalysis && verticalAnalysis.length > 0 ? (
              <div className="p-2 space-y-2">
                {verticalAnalysis.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedVerticalItem?.id === item.id
                        ? 'bg-purple-500/20 border border-purple-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => handleVerticalItemClick(item)}
                  >
                    <div className="flex items-center gap-2">
                      <Brain size={16} className="text-purple-400" />
                      <h4 className="font-medium truncate">{item.analysis_type}</h4>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-400">
                <Brain size={24} className="mb-2" />
                <p className="text-sm">No analyses available</p>
                <button 
                  className="mt-2 text-xs text-purple-400 hover:underline"
                  onClick={refreshVerticalData}
                >
                  {useMockData ? 'Load sample analyses' : 'Run your first analysis'}
                </button>
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* Detail View Modal */}
      <AnimatePresence>
        {isDetailViewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeDetailView}
            ></div>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-b from-gray-900 to-black rounded-xl border border-white/10 overflow-hidden shadow-xl z-10"
            >
              <button 
                onClick={closeDetailView}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="h-full">
                <DetailView 
                  item={detailViewType === 'horizontal' ? selectedHorizontalItem : selectedVerticalItem}
                  type={detailViewType}
                  onClose={closeDetailView}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
