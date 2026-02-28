import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary-950 to-accent-950">
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg" />
          <span className="text-xl font-bold text-white">IdeaNax</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary-500/10 border border-primary-500/20">
          <span className="text-sm font-medium text-primary-300">🚀 Now Open for Creators</span>
        </div>

        <h1 className="max-w-4xl text-5xl sm:text-7xl font-bold text-white leading-tight">
          Turn Your{' '}
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Ideas
          </span>{' '}
          Into Reality
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
          IdeaNax is the premier marketplace where innovators submit, showcase, sell, and license
          their ideas. Protect your intellectual property and monetize your creativity.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link
            href="/register"
            className="px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 rounded-xl shadow-lg shadow-primary-500/25 transition-all duration-200"
          >
            Submit Your Idea
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 text-base font-semibold text-gray-300 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-200"
          >
            Explore Ideas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
          {[
            { title: 'Submit Ideas', desc: 'Share your innovative concepts with the world', icon: '💡' },
            { title: 'Earn Money', desc: 'Monetize your ideas through sales and licensing', icon: '💰' },
            { title: 'Stay Protected', desc: 'Your intellectual property is always secured', icon: '🛡️' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-8 py-6 border-t border-white/10 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <p className="text-sm text-gray-500">© 2024 IdeaNax. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="text-sm text-gray-500 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-sm text-gray-500 hover:text-gray-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
