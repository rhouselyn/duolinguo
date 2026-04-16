import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, BookOpen, BarChart2, Clock, Award } from 'lucide-react';

// 模拟进度数据
const mockProgress = {
  fileId: '1',
  title: '日常英语对话',
  totalModules: 5,
  completedModules: 3,
  totalWords: 40,
  learnedWords: 24,
  totalExercises: 120,
  completedExercises: 72,
  accuracy: 85,
  totalTime: 180,
  modules: [
    {
      id: 1,
      title: '基础词汇',
      completed: true,
      progress: 100,
      words: 8,
      exercises: 24,
    },
    {
      id: 2,
      title: '日常问候',
      completed: true,
      progress: 100,
      words: 8,
      exercises: 24,
    },
    {
      id: 3,
      title: '购物用语',
      completed: true,
      progress: 100,
      words: 8,
      exercises: 24,
    },
    {
      id: 4,
      title: '餐厅点餐',
      completed: false,
      progress: 40,
      words: 8,
      exercises: 24,
    },
    {
      id: 5,
      title: '交通出行',
      completed: false,
      progress: 0,
      words: 8,
      exercises: 24,
    },
  ],
  mistakes: [
    {
      id: 1,
      word: 'restaurant',
      meaning: '餐厅',
      error: '错误地翻译为"休息厅"',
      timestamp: '2026-04-16T10:30:00Z',
    },
    {
      id: 2,
      word: 'menu',
      meaning: '菜单',
      error: '错误地翻译为"目录"',
      timestamp: '2026-04-16T11:15:00Z',
    },
    {
      id: 3,
      word: 'bill',
      meaning: '账单',
      error: '错误地翻译为"钞票"',
      timestamp: '2026-04-16T12:00:00Z',
    },
  ],
};

const ProgressPage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [progress, setProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载进度数据
    const timer = setTimeout(() => {
      setProgress(mockProgress);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [fileId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-6"></div>
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-gray-500">进度数据加载失败</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 导航 */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <Link to={`/language/en-zh`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          返回语言页面
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">{progress.title}</h1>
          <p className="text-lg text-gray-500">学习进度</p>
        </div>

        {/* 进度概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">总体进度</h3>
              <BarChart2 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress.completedModules}/{progress.totalModules} 模块完成
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">词汇掌握</h3>
              <BookOpen className="h-5 w-5 text-green-500" />
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(progress.learnedWords / progress.totalWords) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress.learnedWords}/{progress.totalWords} 单词学会
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">练习完成</h3>
              <CheckCircle className="h-5 w-5 text-purple-500" />
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(progress.completedExercises / progress.totalExercises) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress.completedExercises}/{progress.totalExercises} 练习完成
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">准确率</h3>
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${progress.accuracy}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress.accuracy}% 正确率
            </p>
          </div>
        </div>

        {/* 学习时间 */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">学习时间</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-semibold text-gray-900">{Math.floor(progress.totalTime / 60)} 小时 {progress.totalTime % 60} 分钟</p>
        </div>

        {/* 模块进度 */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">模块进度</h2>
          <div className="space-y-6">
            {progress.modules.map((module: any) => (
              <div key={module.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-blue-200 transition-colors">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {module.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center mr-4">
                          <span className="text-sm text-gray-600">{module.id}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {module.words} 单词 · {module.exercises} 练习
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/learn/${fileId}/stage/2`}
                      className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {module.completed ? '复习' : '继续学习'}
                    </Link>
                  </div>
                </div>
                <div className="h-2 bg-gray-100">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 错误记录 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">错误记录</h2>
          {progress.mistakes.length > 0 ? (
            <div className="space-y-4">
              {progress.mistakes.map((mistake: any) => (
                <div key={mistake.id} className="bg-white border border-red-100 rounded-lg p-6 bg-red-50">
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-4 mt-1" />
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="font-medium text-gray-900 mr-3">{mistake.word}</h3>
                        <span className="text-gray-500">{mistake.meaning}</span>
                      </div>
                      <p className="text-sm text-gray-700">{mistake.error}</p>
                      <p className="text-xs text-gray-500 mt-3">
                        {new Date(mistake.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-500">暂无错误记录</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;