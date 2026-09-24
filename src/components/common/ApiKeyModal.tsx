import React, { useState, useEffect } from 'react';
import { getStoredApiKey, setStoredApiKey } from '../../services/activityStore';
import { Key, Eye, EyeOff, Check, X, Sparkles, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleRemove = () => {
    setStoredApiKey('');
    setApiKey('');
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-brand/10 text-brand">
              <Key className="size-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Configurar Chave Google Gemini
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Personalize sua cota de inteligência artificial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="rounded-lg border border-brand/20 bg-brand/5 p-3 text-zinc-700 leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-brand mb-1">
              <Sparkles className="size-3.5" />
              <span>Geração Híbrida Inteligente</span>
            </div>
            O EduCreator AI possui um motor pedagógico integrado que funciona instantaneamente mesmo sem chave.
            Caso queira usar sua própria cota do <strong>Google Gemini (Gemini 1.5 Flash)</strong>, insira sua chave abaixo.
          </div>

          <div>
            <label className="mb-1.5 block font-semibold text-foreground">
              Sua Chave de API do Google AI Studio
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-3 pr-10 text-xs placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-brand hover:underline"
            >
              <span>Obter chave gratuita no Google AI Studio</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 p-2 text-xs font-semibold text-emerald-800">
              <Check className="size-4 text-emerald-600" />
              <span>Configuração salva com sucesso!</span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4">
            {apiKey && (
              <button
                type="button"
                onClick={handleRemove}
                className="text-xs font-medium text-destructive hover:underline"
              >
                Remover Chave
              </button>
            )}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-brand-700"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
