'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from 'next-themes';
import { Session, User } from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabase';
import { HorizontalData, VerticalAnalysis } from '@/types/supabase';
import { 
  getMockHorizontalData, 
  getMockVerticalAnalysis, 
  MOCK_USER_ID 
} from '@/lib/mock-data';

// Authentication Context
type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  useMockData: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
  useMockData: false,
});

export const useAuth = () => useContext(AuthContext);

// Dual AI Context
type DualAIContextType = {
  horizontalData: HorizontalData[] | null;
  verticalAnalysis: VerticalAnalysis[] | null;
  isHorizontalLoading: boolean;
  isVerticalLoading: boolean;
  selectedHorizontalItem: HorizontalData | null;
  selectedVerticalItem: VerticalAnalysis | null;
  setSelectedHorizontalItem: (item: HorizontalData | null) => void;
  setSelectedVerticalItem: (item: VerticalAnalysis | null) => void;
  refreshHorizontalData: () => Promise<void>;
  refreshVerticalData: () => Promise<void>;
  useMockData: boolean;
};

const DualAIContext = createContext<DualAIContextType>({
  horizontalData: null,
  verticalAnalysis: null,
  isHorizontalLoading: false,
  isVerticalLoading: false,
  selectedHorizontalItem: null,
  selectedVerticalItem: null,
  setSelectedHorizontalItem: () => {},
  setSelectedVerticalItem: () => {},
  refreshHorizontalData: async () => {},
  refreshVerticalData: async () => {},
  useMockData: false,
});

export const useDualAI = () => useContext(DualAIContext);

// Main Providers Component
export function Providers({ children }: { children: React.ReactNode }) {
  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  // Dual AI state
  const [horizontalData, setHorizontalData] = useState<HorizontalData[] | null>(null);
  const [verticalAnalysis, setVerticalAnalysis] = useState<VerticalAnalysis[] | null>(null);
  const [isHorizontalLoading, setIsHorizontalLoading] = useState(false);
  const [isVerticalLoading, setIsVerticalLoading] = useState(false);
  const [selectedHorizontalItem, setSelectedHorizontalItem] = useState<HorizontalData | null>(null);
  const [selectedVerticalItem, setSelectedVerticalItem] = useState<VerticalAnalysis | null>(null);

  // Check if we should use mock data (missing Supabase URL or key)
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://your-supabase-project-url.supabase.co') {
      console.log('Using mock data due to missing or placeholder Supabase credentials');
      setUseMockData(true);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      if (useMockData) {
        // Use mock data with a small delay to simulate loading
        setTimeout(() => {
          setSession(null);
          // Create a mock user
          setUser({
            id: MOCK_USER_ID,
            email: 'demo@lumiaiplatform.com',
            app_metadata: {},
            user_metadata: { full_name: 'Demo User' },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as User);
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        // Set up auth state change listener
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
          (_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
          }
        );
        
        setIsLoading(false);
        
        // Clean up subscription
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUseMockData(true);
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, [useMockData]);

  // Sign out function
  const signOut = async () => {
    if (useMockData) {
      // For mock data, just clear the user state
      setUser(null);
      return;
    }
    
    await supabaseClient.auth.signOut();
  };

  // Refresh horizontal data - using useCallback to memoize the function
  const refreshHorizontalData = useCallback(async () => {
    if (!user) return;
    
    setIsHorizontalLoading(true);
    
    try {
      if (useMockData) {
        // Use mock data with a small delay to simulate loading
        setTimeout(() => {
          setHorizontalData(getMockHorizontalData());
          setIsHorizontalLoading(false);
        }, 800);
        return;
      }
      
      const { data, error } = await supabaseClient
        .from('horizontal_data')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setHorizontalData(data as HorizontalData[]);
    } catch (error) {
      console.error('Error fetching horizontal data:', error);
      
      // Fall back to mock data if there's an error
      if (!useMockData) {
        setHorizontalData(getMockHorizontalData());
      }
    } finally {
      setIsHorizontalLoading(false);
    }
  }, [user, useMockData]);

  // Refresh vertical analysis - using useCallback to memoize the function
  const refreshVerticalData = useCallback(async () => {
    if (!user) return;
    
    setIsVerticalLoading(true);
    
    try {
      if (useMockData) {
        // Use mock data with a small delay to simulate loading
        setTimeout(() => {
          setVerticalAnalysis(getMockVerticalAnalysis());
          setIsVerticalLoading(false);
        }, 1200);
        return;
      }
      
      const { data, error } = await supabaseClient
        .from('vertical_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setVerticalAnalysis(data as VerticalAnalysis[]);
    } catch (error) {
      console.error('Error fetching vertical analysis:', error);
      
      // Fall back to mock data if there's an error
      if (!useMockData) {
        setVerticalAnalysis(getMockVerticalAnalysis());
      }
    } finally {
      setIsVerticalLoading(false);
    }
  }, [user, useMockData]);

  // Load initial data when user changes
  useEffect(() => {
    if (user) {
      refreshHorizontalData();
      refreshVerticalData();
    } else {
      setHorizontalData(null);
      setVerticalAnalysis(null);
    }
  }, [user, refreshHorizontalData, refreshVerticalData]);

  // When horizontal item changes, update vertical data if needed
  useEffect(() => {
    if (selectedHorizontalItem && user) {
      // Optionally fetch related vertical analyses for the selected horizontal item
      const fetchRelatedVerticalAnalyses = async () => {
        try {
          if (useMockData) {
            // In mock mode, we don't need to do anything as the mock data is already related
            return;
          }
          
          const { error } = await supabaseClient
            .from('vertical_analysis')
            .select('*')
            .eq('horizontal_data_id', selectedHorizontalItem.id)
            .eq('user_id', user.id);
            
          if (error) throw error;
          // Do something with the related analyses if needed
        } catch (error) {
          console.error('Error fetching related vertical analyses:', error);
        }
      };
      
      fetchRelatedVerticalAnalyses();
    }
  }, [selectedHorizontalItem, user, useMockData]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider value={{ session, user, isLoading, signOut, useMockData }}>
        <DualAIContext.Provider 
          value={{
            horizontalData,
            verticalAnalysis,
            isHorizontalLoading,
            isVerticalLoading,
            selectedHorizontalItem,
            selectedVerticalItem,
            setSelectedHorizontalItem,
            setSelectedVerticalItem,
            refreshHorizontalData,
            refreshVerticalData,
            useMockData
          }}
        >
          {children}
        </DualAIContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
