import React, { useState, useMemo } from 'react';
import { Search, X, PlusCircle, RotateCcw, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Listing, CategoryType } from '../types';
import { ListingCard } from './ListingCard';

interface MarketplaceProps {
  listings: Listing[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onOpenCreate: () => void;
  onContact: (listing: Listing) => void;
  onDeleteListing: (id: string) => void;
  onResetDemoData: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  listings,
  selectedCategory,
  onSelectCategory,
  onOpenCreate,
  onContact,
  onDeleteListing,
  onResetDemoData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'name'>('newest');

  // Categories list
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Materials' },
    { id: 'paper', label: 'Paper & Cardboard' },
    { id: 'plastic', label: 'Plastic' },
    { id: 'metal', label: 'Metal & Aluminium' },
    { id: 'ewaste', label: 'Electronic Waste' },
  ];

  // Filtering & searching
  const filteredListings = useMemo(() => {
    let result = listings.filter((item) => {
      // Category match
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return categoryMatch;

      const titleMatch = item.title.toLowerCase().includes(query);
      const locMatch = item.location.toLowerCase().includes(query);
      const descMatch = (item.description || '').toLowerCase().includes(query);
      const catMatch = item.category.toLowerCase().includes(query);
      const qtyMatch = item.quantity.toLowerCase().includes(query);

      return categoryMatch && (titleMatch || locMatch || descMatch || catMatch || qtyMatch);
    });

    // Sorting
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result = [...result].sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [listings, selectedCategory, searchQuery, sortBy]);

  // Counts
  const demoCount = listings.filter((l) => l.isDemo).length;
  const userCount = listings.filter((l) => !l.isDemo).length;

  return (
    <section id="marketplace" className="py-12 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
              Material Exchange Feed
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Current Recyclable Listings
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Browse available lots or list secondary raw materials for local collection.
            </p>
          </div>

          {/* Quick Action & Storage Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={onResetDemoData}
              className="text-xs font-medium text-stone-500 hover:text-stone-800 flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
              title="Reset data to initial sample set"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Set</span>
            </button>

            <button
              onClick={onOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] active:bg-[#153427] rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ List Waste</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-[#F8FAF7] p-3 sm:p-4 rounded-xl border border-stone-200/90 space-y-3">
          
          {/* Top row: Category segmented buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D6A4F] text-white shadow-2xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Bottom row: Search input & Sorting */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 border-t border-stone-200/60">
            {/* Search Input */}
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by material, condition, location (e.g. Cardboard, HDPE, Campus Depot)..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="sm:col-span-4 flex items-center justify-between sm:justify-end gap-2 text-xs">
              <span className="text-stone-500 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 rounded-lg px-2.5 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              >
                <option value="newest">Newest listings</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Line: unboxed metadata */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-stone-800 font-mono-numbers">{filteredListings.length}</strong> of{' '}
              <span className="font-mono-numbers">{listings.length}</span> total listings
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {userCount > 0 ? `${userCount} custom + ${demoCount} demo` : `${demoCount} demo listings`}
            </span>
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="text-[#2D6A4F] hover:underline font-medium cursor-pointer"
            >
              Reset active filters
            </button>
          )}
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onContact={onContact}
                onDelete={onDeleteListing}
              />
            ))}
          </div>
        ) : (
          /* Sensible Empty State */
          <div className="p-12 text-center bg-[#F8FAF7] rounded-2xl border border-dashed border-stone-300 space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-stone-800">
              No matching recyclable materials found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn't find any listings matching "{searchQuery}". Try selecting another category or clear your search query.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenCreate}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] rounded-lg cursor-pointer"
              >
                List this material
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
