import React from 'react';
import faqData from '../../../public/faqData';
// import faqData from ''

const AboutUs = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-200"
          >
            <input type="checkbox" name={`faq-${index}`} />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-700">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default AboutUs;