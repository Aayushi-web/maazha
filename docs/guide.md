Act as an Expert Frontend Architect and UX/UI Designer. Your task is to generate comprehensive project documentation for a new web application. 

Please provide the output as three distinct Markdown (.md) files: 
1. `design-guidelines.md`
2. `technical-guidelines.md`
3. `best-practices.md`

### Project Overview
* **App Description:** A unified property management platform designed to be "One Platform for Owners and Tenants."
* **Design Philosophy:** Simple, modern, minimalist. The UI must feel clean and uncluttered, utilizing ample whitespace, clear typography, and a cohesive color palette.
* **Component Architecture:** Highly modular and reactive.

### Required Architecture & Components
The application must include the following structure:
* **Global Components:**
  * **Navbar:** Must include a Logo, a "Search Property" bar/button, an "App Demo" link, a "Contact Us" link, and a "Login" button.
  * **Footer:** Clean layout with standard secondary links and copyright info.
* **Main Landing Page:**
  * **Hero Section:** Strong value proposition for owners and tenants with a primary Call to Action (CTA).
  * **Feature Sections:** Multiple distinct sections detailing the core benefits and features of the app for both user types (owners and tenants).
* **App Demo Page:** A dedicated reactive page showcasing a functional preview or interactive walkthrough of the platform.

### Deliverable Requirements

**1. `design-guidelines.md`**
* Define the minimalist visual identity (recommended color palette, typography hierarchy, spacing system, and shadow/border-radius tokens).
* Outline the layout behavior for the required components (Navbar layout, Hero section structure, Feature section alternating layouts).
* Specify reactive behavior guidelines (hover states, focus states, loading skeletons, and mobile responsiveness for the Navbar and search components).

**2. `technical-guidelines.md`**
* Provide a modern tech stack recommendation for a reactive framework (e.g., React, Next.js, or Vue) and a styling solution (e.g., Tailwind CSS).
* Define the component folder structure and file naming conventions.
* Include code-level guidelines for building the specific Navbar, Hero, and App Demo components to ensure maximum reusability and reactive state management.

**3. `best-practices.md`**
* Outline coding standards (linting, formatting, accessibility (a11y) requirements, especially for the "Search Property" input and navigation).
* State management best practices for handling the "Owner" vs. "Tenant" view context.
* Performance optimization tips (lazy loading the App Demo, image optimization for the Hero section, etc.).

Generate the three markdown files with clear headings, code snippets where applicable, and bulleted lists for readability.