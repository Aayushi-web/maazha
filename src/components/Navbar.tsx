import { useState } from 'react'

type NavbarProps = {
  currentPage: 'home' | 'demo'
  query: string
  onQueryChange: (query: string) => void
  onHome: () => void
  onDemo: () => void
  onContact: () => void
  onSearch: () => void
  onLoginClick: () => void  // ADD THIS LINE
}

function Navbar({ 
  currentPage, 
  query, 
  onQueryChange, 
  onHome, 
  onDemo, 
  onContact, 
  onSearch,
  onLoginClick  // ADD THIS PARAMETER
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeAndRun = (action: () => void) => {
    setIsMenuOpen(false)
    action()
  }

  return (
    <header className="mz-header">
      <div className="mz-container mz-header__inner">
        <button className="mz-logo mz-logo--button" type="button" onClick={() => closeAndRun(onHome)}>
          <span className="mz-logo__maa">Maa</span>
          <span className="mz-logo__zha">zha</span>
        </button>

        <label className="mz-header__search">
          <span className="sr-only">Search property</span>
          <input
            type="search"
            value={query}
            placeholder="Search Property"
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={onSearch}
          />
        </label>

        <button
          className="mz-menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={isMenuOpen ? 'mz-header__nav is-open' : 'mz-header__nav'} aria-label="Primary navigation">
          <button
            className={currentPage === 'demo' ? 'is-active' : ''}
            type="button"
            onClick={() => closeAndRun(onDemo)}
          >
            App Demo
          </button>
          <button type="button" onClick={() => closeAndRun(onContact)}>
            Contact Us
          </button>
          
          {/* REPLACE these two buttons with a single Login button */}
          <button 
            className="mz-btn mz-btn--outline mz-btn--sm" 
            type="button"
            onClick={() => closeAndRun(onLoginClick)}
          >
            Login / Signup
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar