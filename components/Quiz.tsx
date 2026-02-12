
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, AlertCircle, RefreshCcw } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  onFinish: (score: number) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, title, onFinish, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleSelect = (optionIdx: number) => {
    setAnswers({ ...answers, [questions[currentIdx].id]: optionIdx });
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const currentQuestion = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleSubmit = () => {
    const score = calculateScore();
    setFinalScore(score);
    setIsFinished(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
    setFinalScore(0);
  };

  if (isFinished) {
    const isPassed = finalScore >= 100;
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in duration-500">
        <div className={`p-12 text-center flex flex-col items-center space-y-6 ${isPassed ? 'bg-emerald-50/30' : 'bg-amber-50/30'}`}>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${isPassed ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
            {isPassed ? <CheckCircle size={48} /> : <AlertCircle size={48} />}
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              {isPassed ? 'Bagus Sekali!' : 'Belum Sempurna'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {isPassed 
                ? 'Anda telah menguasai materi ini sepenuhnya.' 
                : 'Anda harus menjawab semua pertanyaan dengan benar (100%) untuk lulus.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 px-10 py-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Skor Anda</p>
            <p className={`text-6xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {finalScore}<span className="text-2xl opacity-50">%</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
            {isPassed ? (
              <button onClick={() => onFinish(finalScore)} className="flex-1 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg transition-all active:scale-95">Lanjut <ChevronRight size={20} /></button>
            ) : (
              <button onClick={resetQuiz} className="flex-1 bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-600 shadow-lg transition-all active:scale-95"><RefreshCcw size={20} /> Ulangi Kuis</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl animate-in zoom-in duration-300">
      <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-emerald-100 text-sm opacity-90">Jawab 100% benar untuk lanjut.</p>
        </div>
        <button onClick={onCancel} className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"><XCircle size={24} /></button>
      </div>

      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="p-10 space-y-8">
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">Pertanyaan {currentIdx + 1} dari {questions.length}</span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">{currentQuestion.question}</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <button key={idx} onClick={() => handleSelect(idx)} className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${isSelected ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-4 ring-emerald-500/10' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-slate-50'}`}>
                <span className={`text-base font-semibold ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>{option}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'}`}>{isSelected && <div className="w-2 h-2 bg-white rounded-full" />}</div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-100">
          <button onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))} disabled={currentIdx === 0} className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-all"><ChevronLeft size={20} /> Sebelumnya</button>
          {isLast ? (
            <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-xl disabled:opacity-50 transition-all">Selesaikan Kuis</button>
          ) : (
            <button onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))} disabled={answers[currentQuestion.id] === undefined} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-xl disabled:opacity-50 transition-all">Selanjutnya <ChevronRight size={20} /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
