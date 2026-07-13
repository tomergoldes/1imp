"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

interface Config {
  key: string;
  value: string;
  description: string | null;
}

export default function AdminSettingsPage() {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const defaultKeys = [
    { key: "OPENAI_PROMPT_CV_TO_SCRIPT", desc: "The main prompt instructing OpenAI how to write the video script from a CV." },
    { key: "EMAIL_VIDEO_PROCESSING_HTML", desc: "HTML template sent when video is rendering." },
    { key: "EMAIL_VIDEO_READY_HTML", desc: "HTML template sent when watermarked video is ready." },
    { key: "EMAIL_UPGRADE_SUCCESS_HTML", desc: "HTML template sent when user pays and unlocks HD video." }
  ];

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const res = await fetch("/api/admin/config");
        if (res.ok) {
          const data = await res.json();
          // Merge with defaults if they don't exist yet
          const merged = defaultKeys.map(dk => {
            const existing = data.find((d: Config) => d.key === dk.key);
            return existing || { key: dk.key, value: "", description: dk.desc };
          });
          setConfigs(merged);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (key: string, newValue: string) => {
    setConfigs(configs.map(c => c.key === key ? { ...c, value: newValue } : c));
  };

  const handleSave = async (config: Config) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save.");
      }
    } catch (error) {
      setMessage("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8"><Loader2 className="animate-spin text-gray-500" /></div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-500 mt-2">Manage prompts and email templates dynamically.</p>
        </div>
        {message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
            {message}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {configs.map((config) => (
          <div key={config.key} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 font-mono">{config.key}</h3>
                <p className="text-sm text-gray-500 mt-1">{config.description}</p>
              </div>
              <button 
                onClick={() => handleSave(config)}
                disabled={saving}
                className="flex items-center gap-2 bg-[#E8355A] text-white px-4 py-2 rounded-lg hover:bg-[#D02045] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save
              </button>
            </div>
            
            <textarea
              className="w-full h-64 p-4 border border-gray-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-[#E8355A] focus:border-transparent outline-none transition-all"
              value={config.value}
              onChange={(e) => handleChange(config.key, e.target.value)}
              placeholder="Enter value here... (If left empty, system will use hardcoded defaults)"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
