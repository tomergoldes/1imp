/**
 * 1IMP — ElevenLabs Integration
 * 
 * Generates natural-sounding voice-overs from the script text.
 */
import { uploadToStorage } from "../storage-client";

export type VoiceTone = "Professional" | "Bold" | "Funny" | "Creative" | "Minimal";

// Map our internal tones to specific ElevenLabs Voice IDs
// These are example IDs; they need to be replaced with real ones from your ElevenLabs account
const VOICE_MAP: Record<VoiceTone, string> = {
  Professional: "EXAVITQu4vr4xnSDxMaL", // Example: Sarah (Professional)
  Bold: "TxGEqnHWrfWFTfGW9XjX",         // Example: Josh (Deep, bold)
  Funny: "VR6AewLTigWG4xT8uXgR",        // Example: Arnold (Quirky)
  Creative: "ThT5KcBeYPX3keUQqHPh",     // Example: Dorothy (Warm, storytelling)
  Minimal: "ErXwobaYiN019PkySvjV",      // Example: Antoni (Clear, concise)
};

export async function generateVoiceOver(
  scriptText: string,
  tone: VoiceTone | string
): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  if (!apiKey || process.env.NODE_ENV === "development") {
    console.log(`[ElevenLabs Client] Mocking voice generation for tone: ${tone}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Return a dummy audio URL (e.g., a silent mp3 or a placeholder)
    return "https://actions.google.com/sounds/v1/alarms/beep_short.ogg";
  }

  try {
    const voiceId = VOICE_MAP[tone as VoiceTone] || VOICE_MAP.Professional;
    
    // Call the ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: scriptText,
        model_id: "eleven_turbo_v2", // Faster, cheaper model
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.statusText} - ${errText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    
    // Upload this buffer to Supabase Storage and return the public URL
    const filename = `voice_${Date.now()}_${Math.random().toString(36).substring(7)}.mp3`;
    const url = await uploadToStorage(audioBuffer, filename, 'audio/mpeg');
    
    return url;
  } catch (error) {
    console.error("[ElevenLabs Client] Error generating voice:", error);
    throw new Error("Failed to generate voice-over");
  }
}
