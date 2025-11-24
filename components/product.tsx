'use client'
import { useState } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import ProductForm, { FormData } from './productform'
import Metrics, { HealthMetrics } from './metrics'
import Tips from './tips'
import Header from './header'
import { Protect, PricingTable } from '@clerk/nextjs';
import AuthGuard from './authguard';

export default function Product() {
  const [formData, setFormData] = useState<FormData>({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    activity_level: 'moderate'
  })
  
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null)
  const [aiTips, setAiTips] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMetrics(null)
    setAiTips('')

    const backendUrl = process.env.NEXT_PUBLIC_IS_DOCKERIZED === "true" ? "http://localhost:8000/api/health-metrics" : "/api/health-metrics"
  
    try {
      await fetchEventSource(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          age: parseInt(formData.age),
          gender: formData.gender,
          activity_level: formData.activity_level
        }),
        
        onmessage(event) {
          try {
            const parsed = JSON.parse(event.data)
            
            if (parsed.type === 'metrics') {
              setMetrics({
                bmi: parsed.bmi,
                category: parsed.category,
                status: parsed.status,
                ideal_weight_min: parsed.ideal_weight_min,
                ideal_weight_max: parsed.ideal_weight_max,
                bmr: parsed.bmr,
                tdee: parsed.tdee
              })
            } else if (parsed.type === 'ai_tip') {
              setAiTips(prev => prev + parsed.content.replace(/\\n/g, '\n'))
            } else if (parsed.type === 'done') {
              // Stream finished
              setLoading(false)
            }
          } catch (e) {
            console.log('Parse error:', e)
          }
        },
        
        onerror(err) {
          console.error('Stream error:', err)
          throw err;
        }
      })
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-[100dvh] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-8">
        <div className='mb-8'>
          <Header />
        </div>
        <Protect
          plan="premium_subscription"
          fallback={
              <div className="container mx-auto px-4 py-12">
                  <header className="text-center mb-12">
                      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                          Choose Your Plan
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                          Unlock unlimited AI-powered Personal Health Companion
                      </p>
                  </header>
                  <div className="max-w-4xl mx-auto">
                      <PricingTable />
                  </div>
              </div>
          }>
          <div className="max-w-4xl mx-auto pb-4">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Health Metrics Calculator
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Calculate your BMI and get personalized AI health insights
              </p>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <ProductForm 
                handleSubmit={handleSubmit} 
                formData={formData} 
                setFormData={setFormData} 
                loading={loading} 
              />
            </div>

            {metrics && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Results
                </h2>
                <Metrics metrics={metrics} />
                {aiTips && (
                  <Tips aiTips={aiTips} />
                )}
              </div>
            )}
          </div>
        </Protect>
      </div>
    </AuthGuard>
  )
}