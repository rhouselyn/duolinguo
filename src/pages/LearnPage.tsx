import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Mic, Check, X, ChevronRight, ChevronLeft } from 'lucide-react';

// 模拟练习数据
const mockExercises = {
  1: {
    type: 'stage1',
    content: {
      words: [
        { word: 'apple', ipa: '/ˈæpl/', meaning: '苹果', variants: ['apples'] },
        { word: 'banana', ipa: '/bəˈnɑːnə/', meaning: '香蕉', variants: ['bananas'] },
        { word: 'orange', ipa: '/ˈɔːrɪndʒ/', meaning: '橙子', variants: ['oranges'] },
        { word: 'grape', ipa: '/ɡreɪp/', meaning: '葡萄', variants: ['grapes'] },
        { word: 'watermelon', ipa: '/ˈwɔːtərmelən/', meaning: '西瓜', variants: ['watermelons'] },
      ],
      pronunciationNotes: '英语发音规则：元音字母在重读开音节中发长音，在重读闭音节中发短音。',
      grammarNotes: '英语名词复数形式：一般在词尾加-s，以s、x、ch、sh结尾的加-es，以辅音字母加y结尾的变y为i加-es。',
    },
  },
  2: {
    type: 'stage2',
    content: {
      currentModule: 1,
      words: [
        { word: 'apple', meaning: '苹果', distractors: ['香蕉', '橙子', '葡萄'] },
        { word: 'banana', meaning: '香蕉', distractors: ['苹果', '橙子', '葡萄'] },
        { word: 'orange', meaning: '橙子', distractors: ['苹果', '香蕉', '葡萄'] },
        { word: 'grape', meaning: '葡萄', distractors: ['苹果', '香蕉', '橙子'] },
      ],
      currentWordIndex: 0,
    },
  },
  3: {
    type: 'stage3',
    content: {
      exercises: [
        {
          type: 'cloze',
          sentence: 'I have an [apple] for breakfast.',
          options: ['apple', 'banana', 'orange', 'grape'],
          translation: '我早餐吃了一个苹果。',
        },
        {
          type: 'listen',
          word: 'banana',
          options: ['apple', 'banana', 'orange', 'grape'],
        },
        {
          type: 'speak',
          word: 'orange',
        },
        {
          type: 'write',
          sentence: '我喜欢葡萄。',
          options: ['I', 'like', 'grapes', '.'],
        },
      ],
      currentExerciseIndex: 0,
    },
  },
};

