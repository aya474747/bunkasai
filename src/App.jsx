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

const ContentCard = ({ title, items, colorClass, rotate = "rotate-0", onItemClick }) => (
  <div className={`bg-white border-4 border-black p-6 h-full brutalist-shadow transition-transform hover:-translate-y-1 hover:shadow-xl ${rotate}`}>
    <div className={`inline-block px-4 py-1 text-sm font-bold border-2 border-black mb-6 ${colorClass} text-black brutalist-shadow-sm`}>
      {title}
    </div>
    <ul className="space-y-6">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-4 border-b-2 border-dotted border-gray-300 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg -mx-2"
          onClick={() => onItemClick && onItemClick(item)}
        >

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

const Marquee = ({ text }) => {
  return (
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
};

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

// マスターデータ（このデータを編集すれば、タイムテーブルとコンテンツセクションの両方に反映されます）
const EVENT_DATA = [
  { id: 0, title: '開会式', category: 'performance', stage: 'C', start: '13:00', end: '13:15', rowStart: 1, rowSpan: 1, user: '全員' },
  { id: 1, title: '好日屋上 アコースティックライブ', category: 'performance', stage: 'C', start: '13:15', end: '13:30', rowStart: 2, rowSpan: 1, user: 'うみ・ももちゃん・まゆちゃん・さっちゃま・かのくん', image: 'https://i.gyazo.com/61aa54eb72e5ddb43a1750aa5f014f9f.jpg', detail: '屋上で演奏するのが大好きなメンバーでアコースティックライブします🎸🎸🎸🎹🥁' },
  { id: 11, title: '人生で最後の合唱(旅立ちの日に)', category: 'performance', stage: 'C', start: '13:30', end: '14:00', rowStart: 3, rowSpan: 2, user: '全員 指揮:かよちゃん ピアノ:さっちゃま', image: 'https://i.gyazo.com/c62624ce8f2a843df2a8f1e2d63532aa.png', detail: '人生で最後の合唱になるかもしれないよ！！！！奮ってご参加ください🙌', practiceVideos: { soprano: 'https://www.youtube.com/watch?v=mnM-UYeLz5Q', alto: 'https://www.youtube.com/watch?v=OW2dq5Xg73E', tenor: 'https://m.youtube.com/watch?v=m5ctvhONbsI' } },
  { id: 7, title: '社交ダンス', category: 'performance', stage: 'C', start: '14:00', end: '14:15', rowStart: 5, rowSpan: 1, user: 'つねぽん、りほちゃんペア', image: 'https://i.gyazo.com/f2caa282aeb54407e86e67a73fc09c22.jpg', detail: 'Shall we dance？💃' },
  { id: 10, title: 'FMネイバーズ〜書籍完成トークショー&みんなに即興インタビュー〜', category: 'performance', stage: 'C', start: '14:30', end: '15:00', rowStart: 7, rowSpan: 2, user: 'DJしおり&ゆか', image: 'https://i.gyazo.com/53ff64e38e1d275f8e4ff16c79c0ac71.jpg', detail: '集めてきたみんなの「最近よかったこと」をお便りに。ラジオ風にトーク&即興インタビューします🎤' },
  { id: 8, title: 'AI映像づくり', category: 'performance', stage: 'C', start: '15:00', end: '16:00', rowStart: 9, rowSpan: 4, user: 'なべちゃん', image: 'https://i.gyazo.com/3eed8aec0e64d1d7ba52fafd645948d2.jpg', detail: 'Soraを使って動画作りをやります！目指せハリウッド進出！' },
  { id: 14, title: 'DJ George 🎧🔥', category: 'performance', stage: 'C', start: '17:00', end: '17:45', rowStart: 17, rowSpan: 3, user: 'ジョージくん', image: 'https://i.gyazo.com/47cc2932768a488ed0230886616849fa.jpg', detail: 'その瞬間、その場所でしか生まれないバイブスを一緒に。\n音で繋がろう。' },
  { id: 2, title: 'ネイバーズダンス部', category: 'performance', stage: 'C', start: '17:45', end: '18:00', rowStart: 20, rowSpan: 1, user: 'ネイバーズダンス部', image: 'https://i.gyazo.com/f448099b0d91a21483e9a5887401404a.png', detail: 'キュートセクシーわんぱく詰め込みました🕺💖\nLet\'s party time！！！\n\n出演者：ごうちゃん・りほちゃん・むぎちゃん・まりんちゃん・なっちゃん' },
  { id: 13, title: '閉会式&2ndに移動', category: 'performance', stage: 'C', start: '18:15', end: '18:45', rowStart: 22, rowSpan: 2, user: '全員' },
  { id: 4, title: 'スマホストラップ作り', category: 'workshop', stage: 'C', start: '16:00', end: '17:00', rowStart: 13, rowSpan: 4, user: 'みなみ先生', image: 'https://i.gyazo.com/8a702743f7af57bb8e0e14f5f9eff64e.jpg', detail: 'カラフルなパラコードで、スマホストラップを作ろう！' },
  { id: 12, title: 'かのお悩み相談室', category: 'shops', stage: 'A', start: '14:15', end: '16:00', rowStart: 6, rowSpan: 7, user: 'かのくん(うみの夫)', image: 'https://i.gyazo.com/b9e87d295b700786368bda29c865c97b.jpg', detail: 'かのくんがあなたのお悩み相談にのります！あるいはあなたにかのくんのお悩みを聞いてもらいます！決めるのはア・ナ・タ♡' },
  { id: 5, title: 'トイレZINE販売', category: 'shops', stage: 'D', start: '14:15', end: '18:00', rowStart: 6, rowSpan: 15, user: 'さくらちゃん・ゆうこりん', image: 'https://i.gyazo.com/4f5d109e4ddc5bbdddaab52ea475f5fc.jpg', detail: 'トイレマークの写真を撮り集めて、気づいたら、10年以上経っていました.........！様々な国を旅して出会った、ニッチな世界へようこそ......！' },
  { id: 61, title: 'ほぐしの満洲', category: 'shops', stage: 'E', start: '14:30', end: '14:40', rowStart: 7, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
  { id: 62, title: 'ほぐしの満洲', category: 'shops', stage: 'E', start: '15:30', end: '15:40', rowStart: 11, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
  { id: 63, title: 'ほぐしの満洲', category: 'shops', stage: 'E', start: '16:30', end: '16:40', rowStart: 15, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
  { id: 64, title: 'ほぐしの満洲', category: 'shops', stage: 'E', start: '17:30', end: '17:40', rowStart: 19, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
  { id: 65, title: 'ほぐしの満洲', category: 'shops', stage: 'E', start: '18:30', end: '18:40', rowStart: 23, rowSpan: 1, user: 'ごとちゃん', image: 'https://i.gyazo.com/202c7310a52ccc20a37c0388d6568c13.jpg', detail: '施術時間10分 Max 5人' },
  { id: 3, title: 'AIで作ったプリクラコーナー', category: 'shops', stage: 'A', start: '16:00', end: '19:00', rowStart: 13, rowSpan: 12, user: 'なべちゃん', image: 'https://i.gyazo.com/a01278114387d5bca52e7b8a88cbf1ec.jpg', detail: '気になるあの子と思い出のぷりとっちゃお！撮影したデータは、そのままプレゼント🎁' },
  { id: 66, title: 'Soup Stock Esaka', category: 'food', stage: 'F', start: '14:15', end: '18:00', rowStart: 6, rowSpan: 15, user: 'いけめぐ・あまねちゃん', image: 'https://i.gyazo.com/1c0d4ff391dd612c82c5fe1d702d5836.jpg', detail: 'スープ+パンのセット 限定15食' },
  { id: 99, title: '喫茶まゆか', category: 'food', stage: 'B', start: '14:15', end: '18:00', rowStart: 6, rowSpan: 15, user: 'まゆちゃん・ももちゃん・あっこたん・ぐっち', image: 'https://i.gyazo.com/5360347fe3ac75b93b12f03054604671.jpg', detail: 'あなたの"好きな言葉"、まゆか先生が筆にのせて贈ります。コーヒーと共に、心整うアートな時間を。' },
  { id: 100, title: 'アーリャンデッサン展示', category: 'exhibition', stage: null, start: null, end: null, user: 'アーリャン', time: '13:00-19:00', stageText: 'GALLERY', image: 'https://i.gyazo.com/1a49ddef624a98f720aa300b27790001.jpg', detail: 'さあどっちが私でしょう〜\nアーリャンデッサン展示' },
  { id: 101, title: 'イラスト展示', category: 'exhibition', stage: null, start: null, end: null, user: 'ななみん', time: '13:00-19:00', stageText: 'GALLERY', image: '' },
  { id: 103, title: '余白（yohaku）', category: 'exhibition', stage: null, start: null, end: null, user: 'かまちゃん', time: '13:00-19:00', stageText: 'GALLERY', image: 'https://i.gyazo.com/2477fcf799bf4796c46d4c79c46c9030.jpg', detail: 'かまちゃんが人生の"余白"を求めて旅したり食べたりしたものたちの厳選写真展だよ', role: 'フォトグラファー' },
];

// タイムテーブルに表示されないイベント（夜の部など）
const EXTRA_EVENTS = {
  night: [
    { name: "ちえちゃん", desc: "スナックちえこ ママ" },
    { name: "かさたろう・ぐっち", desc: "ボーイ" },
  ]
};

const EventModal = ({ selectedEvent, onClose }) => {
  if (!selectedEvent) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border-4 border-black brutalist-shadow max-w-lg w-full max-h-[90vh] rounded-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 固定ヘッダー（タイトルと閉じるボタン） */}
        <div className="flex justify-between items-start p-6 md:p-8 pb-4 border-b-2 border-gray-200 shrink-0">
          <h3 className="text-2xl md:text-3xl font-display text-black pr-4">{selectedEvent.title}</h3>
          <button
            onClick={onClose}
            className="text-3xl font-bold hover:scale-110 transition-transform shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full border-2 border-black"
          >
            ×
          </button>
        </div>

        {/* スクロール可能なコンテンツエリア */}
        <div className="overflow-y-auto p-6 md:p-8 pt-4">
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
            {selectedEvent.user && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">{selectedEvent.role || '出演者'}</span>
                <span className="font-bold">{selectedEvent.user}</span>
              </div>
            )}
            {(selectedEvent.start && selectedEvent.end) && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">時間</span>
                <span className="font-bold">{selectedEvent.start} - {selectedEvent.end}</span>
              </div>
            )}
            {selectedEvent.time && !(selectedEvent.start && selectedEvent.end) && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">時間</span>
                <span className="font-bold">{selectedEvent.time}</span>
              </div>
            )}
            {selectedEvent.stage && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm bg-black text-white px-3 py-1 rounded">ステージ</span>
                <span className="font-bold">{selectedEvent.stage}</span>
              </div>
            )}
            {selectedEvent.detail && (
              <div className="mt-4 pt-4 border-t-2 border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-line">
                  {selectedEvent.detail}
                </p>
              </div>
            )}
            {selectedEvent.practiceVideos && (
              <div className="mt-4 pt-4 border-t-2 border-gray-200">
                <h3 className="font-bold text-base mb-3">練習動画</h3>
                <div className="space-y-2">
                  {selectedEvent.practiceVideos.soprano && (
                    <div>
                      <span className="font-semibold text-sm">ソプラノパート: </span>
                      <a href={selectedEvent.practiceVideos.soprano} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">
                        {selectedEvent.practiceVideos.soprano}
                      </a>
                    </div>
                  )}
                  {selectedEvent.practiceVideos.alto && (
                    <div>
                      <span className="font-semibold text-sm">アルトパート: </span>
                      <a href={selectedEvent.practiceVideos.alto} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">
                        {selectedEvent.practiceVideos.alto}
                      </a>
                    </div>
                  )}
                  {selectedEvent.practiceVideos.tenor && (
                    <div>
                      <span className="font-semibold text-sm">テノールパート: </span>
                      <a href={selectedEvent.practiceVideos.tenor} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">
                        {selectedEvent.practiceVideos.tenor}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimeSchedule = ({ onEventClick }) => {

  const stages = [
    { id: 'A', name: 'STAGE A', bg: 'bg-red-200', border: 'border-red-500', text: 'text-red-900' },
    { id: 'B', name: 'STAGE B', bg: 'bg-orange-200', border: 'border-orange-500', text: 'text-orange-900' },
    { id: 'C', name: 'STAGE C', bg: 'bg-green-200', border: 'border-green-500', text: 'text-green-900' },
    { id: 'D', name: 'STAGE D', bg: 'bg-cyan-200', border: 'border-cyan-500', text: 'text-cyan-900' },
    { id: 'E', name: 'STAGE E', bg: 'bg-blue-200', border: 'border-blue-500', text: 'text-blue-900' },
    { id: 'F', name: 'STAGE F', bg: 'bg-purple-200', border: 'border-purple-500', text: 'text-purple-900' },
  ];

  // タイムテーブルに表示するイベント（stageがnullでないもの）
  const scheduleData15Min = EVENT_DATA.filter(event => event.stage !== null);

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
                    onClick={() => onEventClick && onEventClick({ title: event.title, user: event.user, start: event.start, end: event.end, stage: stageStyle.name, image: event.image, detail: event.detail, practiceVideos: event.practiceVideos, role: event.role })}
                 >
                    <div className="font-black text-xs md:text-base leading-tight line-clamp-2 text-black font-rounded">{event.title}</div>
                    <div className="hidden md:block opacity-80 text-[8px] md:text-[10px] font-bold text-black/70 truncate mt-0.5">{event.user}</div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (item) => {
    setSelectedEvent({
      title: item.name || item.title,
      user: item.desc || item.user,
      start: item.start,
      end: item.end,
      time: item.time,
      stage: item.stage,
      image: item.image,
      detail: item.detail,
      practiceVideos: item.practiceVideos,
      role: item.role
    });
  };

  // EVENT_DATAからcontentオブジェクトを自動生成
  const generateContent = () => {
    const grouped = {};

    EVENT_DATA.forEach(event => {
      if (!grouped[event.category]) {
        grouped[event.category] = [];
      }

      // 同じタイトル+ユーザー名のイベントが既にある場合はスキップ（ほぐしの満洲の重複を避ける）
      const exists = grouped[event.category].find(e => e.name === event.title && e.desc === event.user);
      if (!exists) {
        const formattedEvent = {
          name: event.title,
          desc: event.user,
          time: event.time || (event.start && event.end ? `${event.start}-${event.end}` : ''),
          stage: event.stageText || (event.stage ? `STAGE ${event.stage}` : ''),
          image: event.image || '',
          detail: event.detail || '',
          practiceVideos: event.practiceVideos,
          role: event.role
        };

        // ほぐしの満洲の特別処理
        if (event.title === 'ほぐしの満洲' && event.id === 61) {
          formattedEvent.time = '13:30 / 14:30 / 15:30 / 16:30 / 17:30開始';
        }

        grouped[event.category].push(formattedEvent);
      }
    });

    // EXTRA_EVENTSを追加
    return {
      performance: grouped.performance || [],
      workshop: grouped.workshop || [],
      shops: grouped.shops || [],
      food: grouped.food || [],
      exhibition: grouped.exhibition || [],
      night: EXTRA_EVENTS.night || []
    };
  };

  const content = generateContent();

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
        <TimeSchedule onEventClick={handleEventClick} />

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
              onItemClick={handleEventClick}
            />
          </div>

          {/* SHOPS */}
          <div>
            <SectionTitle title="MARKET" icon={Zap} color="bg-pink-400" />
            <ContentCard
              title="SHOPS & BOOTHS"
              items={content.shops}
              colorClass="bg-pink-300"
              onItemClick={handleEventClick}
            />
          </div>

          {/* FOOD */}
          <div>
            <SectionTitle title="YUMMY" icon={Coffee} color="bg-orange-400" />
            <ContentCard
              title="FOOD & DRINK"
              items={content.food}
              colorClass="bg-orange-300"
              onItemClick={handleEventClick}
            />
          </div>

          {/* WORKSHOP */}
          <div>
            <SectionTitle title="CREATE" icon={Sparkles} color="bg-green-400" />
            <ContentCard
              title="WORKSHOP"
              items={content.workshop}
              colorClass="bg-green-300"
              onItemClick={handleEventClick}
            />
          </div>

          {/* GALLERY */}
          <div>
            <SectionTitle title="ART" icon={ImageIcon} color="bg-purple-400" />
            <ContentCard
              title="EXHIBITION"
              items={content.exhibition}
              colorClass="bg-purple-300"
              onItemClick={handleEventClick}
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
                    スナックちえこ
                  </h3>

                  {/* イメージ画像 */}
                  <div className="mb-6 flex justify-center">
                    <img
                      src="https://i.gyazo.com/c6e197593e628206f7f2b7215c8c185d.png"
                      alt="スナックちえこ"
                      className="w-full max-w-md h-auto object-cover border-2 border-indigo-400 brutalist-shadow-sm rounded-lg"
                    />
                  </div>

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

      {/* EVENT MODAL */}
      <EventModal selectedEvent={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
