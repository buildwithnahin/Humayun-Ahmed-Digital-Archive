'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ username: string; email: string; created_at: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('http://localhost:5000/api/v1/users/profile', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (!res.ok) {
          throw new Error('Failed to load profile (Please login first)');
        }

        const data = await res.json();
        if (data.success && data.data?.user) {
          setProfile(data.data.user);
        } else {
          setError('Failed to parse profile data.');
        }
      } catch (err: any) {
        setError(err.message || 'Error loading profile.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-neutral-400">Loading your profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bengali text-white mb-4">Error</h1>
        <p className="text-red-400">{error || 'Could not find user profile.'}</p>
        <button 
          onClick={() => router.push('/login')}
          className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-2xl">
      <div className="bg-[#111] border border-white/5 rounded-2xl p-8 shadow-xl">
        <h1 className="text-4xl font-bengali font-bold text-white mb-8">আমার প্রফাইল (Profile)</h1>
        
        <div className="space-y-6">
          <div className="flex border-b border-white/10 pb-4">
            <span className="w-32 text-neutral-400">Username</span>
            <span className="text-white font-medium">{profile.username}</span>
          </div>
          
          <div className="flex border-b border-white/10 pb-4">
            <span className="w-32 text-neutral-400">Email</span>
            <span className="text-white font-medium">{profile.email}</span>
          </div>
          
          <div className="flex border-b border-white/10 pb-4">
            <span className="w-32 text-neutral-400">Joined</span>
            <span className="text-white font-medium">
              {new Date(profile.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
