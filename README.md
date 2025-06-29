# The Blog - Next.js Blog Platform

A beautiful, modern blog platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful, responsive design with dark/light mode
- 📱 Mobile-first approach
- 🔍 Advanced search and filtering
- 📄 Pagination with customizable items per page
- 🎯 SEO optimized
- ⚡ Fast loading with Next.js optimization
- 🎭 Smooth animations and micro-interactions

## Tech Stack

- **Framework:** Next.js 13 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme:** next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd the-blog
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy your app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── posts/            # Posts pages
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   └── ...              # Custom components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## API

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demo data.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.