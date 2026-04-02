export const newsData = [
  {
    id: 3,
    category: '優惠活動',
    date: '2026.03.09',
    title: '春季課程早鳥優惠現正開跑！',
    content: [
      '迎接春季學期！',
      '我們推出了全新的早鳥優惠方案，只要在結帳時輸入優惠碼「spring85」，即可享有全站課程 85 折的專屬方案。',
      '無論是學科加強、技能培養，或是一對一專業指導，都能以更輕鬆的方式開始。',
      '現在就選擇喜愛的課程與老師，提前規劃學習步調，在彈性時段中穩定成長，讓每一堂課都更有價值。',
    ],
    imgUrl:
      'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    category: '平台公告',
    date: '2026.02.11',
    title: '系統維護通知',
    content: [
      '為了提供更穩定的連線品質，我們將於本週六凌晨 02:00 進行例行性系統維護，預計耗時 4 小時。',
      '期間平台將暫停服務，包含登入、購課與上課功能皆無法使用。',
      '建議您提前安排學習時段，維護完成後將恢復正常，感謝您的理解與支持。',
    ],
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1714618831065-8e8dadd8d3df?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 1,
    category: '平台公告',
    date: '2026.01.16',
    title: 'EduLight平台正式上線！ (贈送300元折價優惠)',
    content: [
      'EduLight 正式上線！',
      '我們致力於打造一個結合知識與技能的多元學習平台，提供一對一真人教學，涵蓋學科、創作與體育等多元課程。',
      '您可自由選擇教師、彈性安排上課時間，享受即時互動與高效學習體驗。',
      '邀請您一同加入，開啟更自在且有溫度的學習旅程。',
      '(結帳時輸入「new300」即可享300元折價優惠碼)',
    ],
    imgUrl:
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const couponsData = [
  {
    title: '春季優惠85折',
    code: 'spring85',
    method: 'percentage',
    value: 85,
  },
  {
    title: '開幕禮300元',
    code: 'new300',
    method: 'minus',
    value: 300,
  },
];
