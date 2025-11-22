'use client'
import Link from 'next/link'
import Header from '@/components/header'
import { SignInButton, useUser } from '@clerk/nextjs'

function CTAButton({href, style, text}: {href: string, style: string, text: string}) {
  const { isSignedIn } = useUser()
  return (
    <>
      {
        isSignedIn ? 
        <Link href={href} className={style}>
          {text}
        </Link> : 
        <SignInButton mode='modal'>
            <button className={style}>
              {text}
            </button>
          </SignInButton> }
      </>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Navigation */}
        <Header />

        {/* Hero Content */}
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                ✨ AI-Powered Health Insights
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Personal
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Health </span>
              Companion
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Calculate your BMI, track health metrics, and receive personalized AI-powered recommendations for a healthier lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton 
                href='/bmi' 
                style='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105' 
                text="Start Your Health Journey →"
              />
              <a 
                href="#how-it-works"
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 dark:border-gray-700 transition-all"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">AI</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Powered Insights</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">Instant</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Results</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">Smart</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Analytics</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Health Metrics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get detailed insights about your health with our advanced calculation tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                BMI Calculator
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accurate Body Mass Index calculation with health category classification
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Ideal Weight Range
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover your optimal weight range based on your height and body type
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Calorie Needs
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Calculate your BMR and daily calorie requirements for your goals
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                AI Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalized health tips powered by advanced AI technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get personalized health insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Enter Your Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Input your height, weight, age, gender, and activity level
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Get Metrics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive instant calculations for BMI, BMR, and daily calorie needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                AI Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized recommendations and actionable health advice
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <CTAButton 
              href='/bmi' 
              style='cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105' 
              text="Try It Now →"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users taking control of their wellness journey with AI-powered insights
          </p>
          <CTAButton 
            href='/bmi' 
            style='cursor-pointer inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105' 
            text="Start Your Assessment →"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🏥</span>
                <span className="text-2xl font-bold">HealthAI</span>
              </div>
              <p className="text-gray-400">
                Your personal AI-powered health companion for a better lifestyle.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><CTAButton href='/bmi' style='cursor-pointer hover:text-white transition' text="BMI Calculator" /></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How it Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Disclaimer</h4>
              <p className="text-gray-400 text-sm">
                This tool provides educational information only and is not a substitute for professional medical advice.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HealthAI. Made with ❤️ for better health.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}