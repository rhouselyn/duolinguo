import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Upload, FileText, Volume2, Image, ChevronRight, ArrowLeft } from 'lucide-react';

// 模拟语言数据
const languages = [
  { code: 'en', name: '英语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
  { code: 'es', name: '西班牙语' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'ar', name: '阿拉伯语' },
  { code: 'zh', name: '汉语' },
];

// 模拟文件数据
const mockFiles = [
  {
    id: '1',
    title: '日常英语对话',
    type: 'text',
    progress: 100,
    stage: 3,
  },
  {
    id: '2',
    title: '商务英语词汇',
    type: 'text',
    progress: 60,
    stage: 2,
  },
  {
    id: '3',
    title: '英语发音练习',
    type: 'audio',
    progress: 30,
    stage: 1,
  },
  {
    id: 'test',
    title: '测试文本',
    type: 'text',
    progress: 0,
    stage: 1,
  },
];

const LanguageEntryPage: React.FC = () => {
  const { langPair } = useParams<{ langPair: string }>();
  const [sourceLang, setSourceLang] = useState(langPair?.split('-')[0] || 'en');
  const [targetLang, setTargetLang] = useState(langPair?.split('-')[1] || 'zh');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 处理文件拖放
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 处理上传
  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);
      // 模拟上传进度
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSelectedFile(null);
          setUploadProgress(0);
          // 这里可以添加文件上传成功的逻辑
        }
      }, 300);
    }
  };

  // 处理语言切换
  const handleLanguageChange = (type: 'source' | 'target', code: string) => {
    if (type === 'source') {
      setSourceLang(code);
    } else {
      setTargetLang(code);
    }
  };

  // 获取文件类型图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'audio':
        return <Volume2 className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航 */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          返回首页
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 语言选择器 */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">选择语言</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">学习语言</label>
              <select
                value={sourceLang}
                onChange={(e) => handleLanguageChange('source', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xl font-semibold text-gray-500">→</div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">母语</label>
              <select
                value={targetLang}
                onChange={(e) => handleLanguageChange('target', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 文件上传 */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">上传学习材料</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.pdf,.mp3,.wav,.jpg,.png"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">拖放文件到这里或点击上传</h3>
            <p className="text-gray-500 mb-6">支持文本、音频和图片文件</p>
            {selectedFile && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getFileIcon(selectedFile.type.split('/')[0])}
                    <span className="ml-3 text-gray-900 truncate">{selectedFile.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </span>
                </div>
                {isUploading && (
                  <div className="mt-4">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">上传中... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            )}
            {selectedFile && !isUploading && (
              <button
                onClick={handleUpload}
                className="mt-6 w-full py-3 px-4 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
              >
                开始处理
              </button>
            )}
          </div>
        </div>

        {/* 文件列表 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">学习材料</h2>
          <div className="space-y-6">
            {mockFiles.map((file) => (
              <div key={file.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-blue-200 transition-colors">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{file.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          阶段 {file.stage} · {file.progress}% 完成
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/learn/${file.id}/stage/${file.stage}`}
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      继续学习
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="h-2 bg-gray-100">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageEntryPage;