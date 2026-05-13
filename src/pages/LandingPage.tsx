import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Login/Signup Modal Component
function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)

            // Store user data in localStorage if needed
            localStorage.setItem('userEmail', email)
            localStorage.setItem('isLoggedIn', 'true')
            if (!isLogin) {
                localStorage.setItem('userName', name)
            }

            onClose()
            navigate('/dashboard')
        }, 1500)
    }

    if (!isOpen) return null

    return (
        <div className="mz-modal-overlay" onClick={onClose}>
            <div className="mz-modal" onClick={(e) => e.stopPropagation()}>
                <button className="mz-modal-close" onClick={onClose}>×</button>

                <div className="mz-modal-header">
                    <div className="mz-modal-tabs">
                        <button
                            className={isLogin ? 'is-active' : ''}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={!isLogin ? 'is-active' : ''}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mz-form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="mz-form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mz-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className="mz-modal-forgot">
                            <a href="#">Forgot password?</a>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mz-btn mz-btn--primary mz-btn--full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
                    </button>

                    <p className="mz-modal-note">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button type="button" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up' : 'Login'}
                        </button>
                    </p>
                </form>

                <div className="mz-modal-divider">
                    <span>Or continue with</span>
                </div>

                <div className="mz-modal-social">
                    <button type="button" className="mz-social-btn">Google</button>
                    <button type="button" className="mz-social-btn">Apple</button>
                </div>
            </div>
        </div>
    )
}

type Page = 'home' | 'demo'
type Audience = 'owners' | 'tenants'


const featureCards = [
    {
        title: 'Rent Collection',
        text: 'Automate invoices, track dues, and keep every payment visible from one calm dashboard.',
        meta: 'Owners',
    },
    {
        title: 'Tenant Management',
        text: 'Store tenant records, agreements, move-in dates, and renewals without spreadsheet drift.',
        meta: 'Owners',
    },
    {
        title: 'Maintenance Requests',
        text: 'Tenants can raise issues with photos while owners track resolution and vendor status.',
        meta: 'Shared',
    },
    {
        title: 'Listings & Analytics',
        text: 'Publish available homes, compare occupancy, and spot revenue trends before they become surprises.',
        meta: 'Growth',
    },
]

const ownerSteps = [
    'Add PGs, apartments, hotels, rooms, and unit details in one place.',
    'Track occupancy, rent status, and tenant records from a single dashboard.',
    'Send rent reminders and keep payment follow-ups simple.',
    'Manage maintenance requests with clear priority and status updates.',
    'View room-wise availability before adding or moving tenants.',
    'Understand daily growth, dues, and property performance at a glance.',
]

const tenantSteps = [
    'Find available rooms and property details quickly.',
    'Share documents and move-in information without repeated calls.',
    'Pay rent and check receipt history from one account.',
    'Raise maintenance issues and follow every update clearly.',
    'Receive reminders for dues, renewals, and important property notices.',
    'Stay connected with the owner or manager for everyday needs.',
]

const heroWords = [
    { label: 'PG', tone: 'brand' },
    { label: 'Apartment', tone: 'deep' },
    { label: 'Hotels', tone: 'mist' },
]

const workflowSteps = [
    {
        title: 'Login / Signup',
        text: 'Create your Maazha account and choose the right workspace for property operations.',
        icon: 'login',
    },
    {
        title: 'Add Properties',
        text: 'Add PGs, apartments, hotels, buildings, floors, and room details in a structured flow.',
        icon: 'building',
    },
    {
        title: 'Onboard Tenants',
        text: 'Invite tenants, store documents, map rooms, and keep profiles ready for daily use.',
        icon: 'users',
    },
    {
        title: 'Rent & Reminders',
        text: 'Track dues, send reminders, collect rent, and reduce manual payment follow-ups.',
        icon: 'bell',
    },
    {
        title: 'Manage Everything',
        text: 'Review ROI, maintenance, tenant activity, occupancy, and reports from one control center.',
        icon: 'dashboard',
    },
]

const struggleCards = [
    {
        title: 'Messy Excel Sheets',
        text: 'Lost data, version confusion, manual updates',
    },
    {
        title: 'Missing Rent Dates',
        text: 'Forget reminders, late payments, cash flow issues',
    },
    {
        title: 'Expense Chaos',
        text: 'No tracking, unclear spending, budget overruns',
    },
    {
        title: 'Manual Records',
        text: 'Paper clutter, hard to find, no backups',
    },
]


const LandingPage = () => {
    const [page, setPage] = useState<Page>('home')
    const [audience, setAudience] = useState<Audience>('owners')
    const [query, setQuery] = useState('')
    const [heroWordIndex, setHeroWordIndex] = useState(0)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)


    useEffect(() => {
        const wordTimer = window.setInterval(() => {
            setHeroWordIndex((currentIndex) => (currentIndex + 1) % heroWords.length)
        }, 1800)

        return () => window.clearInterval(wordTimer)
    }, [])

    const showHome = () => {
        setPage('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const showDemo = () => {
        setPage('demo')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const goToContact = () => {
        setPage('home')
        window.setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 0)
    }

    const goToSearch = () => {
        setPage('home')
        window.setTimeout(() => {
            document.getElementById('how-maazha-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 0)
    }

    return (
        <>
            <Navbar
                currentPage={page}
                query={query}
                onQueryChange={setQuery}
                onHome={showHome}
                onDemo={showDemo}
                onContact={goToContact}
                onSearch={goToSearch}
                onLoginClick={() => setIsLoginModalOpen(true)}
            />

            <main>
                {page === 'home' ? (
                    <HomePage
                        onDemo={showDemo}
                        heroWord={heroWords[heroWordIndex].label}
                        heroWordTone={heroWords[heroWordIndex].tone}
                    />
                ) : (
                    <DemoPage audience={audience} setAudience={setAudience} />
                )}
            </main>

            <Footer onDemo={showDemo} onHome={showHome} />

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </>
    )
}

type HomePageProps = {
    onDemo: () => void
    heroWord: string
    heroWordTone: string
}

function HomePage({
    onDemo,
    heroWord,
    heroWordTone,
}: HomePageProps) {
    const [activeWorkflowStep, setActiveWorkflowStep] = useState<number | null>(0)

    return (
        <>
            <section className="mz-hero">
                <div className="mz-container mz-hero__grid">
                    <div className="mz-hero__copy animate-fade-up">
                        <span className="text-label">One platform for owners and tenants</span>
                        <h1 className="text-display mz-hero__headline">
                            <span className="mz-hero__headline-strong">Managing</span>{' '}
                            <span
                                className={`mz-hero__rotating-word mz-hero__rotating-word--${heroWordTone}`}
                                aria-live="polite"
                                key={heroWord}
                            >
                                {heroWord}
                            </span>{' '}
                            <span className="mz-hero__headline-light">on your</span>{' '}
                            <span className="mz-hero__headline-strong">FingerTip</span>
                            <span className="mz-fingertip" aria-hidden="true">
                                <svg viewBox="0 0 64 64" role="img">
                                    <path d="M32 8v10" />
                                    <path d="M45 13l-7 8" />
                                    <path d="M51 27H40" />
                                    <path d="M20 52V30a5 5 0 0 1 10 0v9" />
                                    <path d="M30 39v-6a5 5 0 0 1 10 0v8" />
                                    <path d="M40 41v-4a5 5 0 0 1 10 0v8" />
                                    <path d="M50 45v-3a5 5 0 0 1 8 4v8" />
                                    <path d="M20 52c0 5 4 9 9 9h16c7 0 13-6 13-13" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-body-lg">
                            Maazha keeps your rooms, tenants, payments, and service requests close at hand with a clean workspace for
                            everyday property operations.
                        </p>
                        <div className="mz-hero__actions">
                            <button className="mz-btn mz-btn--primary mz-btn--lg" type="button" onClick={onDemo}>
                                View App Demo
                            </button>
                            <a className="mz-btn mz-btn--ghost mz-btn--lg" href="#how-maazha-works">
                                How Maazha Works
                            </a>
                        </div>
                    </div>

                    <div className="mz-hero__visual mz-hero__gif-shell animate-slide-right" aria-label="Maazha app preview media">
                        <HeroGrowthBanner />
                    </div>
                </div>
            </section>

            <section className="mz-stats" aria-label="Maazha platform statistics">
                <div className="mz-container mz-stats__grid">
                    <Stat value="7+" label="Properties" />
                    <Stat value="200+" label="Rooms" />
                    <Stat value="450+" label="Happy tenants managed" />
                    <Stat value="10+" label="Rooms added per day" />
                </div>
            </section>

            <section className="mz-section mz-work" id="how-maazha-works">
                <div className="mz-container">
                    <div className="mz-section__header mz-work__header">
                        <span className="text-label">How it works</span>
                        <h2 className="text-h1">How Maazha Works for you</h2>
                        <p className="text-body-lg">
                            Whether you manage properties or live in one, Maazha gives each side a focused workflow while keeping the
                            full rental journey connected.
                        </p>
                    </div>

                    <div className="mz-work__grid">
                        <article className="mz-work-card">
                            <span className="mz-badge mz-badge--blue">For owners</span>
                            <h3 className="text-h3 mz-work-card__title">
                                <span>I'm a Property Owner</span>
                                <span className="mz-work-card__icon" aria-hidden="true">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path d="M9 22L24 10l15 12v17a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V22z" />
                                        <path d="M19 41V28h10v13" />
                                        <path d="M33 17v-5h5v9" />
                                    </svg>
                                </span>
                            </h3>
                            <p className="text-body">
                                Manage every room, tenant, payment, and service request with a calm dashboard built for daily control.
                            </p>
                            <ul>
                                {ownerSteps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="mz-work-card">
                            <span className="mz-badge mz-badge--mist">For tenants</span>
                            <h3 className="text-h3 mz-work-card__title">
                                <span>I'm a Tenant</span>
                                <span className="mz-work-card__icon" aria-hidden="true">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path d="M24 24a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                                        <path d="M12 40c2-8 7-12 12-12s10 4 12 12" />
                                        <path d="M35 18h6v8" />
                                        <path d="M41 18l-9 9" />
                                    </svg>
                                </span>
                            </h3>
                            <p className="text-body">
                                Find your stay, handle rent, raise requests, and stay connected with your property team in one place.
                            </p>
                            <ul>
                                {tenantSteps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            <section className="mz-section mz-section--alt">
                <div className="mz-container">
                    <div className="mz-section__header">
                        <span className="text-label">Core features</span>
                        <h2 className="text-h1">Everything important stays visible.</h2>
                    </div>
                    <div className="mz-grid-4">
                        {featureCards.map((feature) => (
                            <article className="mz-card mz-feature-card" key={feature.title}>
                                <span className="mz-badge mz-badge--mist">{feature.meta}</span>
                                <h3 className="text-h3">{feature.title}</h3>
                                <p className="text-body">{feature.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <WorkflowSection activeStep={activeWorkflowStep} onStepChange={setActiveWorkflowStep} />

            <section className="mz-section mz-struggles">
                <div className="mz-container mz-struggles__grid">
                    <div className="mz-struggles__copy">
                        <span className="text-label">The Old Way is Broken</span>
                        <h2 className="text-h1">
                            We Understand Your
                            <span>Daily Struggles</span>
                        </h2>
                        <p className="text-body-lg">
                            Managing a PG shouldn't feel like a full-time job. See how we solve your biggest problems.
                        </p>
                    </div>

                    <div className="mz-struggles__cards">
                        {struggleCards.map((card) => (
                            <article className="mz-struggle-card" key={card.title}>
                                <span aria-hidden="true" />
                                <div>
                                    <h3 className="text-h3">{card.title}</h3>
                                    <p className="text-body">{card.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mz-section mz-testimonials">
                <div className="mz-container">
                    <div className="mz-section__header">
                        <span className="text-label">Trusted by teams</span>
                        <h2 className="text-h1">Built for calmer property operations.</h2>
                    </div>
                    <div className="mz-grid-3">
                        {['Rent reconciliation now takes minutes.', 'Maintenance updates are finally traceable.', 'Tenants know exactly where to go.'].map(
                            (quote, index) => (
                                <figure className="mz-card mz-quote" key={quote}>
                                    <blockquote>{quote}</blockquote>
                                    <figcaption>{['Shivraj Homes(Gurugram)', 'Shiv PG (Pune)', 'Moonlight PG (Pune)'][index]}</figcaption>
                                </figure>
                            ),
                        )}
                    </div>
                </div>
            </section>

            <section className="mz-cta" id="contact">
                <div className="mz-container">
                    <div className="mz-cta__header">
                        <span className="text-label">Contact Us</span>
                        <h2 className="text-h1">Let's talk about your property needs</h2>
                        <p className="text-body-lg">
                            Have questions about Maazha? We're here to help you transform your property management experience.
                        </p>
                    </div>

                    <div className="mz-contact-grid">
                        {/* Contact Form */}
                        <form className="mz-contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We\'ll get back to you soon.'); }}>
                            <div className="mz-form-row">
                                <div className="mz-form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text" id="name" placeholder="John Doe" required />
                                </div>
                                <div className="mz-form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input type="email" id="email" placeholder="john@example.com" required />
                                </div>
                            </div>
                            <div className="mz-form-row">
                                <div className="mz-form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" placeholder="+91 98765 43210" />
                                </div>
                                <div className="mz-form-group">
                                    <label htmlFor="interest">I'm interested in *</label>
                                    <select id="interest" required>
                                        <option value="">Select an option</option>
                                        <option value="owners">Property Management (Owner)</option>
                                        <option value="tenants">Finding/Renting a Property (Tenant)</option>
                                        <option value="partnership">Partnership / Collaboration</option>
                                        <option value="support">Technical Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mz-form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea id="message" rows={4} placeholder="Tell us about your property or what you're looking for..." required></textarea>
                            </div>
                            <button type="submit" className="mz-btn mz-btn--primary mz-btn--full">Send Message →</button>
                            <p className="mz-form-note">We'll respond within 24 hours. No spam, ever.</p>
                        </form>

                        {/* Contact Info Cards */}
                        <div className="mz-contact-info">
                            <div className="mz-contact-card">
                                <div className="mz-contact-icon">📧</div>
                                <h3>Email Us</h3>
                                <p>For general inquiries & support</p>
                                <a href="mailto:aniwesh067@gmail.com">aniwesh067@gmail.com</a>
                                <a href="mailto:support@maazha.com">support@maazha.com</a>
                            </div>

                            <div className="mz-contact-card">
                                <div className="mz-contact-icon">📞</div>
                                <h3>Call Us</h3>
                                <p>Mon-Fri, 10 AM - 7 PM IST</p>
                                <a href="tel:+918697839098">+91 869 783 9098</a>
                                <a href="tel:+911244567890">+91 124 456 7890</a>
                            </div>

                            <div className="mz-contact-card">
                                <div className="mz-contact-icon">📍</div>
                                <h3>Visit Us</h3>
                                <p>Maazha HQ</p>
                                <address>
                                    42 Tech Park, Sector 62,<br />
                                    Noida, Uttar Pradesh - 201301<br />
                                    India
                                </address>
                            </div>

                            <div className="mz-contact-card mz-contact-card--social">
                                <div className="mz-contact-icon">🌐</div>
                                <h3>Connect with us</h3>
                                <div className="mz-contact-social-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

type WorkflowSectionProps = {
    activeStep: number | null
    onStepChange: (stepIndex: number | null) => void
}

function WorkflowSection({ activeStep, onStepChange }: WorkflowSectionProps) {
    const currentStep = activeStep === null ? null : workflowSteps[activeStep]

    return (
        <section className="mz-section mz-workflow-section">
            <div className="mz-container">
                <div className="mz-section__header mz-workflow__header">
                    <span className="text-label">Workflow</span>
                    <h2 className="text-h1">Workflow of MaaZha</h2>
                    <p className="text-body-lg">
                        Move from signup to complete property control through a simple connected journey. Tap any dot to preview
                        that step.
                    </p>
                </div>

                <div className="mz-workflow" aria-label="Clickable MaaZha workflow" onClick={() => onStepChange(null)}>
                    <div className="mz-workflow__control-pill">Complete ROI reporting and maintenance control</div>
                    <svg className="mz-workflow__line" viewBox="0 0 1120 330" aria-hidden="true" preserveAspectRatio="none">
                        <polyline points="70,210 300,100 520,210 745,290 980,160" />
                    </svg>

                    {workflowSteps.map((step, index) => (
                        <button
                            className={`mz-workflow-node mz-workflow-node--${index} ${activeStep === index ? 'is-active' : ''}`}
                            type="button"
                            aria-pressed={activeStep === index}
                            onClick={(event) => {
                                event.stopPropagation()
                                onStepChange(index)
                            }}
                            key={step.title}
                        >
                            <span className="mz-workflow-node__dot">
                                <WorkflowIcon icon={step.icon} />
                            </span>
                            <span className="mz-workflow-node__label">{step.title}</span>
                        </button>
                    ))}

                    {activeStep !== null && currentStep && (
                        <article
                            className={`mz-workflow__detail mz-workflow__detail--${activeStep}`}
                            aria-live="polite"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <span className="mz-badge mz-badge--blue">Step {activeStep + 1}</span>
                            <h3 className="text-h3">{currentStep.title}</h3>
                            <p className="text-body">{currentStep.text}</p>
                        </article>
                    )}
                </div>
            </div>
        </section>
    )
}

type WorkflowIconProps = {
    icon: string
}

function WorkflowIcon({ icon }: WorkflowIconProps) {
    if (icon === 'login') {
        return (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M18 16V9h20v30H18v-7" />
                <path d="M7 24h22" />
                <path d="M22 17l7 7-7 7" />
            </svg>
        )
    }

    if (icon === 'building') {
        return (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M12 40V14h18v26" />
                <path d="M30 22h8v18" />
                <path d="M18 20h2M24 20h2M18 27h2M24 27h2M18 34h2M24 34h2" />
            </svg>
        )
    }

    if (icon === 'users') {
        return (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M19 24a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                <path d="M8 39c2-8 6-12 11-12s9 4 11 12" />
                <path d="M32 24a5 5 0 1 0 0-10" />
                <path d="M31 28c4 1 7 5 8 11" />
            </svg>
        )
    }

    if (icon === 'bell') {
        return (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M15 32V21a9 9 0 0 1 18 0v11l4 5H11l4-5z" />
                <path d="M21 40a4 4 0 0 0 6 0" />
                <path d="M35 13l4-4M13 13 9 9" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 48 48" fill="none">
            <path d="M10 12h28v26H10z" />
            <path d="M16 31h5V21h-5zM27 31h5V17h-5z" />
            <path d="M15 38h18" />
        </svg>
    )
}

function HeroGrowthBanner() {
    const [roomCount, setRoomCount] = useState(0)

    useEffect(() => {
        let animationFrame = 0
        let startTime = 0
        const duration = 2000
        const startDelay = window.setTimeout(() => {
            const step = (timestamp: number) => {
                if (!startTime) {
                    startTime = timestamp
                }

                const progress = Math.min((timestamp - startTime) / duration, 1)
                const easedProgress = 1 - Math.pow(1 - progress, 3)
                setRoomCount(Math.round(easedProgress * 10))

                if (progress < 1) {
                    animationFrame = window.requestAnimationFrame(step)
                }
            }

            animationFrame = window.requestAnimationFrame(step)
        }, 600)

        return () => {
            window.clearTimeout(startDelay)
            window.cancelAnimationFrame(animationFrame)
        }
    }, [])

    return (
        <div className="mz-growth-banner">
            <h2 className="sr-only">
                Animated banner: Adding 10+ rooms per day, fastest growing property management platform
            </h2>
            <div className="mz-growth-banner__shimmer" />

            <div className="mz-growth-banner__left">
                <div className="mz-growth-banner__eyebrow">
                    <span />
                    <strong>Live Growth</strong>
                </div>

                <div className="mz-growth-banner__headline">
                    <span>Adding </span>
                    <span className="mz-growth-banner__count">
                        <span>{roomCount}</span>
                        <span>+</span>
                    </span>
                    <span> rooms</span>
                    <span>per day</span>
                </div>

                <p>Fastest growing property management platform</p>

                <div className="mz-growth-banner__tags" aria-label="Supported property types">
                    <span>PG</span>
                    <span>Apartment</span>
                    <span>Hotel</span>
                </div>
            </div>

            <div className="mz-growth-banner__right" aria-hidden="true">
                <div className="mz-growth-chart">
                    <div className="mz-growth-chart__house">
                        <svg viewBox="0 0 42 42" fill="none">
                            <path
                                d="M21 10L9 20v12h8v-7h8v7h8V20L21 10z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinejoin="round"
                            />
                            <line x1="29" y1="13" x2="29" y2="19" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
                            <line x1="26" y1="16" x2="32" y2="16" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="mz-growth-chart__bars">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>

                    <div className="mz-growth-chart__baseline" />

                    <svg className="mz-growth-chart__trend" viewBox="0 0 164 170" fill="none">
                        <path d="M8 152 Q40 100 72 80 Q104 55 132 20" />
                        <circle cx="132" cy="20" r="4" />
                    </svg>

                    <div className="mz-growth-chart__labels">
                        <span>J</span>
                        <span>F</span>
                        <span>M</span>
                        <span>A</span>
                        <span>M</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

type DemoPageProps = {
    audience: Audience
    setAudience: (audience: Audience) => void
}

function DemoPage({ audience, setAudience }: DemoPageProps) {
    const [activePanel, setActivePanel] = useState('overview')

    const demoData =
        audience === 'owners'
            ? {
                title: 'Owner Command Center',
                subtitle: 'Track revenue, tenant health, and property tasks from one control surface.',
                primaryMetric: 'Rs. 8.4L',
                secondaryMetric: 'monthly collected',
                activity: ['Rent reminder sent to Bluebell Heights', 'Vendor assigned for AC service', 'Lease renewal queued'],
            }
            : {
                title: 'Tenant Home Hub',
                subtitle: 'Pay rent, manage documents, and follow service updates with zero confusion.',
                primaryMetric: '2',
                secondaryMetric: 'open requests',
                activity: ['May rent receipt downloaded', 'Plumbing ticket moved to scheduled', 'Agreement renewal reminder added'],
            }

    return (
        <section className="mz-demo">
            <div className="mz-container mz-demo__grid">
                <div className="mz-demo__intro">
                    <span className="text-label">Reactive app demo</span>
                    <h1 className="text-display">{demoData.title}</h1>
                    <p className="text-body-lg">{demoData.subtitle}</p>

                    <div className="mz-segmented" role="tablist" aria-label="Choose demo audience">
                        <button
                            className={audience === 'owners' ? 'is-active' : ''}
                            type="button"
                            role="tab"
                            aria-selected={audience === 'owners'}
                            onClick={() => setAudience('owners')}
                        >
                            Owners
                        </button>
                        <button
                            className={audience === 'tenants' ? 'is-active' : ''}
                            type="button"
                            role="tab"
                            aria-selected={audience === 'tenants'}
                            onClick={() => setAudience('tenants')}
                        >
                            Tenants
                        </button>
                    </div>

                    <div className="mz-demo__tabs" aria-label="Demo sections">
                        {['overview', 'payments', 'maintenance'].map((panel) => (
                            <button
                                className={activePanel === panel ? 'is-active' : ''}
                                type="button"
                                key={panel}
                                onClick={() => setActivePanel(panel)}
                            >
                                {panel}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mz-demo-screen" aria-live="polite">
                    <div className="mz-demo-screen__topbar">
                        <span />
                        <span />
                        <span />
                    </div>

                    <div className="mz-demo-screen__body">
                        <div className="mz-demo-metric">
                            <span>{demoData.secondaryMetric}</span>
                            <strong>{demoData.primaryMetric}</strong>
                        </div>

                        <div className="mz-demo-panel">
                            <h2 className="text-h3">{activePanel}</h2>
                            <div className="mz-progress" aria-label={`${activePanel} progress`}>
                                <span style={{ width: activePanel === 'overview' ? '82%' : activePanel === 'payments' ? '68%' : '54%' }} />
                            </div>
                            <ul>
                                {demoData.activity.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mz-demo-list">
                            <span className="mz-badge mz-badge--success">Live sync</span>
                            <span className="mz-badge mz-badge--warning">Next action due</span>
                            <span className="mz-badge mz-badge--blue">Verified records</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

type StatProps = {
    value: string
    label: string
}

function Stat({ value, label }: StatProps) {
    return (
        <div className="mz-stat">
            <strong>{value}</strong>
            <span>{label}</span>
        </div>
    )
}



type FooterProps = {
    onDemo: () => void
    onHome: () => void
}

function Footer({ onDemo, onHome }: FooterProps) {
    const year = new Date().getFullYear()

    return (
        <footer className="mz-footer">
            <div className="mz-container">

                {/* Top Grid */}
                <div className="mz-footer__grid">

                    {/* Brand */}
                    <div className="mz-footer__brand">
                        <button className="mz-logo mz-logo--button" type="button" onClick={onHome}>
                            <span className="mz-logo__maa">Maa</span>
                            <span className="mz-logo__zha">zha</span>
                        </button>
                        <p className="mz-footer__tagline">
                            The smartest way to manage properties, collect rent, and keep tenants happy — all in one place.
                        </p>
                        <div className="mz-footer__socials">
                            <a href="#" className="mz-footer__social-btn" aria-label="Twitter">𝕏</a>
                            <a href="#" className="mz-footer__social-btn" aria-label="LinkedIn">in</a>
                            <a href="#" className="mz-footer__social-btn" aria-label="Instagram">ig</a>
                            <a href="#" className="mz-footer__social-btn" aria-label="Facebook">f</a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <p className="mz-footer__col-title">Product</p>
                        <ul className="mz-footer__links">
                            <li><button type="button" onClick={onHome}>Home</button></li>
                            <li><button type="button" onClick={onDemo}>App Demo</button></li>
                            <li><a href="#how-maazha-works">How It Works</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="mz-footer__col-title">Company</p>
                        <ul className="mz-footer__links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <p className="mz-footer__col-title">Support</p>
                        <ul className="mz-footer__links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="mailto:hello@maazha.com">hello@maazha.com</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mz-footer__bottom">
                    <p className="mz-footer__copy">
                        © {year} <span>Maazha</span>. All rights reserved.
                    </p>
                    <p className="mz-footer__built">
                        Built with <span className="mz-footer__built-heart">♥</span> by <strong>Aayushi Mishra</strong>
                    </p>
                    <div className="mz-footer__legal">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default LandingPage;