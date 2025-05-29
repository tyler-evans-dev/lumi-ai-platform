'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Session, User } from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabase';

// Authentication Context
type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Dual AI Context
type DualAIContextType = {
  horizontalData: any[] | null;
  verticalAnalysis: any[] | null;
  isHorizontalLoading: boolean;
  isVerticalLoading: boolean;
  selectedHorizontalItem: any | null;
  selectedVerticalItem: any | null;
  setSelectedHorizontalItem: (item: any | null) => void;
  setSelectedVerticalItem: (item: any | null) => void;
  refreshHorizontalData: () => Promise<void>;
  refreshVerticalData: () => Promise<void>;
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
});

export const useDualAI = () => useContext(DualAIContext);

// Main Providers Component
export function Providers({ children }: { children: React.ReactNode }) {
  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dual AI state
  const [horizontalData, setHorizontalData] = useState<any[] | null>(null);
  const [verticalAnalysis, setVerticalAnalysis] = useState<any[] | null>(null);
  const [isHorizontalLoading, setIsHorizontalLoading] = useState(false);
  const [isVerticalLoading, setIsVerticalLoading] = useState(false);
  const [selectedHorizontalItem, setSelectedHorizontalItem] = useState<any | null>(null);
  const [selectedVerticalItem, setSelectedVerticalItem] = useState<any | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
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
    };
    
    initializeAuth();
  }, []);

  // Sign out function
  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  // Refresh horizontal data
  const refreshHorizontalData = async () => {
    if (!user) return;
    
    setIsHorizontalLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('horizontal_data')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setHorizontalData(data);
    } catch (error) {
      console.error('Error fetching horizontal data:', error);
    } finally {
      setIsHorizontalLoading(false);
    }
  };

  // Refresh vertical analysis
  const refreshVerticalData = async () => {
    if (!user) return;
    
    setIsVerticalLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('vertical_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setVerticalAnalysis(data);
    } catch (error) {
      console.error('Error fetching vertical analysis:', error);
    } finally {
      setIsVerticalLoading(false);
    }
  };

  // Load initial data when user changes
  useEffect(() => {
    if (user) {
      refreshHorizontalData();
      refreshVerticalData();
    } else {
      setHorizontalData(null);
      setVerticalAnalysis(null);
    }
  }, [user]);

  // When horizontal item changes, update vertical data if needed
  useEffect(() => {
    if (selectedHorizontalItem && user) {
      // Optionally fetch related vertical analyses for the selected horizontal item
      const fetchRelatedVerticalAnalyses = async () => {
        try {
          const { data, error } = await supabaseClient
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
  }, [selectedHorizontalItem, user]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider value={{ session, user, isLoading, signOut }}>
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
          }}
        >
          {children}
        </DualAIContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
