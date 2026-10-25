import React from 'react';
import { MapPin, Scale, MessageSquare, Trash2, ShieldCheck, Clock } from 'lucide-react';
import { Listing } from '../types';
import { CategoryVisual, CATEGORY_META } from './CategoryVisual';

interface ListingCardProps {
  listing: Listing;
  onContact: (listing: Listing) => void;
  onDelete?: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onContact,
  onDelete,
}) => {
  const meta = CATEGORY_META[listing.category];

  // Format relative timestamp
  const formatTime = (ts: number) => {
    const diffHours = Math.round((Date.now() - ts) / (1000 * 60 * 60));
    if (diffHours <= 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col overflow-hidden">
      {/* Visual illustration top */}
      <div className="relative">
        <CategoryVisual category={listing.category} className="h-36 w-full" />
        
        {/* Top Indicators - Unboxed, clean metadata */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Demo status tag or User listing tag */}
          {listing.isDemo ? (
            <span className="text-[11px] font-medium tracking-wide text-stone-600 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs border border-stone-200/60">
              Demo listing
            </span>
          ) : (
            <span className="text-[11px] font-semibold tracking-wide text-[#2D6A4F] bg-[#E8F5E9]/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs border border-[#2D6A4F]/30">
              New user listing
            </span>
          )}

          {/* Time posted */}
          <span className="text-[11px] text-stone-500 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs">
            {formatTime(listing.createdAt)}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Material Category & Condition Line (No pill badge sandwiches) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span className={`font-semibold ${meta.colorText}`}>
              {meta.name}
            </span>
            {listing.condition && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-600 truncate">{listing.condition}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base text-stone-900 group-hover:text-[#2D6A4F] transition-colors leading-snug line-clamp-1">
            {listing.title}
          </h3>

          {/* Description (if provided) */}
          {listing.description && (
            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
          )}
        </div>

        {/* Quantities & Location Rows */}
        <div className="pt-2 border-t border-stone-100 space-y-1.5 text-xs">
          {/* Quantity */}
          <div className="flex items-center justify-between text-stone-700">
            <span className="text-stone-500 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-stone-400" />
              <span>Available Quantity:</span>
            </span>
            <span className="font-mono-numbers font-semibold text-stone-900">
              {listing.quantity}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between text-stone-700">
            <span className="text-stone-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Location:</span>
            </span>
            <span className="font-medium text-stone-800 text-right max-w-[170px] truncate" title={listing.location}>
              {listing.location}
            </span>
          </div>
        </div>

        {/* Pricing & Contact Footer */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          {/* Indicative Asking Price */}
          <div className="shrink-0">
            <span className="text-[10px] uppercase font-bold text-stone-600 tracking-wider block">
              Indicative Price
            </span>
            <span className="font-mono-numbers font-bold text-base text-[#1B4332]">
              {listing.price}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {!listing.isDemo && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(listing.id)}
                className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete listing"
                aria-label={`Delete listing ${listing.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onContact(listing)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] active:bg-[#153427] rounded-lg shadow-2xs hover:shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F] cursor-pointer shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Seller</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
