import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Zap, Shield, ChevronRight, X } from 'lucide-react';
import mixpanel from "mixpanel-browser";

// Инициализация Mixpanel с твоим Project Token
mixpanel.init('694e19af3124aecd0b7c2a7f2a25c681', {
  autocapture: true,
  record_sessions_percent: 100,
  api_host: 'https://api-eu.mixpanel.com',
})

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Трек события через Mixpanel
  const trackEvent = (eventName, properties = {}) => {
    mixpanel.track(eventName, properties);
  };

  // Отслеживание клика на "Начать триал"
  const handleStartTrialClick = () => {
    trackEvent('clicked_start_trial');
    trackEvent('opened_signup_modal');
    setIsModalOpen(true);
  };

  // Отслеживание клика на "Тарифы"
  const handlePricingClick = () => {
    trackEvent('clicked_pricing');
    // Здесь можно добавить плавный скролл к секции тарифов
  };

  // Отправка email для Fake Door
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Идентификация пользователя и сохранение email в Mixpanel
    mixpanel.identify(email);
    mixpanel.people.set({
      $email: email,
    });

    trackEvent('submitted_beta_email', { email });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setEmail('');
    }, 3000);

    // Здесь можно добавить POST-запрос к Python API:
    // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
  };

  // Отслеживание просмотра страницы
  useEffect(() => {
    trackEvent("page_view_landing");
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Навигация */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md fixed w-full top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
            <Terminal size={24} />
            <span>AILogger</span>
          </div>
          <div className="flex gap-6">
            <button onClick={handlePricingClick} className="text-sm hover:text-emerald-400 transition-colors">
              Тарифы
            </button>
            <button 
              onClick={handleStartTrialClick}
              className="text-sm bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-4 py-1.5 rounded-md font-medium transition-all"
            >
              Начать триал
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Секция */}
      <header className="pt-32 pb-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono mb-6">
            $ sudo analyze logs
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Хватит тонуть в логах. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Доверьте их ИИ.
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Анализатор логов для микросервисов, который автоматически находит аномалии, группирует ошибки и предлагает готовые решения до того, как упадет прод. Сократите MTTR на 70%.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={handleStartTrialClick}
              className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-6 py-3 rounded-md font-bold text-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Начать бесплатно <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Декоративное окно терминала */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-gray-950 px-4 py-2 flex gap-2 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6 font-mono text-sm text-gray-300">
            <p className="text-gray-500"># Обнаружен спайк 500-х ошибок в сервисе оплаты</p>
            <p className="mb-4"><span className="text-emerald-400">ailogger</span> detect --service payment-gateway</p>
            <p className="text-red-400">Analyzing 24,500 log lines...</p>
            <p className="text-yellow-400 mt-2">► Root cause identified (98% confidence):</p>
            <p className="text-white">Database connection pool exhausted. Memory leak in src/db.ts:42</p>
            <p className="text-cyan-400 mt-2">► Suggested Fix:</p>
            <p className="text-gray-400">Increase pool size and close hanging transactions.</p>
          </div>
        </div>
      </header>

      {/* Секция Тарифов */}
      <section id="pricing" className="py-20 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Прозрачные тарифы</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-left">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-400 mb-6">Для небольших команд</p>
              <p className="text-3xl font-bold text-white mb-6">$49<span className="text-lg text-gray-500 font-normal">/мес</span></p>
              <button onClick={handleStartTrialClick} className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md mb-6 transition-colors">Выбрать</button>
            </div>
            <div className="bg-emerald-900/20 p-8 rounded-xl border border-emerald-500/30 text-left relative">
              <div className="absolute top-0 right-0 bg-emerald-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-emerald-400">Pro</h3>
              <p className="text-gray-400 mb-6">Для production нагрузок</p>
              <p className="text-3xl font-bold text-white mb-6">$199<span className="text-lg text-gray-500 font-normal">/мес</span></p>
              <button onClick={handleStartTrialClick} className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-2 rounded-md transition-colors">Выбрать</button>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Закрытое бета-тестирование</h3>
                <p className="text-gray-400 mb-6">
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
                <p className="text-gray-400">
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

export default LandingPage;