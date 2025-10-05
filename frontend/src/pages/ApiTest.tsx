import { useState } from 'react'
import axios from 'axios'
import './ApiTest.css'

interface TestResult {
  name: string
  method: string
  endpoint: string
  status: 'pending' | 'success' | 'failed'
  statusCode?: number
  responseTime?: number
  response?: any
  error?: string
}

const ApiTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [testing, setTesting] = useState(false)
  const [adminToken, setAdminToken] = useState('')

  // 测试数据集
  const testData = {
    adminUser: {
      email: 'admin@example.com',
      password: 'admin123'
    },
    newUser: {
      name: '测试用户',
      email: 'test@example.com',
      password: 'test123'
    },
    newProduct: {
      name: '测试商品',
      description: '这是一个测试商品',
      price: 999,
      image: 'https://via.placeholder.com/300',
      category: '测试分类',
      stock: 10
    }
  }

  // 测试用例配置
  const testCases = [
    {
      name: '1. 管理员登录',
      method: 'POST',
      endpoint: '/api/auth/login',
      data: testData.adminUser,
      requiresAuth: false
    },
    {
      name: '2. 用户注册',
      method: 'POST',
      endpoint: '/api/auth/register',
      data: testData.newUser,
      requiresAuth: false
    },
    {
      name: '3. 获取所有商品',
      method: 'GET',
      endpoint: '/api/products',
      requiresAuth: false
    },
    {
      name: '4. 获取限制数量商品',
      method: 'GET',
      endpoint: '/api/products?limit=3',
      requiresAuth: false
    },
    {
      name: '5. 获取单个商品（需要先获取ID）',
      method: 'GET',
      endpoint: '/api/products/:id',
      requiresAuth: false,
      dynamic: true
    },
    {
      name: '6. 创建商品（管理员）',
      method: 'POST',
      endpoint: '/api/products',
      data: testData.newProduct,
      requiresAuth: true
    },
    {
      name: '7. 更新商品（管理员）',
      method: 'PUT',
      endpoint: '/api/products/:id',
      data: { ...testData.newProduct, price: 1299 },
      requiresAuth: true,
      dynamic: true
    },
    {
      name: '8. 删除商品（管理员）',
      method: 'DELETE',
      endpoint: '/api/products/:id',
      requiresAuth: true,
      dynamic: true
    }
  ]

  const runTest = async (testCase: any, productId?: string) => {
    const startTime = Date.now()

    try {
      let endpoint = testCase.endpoint
      if (testCase.dynamic && productId) {
        endpoint = endpoint.replace(':id', productId)
      }

      const config: any = {
        method: testCase.method,
        url: endpoint,
        data: testCase.data
      }

      if (testCase.requiresAuth && adminToken) {
        config.headers = { Authorization: `Bearer ${adminToken}` }
      }

      const response = await axios(config)
      const responseTime = Date.now() - startTime

      return {
        name: testCase.name,
        method: testCase.method,
        endpoint,
        status: 'success' as const,
        statusCode: response.status,
        responseTime,
        response: response.data
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime

      return {
        name: testCase.name,
        method: testCase.method,
        endpoint: testCase.endpoint,
        status: 'failed' as const,
        statusCode: error.response?.status,
        responseTime,
        error: error.response?.data?.message || error.message
      }
    }
  }

  const runAllTests = async () => {
    setTesting(true)
    setTestResults([])
    const results: TestResult[] = []

    let token = ''
    let testProductId = ''

    for (const testCase of testCases) {
      // 初始化测试结果为 pending
      const pendingResult: TestResult = {
        name: testCase.name,
        method: testCase.method,
        endpoint: testCase.endpoint,
        status: 'pending'
      }
      results.push(pendingResult)
      setTestResults([...results])

      // 等待一下让用户看到进度
      await new Promise(resolve => setTimeout(resolve, 300))

      // 特殊处理：管理员登录后保存 token
      if (testCase.name.includes('管理员登录')) {
        const result = await runTest(testCase)
        if (result.status === 'success' && result.response?.token) {
          token = result.response.token
          setAdminToken(token)
        }
        results[results.length - 1] = result
        setTestResults([...results])
        continue
      }

      // 特殊处理：获取商品列表后保存第一个商品ID
      if (testCase.name.includes('获取所有商品')) {
        const result = await runTest(testCase)
        if (result.status === 'success' && result.response?.[0]?._id) {
          testProductId = result.response[0]._id
        }
        results[results.length - 1] = result
        setTestResults([...results])
        continue
      }

      // 特殊处理：创建商品后保存新商品ID
      if (testCase.name.includes('创建商品')) {
        const result = await runTest(testCase)
        if (result.status === 'success' && result.response?._id) {
          testProductId = result.response._id
        }
        results[results.length - 1] = result
        setTestResults([...results])
        continue
      }

      // 动态测试（需要商品ID）
      if (testCase.dynamic && testProductId) {
        const result = await runTest(testCase, testProductId)
        results[results.length - 1] = result
      } else {
        const result = await runTest(testCase)
        results[results.length - 1] = result
      }

      setTestResults([...results])
    }

    setTesting(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅'
      case 'failed': return '❌'
      case 'pending': return '⏳'
      default: return '⚪'
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return '#28a745'
      case 'POST': return '#007bff'
      case 'PUT': return '#ffc107'
      case 'DELETE': return '#dc3545'
      default: return '#6c757d'
    }
  }

  return (
    <div className="api-test-page">
      <div className="container">
        <div className="test-header">
          <h1>🧪 API 接口测试</h1>
          <button
            className="btn-run-tests"
            onClick={runAllTests}
            disabled={testing}
          >
            {testing ? '测试中...' : '🚀 运行所有测试'}
          </button>
        </div>

        <div className="test-info">
          <h3>📋 测试数据集</h3>
          <div className="test-data-grid">
            <div className="data-card">
              <h4>管理员账户</h4>
              <pre>{JSON.stringify(testData.adminUser, null, 2)}</pre>
            </div>
            <div className="data-card">
              <h4>测试用户</h4>
              <pre>{JSON.stringify(testData.newUser, null, 2)}</pre>
            </div>
            <div className="data-card">
              <h4>测试商品</h4>
              <pre>{JSON.stringify(testData.newProduct, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div className="test-results">
          <h3>📊 测试结果</h3>
          {testResults.length === 0 ? (
            <p className="no-results">点击上方按钮开始测试</p>
          ) : (
            <div className="results-list">
              {testResults.map((result, index) => (
                <div key={index} className={`result-card ${result.status}`}>
                  <div className="result-header">
                    <span className="status-icon">{getStatusIcon(result.status)}</span>
                    <span className="test-name">{result.name}</span>
                    <span
                      className="method-badge"
                      style={{ backgroundColor: getMethodColor(result.method) }}
                    >
                      {result.method}
                    </span>
                  </div>

                  <div className="result-details">
                    <div className="detail-row">
                      <span className="label">端点:</span>
                      <code>{result.endpoint}</code>
                    </div>

                    {result.statusCode && (
                      <div className="detail-row">
                        <span className="label">状态码:</span>
                        <span className={`status-code ${result.status}`}>
                          {result.statusCode}
                        </span>
                      </div>
                    )}

                    {result.responseTime !== undefined && (
                      <div className="detail-row">
                        <span className="label">响应时间:</span>
                        <span>{result.responseTime}ms</span>
                      </div>
                    )}

                    {result.error && (
                      <div className="detail-row error">
                        <span className="label">错误:</span>
                        <span>{result.error}</span>
                      </div>
                    )}

                    {result.response && (
                      <details className="response-details">
                        <summary>查看响应数据</summary>
                        <pre>{JSON.stringify(result.response, null, 2)}</pre>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="test-summary">
          {testResults.length > 0 && (
            <>
              <h3>📈 测试摘要</h3>
              <div className="summary-stats">
                <div className="stat-card">
                  <div className="stat-value">{testResults.length}</div>
                  <div className="stat-label">总测试数</div>
                </div>
                <div className="stat-card success">
                  <div className="stat-value">
                    {testResults.filter(r => r.status === 'success').length}
                  </div>
                  <div className="stat-label">成功</div>
                </div>
                <div className="stat-card failed">
                  <div className="stat-value">
                    {testResults.filter(r => r.status === 'failed').length}
                  </div>
                  <div className="stat-label">失败</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">
                    {testResults.filter(r => r.responseTime).reduce((acc, r) => acc + (r.responseTime || 0), 0) / testResults.filter(r => r.responseTime).length || 0}ms
                  </div>
                  <div className="stat-label">平均响应时间</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApiTest
