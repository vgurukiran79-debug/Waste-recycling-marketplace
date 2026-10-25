import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, PlusCircle, Package } from 'lucide-react';
import { Listing } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: Listing) => void;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
}) => {
  const [materialType, setMaterialType] = useState<'paper' | 'plastic' | 'metal' | 'ewaste'>('paper');
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setSubmittedSuccess(false);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title / material summary is required.';
    } else if (title.trim().length < 4) {
      newErrors.title = 'Title must be at least 4 characters.';
    }

    if (!quantity.trim()) {
      newErrors.quantity = 'Quantity is required (e.g. 50 kg, 20 boxes).';
    }

    if (!location.trim()) {
      newErrors.location = 'Location or campus collection point is required.';
    }

    if (!price.trim()) {
      newErrors.price = 'Indicative asking price is required (e.g. "$15", "Free").';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newListing: Listing = {
      id: `user-${Date.now()}`,
      title: title.trim(),
      category: materialType,
      quantity: quantity.trim(),
      location: location.trim(),
      price: price.trim(),
      condition: condition.trim() || undefined,
      description: description.trim() || undefined,
      contactPerson: contactPerson.trim() || 'Community Recycler',
      isDemo: false,
      createdAt: Date.now(),
    };

    onAddListing(newListing);
    setSubmittedSuccess(true);

    // Reset form fields
    setTitle('');
    setQuantity('');
    setLocation('');
    setPrice('');
    setCondition('');
    setDescription('');
    setContactPerson('');

    // Auto close after brief display
    setTimeout(() => {
      onClose();
      setSubmittedSuccess(false);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200/90 flex items-center justify-between bg-[#F8FAF7]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#2D6A4F]">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="font-display font-bold text-lg text-stone-900">
                List Recyclable Waste
              </h2>
              <p className="text-xs text-stone-500">
                Add materials for local reuse, scrap collection, or recycling
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

        {/* Success Confirmation View */}
        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#2D6A4F]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-stone-900">
                Listing Created Successfully!
              </h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                Saved to your browser storage. It is now visible on the marketplace.
              </p>
            </div>
          </div>
        ) : (
          /* Create Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Top Error Alert if any */}
            {Object.keys(errors).length > 0 && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>Please fill in all required fields marked below.</span>
              </div>
            )}

            {/* Material Category Selection */}
            <div>
              <label htmlFor="materialType" className="block text-xs font-semibold text-stone-800 mb-1">
                Material Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="materialType"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent text-stone-800"
              >
                <option value="paper">Paper & Cardboard</option>
                <option value="plastic">Plastic Polymers</option>
                <option value="metal">Metal & Aluminium</option>
                <option value="ewaste">Electronic Waste</option>
              </select>
            </div>

            {/* Title / Description */}
            <div>
              <label htmlFor="listingTitle" className="block text-xs font-semibold text-stone-800 mb-1">
                Listing Title / Material Description <span className="text-rose-500">*</span>
              </label>
              <input
                id="listingTitle"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder="e.g. Clean Flattened Corrugated Cardboard Bales"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900 ${
                  errors.title ? 'border-rose-300 ring-1 ring-rose-200' : 'border-stone-300'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-rose-600">{errors.title}</p>
              )}
            </div>

            {/* Quantity and Price Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-xs font-semibold text-stone-800 mb-1">
                  Quantity Available <span className="text-rose-500">*</span>
                </label>
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: '' }));
                  }}
                  placeholder="e.g. 50 kg or 30 boxes"
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900 ${
                    errors.quantity ? 'border-rose-300 ring-1 ring-rose-200' : 'border-stone-300'
                  }`}
                />
                {errors.quantity && (
                  <p className="mt-1 text-xs text-rose-600">{errors.quantity}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="block text-xs font-semibold text-stone-800 mb-1">
                  Indicative Asking Price <span className="text-rose-500">*</span>
                </label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
                  }}
                  placeholder="e.g. $15 total or Free"
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900 ${
                    errors.price ? 'border-rose-300 ring-1 ring-rose-200' : 'border-stone-300'
                  }`}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-rose-600">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-xs font-semibold text-stone-800 mb-1">
                Collection Location / Campus Depot <span className="text-rose-500">*</span>
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                }}
                placeholder="e.g. North Campus Logistics Depot Bay 2"
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900 ${
                  errors.location ? 'border-rose-300 ring-1 ring-rose-200' : 'border-stone-300'
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-rose-600">{errors.location}</p>
              )}
            </div>

            {/* Material Condition / Preparation (Optional) */}
            <div>
              <label htmlFor="condition" className="block text-xs font-semibold text-stone-800 mb-1">
                Material Condition <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                id="condition"
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g. Clean & Dry, Rinsed, Baled, Storage Cleared"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900"
              />
            </div>

            {/* Optional Notes / Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-stone-800 mb-1">
                Additional Notes / Pickup Instructions <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specific access hours, pallet availability, or loading dock details..."
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-stone-900"
              />
            </div>

            {/* Footer Form Actions */}
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
                <PlusCircle className="w-4 h-4" />
                <span>Save Listing</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
