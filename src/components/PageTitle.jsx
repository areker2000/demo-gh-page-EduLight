const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
};

export default PageTitle;

/*
<PageTitle
  title={'最新消息'}
  subtitle={'追蹤 EduLight 平台的最新活動與教學資訊'}
/>
*/
