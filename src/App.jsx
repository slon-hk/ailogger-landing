import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Zap, Shield, ChevronRight, X } from 'lucide-react';
import mixpanel from "mixpanel-browser";

// Инициализация Mixpanel
mixpanel.init('694e19af3124aecd0b7c2a7f2a25c681', {
  autocapture: true,
  record_sessions_percent: 100,
  api_host: 'https://api-eu.mixpanel.com',
});

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const trackEvent = (eventName, properties = {}) => {
    mixpanel.track(eventName, properties);
  };

  const handleStartTrialClick = () => {
    trackEvent('clicked_start_trial');
    trackEvent('opened_signup_modal');
    setIsModalOpen(true);
  };

  const handlePricingClick = () => {
    trackEvent('clicked_pricing');
    // Скролл к секции тарифов
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    mixpanel.identify(email);
    mixpanel.people.set({ $email: email });
    trackEvent('submitted_beta_email', { email });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  useEffect(() => {
    trackEvent("page_view_landing");
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-200 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Навигация */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md fixed w-full top-0 left-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg sm:text-xl shrink-0">
            <Terminal size={24} className="shrink-0" />
            <span>AILogger</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <button onClick={handlePricingClick} className="text-sm hover:text-emerald-400 transition-colors hidden sm:block">
              Тарифы
            </button>
            <button 
              onClick={handleStartTrialClick}
              className="text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-3 sm:px-4 py-1.5 rounded-md font-medium transition-all whitespace-nowrap"
            >
              Начать триал
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Секция */}
      <header className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="inline-block border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono mb-6">
            $ sudo analyze logs
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-6 break-words">
            Хватит тонуть в логах. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Доверьте их ИИ.
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            Анализатор логов для микросервисов, который автоматически находит аномалии, группирует ошибки и предлагает готовые решения до того, как упадет прод. Сократите MTTR на 70%.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleStartTrialClick}
              className="w-full sm:w-auto justify-center bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-6 py-3 rounded-md font-bold text-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Начать бесплатно <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Декоративное окно терминала */}
        <div className="order-1 md:order-2 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl w-full max-w-full overflow-hidden">
          <div className="bg-gray-950 px-4 py-2 flex gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500 shrink-0"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shrink-0"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shrink-0"></div>
          </div>
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto">
            <p className="text-gray-500 whitespace-nowrap"># Обнаружен спайк 500-х ошибок в сервисе оплаты</p>
            <p className="mb-4 whitespace-nowrap"><span className="text-emerald-400">ailogger</span> detect --service payment-gateway</p>
            <p className="text-red-400 whitespace-nowrap">Analyzing 24,500 log lines...</p>
            <p className="text-yellow-400 mt-2 whitespace-nowrap">► Root cause identified (98% confidence):</p>
            <p className="text-white whitespace-nowrap">Database connection pool exhausted. Memory leak in src/db.ts:42</p>
            <p className="text-cyan-400 mt-2 whitespace-nowrap">► Suggested Fix:</p>
            <p className="text-gray-400 whitespace-nowrap">Increase pool size and close hanging transactions.</p>
          </div>
        </div>
      </header>

      {/* Секция Тарифов */}
      <section id="pricing" className="py-16 sm:py-20 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12">Прозрачные тарифы</h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-800 text-left w-full">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-400 mb-6 text-sm">Для небольших команд</p>
              <p className="text-3xl font-bold text-white mb-6">$49<span className="text-lg text-gray-500 font-normal">/мес</span></p>
              <button onClick={handleStartTrialClick} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md mb-6 transition-colors">Выбрать</button>
            </div>
            <div className="bg-emerald-900/20 p-6 sm:p-8 rounded-xl border border-emerald-500/30 text-left relative w-full">
              <div className="absolute top-0 right-0 bg-emerald-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-emerald-400">Pro</h3>
              <p className="text-gray-400 mb-6 text-sm">Для production нагрузок</p>
              <p className="text-3xl font-bold text-white mb-6">$199<span className="text-lg text-gray-500 font-normal">/мес</span></p>
              <button onClick={handleStartTrialClick} className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-2 rounded-md transition-colors">Выбрать</button>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 max-w-md w-full relative overflow-hidden">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            {!isSubmitted ? (
              <>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 pr-6">Закрытое бета-тестирование</h3>
                <p className="text-gray-400 mb-6 text-sm sm:text-base">
                  Мы получили огромный отклик и сейчас ограничиваем количество новых регистраций. Оставьте email, и мы пришлем инвайт.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="work@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3 rounded-md transition-all"
                  >
                    Запросить доступ
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Никакого спама. Только письмо с доступом к триалу.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Заявка принята!</h3>
                <p className="text-gray-400 text-sm">
                  Мы добавили вас в лист ожидания. Ожидайте письмо с инвайтом в ближайшее время.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;