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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="loading-pulse w-16 h-16 rounded-full mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600">进度数据加载失败</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* 导航 */}
      <div className="flex items-center mb-8">
        <Link to={`/language/en-zh`} className="flex items-center text-gray-600 hover:text-[#4CAF50] transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回语言页面
        </Link>
      </div>

      {/* 标题 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#4CAF50] mb-2">{progress.title}</h1>
        <p className="text-xl text-gray-600">学习进度</p>
      </div>

      {/* 进度概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">总体进度</h3>
            <BarChart2 className="w-6 h-6 text-blue-500" />
          </div>
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-600">
            {progress.completedModules}/{progress.totalModules} 模块完成
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">词汇掌握</h3>
            <BookOpen className="w-6 h-6 text-green-500" />
          </div>
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${(progress.learnedWords / progress.totalWords) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-600">
            {progress.learnedWords}/{progress.totalWords} 单词学会
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">练习完成</h3>
            <CheckCircle className="w-6 h-6 text-purple-500" />
          </div>
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${(progress.completedExercises / progress.totalExercises) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-600">
            {progress.completedExercises}/{progress.totalExercises} 练习完成
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">准确率</h3>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="progress-bar mb-2">
            <div className="progress-fill" style={{ width: `${progress.accuracy}%` }}></div>
          </div>
          <p className="text-sm text-gray-600">
            {progress.accuracy}% 正确率
          </p>
        </div>
      </div>

      {/* 学习时间 */}
      <div className="card mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">学习时间</h3>
          <Clock className="w-6 h-6 text-gray-500" />
        </div>
        <p className="text-2xl font-bold">{Math.floor(progress.totalTime / 60)} 小时 {progress.totalTime % 60} 分钟</p>
      </div>

      {/* 模块进度 */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold mb-6">模块进度</h2>
        <div className="space-y-6">
          {progress.modules.map((module: any) => (
            <div key={module.id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {module.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-3">
                        {module.id}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-gray-600">
                        {module.words} 单词 · {module.exercises} 练习
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/learn/${fileId}/stage/2`}
                    className="btn-secondary text-sm px-4 py-1"
                  >
                    {module.completed ? '复习' : '继续学习'}
                  </Link>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${module.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 错误记录 */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">错误记录</h2>
        {progress.mistakes.length > 0 ? (
          <div className="space-y-4">
            {progress.mistakes.map((mistake: any) => (
              <div key={mistake.id} className="border rounded-lg p-4 bg-red-50">
                <div className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-2">{mistake.word}</h3>
                      <span className="text-gray-600">{mistake.meaning}</span>
                    </div>
                    <p className="text-sm text-gray-700">{mistake.error}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(mistake.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">暂无错误记录</p>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;