const LearnPage: React.FC = () => {
  const { fileId, stage } = useParams<{ fileId: string; stage: string }>();
  const [exercise, setExercise] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [listenEnabled, setListenEnabled] = useState(true);
  const [speakEnabled, setSpeakEnabled] = useState(true);

  useEffect(() => {
    // 模拟加载练习数据
    const timer = setTimeout(() => {
      setExercise(mockExercises[parseInt(stage || '1')]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [stage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-6"></div>
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-gray-500">练习数据加载失败</p>
      </div>
    );
  }

  // 处理选项选择
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // 模拟判断是否正确
    const correctAnswer = exercise.content.words[exercise.content.currentWordIndex]?.meaning;
    setIsCorrect(option === correctAnswer);
  };

  // 处理下一个练习
  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    // 这里可以添加切换到下一个练习的逻辑
  };

  // 处理录音
  const handleRecord = () => {
    setIsRecording(!isRecording);
    // 模拟录音功能
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        // 模拟录音完成后的处理
      }, 3000);
    }
  };

  // 渲染阶段一：材料浏览
  const renderStage1 = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">阶段一：材料浏览</h2>
        
        {/* 词汇列表 */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">词汇列表</h3>
          <div className="space-y-6">
            {exercise.content.words.map((word: any, index: number) => (
              <div key={index} className="bg-white border border-gray-100 rounded-lg p-6 hover:border-blue-200 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg text-gray-900">{word.word}</h4>
                    <p className="text-gray-500 mt-1">{word.ipa}</p>
                    <p className="mt-3 text-gray-900">{word.meaning}</p>
                    {word.variants && word.variants.length > 0 && (
                      <p className="text-sm text-gray-500 mt-2">变体: {word.variants.join(', ')}</p>
                    )}
                  </div>
                  <button className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Play className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 发音规则 */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">发音规则</h3>
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-gray-700">{exercise.content.pronunciationNotes}</p>
          </div>
        </div>

        {/* 语法笔记 */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">语法笔记</h3>
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-gray-700">{exercise.content.grammarNotes}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to={`/learn/${fileId}/stage/2`} className="py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors">
            进入阶段二
          </Link>
        </div>
      </div>
    );
  };

  // 渲染阶段二：基础构建
  const renderStage2 = () => {
    const currentWord = exercise.content.words[exercise.content.currentWordIndex];
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">阶段二：基础构建</h2>
        <p className="text-gray-500 mb-8">模块 {exercise.content.currentModule} · 单词 {exercise.content.currentWordIndex + 1}/{exercise.content.words.length}</p>

        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-900 mb-6">{currentWord.word}</h3>
          <div className="flex items-center mb-8">
            <button className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors mr-4">
              <Play className="h-5 w-5 text-blue-600" />
            </button>
            <span className="text-gray-500">点击播放发音</span>
          </div>
          <p className="text-lg text-gray-900 mb-6">选择正确的中文意思：</p>

          <div className="space-y-4">
            {[currentWord.meaning, ...currentWord.distractors].sort(() => Math.random() - 0.5).map((option: string, index: number) => (
              <button
                key={index}
                className={`w-full py-4 px-6 border rounded-lg text-left font-medium transition-colors ${selectedOption === option ? (isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700') : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {selectedOption === option && (
                    <span>
                      {isCorrect ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={exercise.content.currentWordIndex === 0}
          >
            <ChevronLeft className="inline mr-2 h-4 w-4" /> 上一个
          </button>
          <button
            className="py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            下一个 <ChevronRight className="inline ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  // 渲染阶段三：综合强化
  const renderStage3 = () => {
    const currentExercise = exercise.content.exercises[exercise.content.currentExerciseIndex];

    // 渲染完形填空练习
    if (currentExercise.type === 'cloze') {
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">阶段三：综合强化</h2>
          <p className="text-gray-500 mb-8">练习 {exercise.content.currentExerciseIndex + 1}/{exercise.content.exercises.length}</p>

          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">完形填空</h3>
            <p className="text-gray-500 mb-4">{currentExercise.translation}</p>
            <p className="text-xl text-gray-900 mb-8">
              {currentExercise.sentence.replace('[apple]', selectedOption ? selectedOption : '[____]')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {currentExercise.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`py-4 px-6 border rounded-lg font-medium transition-colors ${selectedOption === option ? (isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700') : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsCorrect(option === 'apple');
                  }}
                  disabled={selectedOption !== null}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selectedOption === option && (
                      <span>
                        {isCorrect ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={exercise.content.currentExerciseIndex === 0}
            >
              <ChevronLeft className="inline mr-2 h-4 w-4" /> 上一个
            </button>
            <button
              className="py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              下一个 <ChevronRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    // 渲染听力练习
    if (currentExercise.type === 'listen' && listenEnabled) {
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">阶段三：综合强化</h2>
          <p className="text-gray-500 mb-8">练习 {exercise.content.currentExerciseIndex + 1}/{exercise.content.exercises.length}</p>

          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">听力练习</h3>
            <p className="text-gray-500 mb-8">点击播放按钮，选择听到的单词：</p>
            
            <div className="flex justify-center mb-12">
              <button className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Play className="h-8 w-8 text-blue-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentExercise.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`py-4 px-6 border rounded-lg font-medium transition-colors ${selectedOption === option ? (isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700') : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsCorrect(option === 'banana');
                  }}
                  disabled={selectedOption !== null}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selectedOption === option && (
                      <span>
                        {isCorrect ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={exercise.content.currentExerciseIndex === 0}
            >
              <ChevronLeft className="inline mr-2 h-4 w-4" /> 上一个
            </button>
            <button
              className="py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              下一个 <ChevronRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    // 渲染口语练习
    if (currentExercise.type === 'speak' && speakEnabled) {
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">阶段三：综合强化</h2>
          <p className="text-gray-500 mb-8">练习 {exercise.content.currentExerciseIndex + 1}/{exercise.content.exercises.length}</p>

          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">口语练习</h3>
            <p className="text-2xl font-semibold text-gray-900 mb-8">{currentExercise.word}</p>
            <p className="text-gray-500 mb-8">点击麦克风按钮，读出上面的单词：</p>

            <div className="flex justify-center mb-8">
              <button
                className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}
                onClick={handleRecord}
              >
                <Mic className="h-6 w-6" />
              </button>
            </div>

            {isRecording && (
              <p className="text-center text-red-600 font-medium">正在录音...</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={exercise.content.currentExerciseIndex === 0}
            >
              <ChevronLeft className="inline mr-2 h-4 w-4" /> 上一个
            </button>
            <button
              className="py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={isRecording}
            >
              下一个 <ChevronRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    // 渲染写作练习
    if (currentExercise.type === 'write') {
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">阶段三：综合强化</h2>
          <p className="text-gray-500 mb-8">练习 {exercise.content.currentExerciseIndex + 1}/{exercise.content.exercises.length}</p>

          <div className="mb-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">写作练习</h3>
            <p className="text-gray-500 mb-4">将下面的单词重新排列成正确的句子：</p>
            <p className="text-lg text-gray-900 mb-8">{currentExercise.sentence}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {currentExercise.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`py-2 px-4 border rounded-lg font-medium transition-colors ${selectedOption === option ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 hover:border-blue-300'}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-900">{selectedOption ? selectedOption : '请选择单词'}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={exercise.content.currentExerciseIndex === 0}
            >
              <ChevronLeft className="inline mr-2 h-4 w-4" /> 上一个
            </button>
            <button
              className="py-3 px-6 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
              onClick={handleNext}
            >
              下一个 <ChevronRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航 */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={`/language/en-zh`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回语言页面
          </Link>
          <Link to={`/progress/${fileId}`} className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            查看进度
          </Link>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* 练习类型切换 */}
        {parseInt(stage || '1') === 3 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">练习类型</h3>
              <div className="flex gap-8">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="listen"
                    checked={listenEnabled}
                    onChange={(e) => setListenEnabled(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
                  />
                  <label htmlFor="listen" className="text-gray-700">听力</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="speak"
                    checked={speakEnabled}
                    onChange={(e) => setSpeakEnabled(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
                  />
                  <label htmlFor="speak" className="text-gray-700">口语</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 练习内容 */}
        {parseInt(stage || '1') === 1 && renderStage1()}
        {parseInt(stage || '1') === 2 && renderStage2()}
        {parseInt(stage || '1') === 3 && renderStage3()}
      </div>
    </div>
  );
};

export default LearnPage;