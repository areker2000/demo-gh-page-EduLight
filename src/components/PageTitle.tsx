interface IPageTitle {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageTitle = ({ title, subtitle, children }: IPageTitle) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-400 mt-2 ml-2">{subtitle}</p>
      {children}
    </div>
  );
};

export default PageTitle;
