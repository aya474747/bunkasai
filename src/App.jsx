import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Zap, Coffee, Image as ImageIcon, Moon, MapPin, Clock, AlertCircle, Heart, ArrowRightLeft, Star } from 'lucide-react';

// Google Fonts読み込み用のスタイルコンポーネント
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Zen+Kaku+Gothic+New:wght@400;700;900&family=Zen+Maru+Gothic:wght@500;700;900&display=swap');

    body {
      font-family: 'Zen Kaku Gothic New', sans-serif;
      background-color: #f3f4f6;
      background-image: radial-gradient(#000 1px, transparent 1px);
      background-size: 20px 20px;
      overflow-x: hidden;
      color: #000;
    }
    .font-display { font-family: 'Dela Gothic One', cursive; }
    .font-rounded { font-family: 'Zen Maru Gothic', sans-serif; }

    .marquee-container { overflow: hidden; white-space: nowrap; }
    .marquee-content { display: inline-block; animation: marquee 60s linear infinite; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    .brutalist-shadow { box-shadow: 6px 6px 0px 0px #000; border: 3px solid #000; }
    .brutalist-shadow-sm { box-shadow: 3px 3px 0px 0px #000; border: 2px solid #000; }
    .brutalist-shadow-hover:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000; }

    .text-stroke { -webkit-text-stroke: 1px black; color: transparent; }
    .text-stroke-white { -webkit-text-stroke: 2px black; color: white; }
  `}</style>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 2026年2月22日 13:00 (と仮定)
    const targetDate = new Date('2026-02-22T13:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white p-6 border-4 border-black mb-12 w-full max-w-4xl mx-auto transform -rotate-1 brutalist-shadow">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <h3 className="text-xl font-bold font-display text-lime-400 blink text-center md:text-left">
          EVENT STARTS IN
        </h3>
        <div className="flex gap-4 md:gap-8 text-center justify-center">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-display leading-none tabular-nums text-white">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-gray-400">{unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title, icon: Icon, color = "bg-yellow-400" }) => (
  <div className={`flex items-center gap-3 mb-10 border-b-4 border-black pb-2 ${color} bg-opacity-100 inline-block pr-6 pl-2 transform -rotate-1 border-2 border-black brutalist-shadow-sm`}>
    {Icon && <Icon className="w-8 h-8 text-black" strokeWidth={2.5} />}
    <h2 className="text-3xl md:text-4xl font-display uppercase tracking-wide text-black">
      {title}
    </h2>
  </div>
);

const ContentCard = ({ title, items, colorClass, rotate = "rotate-0" }) => (
  <div className={`bg-white border-4 border-black p-6 h-full brutalist-shadow transition-transform hover:-translate-y-1 hover:shadow-xl ${rotate}`}>
    <div className={`inline-block px-4 py-1 text-sm font-bold border-2 border-black mb-6 ${colorClass} text-black brutalist-shadow-sm`}>
      {title}
    </div>
    <ul className="space-y-6">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-4 border-b-2 border-dotted border-gray-300 pb-4 last:border-0 last:pb-0">

          {/* 画像があれば表示、なければハートマーク */}
          <div className="shrink-0 mt-0.5">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover border-2 border-black brutalist-shadow-sm rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          <div className="w-full">
             {/* タイトル (コンテンツ名) */}
             <div className="font-bold text-xl leading-tight text-black font-rounded">{item.name}</div>

             {/* 時間・ステージ */}
             {(item.time || item.stage) && (
               <div className="flex flex-wrap items-baseline gap-2 mt-2">
                  {item.time && (
                    <span className="text-xs font-bold bg-black text-white px-2 py-0.5 transform -rotate-1 rounded-md">
                      {item.time}
                    </span>
                  )}
                  {item.stage && (
                    <span className="text-xs font-bold bg-white text-black px-2 py-0.5 border border-black transform rotate-1 rounded-md">
                      {item.stage}
                    </span>
                  )}
               </div>
             )}

             {/* 出演者名 (desc) */}
             {item.desc && (
               <span className={`block font-bold mt-1 text-gray-600 ${item.highlightDesc ? 'text-lg text-black bg-yellow-300 inline-block px-1 rounded-sm' : 'text-sm'}`}>
                 {item.desc}
               </span>
             )}

             {/* 詳細説明 (detail) */}
             {item.detail && (
                <p className="text-xs text-gray-800 mt-2 font-normal leading-relaxed bg-white/50 p-2 rounded border border-gray-200">
                    {item.detail}
                </p>
             )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Marquee = ({ text }) => (
  <div className="bg-lime-400 border-y-4 border-black py-2 marquee-container font-display text-lg md:text-xl font-bold uppercase overflow-hidden mb-12 text-black w-full">
    <div className="marquee-content">
      <span className="mx-4">{text}</span>
      <span className="mx-4 text-stroke">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4 text-stroke">{text}</span>
      <span className="mx-4">{text}</span>
      <span className="mx-4 text-stroke">{text}</span>
    </div>
  </div>
);

const StageMap = () => {
  return (
    <div className="mb-32 w-full max-w-4xl mx-auto relative">
      <div className="text-center md:text-left">
        <SectionTitle title="STAGE MAP" icon={MapPin} color="bg-cyan-400" />
      </div>

      <div className="bg-white border-4 border-black p-4 md:p-8 brutalist-shadow relative">
        <div className="w-full bg-gray-100 border-4 border-black flex flex-col items-center justify-center overflow-hidden rounded-lg">
           <img
             src="https://i.gyazo.com/1b5b578fd6812df72f3f60f9626d56f9.jpg"
             alt="会場マップ"
             className="w-full h-auto object-contain"
           />
        </div>

        <p className="text-center mt-4 font-bold text-sm text-gray-500 font-mono">
           会場図: ネイバーズ江坂 1st
        </p>
      </div>
    </div>
  );
};

const TimeSchedule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const stages = [
    { id: 'A', name: 'STAGE A', bg: 'bg-red-200', border: 'border-red-500', text: 'text-red-900' },
    { id: 'B', name: 'STAGE B', bg: 'bg-orange-200', border: 'border-orange-500', text: 'text-orange-900' },
    { id: 'C', name: 'STAGE C', bg: 'bg-green-200', border: 'border-green-500', text: 'text-green-900' },
    { id: 'D', name: 'STAGE D', bg: 'bg-cyan-200', border: 'border-cyan-500', text: 'text-cyan-900' },
    { id: 'E', name: 'STAGE E', bg: 'bg-blue-200', border: 'border-blue-500', text: 'text-blue-900' },
    { id: 'F', name: 'STAGE F', bg: 'bg-purple-200', border: 'border-purple-500', text: 'text-purple-900' },
  ];

  const scheduleData15Min = [
    { id: 99, title: '喫茶まゆか', stage: 'B', start: '14:15', end: '18:00', rowStart: 6, rowSpan: 15, user: 'まゆちゃん・あっこたん・ぐっち', image: 'https://i.gyazo.com/baa82c92d80f091a8fee8815bd02c9fb.jpg', detail: 'あなたの"好きな言葉"、まゆか先生が筆にのせて贈ります。コーヒーと共に、心整うアートな時間を。' },
    { id: 0, title: '開会式', stage: 'C', start: '13:00', end: '13:15', rowStart: 1, rowSpan: 1, user: '全員' },
    { id: 1, title: 'アコースティックバンド', stage: 'C', start: '13:15', end: '13:30', rowStart: 2, rowSpan: 1, user: 'うみ・もも・まゆ・さっちゃま・かの' },
    { id: 11, title: '旅立ちの日に合唱', stage: 'C', start: '13:30', end: '14:00', rowStart: 3, rowSpan: 2, user: '全員参加', image: 'https://i.gyazo.com/c62624ce8f2a843df2a8f1e2d63532aa.png', detail: '久しぶりに歌っちゃおう！練習時間も設けるから、男子〜！ちゃんとして〜！ってやつもやろう！' },
    { id: 7, title: '社交ダンス', stage: 'C', start: '14:00', end: '14:15', rowStart: 5, rowSpan: 1, user: 'つねぽん、りほちゃんペア' },
    { id: 10, title: '書籍完成トーク', stage: 'C', start: '14:15', end: '15:15', rowStart: 6, rowSpan: 4, user: 'しおりちゃん' },

    // AI教室 (15:15から1時間に修正)
    { id: 8, title: 'AI教室', stage: 'C', start: '15:15', end: '16:15', rowStart: 10, rowSpan: 4, user: 'なべちゃん' },

    { id: 4, title: 'スマホストラップ作り', stage: 'C', start: '16:15', end: '17:15', rowStart: 14, rowSpan: 4, user: 'みなみ先生' },
    { id: 2, title: 'ダンスショーケース', stage: 'C', start: '18:00', end: '18:15', rowStart: 21, rowSpan: 1, user: 'りほ・ごう・まりん・むぎ・なっちゃん' },
    { id: 13, title: '閉会式', stage: 'C', start: '18:30', end: '19:00', rowStart: 23, rowSpan: 2, user: '全員' },
    { id: 12, title: 'かのお悩み相談', stage: 'A', start: '14:00', end: '16:00', rowStart: 5, rowSpan: 8, user: 'かのくん', image: 'https://i.gyazo.com/b9e87d295b700786368bda29c865c97b.jpg', detail: 'かのくんがあなたのお悩み相談にのります！あるいはあなたにかのくんのお悩みを聞いてもらいます！決めるのはア・ナ・タ♡' },
    { id: 3, title: 'AIプリクラ', stage: 'A', start: '16:00', end: '19:00', rowStart: 13, rowSpan: 12, user: 'なべちゃん' },
    { id: 5, title: 'トイレZINE販売', stage: 'D', start: '14:15', end: '18:00', rowStart: 6, rowSpan: 15, user: 'さくらちゃん・ゆうこりん', image: 'https://i.gyazo.com/4f5d109e4ddc5bbdddaab52ea475f5fc.jpg', detail: 'トイレマークの写真を撮り集めて、気づいたら、10年以上経っていました.........！様々な国を旅して出会った、ニッチな世界へようこそ......！' },
    { id: 61, title: 'ほぐしの満洲', stage: 'E', start: '13:30', end: '13:40', rowStart: 3, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
    { id: 62, title: 'ほぐしの満洲', stage: 'E', start: '14:30', end: '14:40', rowStart: 7, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
    { id: 63, title: 'ほぐしの満洲', stage: 'E', start: '15:30', end: '15:40', rowStart: 11, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
    { id: 64, title: 'ほぐしの満洲', stage: 'E', start: '16:30', end: '16:40', rowStart: 15, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
    { id: 65, title: 'ほぐしの満洲', stage: 'E', start: '17:30', end: '17:40', rowStart: 19, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
    { id: 66, title: 'Soup Stock Esaka', stage: 'F', start: '14:15', end: '18:00', rowStart: 6, rowSpan: 15, user: 'いけめぐ・あまねちゃん', image: 'https://i.gyazo.com/1c0d4ff391dd612c82c5fe1d702d5836.jpg', detail: 'スープ+パンのセット 限定15食' },
  ];

  const times = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];

  return (
    <div className="mb-32 w-full max-w-full">
      <div className="text-center md:text-left pt-4">
        <SectionTitle title="TIME TABLE" icon={Clock} color="bg-lime-400" />
      </div>

      <div className="overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="md:hidden flex items-center justify-center gap-2 text-xs font-bold text-gray-500 mb-2 animate-pulse bg-white border-2 border-black py-1 px-4 mx-auto w-max transform -rotate-1 rounded-full">
           <ArrowRightLeft size={14} /> 横にスクロールできます
        </div>

        <div className="min-w-[700px] md:min-w-[800px] border-4 border-black bg-white brutalist-shadow p-2 md:p-4 relative rounded-xl">
          <div className="grid grid-cols-[60px_repeat(6,1fr)_60px] md:grid-cols-[80px_repeat(6,1fr)] gap-1 md:gap-2 mb-4 border-b-4 border-black pb-2">
             <div className="font-bold text-center pt-2 text-xs md:text-base text-black font-display">TIME</div>
             {stages.map(stage => (
               <div key={stage.id} className={`font-display text-center py-2 border-2 border-black text-xs md:text-base ${stage.bg} text-black brutalist-shadow-sm rounded-md`}>
                 {stage.name}
               </div>
             ))}
             <div className="md:hidden font-bold text-center pt-2 text-xs text-black font-display">TIME</div>
          </div>

          <div className="grid grid-cols-[60px_repeat(6,1fr)_60px] md:grid-cols-[80px_repeat(6,1fr)] auto-rows-[30px] gap-x-1 md:gap-x-2 relative">
             {times.map((time, i) => (
                <React.Fragment key={time}>
                  <div className="text-[10px] md:text-xs font-bold text-gray-600 text-right pr-2 pt-1 border-t border-gray-300" style={{ gridRow: i * 2 + 1 }}>
                    {time}
                  </div>
                  <div className="col-span-6 md:col-span-6 border-t border-dashed border-gray-300" style={{ gridColumn: '2 / span 6', gridRow: i * 2 + 1 }}></div>
                  <div className="md:hidden text-[10px] font-bold text-gray-600 text-left pl-2 pt-1 border-t border-gray-300" style={{ gridRow: i * 2 + 1 }}>
                    {time}
                  </div>
                </React.Fragment>
             ))}

             {scheduleData15Min.map((event, index) => {
               const stageIndex = stages.findIndex(s => s.id === event.stage);
               const stageStyle = stages[stageIndex];
               const isPermanent = event.title.includes('喫茶');
               const zIndex = isPermanent ? 'z-0' : 'z-10 shadow-lg';
               const opacity = isPermanent ? 'opacity-80' : 'opacity-100';

               return (
                 <div
                    key={event.id}
                    className={`px-1 md:px-2 py-1 border-2 border-black ${stageStyle.bg} ${zIndex} ${opacity} hover:brightness-110 transition-all overflow-hidden rounded flex flex-col justify-center rounded-md cursor-pointer`}
                    style={{
                      gridColumn: stageIndex + 2,
                      gridRow: `${event.rowStart} / span ${event.rowSpan}`
                    }}
                    onClick={() => setSelectedEvent({ title: event.title, user: event.user, start: event.start, end: event.end, stage: stageStyle.name, image: event.image, detail: event.detail })}
                 >
                    <div className="font-black text-xs md:text-base leading-tight line-clamp-2 text-black font-rounded">{event.title}</div>
                    <div className="hidden md:block opacity-80 text-[8px] md:text-[10px] font-bold text-black/70 truncate mt-0.5">{event.user}</div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white border-4 border-black p-6 md:p-8 brutalist-shadow max-w-lg w-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl md:text-3xl font-display text-black">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-3xl font-bold hover:scale-110 transition-transform"
              >
                ×
              </button>
            </div>

            {selectedEvent.image && (
              <div className="mb-4 flex justify-center">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-64 h-64 object-cover border-2 border-black brutalist-shadow-sm rounded-lg"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">出演者</span>
                <span className="font-bold">{selectedEvent.user}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">時間</span>
                <span className="font-bold">{selectedEvent.start} - {selectedEvent.end}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">ステージ</span>
                <span className="font-bold">{selectedEvent.stage}</span>
              </div>
              {selectedEvent.detail && (
                <div className="mt-4 pt-4 border-t-2 border-gray-200">
                  <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-3 rounded border border-gray-200">
                    {selectedEvent.detail}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function EventPage() {
  const content = {
    performance: [
      { name: "開会式", desc: "全員", time: "13:00-13:15", stage: "STAGE C" },
      { name: "アコースティックバンド", desc: "うみ・ももちゃん・まゆちゃん・さっちゃま・かのくん", time: "13:15-13:30", stage: "STAGE C" },
      {
        name: "旅立ちの日に合唱",
        desc: "全員 指揮:かよちゃん ピアノ:さっちゃま",
        time: "13:30-14:00",
        stage: "STAGE C",
        image: "https://i.gyazo.com/c62624ce8f2a843df2a8f1e2d63532aa.png",
        detail: "久しぶりに歌っちゃおう！練習時間も設けるから、男子〜！ちゃんとして〜！ってやつもやろう！"
      },
      { name: "社交ダンス", desc: "つねぽん、りほちゃんペア", stage: "STAGE C", time: "14:00-14:15" },
      { name: "書籍完成トークショー", desc: "しおりちゃん", time: "14:15-15:15", stage: "STAGE C" },
      // AI教室の時間を更新
      { name: "AI教室", desc: "なべちゃん", time: "15:15-16:15", stage: "STAGE C" },
      { name: "ダンスショーケース", desc: "りほちゃん・ごうちゃん・まりんちゃん・むぎちゃん・なっちゃん", time: "18:00-18:15", stage: "STAGE C" },
      { name: "閉会式", desc: "全員", time: "18:30-19:00", stage: "STAGE C" },
    ],
    workshop: [
      { name: "スマホストラップ作り", desc: "みなみ先生", time: "16:15-17:15", stage: "STAGE C" },
    ],
    shops: [
      {
        name: "かのお悩み相談室",
        desc: "かのくん",
        time: "14:00-16:00",
        stage: "STAGE A",
        image: "https://i.gyazo.com/b9e87d295b700786368bda29c865c97b.jpg",
        detail: "かのくんがあなたのお悩み相談にのります！あるいはあなたにかのくんのお悩みを聞いてもらいます！決めるのはア・ナ・タ♡"
      },
      {
        name: "トイレZINE販売",
        desc: "さくらちゃん・ゆうこりん",
        time: "14:15-18:00",
        stage: "STAGE D",
        image: "https://i.gyazo.com/4f5d109e4ddc5bbdddaab52ea475f5fc.jpg",
        detail: "トイレマークの写真を撮り集めて、気づいたら、10年以上経っていました.........！様々な国を旅して出会った、ニッチな世界へようこそ......！"
      },
      { name: "ほぐしの満洲", desc: "ごとちゃん", time: "13:30 / 14:30 / 15:30 / 16:30 / 17:30開始", stage: "STAGE E", image: "https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg", detail: "施術時間10分 Max 5人" },
      { name: "AIで作ったプリクラコーナー", desc: "なべちゃん", time: "16:00-19:00", stage: "STAGE A" },
    ],
    food: [
      { name: "Soup Stock Esaka", desc: "いけめぐ・あまねちゃん", time: "14:15-18:00", stage: "STAGE F", image: "https://i.gyazo.com/1c0d4ff391dd612c82c5fe1d702d5836.jpg", detail: "スープ+パンのセット 限定15食" },
      {
        name: "喫茶まゆか",
        desc: "まゆちゃん・あっこたん・ぐっち",
        time: "14:15-18:00",
        stage: "STAGE B",
        image: "https://i.gyazo.com/baa82c92d80f091a8fee8815bd02c9fb.jpg",
        detail: "あなたの\"好きな言葉\"、まゆか先生が筆にのせて贈ります。コーヒーと共に、心整うアートな時間を。"
      },
    ],
    exhibition: [
      { name: "イラスト展示", desc: "アーリャン", time: "13:00-19:00", stage: "GALLERY", image: "" },
      { name: "イラスト展示", desc: "あけちゃん", time: "13:00-19:00", stage: "GALLERY", image: "" },
      { name: "イラスト展示", desc: "まみたす", time: "13:00-19:00", stage: "GALLERY", image: "" },
      { name: "写真展示", desc: "かまちゃん", time: "13:00-19:00", stage: "GALLERY", image: "" },
    ],
    night: [
      { name: "ちえちゃん", desc: "スナックちえこ ママ" },
      { name: "かさたろう・ぐっち", desc: "ボーイ" },
    ]
  };

  return (
    <div className="min-h-screen pb-20 w-full overflow-x-hidden">
      <GlobalStyles />

      {/* HEADER SECTION - CENTERED */}
      <header className="pt-12 px-4 md:px-8 max-w-5xl mx-auto mb-8 text-center relative">
        <div className="flex flex-col items-center border-b-8 border-black pb-10">

          {/* Tagline */}
          <div className="bg-black text-white inline-block px-4 py-1 mb-6 font-bold transform -rotate-2 text-lg border-2 border-black brutalist-shadow-sm rounded-md">
            LOOSE & ART & FUN
          </div>

          {/* Main Title */}
          <div className="mb-10 relative">
            <span className="block text-2xl md:text-4xl font-bold tracking-widest mb-2 text-black transform -rotate-1 font-display">第一回 ネイバーズ江坂</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[1.1] tracking-tighter text-stroke-white relative z-10">
              文化祭
            </h1>
            {/* デコ */}
            <Star className="absolute -top-4 -right-8 w-12 h-12 text-yellow-400 fill-current animate-spin-slow" />
            <Heart className="absolute bottom-0 -left-8 w-10 h-10 text-pink-500 fill-current" />
          </div>

          {/* Date & Location Info Block */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center w-full max-w-3xl">

             {/* Date Badge */}
             <div className="text-2xl md:text-3xl font-bold bg-yellow-400 inline-block px-6 py-2 border-4 border-black brutalist-shadow transform rotate-1 text-black font-display rounded-lg">
                2/22 (SUN)
             </div>

             {/* Locations */}
             <div className="flex flex-col gap-3 text-left">
                {/* DAY INFO */}
                <div className="flex flex-col md:flex-row items-center gap-3 bg-white border-2 border-black px-4 py-2 brutalist-shadow-sm transform -rotate-2 rounded-md">
                    <div className="flex items-center gap-2 font-bold text-lg text-black">
                        <Clock size={20} className="text-black"/> 13:00 - 19:00
                    </div>
                    <div className="hidden md:block h-6 w-0.5 bg-black"></div>
                    <div className="flex items-center gap-1 font-bold text-black">
                        <MapPin size={18} className="text-black"/> ネイバーズ江坂 1st
                    </div>
                </div>

                {/* NIGHT INFO */}
                <div className="flex flex-col md:flex-row items-center gap-3 bg-indigo-900 text-white border-2 border-black px-4 py-2 brutalist-shadow-sm transform rotate-2 rounded-md">
                    <div className="flex items-center gap-2 font-bold text-lg text-yellow-300">
                         <Moon size={20} /> 19:00 - 21:00
                    </div>
                    <div className="hidden md:block h-6 w-0.5 bg-indigo-500"></div>
                    <div className="flex items-center gap-1 font-bold">
                         <MapPin size={18} /> ネイバーズ江坂 2nd
                    </div>
                </div>
             </div>
          </div>

        </div>
      </header>

      {/* MARQUEE */}
      <div className="mb-12 w-full transform -rotate-1 origin-left scale-105">
        <Marquee text="★ ENJOY THE MOMENT ★ LOOSE VIBES ONLY ★ ART & MUSIC & FOOD ★ WELCOME EVERYONE ★" />
      </div>

      <main className="px-4 md:px-8 max-w-7xl mx-auto">

        {/* COUNTDOWN */}
        <Countdown />

        {/* TIME SCHEDULE */}
        <TimeSchedule />

        {/* STAGE MAP */}
        <StageMap />

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-32 auto-rows-auto mb-24">

          {/* PERFORMANCE */}
          <div className="lg:row-span-2">
            <SectionTitle title="STAGE" icon={Music} color="bg-cyan-400" />
            <ContentCard
              title="PERFORMANCE & TALK"
              items={content.performance}
              colorClass="bg-cyan-300"
            />
          </div>

          {/* SHOPS */}
          <div>
            <SectionTitle title="MARKET" icon={Zap} color="bg-pink-400" />
            <ContentCard
              title="SHOPS & BOOTHS"
              items={content.shops}
              colorClass="bg-pink-300"
            />
          </div>

          {/* FOOD */}
          <div>
            <SectionTitle title="YUMMY" icon={Coffee} color="bg-orange-400" />
            <ContentCard
              title="FOOD & DRINK"
              items={content.food}
              colorClass="bg-orange-300"
            />
          </div>

          {/* WORKSHOP */}
          <div>
            <SectionTitle title="CREATE" icon={Sparkles} color="bg-green-400" />
            <ContentCard
              title="WORKSHOP"
              items={content.workshop}
              colorClass="bg-green-300"
            />
          </div>

          {/* GALLERY */}
          <div>
            <SectionTitle title="ART" icon={ImageIcon} color="bg-purple-400" />
            <ContentCard
              title="EXHIBITION"
              items={content.exhibition}
              colorClass="bg-purple-300"
            />
          </div>

           {/* NIGHT PART */}
           <div className="md:col-span-2 lg:col-span-1">
            <SectionTitle title="NIGHT" icon={Moon} color="bg-indigo-600" />
             <div className="bg-indigo-950 text-white border-4 border-black p-6 h-full brutalist-shadow relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl rounded-xl">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Moon size={100} className="text-yellow-200" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-display text-yellow-300 mb-6 border-b-2 border-indigo-700 pb-2 inline-block">
                    ★ スナックちえこ OPEN ★
                  </h3>

                  {/* ママ */}
                  <div className="flex items-center gap-4 mb-3">
                     <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center font-bold text-lg border-2 border-indigo-400 shrink-0 text-white">
                        ママ
                     </div>
                     <div className="text-xl font-bold">ちえちゃん</div>
                  </div>

                  {/* ボーイ */}
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-indigo-800 rounded-full flex items-center justify-center font-bold text-xs border-2 border-indigo-500 shrink-0 text-white">
                        ボーイ
                     </div>
                     <div className="text-lg font-bold">かさたろう・ぐっち</div>
                  </div>

                  <p className="text-indigo-200 text-sm mb-6 leading-relaxed bg-indigo-900/50 p-3 rounded border border-indigo-800">
                    19:00 - 21:00<br/>
                    大人の時間。ゆるく飲みましょう。
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-bold bg-yellow-300 text-black px-3 py-1.5 border-2 border-black transform -rotate-1 shadow-[2px_2px_0px_0px_#000] rounded-md">
                    <MapPin size={14} /> @ネイバーズ江坂 2nd
                  </div>
                </div>
             </div>
          </div>

        </div>

        {/* INFO / DISCLAIMER */}
        <div className="mt-32 relative mb-12">
          <div className="bg-yellow-100 border-4 border-black p-8 brutalist-shadow transform rotate-1 max-w-3xl mx-auto text-center relative rounded-2xl">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-8 py-2 font-bold text-2xl border-4 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 rounded-md">
               IMPORTANT!
            </div>
            <h2 className="text-2xl font-bold mb-6 font-display flex items-center justify-center gap-3 mt-6 text-black">
              <AlertCircle className="w-8 h-8 text-black"/> ゆる〜い気持ちでどうぞ
            </h2>
            <p className="text-lg font-bold leading-relaxed space-y-2 text-black">
              <span className="block">仕事じゃないのでクオリティは問いません！</span>
              <span className="block">ドタキャンもOK！</span>
              <span className="block text-xl text-purple-600 mt-4 font-display">楽しむことが一番のルールです。</span>
              <span className="block mt-6 text-base bg-lime-400 inline-block px-4 py-2 border-2 border-black transform rotate-1 shadow-[2px_2px_0px_0px_#000] rounded-md">
                出店したい、発表したい、ご飯作りたい、展示したいなどなど、気になる人がいればLINEでうみまでご相談ください💁‍♀️
              </span>
              <span className="inline-block mt-6 bg-black text-white px-6 py-2 transform -rotate-2 border-2 border-transparent hover:border-lime-400 transition-colors cursor-default rounded-lg">ENJOY & RELAX</span>
            </p>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-20 bg-black text-white py-12 border-t-8 border-lime-400">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-display mb-2">NEIGHBORS ESAKA</h2>
              <p className="opacity-70 font-mono font-bold">2026.02.22 SUN / OSAKA</p>
            </div>
            <div className="flex gap-4">
              <button className="w-16 h-16 bg-white text-black border-4 border-transparent hover:border-lime-400 flex items-center justify-center rounded-full transition-all hover:scale-110">
                 <Heart size={30} fill="black" />
              </button>
            </div>
        </div>
      </footer>
    </div>
  );
}
