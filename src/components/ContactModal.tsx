import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, MapPin, Scale, Info } from 'lucide-react';
import { Listing } from '../types';
import { CATEGORY_META } from './CategoryVisual';

interface ContactModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  listing,
  isOpen,
  onClose,
}) => {
  const [inquirerName, setInquirerName] = useState('');
  const [inquiryType, setInquiryType] = useState<'pickup' | 'inspection' | 'pricing'>('pickup');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update default message when listing or inquiry type changes
  useEffect(() => {
    if (listing) {
      setSentSuccess(false);
      setError('');
      if (inquiryType === 'pickup') {
        setMessage(`Hello, I am interested in collecting the ${listing.quantity} of ${listing.title}. What days and hours are best for pickup at ${listing.location}?`);
      } else if (inquiryType === 'inspection') {
        setMessage(`Hello, could we inspect the condition of ${listing.title} prior to scheduling transportation?`);
      } else {
        setMessage(`Hello, regarding the indicative asking price of ${listing.price} for ${listing.title}, would you consider an offer for the entire lot?`);
      }
    }
  }, [listing, inquiryType]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !listing) return null;

  const meta = CATEGORY_META[listing.category];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please provide a message for the seller.');
      return;
    }
    setError('');
    setSentSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200/90 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#2D6A4F]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 id="contact-modal-title" className="font-display font-bold text-lg text-stone-900">
                Contact Seller
              </h2>
              <p className="text-xs text-stone-500">
                Direct inquiry for {meta.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listing Context Box */}
        <div className="px-6 pt-4 pb-2 bg-stone-50/70 border-b border-stone-100">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-[#2D6A4F]">
              {meta.name}
            </div>
            <div className="font-display font-bold text-base text-stone-900">
              {listing.title}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 pt-1">
              <span className="flex items-center gap-1 font-mono-numbers">
                <Scale className="w-3.5 h-3.5 text-stone-400" />
                {listing.quantity}
              </span>
              <span className="flex items-center gap-1 truncate max-w-[200px]">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {listing.location}
              </span>
              <span className="font-mono-numbers font-semibold text-stone-900">
                {listing.price}
              </span>
            </div>
          </div>

          {/* Privacy Note: No fake personal numbers */}
          <div className="mt-3 py-2 px-3 bg-white rounded-lg border border-stone-200/80 text-[11px] text-stone-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
            <span>
              <strong>PBL Demo Note:</strong> To protect privacy and adhere to presentation guidelines, inquiries are routed securely through this simulated hub without exposing personal phone numbers or private emails.
            </span>
          </div>
        </div>

        {/* Success Confirmation View */}
        {sentSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#2D6A4F]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-stone-900">
                Inquiry Successfully Logged!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Your message regarding <strong>{listing.title}</strong> has been registered in this demo session. In a live system, the coordinator at <em>{listing.location}</em> would receive an instant notification.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] rounded-lg transition-colors cursor-pointer"
              >
                Return to Marketplace
              </button>
            </div>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSend} className="p-6 space-y-4">
            {error && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {error}
              </p>
            )}

            {/* Inquirer Name */}
            <div>
              <label htmlFor="inquirerName" className="block text-xs font-semibold text-stone-800 mb-1">
                Your Name / Organization <span className="text-stone-400 font-normal">(e.g. Student Recycler, Lab Assistant)</span>
              </label>
              <input
                id="inquirerName"
                type="text"
                value={inquirerName}
                onChange={(e) => setInquirerName(e.target.value)}
                placeholder="e.g. Alex (Materials Workshop)"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900"
              />
            </div>

            {/* Inquiry Intent */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                Inquiry Purpose
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setInquiryType('pickup')}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                    inquiryType === 'pickup'
                      ? 'bg-[#E8F5E9] border-[#2D6A4F] text-[#1B4332] font-semibold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Schedule Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('inspection')}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                    inquiryType === 'inspection'
                      ? 'bg-[#E8F5E9] border-[#2D6A4F] text-[#1B4332] font-semibold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Inspect Quality
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('pricing')}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                    inquiryType === 'pricing'
                      ? 'bg-[#E8F5E9] border-[#2D6A4F] text-[#1B4332] font-semibold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Price / Volume
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label htmlFor="contactMessage" className="block text-xs font-semibold text-stone-800 mb-1">
                Message to Seller <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contactMessage"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900 leading-relaxed"
                required
              />
            </div>

            {/* Form Actions */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] active:bg-[#153427] rounded-lg shadow-xs hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D6A4F] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Demo Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
