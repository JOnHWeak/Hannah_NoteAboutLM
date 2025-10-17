/**
 * Content Parser Utility for FAQ Detailed Answers
 * Parses HTML content and applies structured styling
 */

export const parseDetailedAnswer = (htmlContent) => {
    if (!htmlContent) return null;

    // Remove HTML tags but preserve structure markers
    const cleanContent = htmlContent
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/?p>/gi, '\n')
        .replace(/<\/?div>/gi, '\n')
        .replace(/<\/?span[^>]*>/gi, '')
        .replace(/&nbsp;/gi, ' ')
        .trim();

    const lines = cleanContent.split('\n').filter(line => line.trim());
    const parsedContent = [];
    let currentSection = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Detect headings (lines with ** at start and end, or ending with :)
        if ((line.startsWith('**') && line.endsWith('**')) || 
            (line.includes('**') && line.endsWith(':'))) {
            if (currentSection) {
                parsedContent.push(currentSection);
            }
            currentSection = {
                type: 'heading',
                content: line.replace(/\*\*/g, '').replace(/:$/, ''),
                items: []
            };
        }
        // Detect numbered lists
        else if (/^\d+\.\s/.test(line)) {
            const item = {
                type: 'numbered-item',
                content: line.replace(/^\d+\.\s/, ''),
                number: line.match(/^(\d+)\./)[1]
            };
            if (currentSection) {
                currentSection.items.push(item);
            } else {
                parsedContent.push({ type: 'numbered-list', items: [item] });
            }
        }
        // Detect bullet points
        else if (line.startsWith('- ') || line.startsWith('• ')) {
            const item = {
                type: 'bullet-item',
                content: line.replace(/^[-•]\s/, '')
            };
            if (currentSection) {
                currentSection.items.push(item);
            } else {
                parsedContent.push({ type: 'bullet-list', items: [item] });
            }
        }
        // Regular paragraph
        else {
            const paragraph = {
                type: 'paragraph',
                content: line
            };
            if (currentSection) {
                currentSection.items.push(paragraph);
            } else {
                parsedContent.push(paragraph);
            }
        }
    }

    // Add the last section if exists
    if (currentSection) {
        parsedContent.push(currentSection);
    }

    return parsedContent;
};

export const formatInlineCode = (text) => {
    // Match code snippets in backticks, single quotes, or common patterns
    return text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
               .replace(/'([^']*?)'/g, (match, p1) => {
                   // Only format as code if it looks like code (contains /, ., or is short technical term)
                   if (p1.includes('/') || p1.includes('.') || /^[A-Z][a-z]*$/.test(p1) || p1.length < 15) {
                       return `<code class="inline-code">${p1}</code>`;
                   }
                   return match;
               })
               .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>');
};

// This utility file only contains parsing logic, no JSX
