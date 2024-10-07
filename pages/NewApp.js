// src/App.js
import React from 'react';
// import CustomEditor from './components/CustomEditor';
import '../index.css'; // Certifique-se de importar o arquivo CSS para que o estilo de quebra de página funcione
import CustomEditor from './CustomEditor';

function NewApp() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Editor de Texto com Quebra de Página</h1>
        <CustomEditor />
      </header>
    </div>
  );
}

export default NewApp;