
import { Contact } from '../types';

// ملاحظة: في بيئة المتصفح، لا يمكن قراءة ملف .db مباشرة إلا عبر SQL.js أو إرساله لسيرفر.
// هذا الكود يحاكي محرك البحث الذي سيتعامل مع بياناتك.

export const searchInDB = async (query: string, mockData: Contact[]): Promise<Contact[]> => {
  // محاكاة تأخير البحث
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockData.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) || 
    item.phone.includes(lowerQuery)
  ).slice(0, 20); // عرض أول 20 نتيجة للأداء
};
