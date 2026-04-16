import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Upload, FileText, Audio, Image, ChevronRight, ArrowLeft, Play } from 'lucide-react';

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
        return <FileText className="w-6 h-6" />;
      case 'audio':
        return <Audio className="w-6 h-6" />;
      case 'image':
        return <Image className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* 导航 */}
      <div className="flex items-center mb-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-[#4CAF50] transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回首页
        </Link>
      </div>

      {/* 语言选择器 */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold mb-6">选择语言</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">学习语言</label>
            <select
              value={sourceLang}
              onChange={(e) => handleLanguageChange('source', e.target.value)}
              className="input-field"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold">→</span>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">母语</label>
            <select
              value={targetLang}
              onChange={(e) => handleLanguageChange('target', e.target.value)}
              className="input-field"
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
      <div className="card mb-12">
        <h2 className="text-2xl font-bold mb-6">上传学习材料</h2>
        <div
          className={`file-upload-dropzone ${isDragging ? 'border-[#4CAF50] bg-green-50' : ''}`}
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
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">拖放文件到这里或点击上传</h3>
          <p className="text-gray-500 mb-4">支持文本、音频和图片文件</p>
          {selectedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getFileIcon(selectedFile.type.split('/')[0])}
                  <span className="ml-2 truncate">{selectedFile.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </span>
              </div>
              {isUploading && (
                <div className="mt-2">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">上传中... {uploadProgress}%</p>
                </div>
              )}
            </div>
          )}
          {selectedFile && !isUploading && (
            <button
              onClick={handleUpload}
              className="btn-primary mt-4"
            >
              开始处理
            </button>
          )}
        </div>
      </div>

      {/* 文件列表 */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">学习材料</h2>
        <div className="space-y-4">
          {mockFiles.map((file) => (
            <div key={file.id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{file.title}</h3>
                      <p className="text-sm text-gray-500">
                        阶段 {file.stage} · {file.progress}% 完成
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/learn/${file.id}/stage/${file.stage}`}
                    className="btn-secondary flex items-center"
                  >
                    继续学习
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${file.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageEntryPage;