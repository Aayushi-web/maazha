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
type Audience = 'owners' | 'tenants' | 'seekers'


const featureCards = [
    {
        title: 'Rent Collection',
        text: 'Automate invoices, track dues, and keep every payment visible from one calm dashboard.',
        meta: 'Owners',
    },
    {
        title: 'Rent Management',
        text: 'Track rent records, agreements, move-in dates, and renewals without spreadsheet drift.',
        meta: 'Owners',
    },
    {
        title: 'Maintenance Requests',
        text: 'Residents can raise issues with photos while owners track resolution and vendor status.',
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
    'Track occupancy, rent status, and resident records from a single dashboard.',
    'Send rent reminders and keep payment follow-ups simple.',
    'Manage maintenance requests with clear priority and status updates.',
    'View room-wise availability before adding or moving residents.',
    'Understand daily growth, dues, and property performance at a glance.',
]

const renterSteps = [
    'Find available rooms and property details quickly.',
    'Share documents and move-in information without repeated calls.',
    'Pay rent and check receipt history from one account.',
    'Raise maintenance issues and follow every update clearly.',
    'Receive reminders for dues, renewals, and important property notices.',
    'Stay connected with the owner or manager for everyday needs.',
]

const demoJourneys = {
    owners: {
        icon: 'owner',
        tabTitle: 'PG Owners',
        tabText: 'Run properties and teams',
        label: 'Journey 1',
        title: 'For PG Owners',
        intro: 'From the first property setup to monthly reporting, Maazha gives owners one connected place to run PG operations.',
        steps: [
            {
                title: 'Create Your Owner Account',
                text: 'Start with a quick owner profile using your phone number and business details, then enter the management workspace.',
            },
            {
                title: 'Add PG Properties',
                text: 'Create each PG with address, type, facilities, photos, contact details, and public listing preferences.',
            },
            {
                title: 'Build Rooms and Pricing',
                text: 'Add floors, room types, bed counts, amenities, monthly rent, and availability so your inventory stays clear.',
            },
            {
                title: 'Onboard Tenants',
                text: 'Add resident details, documents, emergency contacts, and room assignments from one structured flow.',
            },
            {
                title: 'Send Rent Reminders',
                text: 'Set due dates and let Maazha keep payment follow-ups visible before and on the rent date.',
            },
            {
                title: 'Track Payments',
                text: 'Record full, partial, and advance payments, then review receipts, pending dues, and overdue tenants instantly.',
            },
            {
                title: 'Manage Expenses and Staff',
                text: 'Capture salary, maintenance, electricity, food, and other spending while keeping staff payments organized.',
            },
            {
                title: 'Review Analytics',
                text: 'Watch occupancy, revenue, expenses, profit movement, and property-wise trends from the dashboard.',
            },
        ],
        benefitsTitle: 'What Owners Get',
        benefits: [
            'Multiple PGs and rooms',
            'Rent reminders and dues view',
            'Expense and staff tracking',
            'Occupancy and revenue analytics',
            'Tenant document records',
            'Food menu and notices',
            'Public listing support',
            'Direct tenant communication',
        ],
    },
    tenants: {
        icon: 'tenant',
        tabTitle: 'Tenants',
        tabText: 'Payments and updates',
        label: 'Journey 2',
        title: 'For Tenants',
        intro: 'After an owner adds a tenant, Maazha gives the resident a simple place to check room details, payments, reminders, and updates.',
        steps: [
            {
                title: 'Get Access from Owner',
                text: 'Once the owner adds the tenant record, login details can be shared without a separate manual signup process.',
            },
            {
                title: 'Login to the App',
                text: 'The tenant opens Maazha, signs in, and lands on a dashboard prepared around their room and PG details.',
            },
            {
                title: 'View Stay Details',
                text: 'Room number, rent amount, facilities, food menu, notices, and property information stay easy to find.',
            },
            {
                title: 'Receive Rent Alerts',
                text: 'Tenants see reminders before rent is due, reducing missed dates and back-and-forth calls.',
            },
            {
                title: 'Check Payment History',
                text: 'Every recorded payment can be reviewed with dates, amounts, and receipt details for quick reference.',
            },
            {
                title: 'Stay Connected',
                text: 'Tenants can raise complaints, see owner announcements, and follow updates from the same account.',
            },
        ],
        benefitsTitle: 'What Tenants Get',
        benefits: [
            'Room and PG details',
            'Automatic rent reminders',
            'Payment history and receipts',
            'Owner communication',
            'Complaint tracking',
            'Notices and announcements',
        ],
    },
    seekers: {
        icon: 'search',
        tabTitle: 'PG Seekers',
        tabText: 'Find verified stays',
        label: 'Journey 3',
        title: 'For PG Seekers',
        intro: 'People searching for a PG can browse listed properties, compare important details, and contact owners without a brokerage layer.',
        steps: [
            {
                title: 'Browse PG Listings',
                text: 'Search Maazha listings by city, locality, or PG name to discover available stays near the right area.',
            },
            {
                title: 'Filter and Compare',
                text: 'Narrow results by PG type, budget, facilities, food, parking, and freshness of listing.',
            },
            {
                title: 'Review Full Details',
                text: 'Check room availability, pricing, amenities, food menu, photos, and location details before contacting anyone.',
            },
            {
                title: 'Contact the Owner',
                text: 'Call or message the owner directly to ask questions, confirm availability, and schedule a visit.',
            },
            {
                title: 'Visit and Move In',
                text: 'After the visit and agreement, the owner can onboard the resident into Maazha for ongoing tenant management.',
            },
        ],
        benefitsTitle: 'Ready to Find a PG?',
        benefits: [
            'Verified PG listings',
            'No brokerage flow',
            'Owner contact details',
            'Room and facility comparison',
            'Location-based search',
            'Tenant app after move-in',
        ],
    },
} as const

const ecosystemColumns = [
    {
        icon: 'owner',
        title: 'PG Owner',
        items: ['Adds PGs and rooms', 'Onboards tenants', 'Tracks rent and expenses', 'Publishes listings', 'Receives inquiries'],
    },
    {
        icon: 'tenant',
        title: 'Tenant',
        items: ['Views room and rent', 'Gets reminders', 'Tracks payments', 'Raises requests'],
    },
    {
        icon: 'search',
        title: 'PG Seeker',
        items: ['Browses listings', 'Compares facilities', 'Contacts owner', 'Becomes a tenant'],
    },
]

const demoFaqs = [
    {
        question: 'How do PG owners start using Maazha?',
        answer: 'Owners create an account, add their PG details, set up rooms, and begin adding tenants, rent records, expenses, and notices.',
    },
    {
        question: 'How do tenants access Maazha?',
        answer: 'Tenants get access after the owner adds them to a property and assigns their room details.',
    },
    {
        question: 'Can someone find a PG through Maazha?',
        answer: 'Yes. PG seekers can browse listed properties, compare details, and contact owners directly when listings are public.',
    },
    {
        question: 'Does Maazha support owners, tenants, and seekers together?',
        answer: 'Yes. The owner manages the property, tenants use the resident flow, and seekers discover available PGs from the same ecosystem.',
    },
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
        title: 'Manage Renters',
        text: 'Store documents, map rooms, and keep resident profiles ready for daily use.',
        icon: 'users',
    },
    {
        title: 'Rent & Reminders',
        text: 'Track dues, send reminders, collect rent, and reduce manual payment follow-ups.',
        icon: 'bell',
    },
    {
        title: 'Manage Everything',
        text: 'Review ROI, maintenance, rent activity, occupancy, and reports from one control center.',
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
                        <span className="text-label">One platform for property operations</span>
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
                            Maazha keeps your rooms, rent, expenses, and service requests close at hand with a clean workspace for
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
                    <Stat value="450+" label="Rent records managed" />
                    <Stat value="10+" label="Rooms added per day" />
                </div>
            </section>

            <section className="mz-section mz-work" id="how-maazha-works">
                <div className="mz-container">
                    <div className="mz-section__header mz-work__header">
                        <span className="text-label">How it works</span>
                        <h2 className="text-h1">How Maazha Works for you</h2>
                        <p className="text-body-lg">
                            Whether you manage properties or rent activity, Maazha gives each side a focused workflow while keeping the
                            full rental journey connected.
                        </p>
                    </div>

                    <div className="mz-work__grid">
                        <article className="mz-work-card">
                            <span className="mz-badge mz-badge--blue">For owners</span>
                            <h3 className="text-h3 mz-work-card__title">
                                <span>I'm a Property Manager</span>
                                <span className="mz-work-card__icon" aria-hidden="true">
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path d="M9 22L24 10l15 12v17a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V22z" />
                                        <path d="M19 41V28h10v13" />
                                        <path d="M33 17v-5h5v9" />
                                    </svg>
                                </span>
                            </h3>
                            <p className="text-body">
                                Manage every room, rent payment, expense, and service request with a calm dashboard built for daily control.
                            </p>
                            <ul>
                                {ownerSteps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="mz-work-card">
                            <span className="mz-badge mz-badge--mist">For renters</span>
                            <h3 className="text-h3 mz-work-card__title">
                                <span>I'm a Renter</span>
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
                                {renterSteps.map((step) => (
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
                        {['Rent reconciliation now takes minutes.', 'Maintenance updates are finally traceable.', 'Residents know exactly where to go.'].map(
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
                                        <option value="renters">Rent Management / Resident Support</option>
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
                            <button type="submit" className="mz-btn mz-btn--primary mz-btn--full">Send Message</button>
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
                                
                            </div>

                            <div className="mz-contact-card">
                                <div className="mz-contact-icon">📍</div>
                                <h3>Visit Us</h3>
                                <p>Maazha</p>
                                <address>
                                    
                                Gurugram<br />
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
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
    const activeJourney = demoJourneys[audience]

    return (
        <section className="mz-demo">
            <div className="mz-container">
                <div className="mz-demo__header">
                    <span className="text-label">End-to-end process</span>
                    <h1 className="text-display">How Maazha Works</h1>
                    <p className="text-body-lg">
                        One connected platform for PG owners, residents, and people searching for a PG. Each role gets a focused
                        journey while the information stays linked.
                    </p>
                </div>

                <div className="mz-journey-tabs" role="tablist" aria-label="Choose Maazha journey">
                    {(Object.keys(demoJourneys) as Audience[]).map((journeyKey) => {
                        const journey = demoJourneys[journeyKey]

                        return (
                            <button
                                className={audience === journeyKey ? 'mz-journey-tab is-active' : 'mz-journey-tab'}
                                type="button"
                                role="tab"
                                aria-selected={audience === journeyKey}
                                onClick={() => setAudience(journeyKey)}
                                key={journeyKey}
                            >
                                <span className="mz-journey-tab__icon" aria-hidden="true">
                                    <DemoRoleIcon icon={journey.icon} />
                                </span>
                                <span>
                                    <strong>{journey.tabTitle}</strong>
                                    <small>{journey.tabText}</small>
                                </span>
                            </button>
                        )
                    })}
                </div>

                <article className="mz-journey" aria-live="polite">
                    <div className="mz-journey__header">
                        <span className="mz-badge mz-badge--blue">{activeJourney.label}</span>
                        <h2 className="text-h1">{activeJourney.title}</h2>
                        <p className="text-body-lg">{activeJourney.intro}</p>
                    </div>

                    <div className="mz-journey__steps">
                        {activeJourney.steps.map((step, index) => (
                            <section className="mz-journey-step" key={step.title}>
                                <span className="mz-journey-step__number">{index + 1}</span>
                                <div className="mz-journey-step__content">
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mz-journey__benefits">
                        <h3>{activeJourney.benefitsTitle}</h3>
                        <div className="mz-benefit-grid">
                            {activeJourney.benefits.map((benefit) => (
                                <span className="mz-benefit-tag" key={benefit}>
                                    {benefit}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>

                <section className="mz-ecosystem" aria-label="How Maazha connects each role">
                    <h2 className="text-h1">How It All Connects</h2>
                    <p className="text-body-lg">Owners, tenants, and seekers work in different flows, but Maazha keeps the journey continuous.</p>

                    <div className="mz-ecosystem__grid">
                        <div className="mz-ecosystem-card">
                            <div className="mz-ecosystem-icon" aria-hidden="true">
                                <DemoRoleIcon icon={ecosystemColumns[0].icon} />
                            </div>
                            <h3>{ecosystemColumns[0].title}</h3>
                            <ul>
                                {ecosystemColumns[0].items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mz-ecosystem-center">
                            <div className="mz-ecosystem-logo">Maazha</div>
                            <span>One platform</span>
                            <div className="mz-ecosystem-arrows">
                                Owner adds tenant | Tenant gets access | Seeker contacts owner
                            </div>
                        </div>

                        <div className="mz-ecosystem-card mz-ecosystem-card--stacked">
                            <ul>
                                {ecosystemColumns.slice(1).map((column) => (
                                    <li className="mz-ecosystem-card__group" key={column.title}>
                                        <div className="mz-ecosystem-icon" aria-hidden="true">
                                            <DemoRoleIcon icon={column.icon} />
                                        </div>
                                        <div>
                                            <h3>{column.title}</h3>
                                            <ul>
                                                {column.items.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mz-faq" aria-label="Frequently asked questions">
                    <span className="text-label">Questions</span>
                    <h2 className="text-h1">Frequently Asked Questions</h2>
                    <div className="mz-faq__grid">
                        {demoFaqs.map((faq, index) => (
                            <article className="mz-faq-item" key={faq.question}>
                                <button
                                    type="button"
                                    aria-expanded={openFaqIndex === index}
                                    onClick={() => setOpenFaqIndex((current) => current === index ? null : index)}
                                >
                                    {faq.question}
                                    <span className="mz-faq-icon">{openFaqIndex === index ? '-' : '+'}</span>
                                </button>
                                {openFaqIndex === index && (
                                    <p className="mz-faq-answer">{faq.answer}</p>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mz-demo-cta">
                    <h3>Ready to use Maazha for your PG journey?</h3>
                    <div className="mz-demo-cta__actions">
                        <button className="mz-btn mz-btn--primary mz-btn--lg" type="button">
                            Download Free App
                        </button>
                        <button className="mz-btn mz-btn--ghost mz-btn--lg" type="button">
                            Browse PGs Near You
                        </button>
                    </div>
                    <p className="mz-demo-cta__meta">
                        4.8 rating | Free to start | Direct owner contact
                    </p>
                </section>
            </div>
        </section>
    )
}

type DemoRoleIconProps = {
    icon: string
}

function DemoRoleIcon({ icon }: DemoRoleIconProps) {
    if (icon === 'owner') {
        return (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M9 39V19l15-10 15 10v20" />
                <path d="M17 39V27h14v12" />
                <path d="M15 21h4M29 21h4" />
            </svg>
        )
    }

    if (icon === 'tenant') {
        return (
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 23a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                <path d="M11 40c2-8 7-13 13-13s11 5 13 13" />
                <path d="M34 13h6v8" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 48 48" fill="none">
            <path d="M21 34a13 13 0 1 0 0-26 13 13 0 0 0 0 26z" />
            <path d="M31 31l9 9" />
            <path d="M16 21h10" />
            <path d="M21 16v10" />
        </svg>
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
                            The smartest way to manage properties, collect rent, and control expenses in one place.
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
