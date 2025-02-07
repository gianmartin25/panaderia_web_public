import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceReaderService {

  public synth = window.speechSynthesis;


  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma (cambiar a 'en-US' para inglés, etc.)
    this.synth.speak(utterance);
  }

  cancel(): void {
    this.synth.cancel();
  }

  pause(): void {
    this.synth.pause();
  }
}
