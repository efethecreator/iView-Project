const ManageQuestions = () => {
  const [activeMenu, setActiveMenu] = useState('questions');

  return (
    <div className="w-64 bg-gray-900 p-4">
      <h2 className="text-2xl text-white">Manage Question Package</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin-dashboard/questions"
            className={`block p-2 rounded hover:bg-gray-700 ${activeMenu === 'questions' ? 'bg-gray-700' : 'text-gray-400'}`}
            onClick={() => setActiveMenu('questions')}
          >
            Manage Question Package
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ManageQuestions;
