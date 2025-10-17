import React from 'react';
import { parseDetailedAnswer, formatInlineCode } from '../utils/contentParser';

const StructuredAnswer = ({ content }) => {
    const parsedContent = parseDetailedAnswer(content);

    const renderItem = (item, index) => {
        switch (item.type) {
            case 'numbered-item':
                return (
                    <div key={index} className="flex items-start">
                        <span className="text-emerald-400 font-semibold mr-2">{item.number}.</span>
                        <span
                            className="text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatInlineCode(item.content) }}
                        />
                    </div>
                );

            case 'bullet-item':
                return (
                    <div key={index} className="flex items-start">
                        <span className="text-emerald-400 mr-2">•</span>
                        <span
                            className="text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatInlineCode(item.content) }}
                        />
                    </div>
                );

            case 'paragraph':
                return (
                    <p
                        key={index}
                        className="text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatInlineCode(item.content) }}
                    />
                );

            default:
                return null;
        }
    };

    const renderParsedContent = (parsedContent) => {
        if (!parsedContent || !Array.isArray(parsedContent)) return null;

        return parsedContent.map((section, index) => {
            switch (section.type) {
                case 'heading':
                    return (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-semibold text-emerald-400 mb-4 border-l-4 border-emerald-400 pl-4">
                                {section.content}
                            </h3>
                            {section.items && section.items.length > 0 && (
                                <div className="ml-4 space-y-3">
                                    {section.items.map((item, itemIndex) => renderItem(item, itemIndex))}
                                </div>
                            )}
                        </div>
                    );

                case 'numbered-list':
                    return (
                        <ol key={index} className="list-decimal list-inside space-y-2 mb-4 ml-4">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-gray-300 leading-relaxed">
                                    <span
                                        className="ml-2"
                                        dangerouslySetInnerHTML={{ __html: formatInlineCode(item.content) }}
                                    />
                                </li>
                            ))}
                        </ol>
                    );

                case 'bullet-list':
                    return (
                        <ul key={index} className="list-disc list-inside space-y-2 mb-4 ml-4">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-gray-300 leading-relaxed">
                                    <span
                                        className="ml-2"
                                        dangerouslySetInnerHTML={{ __html: formatInlineCode(item.content) }}
                                    />
                                </li>
                            ))}
                        </ul>
                    );

                case 'paragraph':
                    return (
                        <p
                            key={index}
                            className="text-gray-300 leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{ __html: formatInlineCode(section.content) }}
                        />
                    );

                default:
                    return null;
            }
        });
    };

    return (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-lg leading-relaxed text-gray-300">
            {renderParsedContent(parsedContent)}
        </div>
    );
};

export default StructuredAnswer;
