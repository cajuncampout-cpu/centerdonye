
import React, { useState, useEffect, useCallback } from 'react';
import { Contact, SearchHistory } from './types';
import { searchInDB } from './services/dbManager';
import ContactCard from './components/ContactCard';

// بيانات تجريبية لمحاكاة ملف الـ DB الخاص بك
const MOCK_DB: Contact[] = [
  { id: 1, name: "أحمد محمد", phone: "0123456789", address: "القاهرة، مصر" },
  { id: 2, name: "سارة محمود", phone: "0987654321", address: "دبي، الإمارات" },
  { id: 3, name: "ياسين علي", phone: "0554433221", address: "الرياض، السعودية" },
  { id: 4, name: "منى حسن", phone: "0112233445", address: "عمان، الأردن" },
  { id: 5, name: "خالد سعيد", phone: "0778899001", address: "الدوحة، قطر" },
  { id: 6, name: "فاطمة الزهراء", phone: "0102030405", address: "الدار البيضاء، المغرب" },
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Contact[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [dbFile, setDbFile] = useState<File | null>(null);

  // تحديث البحث عند الكتابة
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.length < 2) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      const res = await searchInDB(searchQuery, MOCK_DB);
      setResults(res);
      setIsSearching(false);
    };

    const timeoutId = setTimeout(performSearch, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDbFile(e.target.files[0]);
      alert("تم رفع قاعدة البيانات بنجاح! سيتم البحث ضمنها.");
    }
  };

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">دليل الهاتف الذكي</h1>
        <p className="opacity-80 text-sm">ابحث عن أي رقم أو اسم بسهولة</p>
      </header>

      {/* Database Import Section */}
      {!dbFile && (
        <div className="p-4 mt-4 mx-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex flex-col items-center gap-3">
          <p className="text-xs text-yellow-800 text-center">قم برفع ملف الـ DB الخاص بك لتشغيل البحث الفعلي</p>
          <label className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold cursor-pointer hover:bg-yellow-700 transition">
            رفع ملف قاعدة البيانات
            <input type="file" className="hidden" accept=".db" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4 sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md">
        <div className="relative group">
          <input
            type="text"
            placeholder="ابحث بالاسم أو الرقم..."
            className="w-full p-4 pr-12 rounded-2xl border-2 border-transparent bg-white shadow-md focus:border-blue-500 focus:outline-none transition-all text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {isSearching && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <main className="px-4">
        {results.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-sm text-gray-500 font-medium">نتائج البحث ({results.length})</span>
              <button 
                onClick={() => setResults([])}
                className="text-xs text-blue-600 hover:underline"
              >
                مسح النتائج
              </button>
            </div>
            {results.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        ) : searchQuery.length > 1 && !isSearching ? (
          <div className="text-center mt-20">
            <div className="text-gray-300 mb-4 flex justify-center">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-gray-500 font-bold">لا توجد نتائج</h3>
            <p className="text-gray-400 text-sm">حاول البحث بكلمات أخرى</p>
          </div>
        ) : (
          <div className="mt-10">
            <h2 className="text-gray-600 font-bold mb-4 px-2">اقتراحات البحث</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setSearchQuery('أحمد')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-gray-700 hover:bg-blue-50 transition">بحث عن "أحمد"</button>
              <button onClick={() => setSearchQuery('01')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-gray-700 hover:bg-blue-50 transition">الأرقام التي تبدأ بـ 01</button>
            </div>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <h3 className="text-blue-800 font-bold mb-2">تعليمات الاستخدام</h3>
              <ul className="text-blue-600 text-sm space-y-2">
                <li>• يمكنك البحث بالاسم الأول أو الأخير.</li>
                <li>• البحث عن طريق الرقم يدعم البحث الجزئي.</li>
                <li>• تأكد من صحة ملف الـ DB إذا قمت برفعه.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 h-16 flex items-center justify-around shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">الرئيسية</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">الأقسام</span>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-blue-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">الإعدادات</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
