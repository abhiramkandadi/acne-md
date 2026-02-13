

# MD Acne — "The Empathetic Intelligence for Skin Health"

A mobile-first, high-end medical dark mode web app for acne diagnosis simulation, product ingredient checking, and AI consultant chat.

---

## 1. Design System & Theme
- **Dark mode foundation**: Deep charcoal (#0E1117) background, sterile white (#FAFAFA) text, clinical red (#FF4B4B) for alerts, soft teal (#2E8B57) for safe indicators
- **Typography**: Inter font, clean hierarchy optimized for mobile readability
- **UI feel**: Linear.app-inspired — minimal, spacious, premium glass/subtle border effects
- **Empathetic language throughout** — "Active Inflammation" not "Severe," "Healing in Progress" not "Damaged"

## 2. App Layout & Navigation
- **Bottom navigation bar** with 3 tabs: Home (scan icon), Shield (product checker), Chat (consultant)
- **Mobile-first layout** — content optimized for phone screens, responsive up to desktop
- **Smooth page transitions** between tabs

## 3. Home / Dashboard Screen
- Contextual greeting: "Good morning. Let's check your skin health."
- Large, circular **"Scan Face" button** with a slow pulse animation
- Clean, calming layout — minimal elements, maximum focus on the scan action

## 4. Scanner Flow (Simulated)
- **Step 1**: Camera viewfinder simulation UI (dark overlay with scanning frame)
- **Step 2**: "Analyzing..." state with tech-inspired scanning line animation overlaid on a placeholder face image
- **Step 3**: Simulated processing delay (~3 seconds)
- **Step 4**: Transition to the Diagnosis Card

## 5. Diagnosis Card
- Result header: "Inflammatory Acne Detected" with severity indicator
- **"Why is this happening?"** — expandable section with clear medical explanation
- **"Recommended Protocol"** — actionable steps (Salicylic Acid, Benzoyl Peroxide, Blue Light Therapy)
- Privacy note: "This scan was processed locally. No data was stored."
- Option to re-scan or proceed to Product Shield

## 6. Product Shield (Ingredient Checker)
- Product scan simulation button (mimics scanning a bottle)
- **Safe/Unsafe toggle result** with clear visual distinction (teal vs red)
- If unsafe: list of "Pore-Clogging Ingredients Found" highlighted in clinical red
- If safe: green/teal confirmation with "No comedogenic ingredients detected"
- Hardcoded mock results for demo (e.g., detecting Isopropyl Myristate as a clogger)

## 7. Dr. AI Consultant Chat
- Minimal chat interface with "Dr. AI" branding
- Pre-populated conversation starter based on the last diagnosis
- User can type follow-up questions
- Mock AI responses with medically-toned, empathetic answers (hardcoded responses for common questions)
- Clean message bubbles in the dark theme

## 8. All Data is Mocked
- No backend needed for this phase — all scan results, product analyses, and chat responses are hardcoded
- Processing delays are simulated to create realistic demo flow
- Ready for future backend integration when real AI/CV models are added

