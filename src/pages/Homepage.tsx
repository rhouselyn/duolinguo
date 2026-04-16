import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';

// 模拟语言数据
const languageFamilies = [
  {
    name: '印欧语系',
    languages: [
      { code: 'en', name: '英语', learned: true },
      { code: 'fr', name: '法语', learned: false },
      { code: 'de', name: '德语', learned: false },
      { code: 'es', name: '西班牙语', learned: true },
    ],
  },
  {
    name: '汉藏语系',
    languages: [
      { code: 'zh', name: '汉语', learned: true },
      { code: 'ja', name: '日语', learned: false },
      { code: 'ko', name: '韩语', learned: false },
    ],
  },
  {
    name: '闪含语系',
    languages: [
      { code: 'ar', name: '阿拉伯语', learned: false },
      { code: 'he', name: '希伯来语', learned: false },
    ],
  },
];

// 模拟已学习语言
const learnedLanguages = [
  { code: 'en', name: '英语', progress: 75 },
  { code: 'es', name: '西班牙语', progress: 45 },
  { code: 'zh', name: '汉语', progress: 100 },
];

// 模拟推荐语言
const recommendedLanguages = [
  { code: 'fr', name: '法语', reason: '与英语有很多相似之处' },
  { code: 'ja', name: '日语', reason: '适合喜欢动漫和日本文化的学习者' },
  { code: 'de', name: '德语', reason: '对科技和工程领域有帮助' },
];

const Homepage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="loading-pulse w-16 h-16 rounded-full mb-4"></div>
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* 标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#4CAF50] mb-2">Lesslingo 少邻国</h1>
        <p className="text-xl text-gray-600">纯本地 AI 驱动的外语学习系统</p>
      </div>

      {/* 语言家族可视化 */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Globe className="mr-2" /> 语言家族
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languageFamilies.map((family, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">{family.name}</h3>
              <div className="flex flex-wrap gap-2">
                {family.languages.map((lang) => (
                  <Link
                    key={lang.code}
                    to={`/language/${lang.code}-zh`}
                    className={`px-3 py-1 rounded-full text-sm ${lang.learned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} hover:bg-green-200 transition-colors`}
                  >
                    {lang.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 已学习语言 */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <BookOpen className="mr-2" /> 已学习语言
        </h2>
        <div className="space-y-4">
          {learnedLanguages.map((lang) => (
            <div key={lang.code} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blue-600">{lang.code.toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{lang.name}</h3>
                  <div className="progress-bar w-48 mt-1">
                    <div className="progress-fill" style={{ width: `${lang.progress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600">{lang.progress}% 完成</p>
                </div>
              </div>
              <Link
                to={`/language/${lang.code}-zh`}
                className="btn-secondary flex items-center"
              >
                继续学习
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 推荐语言 */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <TrendingUp className="mr-2" /> 推荐语言
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedLanguages.map((lang) => (
            <div key={lang.code} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-600">{lang.code.toUpperCase()}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{lang.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{lang.reason}</p>
              <Link
                to={`/language/${lang.code}-zh`}
                className="btn-accent w-full text-center"
              >
                开始学习
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;