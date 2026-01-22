'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [text, setText] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) {
      setError('Please enter some text to share')
      return
    }

    if (!deletePassword.trim()) {
      setError('Please enter a delete password')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: text,
          deletePassword: deletePassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create text')
      }

      // Redirect to the newly created text page
      router.push(`/${data.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const characterCount = text.length

  return (
    <main className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='py-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <a href='/' className='flex items-center gap-3 group'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform'>
              <svg
                className='w-5 h-5 text-dark-900'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                />
              </svg>
            </div>
            <span className='text-xl font-semibold tracking-tight'>
              Texts<span className='text-accent-primary'></span>
            </span>
          </a>

          <div className='text-text-muted text-sm'>
            Free • No login • Forever
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className='flex-1 px-4 sm:px-6 lg:px-8 pb-12'>
        <div className='max-w-4xl mx-auto'>
          {/* Hero section */}
          <div className='text-center mb-10 animate-fade-in'>
            <h1 className='text-4xl sm:text-5xl font-bold mb-4 tracking-tight'>
              Share text{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary glow-text'>
                instantly
              </span>
            </h1>
            <p className='text-text-secondary text-lg max-w-xl mx-auto'>
              Paste your text, get a unique URL. Share it anywhere, with anyone.
              Delete anytime with your password.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className='animate-slide-up'
            style={{ animationDelay: '0.1s' }}
          >
            {/* Text area */}
            <div className='relative mb-6'>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Paste or type your text here...'
                className='w-full h-80 p-6 bg-dark-800 border border-white/10 rounded-2xl text-text-primary placeholder:text-text-muted resize-none input-field text-sm leading-relaxed'
                spellCheck={false}
              />

              {/* Character count */}
              <div className='absolute bottom-4 right-4 text-text-muted text-sm font-mono'>
                {characterCount.toLocaleString()} chars
              </div>
            </div>

            {/* Password input */}
            <div className='mb-6'>
              <label className='block text-text-secondary text-sm mb-2 font-medium'>
                Delete Password
                <span className='text-text-muted ml-2 font-normal'>
                  (required to delete this text later)
                </span>
              </label>
              <div className='relative'>
                <input
                  type='password'
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder='Enter a secret password...'
                  className='w-full p-4 bg-dark-800 border border-white/10 rounded-xl text-text-primary placeholder:text-text-muted input-field font-mono text-sm'
                />
                <div className='absolute right-4 top-1/2 -translate-y-1/2'>
                  <svg
                    className='w-5 h-5 text-text-muted'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className='mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3'>
                <svg
                  className='w-5 h-5 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type='submit'
              disabled={isLoading || !text.trim() || !deletePassword.trim()}
              className='w-full py-4 px-6 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-900 font-semibold rounded-xl btn-primary disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent-primary/20 transition-all duration-300'
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-3'>
                  <svg
                    className='w-5 h-5 animate-spin'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                  Creating...
                </span>
              ) : (
                <span className='flex items-center justify-center gap-3'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                    />
                  </svg>
                  Create ShareText Link
                </span>
              )}
            </button>
          </form>

          {/* Features */}
          <div
            className='mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up'
            style={{ animationDelay: '0.3s' }}
          >
            <div className='card p-6 rounded-2xl text-center hover:scale-[1.02] transition-transform'>
              <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-primary/10 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-accent-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold mb-2'>Instant</h3>
              <p className='text-text-muted text-sm'>
                Get a unique URL in seconds. No signup required.
              </p>
            </div>

            <div className='card p-6 rounded-2xl text-center hover:scale-[1.02] transition-transform'>
              <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-primary/10 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-accent-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold mb-2'>Protected</h3>
              <p className='text-text-muted text-sm'>
                Delete your text anytime with your secret password.
              </p>
            </div>

            <div className='card p-6 rounded-2xl text-center hover:scale-[1.02] transition-transform'>
              <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-primary/10 flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-accent-primary'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold mb-2'>Forever</h3>
              <p className='text-text-muted text-sm'>
                Your text stays online until you decide to delete it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='py-6 px-4 sm:px-6 lg:px-8 border-t border-white/5'>
        <div className='max-w-4xl mx-auto text-center text-text-muted text-sm'>
          <p>Texts • Share text online instantly for free</p>
        </div>
      </footer>
    </main>
  )
}
