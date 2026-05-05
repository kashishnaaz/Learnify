# 🎓 Learnify

Learnify is a modern, full-stack Learning Management System (LMS) platform where educators can create and manage courses, and students can browse, purchase, and track their learning progress.

👉 [Live Demo](https://learnify-one-bay.vercel.app)

## ✨ Features

- **Authentication & Security:** Secure user login and registration powered by Clerk.
- **Teacher Mode:** Dedicated dashboard for instructors to create, edit, and publish courses.
- **Course Management:** Rich text editor for descriptions (TipTap), drag-and-drop chapter reordering, and file attachments.
- **Video Processing & Streaming:** Seamless video uploads and optimized playback using Mux.
- **Student Dashboard:** Track in-progress and completed courses.
- **Secure Payments:** Integrated with Razorpay for secure course purchases in INR (₹).
- **File Uploads:** Fast and secure file handling with UploadThing.
- **Analytics:** Visualized data for instructors using Recharts.
- **Search & Filter:** Easily find courses by title or category.
- **Responsive UI:** Beautiful, accessible, and responsive design built with Tailwind CSS and Shadcn UI.

## 📂 Project Structure

```text
app/
├── (auth)/             # Authentication routes (login, register)
├── (course)/           # Course viewing and video playback
├── (dashboard)/        # Main application dashboard
│   ├── (root)/         # Student dashboard
│   ├── search/         # Course discovery and filtering
│   └── teacher/        # Instructor course creation & management
├── api/                # API routes (webhooks, uploads, database)
├── globals.css         # Global styles
└── layout.tsx          # Root layout
```

## 🛠️ Tech Stack

### Frontend
- ⚛️ **Framework:** [Next.js](https://nextjs.org/) (App Router)
- 🖥️ **Library:** [React](https://reactjs.org/)
- 🎨 **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- 🧩 **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- 📝 **Rich Text Editor:** [TipTap](https://tiptap.dev/)
- 📊 **Charts:** [Recharts](https://recharts.org/)
- 🗃️ **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)

### Backend
- 🐘 **Database ORM:** [Prisma](https://www.prisma.io/)
- 🗄️ **Database:** PostgreSQL / MySQL (Configured via Prisma)
- 🔒 **Authentication:** [Clerk](https://clerk.com/)
- 💳 **Payments:** [Razorpay](https://razorpay.com/)
- 🎥 **Video Hosting:** [Mux](https://mux.com/)
- ☁️ **File Storage:** [UploadThing](https://uploadthing.com/)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd lms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following keys:

   ```env
   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Database (Neon / PostgreSQL)
   DATABASE_URL=
   DIRECT_URL=

   # File Uploads (UploadThing)
   UPLOADTHING_TOKEN=

   # Video Streaming (Mux)
   MUX_TOKEN_ID=
   MUX_TOKEN_SECRET=

   # Payments (Razorpay)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=
   RAZORPAY_KEY_ID=
   RAZORPAY_KEY_SECRET=
   RAZORPAY_WEBHOOK_SECRET=

   # Application URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

6. **Webhooks Setup (Optional for local development):**
   To test Razorpay webhooks locally, you can use ngrok:
   ```bash
   ngrok http 3000
   ```
   Update the Razorpay dashboard with your ngrok URL (`https://<your-ngrok-url>/api/webhook/razorpay`) and copy the generated Webhook Secret to your `.env` file.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Made by Kashish Naaz**
