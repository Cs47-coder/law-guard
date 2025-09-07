import { useState, useEffect, useRef } from 'react';
import {
  Scale,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Menu,
  User,
} from 'lucide-react';
import Settings from '../components/Settings';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const chatHistoryRef = useRef<HTMLDivElement | null>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);

  const chatHistory = [
    { id: 1, title: 'Contract Review', date: '2024-03-10' },
    { id: 2, title: 'Legal Consultation', date: '2024-03-09' },
    { id: 3, title: 'Document Analysis', date: '2024-03-08' },
    { id: 4, title: 'Business Contract Review', date: '2024-03-07' },
    { id: 5, title: 'Trademark Filing', date: '2024-03-06' },
    { id: 6, title: 'Patent Check', date: '2024-03-05' },
    { id: 7, title: 'Real Estate Agreement', date: '2024-03-04' },
    { id: 8, title: 'Software License Agreement', date: '2024-03-03' },
    { id: 9, title: 'Employment Contract Review', date: '2024-03-02' },
    { id: 10, title: 'Joint Venture Agreement', date: '2024-03-01' },
  ];

  // Close Chat History on outside click
  useEffect(() => {
    const handleClickOutsideChatHistory = (event: MouseEvent) => {
      if (
        isChatHistoryOpen &&
        chatHistoryRef.current &&
        !chatHistoryRef.current.contains(event.target as Node) &&
        !chatButtonRef.current?.contains(event.target as Node)
      ) {
        setIsChatHistoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideChatHistory);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideChatHistory);
    };
  }, [isChatHistoryOpen]);

  // Close Sidebar on outside click (small screens only)
  useEffect(() => {
    const handleClickOutsideSidebar = (event: MouseEvent) => {
      const isSmallScreen = window.innerWidth < 768;
      if (
        isOpen &&
        isSmallScreen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideSidebar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSidebar);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 bg-cyan-50 rounded-lg fixed top-0 right-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-cyan-50 to-cyan-50 text-black h-screen flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex md:z-auto`}
      >
        {/* Header */}
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Scale className="w-6 h-6 text-black" />
            Law Guard AI
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 relative">
          <div className="space-y-2">
            {/* Chat History Button with Dropdown */}
            <div className="relative">
              <button
                ref={chatButtonRef}
                onClick={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-black-300 hover:bg-white rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-black-400" />
                  Chat History
                </div>
                {isChatHistoryOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isChatHistoryOpen && (
                <div
                  ref={chatHistoryRef}
                  className="absolute left-0 right-0 mt-1 bg-cyan-50 rounded-lg z-30"
                >
                  <div
                    className="p-3 space-y-3 max-h-[calc(100vh-18rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                  >
                    {chatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        className="p-2 border border-gray-100 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <h3 className="font-medium text-gray-900">{chat.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{chat.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Account Manager */}
        <div className="p-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-black-300 hover:bg-white rounded-lg"
          >
            <User className="w-8 h-8 text-black bg-gray-400 rounded-full" />
            Account
          </button>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[999]">
          <Settings onClose={() => setIsSettingsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
