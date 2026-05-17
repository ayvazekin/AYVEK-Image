"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { User, ChevronDown, Library, LogOut, X, Search, Grid3X3, LayoutGrid, Calendar, SlidersHorizontal, Download, Trash2, Heart, MoreHorizontal } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'default' | 'large' | 'fullscreen'
}

function Modal({ isOpen, onClose, title, children, size = 'default' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    default: 'max-w-md',
    large: 'max-w-4xl',
    fullscreen: 'max-w-[90vw] max-h-[90vh]'
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        className={`relative bg-neutral-950 border border-neutral-800/50 rounded-3xl w-full ${sizeClasses[size]} shadow-2xl animate-in zoom-in-95 fade-in duration-300 flex flex-col overflow-hidden`}
        style={{ height: size === 'fullscreen' ? '85vh' : 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

// Library Modal Component
function LibraryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites' | 'recent'>('all')

  // Mock data for demonstration - in production this would come from Supabase
  const savedImages: any[] = []

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Library" size="fullscreen">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-800/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center">
            <Library className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-white text-xl font-medium tracking-tight">My Library</h2>
            <p className="text-neutral-500 text-sm">{savedImages.length} creations</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="px-8 py-4 border-b border-neutral-800/30 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search your creations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === 'all'
                ? 'bg-white text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('favorites')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedFilter === 'favorites'
                ? 'bg-white text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Favorites
          </button>
          <button
            onClick={() => setSelectedFilter('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedFilter === 'recent'
                ? 'bg-white text-black'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Recent
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-neutral-900 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-500 hover:text-white'
              }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('masonry')}
            className={`p-2 rounded-md transition-all ${viewMode === 'masonry'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-500 hover:text-white'
              }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {savedImages.length === 0 ? (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center mb-6 shadow-lg">
              <Library className="w-12 h-12 text-neutral-600" />
            </div>
            <h3 className="text-white text-xl font-medium mb-2">Your library is empty</h3>
            <p className="text-neutral-500 text-sm max-w-sm mb-8">
              Start creating amazing images and they will appear here. Your creations are automatically saved.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-all"
            >
              Start Creating
            </button>
          </div>
        ) : (
          /* Image Grid */
          <div className={`grid gap-4 ${viewMode === 'grid'
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 space-y-4'
            }`}>
            {savedImages.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden bg-neutral-900 aspect-square hover:ring-2 hover:ring-white/20 transition-all cursor-pointer"
              >
                {/* Image would go here */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />

                {/* Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all">
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/70 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-8 py-4 border-t border-neutral-800/30 flex items-center justify-between text-sm text-neutral-500">
        <span>Storage: 0 MB used</span>
        <span>Tip: Right-click on any image for more options</span>
      </div>
    </Modal>
  )
}

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLibraryClick = () => {
    setIsOpen(false)
    setShowLibraryModal(true)
  }

  const handleLogoutClick = () => {
    setIsOpen(false)
    setShowLogoutModal(true)
  }

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* User Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition-all group"
        >
          {/* User Avatar */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center shadow-inner">
            <span className="text-[10px] font-medium text-neutral-400">U</span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-400 transition-all duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={handleLibraryClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-neutral-900 transition-all"
            >
              <Library className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium">My Library</span>
            </button>
            <div className="h-px bg-neutral-800" />
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-neutral-900 transition-all"
            >
              <LogOut className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Library Modal */}
      <LibraryModal
        isOpen={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
      />

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Log Out"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <h2 className="text-white text-lg font-medium">Log Out</h2>
          <button
            onClick={() => setShowLogoutModal(false)}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <p className="text-neutral-400 text-sm mb-6">Are you sure you want to log out?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 px-4 py-2.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all text-sm font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

