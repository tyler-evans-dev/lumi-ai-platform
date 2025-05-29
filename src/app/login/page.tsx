'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { motion } from 'framer-motion';
import { supabaseClient } from '@/lib/supabase';
import { useAuth } from '@/components/providers';

export default function Login() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // If still loading, show loading spinner
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      {/* Login container with glassmorphism effect */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-xl"
      >
        {/* Logo and branding */}
        <div className="flex flex-col items-center justify-center p-8 border-b border-white/10">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-black/20 backdrop-blur-md"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
              LUMI
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Lumi AI Platform</h1>
          <p className="text-gray-300 text-sm text-center">
            Vertical and Horizontal AI for enhanced intelligence
          </p>
        </div>
        
        {/* Auth UI */}
        <div className="p-6">
          <Auth
            supabaseClient={supabaseClient}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#6366f1',
                    brandAccent: '#818cf8',
                    inputBackground: 'rgba(255, 255, 255, 0.05)',
                    inputBorder: 'rgba(255, 255, 255, 0.1)',
                    inputText: 'white',
                    inputPlaceholder: 'rgba(255, 255, 255, 0.5)',
                  },
                  fonts: {
                    bodyFontFamily: 'var(--font-geist-sans)',
                    buttonFontFamily: 'var(--font-geist-sans)',
                    inputFontFamily: 'var(--font-geist-sans)',
                    labelFontFamily: 'var(--font-geist-sans)',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                  space: {
                    inputPadding: '0.75rem',
                    buttonPadding: '0.75rem',
                  },
                },
              },
              className: {
                button: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200',
                container: 'auth-container',
                label: 'text-gray-300',
                input: 'bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
                message: 'text-purple-400',
                anchor: 'text-blue-400 hover:text-blue-300',
              },
            }}
            providers={['google', 'github']}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`}
            theme="dark"
          />
        </div>
        
        {/* Footer */}
        <div className="p-4 text-center text-gray-400 text-xs border-t border-white/10">
          <p>© {new Date().getFullYear()} Lumi AI. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
