export interface HealthMetrics {
    bmi?: number
    category?: string
    status?: string
    ideal_weight_min?: number
    ideal_weight_max?: number
    bmr?: number
    tdee?: number
}

export default function Metrics({metrics}: {metrics: HealthMetrics}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-xl">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">BMI</div>
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-2">
            {metrics.bmi} {metrics.status}
        </div>
        <div className="text-lg text-gray-700 dark:text-gray-200">{metrics.category}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-xl">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Ideal Weight Range</div>
        <div className="text-2xl font-bold text-green-600 dark:text-green-300">
            {metrics.ideal_weight_min} - {metrics.ideal_weight_max} kg
        </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-6 rounded-xl">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Basal Metabolic Rate</div>
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            {metrics.bmr} cal/day
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Calories at rest</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 p-6 rounded-xl">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Daily Calorie Needs</div>
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
            {metrics.tdee} cal/day
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">To maintain weight</div>
        </div>
    </div>
  )
}   