// src/components/CustomEditor.js
import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import  '../index.css';

const CustomEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (newContent) => {
    // Verifique se o conteúdo atingiu um limite e insira uma quebra de página
    const PAGE_LIMIT = 1000; // Defina um limite de caracteres para a quebra de página

    let updatedContent = newContent;
    const textLength = updatedContent.length;

    if (textLength > PAGE_LIMIT) {
      // Adiciona uma quebra de página após o limite
      updatedContent = updatedContent.replace(new RegExp(`(.{${PAGE_LIMIT}})`, 'g'), '$1<!--pagebreak-->');
    }

    setContent(updatedContent);
  };

  const config = {
    readonly: false, // Defina como true para tornar o editor somente leitura
    // Adicione configurações adicionais conforme necessário
  };

  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1} // tabIndex para focar o editor
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomEditor;
