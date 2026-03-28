export default function PricingPage() {
  return (
    <main className="max-w-5xl mx-auto px-5 py-14">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Simple, Transparent Pricing</h1>
        <p className="text-zinc-400">Choose the plan that works for you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {/* Free */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
          <h3 className="text-xl font-bold mb-2">Free</h3>
          <div className="text-3xl font-bold mb-1">$0</div>
          <p className="text-zinc-500 text-sm mb-6">Forever free</p>
          <ul className="space-y-3 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>3 generations per day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>5 names per generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span className="text-zinc-600">No history</span>
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 transition">
            Get Started
          </button>
        </div>

        {/* Registered */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
          <h3 className="text-xl font-bold mb-2">Registered</h3>
          <div className="text-3xl font-bold mb-1">$0</div>
          <p className="text-zinc-500 text-sm mb-6">Sign up free</p>
          <ul className="space-y-3 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>10 generations per day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>30-day history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Save up to 5 favorites</span>
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
            Sign Up
          </button>
        </div>

        {/* Pro */}
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500 rounded-2xl p-7 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-900 px-4 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <div className="text-3xl font-bold mb-1">$2.99<span className="text-lg text-zinc-400">/mo</span></div>
          <p className="text-zinc-500 text-sm mb-6">or $19.99/year</p>
          <ul className="space-y-3 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-500">✓</span>
              <span>50 generations per day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">✓</span>
              <span>1-year history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">✓</span>
              <span>Save up to 50 favorites</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">✓</span>
              <span>Name pronunciation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">✓</span>
              <span>Export as image</span>
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-amber-500 text-zinc-900 font-bold hover:bg-amber-400 transition">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <summary className="font-semibold cursor-pointer">What happens when my Pro subscription expires?</summary>
            <p className="mt-3 text-sm text-zinc-400">You can still view your saved history and favorites, but you won't be able to add new ones. Your account will revert to the free registered tier.</p>
          </details>
          <details className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <summary className="font-semibold cursor-pointer">Can I cancel anytime?</summary>
            <p className="mt-3 text-sm text-zinc-400">Yes! You can cancel your subscription at any time. You'll continue to have Pro access until the end of your billing period.</p>
          </details>
          <details className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <summary className="font-semibold cursor-pointer">What payment methods do you accept?</summary>
            <p className="mt-3 text-sm text-zinc-400">We accept all major credit cards through Stripe, including Visa, Mastercard, and American Express.</p>
          </details>
        </div>
      </div>
    </main>
  );
}
