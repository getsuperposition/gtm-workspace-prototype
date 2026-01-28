'use client';

import styles from './DocumentArtifact.module.css';

/**
 * Document Artifact
 * Generic document renderer for markdown-like content
 */
const DocumentArtifact = ({ artifact }) => {
  const { content } = artifact;

  if (!content) {
    return <div className={styles.empty}>No content available</div>;
  }

  // If content is a string, render it as markdown-like text
  if (typeof content === 'string') {
    return (
      <div className={styles.document}>
        <div className={styles.content}>
          {content.split('\n').map((line, index) => {
            // Handle headers
            if (line.startsWith('### ')) {
              return <h3 key={index} className={styles.h3}>{line.slice(4)}</h3>;
            }
            if (line.startsWith('## ')) {
              return <h2 key={index} className={styles.h2}>{line.slice(3)}</h2>;
            }
            if (line.startsWith('# ')) {
              return <h1 key={index} className={styles.h1}>{line.slice(2)}</h1>;
            }

            // Handle bullet points
            if (line.startsWith('- ') || line.startsWith('* ')) {
              return (
                <li key={index} className={styles.listItem}>
                  {renderInlineFormatting(line.slice(2))}
                </li>
              );
            }

            // Handle numbered lists
            if (/^\d+\.\s/.test(line)) {
              return (
                <li key={index} className={styles.numberedItem}>
                  {renderInlineFormatting(line.replace(/^\d+\.\s/, ''))}
                </li>
              );
            }

            // Handle blockquotes
            if (line.startsWith('> ')) {
              return (
                <blockquote key={index} className={styles.blockquote}>
                  {renderInlineFormatting(line.slice(2))}
                </blockquote>
              );
            }

            // Empty lines
            if (line.trim() === '') {
              return <br key={index} />;
            }

            // Regular paragraphs
            return (
              <p key={index} className={styles.paragraph}>
                {renderInlineFormatting(line)}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  // If content is an object with sections
  const { title, sections = [] } = content;

  return (
    <div className={styles.document}>
      {title && <h1 className={styles.documentTitle}>{title}</h1>}

      {sections.map((section, index) => (
        <section key={index} className={styles.section}>
          {section.heading && (
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
          )}
          {section.content && (
            <div className={styles.sectionContent}>
              {Array.isArray(section.content) ? (
                <ul className={styles.list}>
                  {section.content.map((item, i) => (
                    <li key={i} className={styles.listItem}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.paragraph}>{section.content}</p>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

/**
 * Render inline formatting (bold, italic, code)
 */
function renderInlineFormatting(text) {
  // Simple implementation - just return the text
  // In a real app, you'd parse **bold**, *italic*, `code`, etc.
  return text;
}

export default DocumentArtifact;
