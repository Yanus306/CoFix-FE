import React from 'react';
import { DiffEditor } from '@monaco-editor/react';

// ------------ 임시 ------------
const myCode = `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
};`;

const aiCleanCode = `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  // AI 가 제안하는 최적화: 상태 병합
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    global: '',
  });

};`;
// ------------------------------

// 에디터 공통 옵션
const editorOptions = {
    readOnly: true,
    minimap: { enabled: false }, 
    scrollBeyondLastLine: false,
    fontSize: 12, 
    lineHeight: "1.5vh", 
    renderOverviewRuler: false, 
    overviewRulerBorder: false, 
    stickyScroll: { enabled: false }, 
    scrollbar: { useShadows: false }
};

function AiCodeDiffViewer() {
    const handleEditorMount = (editor) => {
        editor.getOriginalEditor().updateOptions({
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
            }
        });
    };

    return (
        <div className="panel-base flex flex-col justify-center w-full h-[34.54vh] gap-[1.3vh] overflow-hidden">
            <div className="panel-title mb-2">내 코드 vs AI 클린 코드</div>
            
            <div 
                className="flex w-[72.92vw] h-[23.7vh] rounded-[1.04vw] p-[0.09vh] overflow-hidden"
                style={{ 
                    background: 'linear-gradient(to right, var(--color-red500-30) 50%, var(--color-green500-30) 50%)'
                }}
            >
                <div className="w-full h-full rounded-[1.04vw] overflow-hidden bg-gray900 py-[2.13vh] px-[3vw]">
                    <DiffEditor
                        height="100%"
                        language="javascript"
                        theme="vs-dark"
                        original={myCode}
                        modified={aiCleanCode}
                        options={{ ...editorOptions, renderSideBySide: true }}
                        onMount={handleEditorMount}
                    />
                </div>
            </div>
            
        </div>
    );
}

export default AiCodeDiffViewer;