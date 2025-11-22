import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export default function Tips({aiTips}: {aiTips: string}) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        🤖 AI Personalized Health Insights
        </h3>
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-medium mb-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-700 dark:text-gray-300" {...props} />,
            }}
        >
        {aiTips}
        </ReactMarkdown>
    </div>
  )
}