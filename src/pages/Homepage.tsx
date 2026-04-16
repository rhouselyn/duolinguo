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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-6"></div>
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 标题 */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Lesslingo 少邻国</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">纯本地 AI 驱动的外语学习系统</p>
      </div>

      {/* 语言家族可视化 */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <Globe className="mr-3 h-6 w-6 text-blue-500" /> 语言家族
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {languageFamilies.map((family, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-medium text-lg text-gray-900">{family.name}</h3>
                <div className="flex flex-wrap gap-3">
                  {family.languages.map((lang) => (
                    <Link
                      key={lang.code}
                      to={`/language/${lang.code}-zh`}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${lang.learned ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 已学习语言 */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <BookOpen className="mr-3 h-6 w-6 text-blue-500" /> 已学习语言
          </h2>
          <div className="space-y-6">
            {learnedLanguages.map((lang) => (
              <div key={lang.code} className="flex items-center justify-between p-6 bg-white rounded-lg">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mr-6">
                    <span className="text-xl font-semibold text-blue-600">{lang.code.toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{lang.name}</h3>
                    <div className="mt-2 h-2 w-64 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${lang.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{lang.progress}% 完成</p>
                  </div>
                </div>
                <Link
                  to={`/language/${lang.code}-zh`}
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  继续学习
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 推荐语言 */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <TrendingUp className="mr-3 h-6 w-6 text-blue-500" /> 推荐语言
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedLanguages.map((lang) => (
              <div key={lang.code} className="p-6 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  <span className="text-2xl font-semibold text-blue-600">{lang.code.toUpperCase()}</span>
                </div>
                <h3 className="font-medium text-lg text-gray-900 mb-3">{lang.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{lang.reason}</p>
                <Link
                  to={`/language/${lang.code}-zh`}
                  className="block w-full py-3 px-4 bg-blue-50 text-blue-600 font-medium text-center rounded-lg hover:bg-blue-100 transition-colors"
                >
                  开始学习
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;