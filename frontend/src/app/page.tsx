'use client'

import { useState } from 'react'
import api from '@/lib/api'

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('未测试')
  const [loading, setLoading] = useState(false)

  const testApiConnection = async () => {
    setLoading(true)
    try {
      const response = await api.get('/health')
      setApiStatus('✅ API 连接成功: ' + JSON.stringify(response))
    } catch (error: any) {
      setApiStatus('❌ API 连接失败: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Trade Platform
      </h1>
      <div className="text-center space-y-4">
        <p className="text-gray-600 mb-4">
          欢迎使用交易平台
        </p>
        <p className="text-sm text-gray-500 mb-6">
          前端：Next.js | 后端：Python FastAPI
        </p>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">API 连接测试</h2>
          <p className="text-sm text-gray-600 mb-4">
            当前 API 地址: https://tradingagents.zeabur.app
          </p>
          <button
            onClick={testApiConnection}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? '测试中...' : '测试 API 连接'}
          </button>
          <div className="mt-4 p-3 bg-white rounded border">
            <p className="text-sm">状态: {apiStatus}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
