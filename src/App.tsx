/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marketplace } from './components/Marketplace';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { CreateListingModal } from './components/CreateListingModal';
import { ContactModal } from './components/ContactModal';
import { Listing, CategoryType } from './types';
import { INITIAL_LISTINGS } from './data/initialListings';
import { CheckCircle2, X } from 'lucide-react';

const STORAGE_KEY = 'waste_recycling_marketplace_v1';

export default function App() {
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved listings from localStorage', e);
    }
    return INITIAL_LISTINGS;
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contactingListing, setContactingListing] = useState<Listing | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync listings with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    } catch (e) {
      console.warn('Failed to save listings to localStorage', e);
    }
  }, [listings]);

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAddListing = (newListing: Listing) => {
    setListings((prev) => [newListing, ...prev]);
    setToastMessage(`"${newListing.title}" was successfully listed on the marketplace!`);
    // Ensure the new category is visible if filtered
    if (selectedCategory !== 'all' && selectedCategory !== newListing.category) {
      setSelectedCategory('all');
    }
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Listing removed from your browser storage.');
  };

  const handleResetDemoData = () => {
    setListings(INITIAL_LISTINGS);
    setSelectedCategory('all');
    setToastMessage('Reset marketplace to original initial sample listings.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-stone-800 font-sans">
      {/* Top Bar Header */}
      <Header onOpenCreate={() => setIsCreateModalOpen(true)} />

      {/* Main 3 Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero
          onOpenCreate={() => setIsCreateModalOpen(true)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Section 2: Marketplace */}
        <Marketplace
          listings={listings}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenCreate={() => setIsCreateModalOpen(true)}
          onContact={(item) => setContactingListing(item)}
          onDeleteListing={handleDeleteListing}
          onResetDemoData={handleResetDemoData}
        />

        {/* Section 3: How It Works */}
        <HowItWorks onOpenCreate={() => setIsCreateModalOpen(true)} />
      </main>

      {/* Footer with project name and College PBL Project */}
      <Footer />

      {/* Create Listing Modal */}
      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddListing={handleAddListing}
      />

      {/* Contact Seller Modal */}
      <ContactModal
        listing={contactingListing}
        isOpen={!!contactingListing}
        onClose={() => setContactingListing(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-stone-900 text-white rounded-xl shadow-lg text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-stone-400 hover:text-white rounded transition-colors cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
