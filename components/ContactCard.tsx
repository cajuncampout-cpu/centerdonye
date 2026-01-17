
import React from 'react';
import { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
          {contact.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{contact.name}</h3>
          <p className="text-gray-500 font-mono text-sm">{contact.phone}</p>
          {contact.address && <p className="text-gray-400 text-xs mt-1">{contact.address}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        <a 
          href={`tel:${contact.phone}`}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          title="اتصال"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
